
import graphene
from allocation.models import CourseAllocation, LabAllocation
from course.graphql.types.course import CourseType
from user.graphql.types.user import FacultyType
from user.graphql.types.user import UserType
from backend.api import APIException
from typing import List


class CourseAndFacultyType(graphene.ObjectType):
    class Meta :
        model = CourseAllocation

    course = graphene.Field(CourseType)
    faculty = graphene.Field(FacultyType)

class AllocationFilterInput(graphene.InputObjectType):
    year = graphene.Int()
    is_even_sem = graphene.Boolean()