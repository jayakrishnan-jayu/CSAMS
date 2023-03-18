
import graphene
from allocation.graphql.types.allocation import CourseAndFacultyType,AllocationFilterInput
from course.graphql.types.course import CourseType
from course.models import Batch
from course.models import Course
from allocation.models import CourseAllocation
from user.models import Faculty
from user.graphql.types.user import FacultyType
from backend.api import APIException
from backend.api.decorator import login_required
from django.db.models import F
from django.db.models import Sum

class AllocationQueries(graphene.ObjectType):
    allocation = graphene.List(
        CourseAndFacultyType,
        # faculty_id = graphene.ID(description="ID of faculty"),
        filter = graphene.Argument(AllocationFilterInput,required=True))   
     
    @login_required
    def resolve_allocation(self,info,filter):
        batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not filter.is_even_sem , sem_year=filter.year)
        courses_in_batches = Course.objects.filter(batch__in=batches)
        allocations = CourseAllocation.objects.filter(course__in=courses_in_batches)
        # allocations = CourseAllocation.objects.all()
        return allocations