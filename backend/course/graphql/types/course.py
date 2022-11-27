import graphene
from user.graphql.types.user import FacultyType
from course.models import Batch, Program, ExtraCourse
from backend.api import APIException

class ProgramType(graphene.ObjectType):
    name = graphene.String()


class CurriculumType(graphene.ObjectType):
    id = graphene.ID()
    program = graphene.String()
    year = graphene.Int()


class CurriculumExtraType(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()

class BatchType(graphene.ObjectType):
    curriculum = graphene.Field(CurriculumType)
    extras = graphene.List(CurriculumExtraType)
    year = graphene.Int()
    sem = graphene.Int()


    def resolve_extras(self, info):
        return self.extras.all()


class BatchYearSemType(graphene.ObjectType):
    year = graphene.Int()
    semesters = graphene.List(graphene.Int)

class ExtraCourseType(graphene.ObjectType):
    code = graphene.String()
    name = graphene.String()
    credit = graphene.Int()
    hours = graphene.Int()
    l = graphene.Int()
    t = graphene.Int()
    p = graphene.Int()
     
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
        batches = Batch.objects.filter(curriculum__program=self)
        years = batches.values_list('year', flat=True).distinct()
        if not years.exists():
            raise APIException('Batches not found', 'BATCHES_NOT_FOUND')    
        return [BatchYearSemType(year=year, semesters=batches.filter(year=year).values_list('sem', flat=True)) for year in years]    


class CourseType(graphene.ObjectType):
    batch = graphene.Field(BatchType)
    code = graphene.String()
    name = graphene.String()
    credit = graphene.Int()
    hours = graphene.Int()
    l = graphene.Int()
    t = graphene.Int()
    p = graphene.Int()


class CourseLabType(graphene.ObjectType):
    course = graphene.Field(CourseType)
    lab = graphene.Field(CourseType)

__all__ = [
    'ProgramType'
]