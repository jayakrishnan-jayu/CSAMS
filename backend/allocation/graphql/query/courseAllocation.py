import graphene
from allocation.graphql.types.allocation import CourseAndFacultyType
from course.graphql.types.course import CourseType
from allocation.models import CourseAllocation
from user.graphql.types.user import FacultyType
from backend.api import APIException
from backend.api.decorator import login_required

class AllocationQueries(graphene.ObjectType):
    all_allocation = graphene.List(CourseAndFacultyType)

    @login_required
    def resolve_all_allocation(self, info):
        allocations = CourseAllocation.objects.all()
        course_faculty_list = []
        for allocation in allocations:
            course = allocation.course
            faculty = allocation.faculty
            course_faculty_list.append(CourseAndFacultyType(courses=course, faculties=faculty))
        return course_faculty_list
