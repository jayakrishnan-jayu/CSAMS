
import graphene
from allocation.models import CourseAllocation, LabAllocation
from course.graphql.types.course import CourseType
from course.models import Course, Batch
from user.models import Faculty
from course.utils.allocation import Allocation
from user.graphql.types.user import FacultyType
from preference.models import Identifier

from backend.api import APIException

class CourseAllocationType(graphene.ObjectType):
    id = graphene.ID()
    course_id = graphene.ID()
    faculty_id = graphene.ID()

class LabAllocationType(graphene.ObjectType):
    id = graphene.ID()
    course_id = graphene.ID()
    faculty_id = graphene.ID()
    is_in_charge = graphene.Boolean()

class AllocationsType(graphene.ObjectType):
    courses = graphene.List(CourseAllocationType)
    labs = graphene.List(LabAllocationType)

class AllocationCourseLabType(graphene.ObjectType):
    course_id = graphene.ID()
    lab_id = graphene.ID()

class AllocationPreferenceType(graphene.ObjectType):
    id = graphene.ID()
    faculty_id = graphene.ID()
    course_id = graphene.ID()
    weigtage = graphene.Int()
    experience = graphene.Int()
    timestamp = graphene.DateTime()
    score = graphene.Float()

class AllocationBatchType(graphene.ObjectType):
    id = graphene.ID()
    curriculum_year = graphene.Int()
    curriculum_name = graphene.String()
    batch_year = graphene.Int()
    batch_sem = graphene.Int()
    course_labs = graphene.List(AllocationCourseLabType)
    course_ids = graphene.List(graphene.ID)
    course_allocations = graphene.List(CourseAllocationType)
    lab_allocations = graphene.List(LabAllocationType)

    def resolve_curriculum_year(self, info):
        if not isinstance(self, Batch):
            raise APIException(message="Instance is not of type Batch")
        return self.curriculum.year
    
    def resolve_curriculum_name(self, info):
        if not isinstance(self, Batch):
            raise APIException(message="Instance is not of type Batch")
        return self.curriculum.program.name
    
    def resolve_batch_year(self, info):
        if not isinstance(self, Batch):
            raise APIException(message="Instance is not of type Batch")
        return self.year
    
    def resolve_batch_sem(self, info):
        if not isinstance(self, Batch):
            raise APIException(message="Instance is not of type Batch")
        return self.sem

class AllocationType(graphene.ObjectType):
    courses = graphene.List(CourseAllocationType)
    labs = graphene.List(LabAllocationType)

class AllocationManagementType(graphene.ObjectType):
    faculties = graphene.List(FacultyType)
    preferences = graphene.List(AllocationPreferenceType)
    best_preferences = graphene.List(graphene.ID)
    courses = graphene.List(CourseType)
    batches = graphene.List(AllocationBatchType)
    
    # def resolve_preferred_faculties(self, info):
    #     if not isinstance(self, Allocation):
    #         raise APIException(message="Not an instance of Allocation")
    #     return Faculty.objects.filter(user__is_active=True)

class ApprovedAllocationType(graphene.ObjectType):
    faculties = graphene.List(FacultyType)
    courses = graphene.List(CourseType)
    batches = graphene.List(AllocationBatchType)
