import graphene
from course.graphql.types.course import CourseType
from course.graphql.types.course import CourseLabType
from allocation.graphql.types.allocation import CourseAllocationType
from models import CourseAllocation
from user.graphql.types.user import FacultyType
from backend.api import APIException
from backend.api.decorator import login_required

class AllocationQueries(graphene.ObjectType):
    allocation_Data = graphene.List(CourseAllocationType)


    @login_required
    def resolve_course(self, info, code: str):
        courses = CourseAllocation.objects.all()
        if not courses.exists() :
            raise APIException("Faculty details not found")
        return courses 

