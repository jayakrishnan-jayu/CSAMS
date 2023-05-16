
import graphene
from allocation.graphql.types.allocation import AllocationType, AllocationManagementType
from course.graphql.types.course import IdentifierInput
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
    # allocations = graphene.Field(
    #     AllocationType,
    #     identifier=graphene.Argument(IdentifierInput, required=False)
    #     )

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
        
            