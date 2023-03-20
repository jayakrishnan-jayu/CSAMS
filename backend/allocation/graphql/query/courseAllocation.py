
import graphene
from allocation.graphql.types.allocation import CourseAndFacultyType,AllocationFilterInput
from course.graphql.types.course import CourseType
from course.models import Batch
from course.models import Course
from allocation.models import CourseAllocation
from user.models import Faculty
from user.graphql.types.user import FacultyType
from backend.api import APIException
from backend.api.decorator import login_required, resolve_user, staff_privilege_required
from django.db.models import F
from django.db.models import Sum
from django.core.exceptions import ObjectDoesNotExist

class AllocationQueries(graphene.ObjectType):
    allocation = graphene.List(
        CourseAndFacultyType,
        faculty_id = graphene.ID(description="ID of faculty",required=False),
        filter = graphene.Argument(AllocationFilterInput,required=True))   
     
    @resolve_user
    @staff_privilege_required
    def resolve_allocation(self,info,filter,faculty_id:int=None):
        try:
            batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not filter.is_even_sem , sem_year=filter.year)
            courses_in_batches = Course.objects.filter(batch__in=batches)
            if faculty_id :
                allocations = CourseAllocation.objects.filter(course__in=courses_in_batches,faculty=faculty_id)
                return allocations
            else : 
                allocations = CourseAllocation.objects.filter(course__in=courses_in_batches)
                return allocations
        except ObjectDoesNotExist:
            raise Exception("No allocation found for the filter criteria")
        except ValueError:
            raise Exception("Invalid faculty_id argument. Expected an integer.")
        except Exception as e:
            raise Exception("An unexpected error occured : " + str(e))