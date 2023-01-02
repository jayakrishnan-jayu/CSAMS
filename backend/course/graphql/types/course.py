import graphene
from user.graphql.types.user import FacultyType
from course.models import Batch, Program, Course, BatchCurriculumExtra
from backend.api import APIException
from typing import List

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
    id = graphene.ID()
    curriculum = graphene.Field(CurriculumType)
    extra = graphene.List(graphene.String)
    year = graphene.Int()
    sem = graphene.Int()


    def resolve_extra(self, info):
        extras: List[BatchCurriculumExtra] = self.extras
        result = []
        for bce in extras:
            result += [bce.extra]*bce.count
        return result


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
    course_type = graphene.String()

    def resolve_course_type(self, info):
        return self.course_type.name
     
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


class SemesterCourseType(graphene.ObjectType):
    courses = graphene.List(CourseType)
    # extra = graphene.List(ExtraCourseType)

    def resolve_courses(self, info):
        if not isinstance(self, Batch):
            raise APIException('Batch not found', 'BATCH_NOT_FOUND')
        qs = Course.objects.filter(batch=self, is_extra=False)
        if not qs.exists():
            raise APIException('Courses not found', 'COURSE_NOT_FOUND')
        return qs

    # def resolve_extra(self, info):
    #     if not isinstance(self, Batch):
    #         raise APIException('Batch not found', 'BATCH_NOT_FOUND')
    #     qs = Course.objects.filter(batch=self, is_extra=True)
    #     return qs

__all__ = [
    'ProgramType'
]