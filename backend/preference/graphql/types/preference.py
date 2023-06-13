import graphene
from allocation.graphql.types.allocation import AllocationBatchType
from user.graphql.types.user import FacultyType
from course.graphql.types import CourseType




class PreferenceType(graphene.ObjectType):
    id = graphene.ID()
    identifier_year = graphene.Int()
    identifier_is_even_sem = graphene.Boolean()
    faculty = graphene.Field(FacultyType)
    course = graphene.Field(CourseType)
    weigtage = graphene.Int()
    experience = graphene.Int()
    timestamp = graphene.DateTime()

    def resolve_identifier_year(self, info):
        return self.preference_sem_identifier.year
    
    def resolve_identifier_is_even_sem(self, info):
        return self.preference_sem_identifier.is_even_sem
    

class CourseAllocationPreferenceType(graphene.ObjectType):
    id = graphene.ID()
    identifier_year = graphene.Int()
    identifier_is_even_sem = graphene.Boolean()
    course_id = graphene.ID()
    faculty_id = graphene.ID()
    weigtage = graphene.Int()
    experience = graphene.Int()
    timestamp = graphene.DateTime()

    def resolve_identifier_year(self, info):
        return self.preference_sem_identifier.year
    
    def resolve_identifier_is_even_sem(self, info):
        return self.preference_sem_identifier.is_even_sem

class PreferenceAllocationFacultyType(graphene.ObjectType):
    preferences = graphene.List(CourseAllocationPreferenceType)
    faculties = graphene.List(FacultyType)
    courses = graphene.List(CourseType)
    batches = graphene.List(AllocationBatchType)

class IdentfierInput(graphene.InputObjectType):
    year = graphene.Int(required=True, description="Year at which the preference was recorded")
    is_even_sem = graphene.Boolean(required=True, description="Odd/Even Sem")

class IdentifierType(graphene.ObjectType):
    year = graphene.Int()
    is_even_sem = graphene.Boolean()
    