from typing import List

import graphene
from django.db.models import F

from backend.api import APIException
from course.models import (Batch, BatchCurriculumExtra, Course, Curriculum,
                           CurriculumExtras, ExtraCourse, Program)
from preference.models import Config, Preference
from user.graphql.types import FacultyType

class ProgramType(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()
    duration = graphene.String()

    def resolve_duration(self, info):
        return self.year


class CurriculumType(graphene.ObjectType):
    id = graphene.ID()
    program = graphene.String()
    year = graphene.Int()
    duration = graphene.Int()

    def resolve_duration(self, info):
        return self.program.year

class CurriculumExtraType(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()

class CurriculumUploadType(graphene.ObjectType):
    id = graphene.ID()
    program = graphene.String()
    year = graphene.Int()
    data = graphene.JSONString()
    uploaded_on = graphene.DateTime()
    is_populated = graphene.Boolean()

class ExtraCourseType(graphene.ObjectType):
    id = graphene.ID()
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


class CurriculumExtraCoursesType(graphene.ObjectType):
    extra = graphene.String()
    courses = graphene.List(ExtraCourseType)

    def resolve_extra(self, info):
        if not isinstance(self, CurriculumExtras):
            raise APIException(message="Curriculum Extra type not found")
        return self.name

    def resolve_courses(self, info):
        if not isinstance(self, CurriculumExtras):
            raise APIException(message="Curriculum Extra type not found")
        return ExtraCourse.objects.filter(course_type=self)

class BatchType(graphene.ObjectType):
    id = graphene.ID()
    curriculum = graphene.Field(CurriculumType)
    semester_extra_courses = graphene.List(graphene.String)
    selected_extra_courses = graphene.List(ExtraCourseType)
    extra_course_left_to_assign = graphene.Int()
    year = graphene.Int()
    sem = graphene.Int()


    def resolve_semester_extra_courses(self, info):
        if not isinstance(self, Batch):
            raise APIException('Batch not found', 'BATCH_NOT_FOUND')
        extras: List[BatchCurriculumExtra] = self.extras
        result = []
        for bce in extras:
            result += [bce.extra]*bce.count
        return result
    
    def resolve_selected_extra_courses(self, info):
        if not isinstance(self, Batch):
            raise APIException('Batch not found', 'BATCH_NOT_FOUND')
        return self.selected_extra_courses.all()
    
    def resolve_extra_course_left_to_assign(self, info):
        if not isinstance(self, Batch):
            raise APIException('Batch not found', 'BATCH_NOT_FOUND')
        selected_courses = self.selected_extra_courses.all() # ExtraCourse (stores the elective/optionals course details from curriculum data)
        batch_curriculum_extras = self.extras # BatchCurriculumExtra (stores the CurriculumExtra and it's count), specifies what all extra electives are available to batch
        selected_courses_count = len(selected_courses)
        batch_extra_courses_count = 0
        for bce in batch_curriculum_extras:
            batch_extra_courses_count += bce.count
        return batch_extra_courses_count - selected_courses_count


class IdentifierInput(graphene.InputObjectType):
    year = graphene.Int(required=True)
    is_even_sem = graphene.Boolean(required=True)

# class BatchFilterInput(graphene.Argument):
#     curriculum_id = graphene.ID(required=False)
#     program = graphene.String(required=False)

class BatchYearSemType(graphene.ObjectType):
    year = graphene.Int()
    semesters = graphene.List(graphene.Int)

class BatchCurriculumExtraType(graphene.ObjectType):
    curriculum_extras = graphene.String()

    def resolve_curriculum_extras(self, info):
        if not isinstance(self, BatchCurriculumExtra):
            raise APIException('BatchCurriculumExtra not found', 'BATCH_CURRICULUM_EXTRA_NOT_FOUND')
        return [*[e.name for e in self.extra]*self.count]
    
     
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


class CoursePreferenceType(graphene.ObjectType):
    id = graphene.ID()
    course_id = graphene.ID()
    identifier_year = graphene.Int()
    identifier_is_even_sem = graphene.Boolean()
    faculty = graphene.Field(FacultyType)
    weigtage = graphene.Int()
    experience = graphene.Int()
    timestamp = graphene.DateTime()


    def resolve_course_id(self, info):
        if not isinstance(self, Preference):
            raise APIException("Preference not found", "PREFERENCE_NOT_FOUND")
        return self.course.id
    def resolve_identifier_year(self, info):
        if not isinstance(self, Preference):
            raise APIException("Preference not found", "PREFERENCE_NOT_FOUND")
        return self.preference_sem_identifier.year
    
    def resolve_identifier_is_even_sem(self, info):
        if not isinstance(self, Preference):
            raise APIException("Preference not found", "PREFERENCE_NOT_FOUND")
        return self.preference_sem_identifier.is_even_sem
    
class CourseType(graphene.ObjectType):
    id = graphene.ID()
    code = graphene.String()
    name = graphene.String()
    credit = graphene.Int()
    hours = graphene.Int()
    l = graphene.Int()
    t = graphene.Int()
    p = graphene.Int()
    is_extra = graphene.Boolean()
    is_elective = graphene.Boolean()
    program = graphene.String()
    curriculum_year = graphene.Int()
    batch_year = graphene.Int()
    sem = graphene.Int()
    preferences = graphene.List(CoursePreferenceType)

    def resolve_program(self, info):
        if not isinstance(self, Course):
            raise APIException(message="Course Not Found", code="COURSE_NOT_FOUND")
        return self.batch.curriculum.program.name
    
    def resolve_curriculum_year(self, info):
        if not isinstance(self, Course):
            raise APIException(message="Course Not Found", code="COURSE_NOT_FOUND")
        return self.batch.curriculum.year
    
    def resolve_batch_year(self, info):
        if not isinstance(self, Course):
            raise APIException(message="Course Not Found", code="COURSE_NOT_FOUND")
        return self.batch.year
    
    def resolve_sem(self, info):
        if not isinstance(self, Course):
            raise APIException(message="Course Not Found", code="COURSE_NOT_FOUND")
        return self.batch.sem

    def resolve_preferences(self, info):
        if not isinstance(self, Course):
            raise APIException(message="Course Not Found", code="COURSE_NOT_FOUND")
        return Preference.objects.filter(course=self)
        




class CourseLabType(graphene.ObjectType):
    course = graphene.Field(CourseType)
    lab = graphene.Field(CourseType)

class UpdateBatchCurriculumExtraCourseResponse(graphene.ObjectType):
    semester_extra_courses = graphene.List(graphene.String)


class AddBatchExtraCourseResponse(graphene.ObjectType):
    extra_course = graphene.Field(ExtraCourseType)

class UpdateBatchExtraCourseResponse(graphene.ObjectType):
    old_extra_course = graphene.Field(ExtraCourseType)
    new_extra_course = graphene.Field(ExtraCourseType)

class DeleteBatchExtraCourseResponse(graphene.ObjectType):
    old_extra_course = graphene.Field(ExtraCourseType)

# class BatchManagementStatusType(graphene.ObjectType):
#     selected_courses = graphene.List(graphene.List)
#     is_complete = graphene.Boolean(description="Specifies whether the batch has been assigned the extra courses, if any")
#     is_current_batch = graphene.Boolean(description="Specifies whether the batch is currently in progress depeneding on the year and odd/even sem specified")
#     extra_course_left_to_assign = graphene.Int(description="Specifies the number of courses left to be assigned ie Electives")

# class BatchManagementInfoType(graphene.ObjectType):
#     sem = graphene.Int()
#     status = graphene.Field(BatchManagementStatusType)
    

#     def resolve_status(self, info):
#         if not isinstance(self, Batch):
#             raise APIException('Batch not found', 'BATCH_NOT_FOUND')
#         selected_courses = self.selected_extra_courses.all() # ExtraCourse (stores the elective/optionals course details from curriculum data)
#         batch_curriculum_extras = self.extras # BatchCurriculumExtra (stores the CurriculumExtra and it's count), specifies what all extra electives are available to batch
#         selected_courses_count = len(selected_courses)
#         batch_extra_courses_count = 0
#         for bce in batch_curriculum_extras:
#             batch_extra_courses_count += bce.count

#         courses_left = batch_extra_courses_count - selected_courses_count

#         self.is_complete = courses_left == 0
#         self.is_current_batch = False
#         self.extra_course_left_to_assign = courses_left
#         return self

class ActiveBatchType(graphene.ObjectType):
    id = graphene.ID()
    program = graphene.String()
    curriculum_year = graphene.Int()
    curriculum_id = graphene.ID()
    sem = graphene.Int()
    year = graphene.Int()
    is_complete = graphene.Boolean()

    def resolve_program(self, info):
        if not isinstance(self, Batch):
            raise APIException('Batch not found', 'BATCH_NOT_FOUND')
        return self.curriculum.program.name

    def resolve_curriculum_year(self, info):
        if not isinstance(self, Batch):
            raise APIException('Batch not found', 'BATCH_NOT_FOUND')
        return self.curriculum.year

    def resolve_curriculum_id(self, info):
        if not isinstance(self, Batch):
            raise APIException('Batch not found', 'BATCH_NOT_FOUND')
        return self.curriculum_id
    
    def resolve_is_complete(self, info):
        if not isinstance(self, Batch):
            raise APIException('Batch not found', 'BATCH_NOT_FOUND')
        return len(self.extras) == self.selected_extra_courses.count()
    

    

class BatchManagementType(graphene.ObjectType):
    active_batches = graphene.List(ActiveBatchType)
    

    def resolve_active_batches(self, info):
        config = Config.objects.first()
        qs = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not config.current_preference_sem.is_even_sem , sem_year=config.current_preference_sem.year)

        return qs

#     program_name = graphene.String()
#     year = graphene.Int()
#     batches = graphene.List(BatchManagementInfoType)

#     def resolve_program_name(self, info):
#         if not isinstance(self, Curriculum):
#             raise APIException('Curriculum not found', 'CURRICULUM_NOT_FOUND')
#         return self.program.name

    
#     def resolve_batches(self, info):
#         if not isinstance(self, Curriculum):
#             raise APIException('Curriculum not found', 'CURRICULUM_NOT_FOUND')
#         return Batch.objects.filter(curriculum=self)

class SemesterCourseType(graphene.ObjectType):
    courses = graphene.List(CourseType)
    # selected_extra_courses = graphene.List(ExtraCourseType)
    # semester_extra_courses = graphene.List(BatchCurriculumExtraType)

    def resolve_courses(self, info):
        if not isinstance(self, Batch):
            raise APIException('Batch not found', 'BATCH_NOT_FOUND')
        qs = Course.objects.filter(batch=self, is_extra=False)
        if not qs.exists():
            raise APIException('Courses not found', 'COURSE_NOT_FOUND')
        return qs

    # def resolve_selected_extra_courses(self, info):
    #     if not isinstance(self, Batch):
    #         raise APIException('Batch not found', 'BATCH_NOT_FOUND')
    #     return self.selected_extra_courses.all()
    
    # def resolve_semester_extra_courses(self, info):
    #     if not isinstance(self, Batch):
    #         raise APIException('Batch not found', 'BATCH_NOT_FOUND')
    #     return self.extras()

__all__ = [
    'ProgramType',
    'CurriculumType',
    'CurriculumExtraType',
    'CurriculumUploadType',
    'BatchType',
    'BatchYearSemType',
    'ExtraCourseType',
    'BatchInfoType',
    'CourseType',
    'CourseLabType',
    'SemesterCourseType',
    'IdentifierInput',
]