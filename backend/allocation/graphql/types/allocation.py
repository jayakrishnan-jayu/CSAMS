
import graphene
# from allocation.models import CourseAllocation, LabAllocation
from course.graphql.types.course import CourseType
from user.graphql.types.user import FacultyType
from user.graphql.types.user import UserType
from backend.api import APIException
from typing import List

class CourseAndFacultyType(graphene.ObjectType):
    courses = graphene.Field(CourseType)
    faculties = graphene.Field(FacultyType)

class AllocationFilterInput(graphene.InputObjectType):
    batch = graphene.String()
    year = graphene.Int()
    sem = graphene.Int()