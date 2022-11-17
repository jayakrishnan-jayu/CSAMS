import graphene
from user.graphql.types.user import FacultyType
from course.models import Batch, Program
from backend.api import APIException

class ProgramType(graphene.ObjectType):
    name = graphene.String()


class BatchType(graphene.ObjectType):
    program = graphene.String()
    advsors = graphene.List(FacultyType)
    year = graphene.Int()
    sem = graphene.Int()

    def resolve_program(self, info):
        return self.program.name


class BatchYearSemType(graphene.ObjectType):
    year = graphene.Int()
    semesters = graphene.List(graphene.Int)


class BatchInfoType(graphene.ObjectType):
    program = graphene.String()
    info = graphene.List(BatchYearSemType)

    def resolve_program(self, info):
        if not (hasattr(self, 'name') and isinstance(self, Program)):
            raise APIException('Program not found', 'PROGRAM_NOT_FOUND')
        return self.name

    def resolve_info(self, info):
        if not (hasattr(self, 'name') and isinstance(self, Program)):
            raise APIException('Program not found', 'PROGRAM_NOT_FOUND')
        batches = Batch.objects.filter(program=self)
        years = batches.values_list('year', flat=True).distinct()
        if not years.exists():
            raise APIException('Batches not found', 'BATCHES_NOT_FOUND')
        return [BatchYearSemType(year=year, semesters=batches.filter(year=year).values_list('sem', flat=True)) for year in years]    


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