
import graphene
from allocation.graphql.types.allocation import CourseAndFacultyType,AllocationFilterInput
from course.graphql.types.course import CourseType
from allocation.models import CourseAllocation
from user.models import Faculty
from user.graphql.types.user import FacultyType
from backend.api import APIException
from backend.api.decorator import login_required

class AllocationQueries(graphene.ObjectType):
    all_allocation = graphene.List(CourseAndFacultyType,)
    # batch_wise_allocation = graphene.List(CourseAndFacultyType
    allocation = graphene.List(
        CourseAndFacultyType,
        filter = graphene.Argument(AllocationFilterInput,required=True))
    
    @login_required
    def resolve_allocation(self,info,filter):
        if filter :
            if filter.batch and filter.year and filter.sem :
                allocations = CourseAllocation.objects.all()
                allocations = allocations.filter(
                    course__batch__curriculum__program__name=filter.batch,
                    course__batch__year = filter.year,
                    course__batch__sem = filter.sem,
                )
                course_faculty_list = []
                for allocation in allocations:
                    course = allocation.course
                    user = allocation.faculty
                    try:
                        faculty = Faculty.objects.get(id=user.id)
                        course_faculty_list.append(CourseAndFacultyType(courses=course,faculties=faculty))
                    except Faculty.DoesNotExist:
                        return APIException("Faculty does not exist")
                    return course_faculty_list
                    
    @login_required
    def resolve_all_allocation(self, info):
        allocations = CourseAllocation.objects.all()
        course_faculty_list = []
        for allocation in allocations:
            course = allocation.course
            user = allocation.faculty
            try:
                faculty = Faculty.objects.get(id=user.id)
                course_faculty_list.append(CourseAndFacultyType(courses=course, faculties=faculty))
            except Faculty.DoesNotExist:
                return APIException("Faculty Info not found")
        return course_faculty_list
    
    # @login_required
    # def resolve_batch_wise_allocation(self,info):
    #     year = 2018;
    #     courses =   
