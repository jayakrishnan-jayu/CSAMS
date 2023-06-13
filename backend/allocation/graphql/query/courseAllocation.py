
import graphene
from allocation.graphql.types.allocation import ApprovedAllocationType, AllocationManagementType
from course.graphql.types.course import IdentifierInput
from course.models import Batch, Course, CourseLab
from course.utils.allocation import Allocation
from allocation.models import CourseAllocation, LabAllocation
from preference.models import Config, Identifier
from user.models import Faculty
from user.graphql.types.user import FacultyType

from backend.api.decorator import login_required, resolve_user, staff_privilege_required
from backend.api import APIException
from django.db.models import F
from django.core.exceptions import ObjectDoesNotExist

class AllocationQueries(graphene.ObjectType):
    allocation_management = graphene.Field(
        AllocationManagementType,
        identifier=graphene.Argument(IdentifierInput, required=False)
    )
    allocations = graphene.Field(
        ApprovedAllocationType,
        identifier=graphene.Argument(IdentifierInput, required=True)
    )


    # @login_required
    # @resolve_user
    # def resolve_allocations(self, info, identifier:IdentifierInput = None):
    #     if identifier is None:
    #         identifier = Config.objects.first().current_preference_sem
    #     batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not identifier.is_even_sem , sem_year=identifier.year)
    #     courses = Course.objects.filter(batch__in=batches) 
    #     course_allocations = CourseAllocation.objects.filter(course__in=courses)
    #     lab_allocations = LabAllocation.objects.filter(course__in=courses)
    #     return AllocationType(courses=course_allocations, labs=lab_allocations)
    
    @login_required
    @resolve_user
    @staff_privilege_required
    def resolve_allocation_management(self, info, identifier:IdentifierInput = None):
        if identifier is None:
            identifier = Config.objects.first().current_preference_sem
        else:
            try:
                identifier = Identifier.objects.get(is_even_sem=identifier.is_even_sem, year=identifier.year)
            except Identifier.DoesNotExist:
                raise APIException(message="Invalid Identifier")
        a = Allocation(identifier=identifier)
        a.allocate()
        return a
        
    
    @login_required
    @resolve_user
    def resolve_allocations(self, info, identifier:IdentifierInput = None):
        try:
            f = Faculty.objects.get(user=info.context.resolved_user)
        except Faculty.DoesNotExist:
            raise APIException(message="User is not an faculty")
        if identifier is None:
            i = Config.objects.first().current_preference_sem
        else:
            try:
                i = Identifier.objects.get(is_even_sem=identifier.is_even_sem, year=identifier.year)
            except Identifier.DoesNotExist:
                raise APIException(message="Invalid Identifier")
        if not i.is_hod_approved:
            raise APIException(message="HOD not approved")
        
        batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not i.is_even_sem, sem_year=i.year)
        courses = Course.objects.filter(batch__in=batches)

        faculty_ids = set()
        for b in batches:
            b.course_labs = CourseLab.objects.filter(course__in=courses.filter(batch=b))
            b.course_ids = courses.filter(batch=b).values_list('id', flat=True)
            b.course_allocations = CourseAllocation.objects.filter(course__id__in=b.course_ids)
            ca = b.course_allocations.values_list('faculty_id',flat=True).distinct()
            if ca:
                print("updating ", [*ca])
                faculty_ids.update([*ca])    
            b.lab_allocations = LabAllocation.objects.filter(course__id__in=b.course_ids)
            la = b.lab_allocations.values_list('faculty_id',flat=True).distinct()
            if la:
                faculty_ids.update([*la])
        
        faculties = Faculty.objects.filter(id__in=faculty_ids)
        return ApprovedAllocationType(faculties=faculties, batches=batches, courses=courses)

            