import graphene
from user.graphql.types.user import FacultyType

class ProgramType(graphene.ObjectType):
    name = graphene.String()


class BatchType(graphene.ObjectType):
    program = graphene.Field(ProgramType)
    advsors = graphene.List(FacultyType)
    year = graphene.Int()
    sem = graphene.Int()


class CourseType(graphene.ObjectType):
    batch = graphene.String()
    code = graphene.String()
    name = graphene.String()
    credit = graphene.Int()
    hours = graphene.Int()
    l = graphene.Int()
    t = graphene.Int()
    p = graphene.Int()
    is_elective = graphene.Boolean()


    def resolve_code(self, info):
        return self.identifier.code
    
    def resolve_name(self, info):
        return self.identifier.name


class CourseLabType(graphene.ObjectType):
    course = graphene.Field(CourseType)
    lab = graphene.Field(CourseType)

__all__ = [
    'ProgramType'
]