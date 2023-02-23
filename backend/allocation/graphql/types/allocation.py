import graphene
# from allocation.models import CourseAllocation, LabAllocation
from course.graphql.types.course import CourseType
from user.graphql.types.user import FacultyType
from backend.api import APIException
from typing import List

class CourseAllocationType(graphene.ObjectType):
    courses = graphene.List(CourseType)
    faculty = graphene.List(FacultyType)


