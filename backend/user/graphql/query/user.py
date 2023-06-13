import graphene


from django.contrib.auth import get_user_model
from allocation.models import CourseAllocation, LabAllocation
from course.graphql.types.course import IdentifierInput
from course.models import Batch, Course
from preference.models import Config, Identifier
from django.db.models import F

from user.graphql.types.user import UserType, FacultyType, WorkloadType, MetaDataType
from backend.api import APIException
from user.models import Faculty, Workload
from backend.api.decorator import login_required, resolve_user, staff_privilege_required

class UserQueries(graphene.ObjectType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)
    faculty = graphene.Field(FacultyType)
    allocated_faculties = graphene.List(
        FacultyType,
        identifier=graphene.Argument(IdentifierInput, required=True)
    )
    faculties = graphene.List(FacultyType)
    workloads = graphene.List(WorkloadType)

    metadata = graphene.Field(MetaDataType)
    
    @login_required
    @resolve_user
    def resolve_users(self, info):
        return get_user_model().objects.all()
    
    @login_required
    @resolve_user
    def resolve_me(self, info):
        user = info.context.resolved_user
        if user.is_anonymous:
            raise Exception('Authentication Failure!')
        return user
    
    @login_required
    @resolve_user
    def resolve_faculty(self, info):
        user = info.context.resolved_user
        try:
            faculty = Faculty.objects.get(user_id = user.id)
        except Faculty.DoesNotExist:
            raise APIException("Faculty object not found")
        return faculty
    
    @login_required
    @resolve_user
    def resolve_allocated_faculties(self, info, identifier: IdentifierInput):
        try:
            f = Faculty.objects.get(user=info.context.resolved_user)
        except Faculty.DoesNotExist:
            raise APIException(message="User is not an faculty")

    
        try:
            i = Identifier.objects.get(is_even_sem=identifier.is_even_sem, year=identifier.year)
        except Identifier.DoesNotExist:
            raise APIException(message="Invalid Identifier")
        
        
        batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not i.is_even_sem, sem_year=i.year)
        courses = Course.objects.filter(batch__in=batches)
        faculty_ids = set()
        for b in batches:
            b.course_ids = courses.filter(batch=b).values_list('id', flat=True)
            b.course_allocations = CourseAllocation.objects.filter(course__id__in=b.course_ids)
            ca = b.course_allocations.values_list('faculty_id',flat=True).distinct()
            if ca:
                faculty_ids.update([*ca])    
            b.lab_allocations = LabAllocation.objects.filter(course__id__in=b.course_ids)
            la = b.lab_allocations.values_list('faculty_id',flat=True).distinct()
            if la:
                faculty_ids.update([*la])
        
        faculties = Faculty.objects.filter(id__in=faculty_ids)
        return faculties
    
    @login_required
    @resolve_user
    @staff_privilege_required
    def resolve_faculties(self, info, identifier: IdentifierInput):
        return Faculty.objects.all()
    
    @login_required
    @resolve_user
    @staff_privilege_required
    def resolve_workloads(self, info):
        return Workload.objects.all()
    
    @login_required
    @resolve_user
    def resolve_metadata(self, info):
        return info.context.resolved_user

__all__ = [
    'UserQueries'
]