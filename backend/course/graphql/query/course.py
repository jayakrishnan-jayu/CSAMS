import graphene
from course.graphql.types.course import CourseType, CourseLabType, CurriculumExtraCoursesType, ExtraCourseType, SemesterCourseType
from course.models import Course, Program, Batch, CourseLab, CurriculumExtras,Curriculum, ExtraCourse
from preference.graphql.types.preference import IdentfierInput
from preference.models import Config
from backend.api import APIException
from backend.api.decorator import login_required
from typing import List
from django.db.models import F

class CourseQueries(graphene.ObjectType):
    course = graphene.Field(
        CourseType,
        code=graphene.String(description="Course code", required=True)
    )

    courses = graphene.List(
        CourseType,
        identifier = graphene.Argument(IdentfierInput, required=False),
        # TODO: add argument to fetch courses apart from identiifer
    )

    courseLabs = graphene.List(
        CourseLabType,
        program=graphene.String(description="Department Program eg BCA", required=True),
        year=graphene.Int(description="Year of Batch", required=True),
        sem=graphene.Int(description="Semster of Batch"),
    )
    curriculum_extra_courses = graphene.List(
        CurriculumExtraCoursesType,
        extras=graphene.List(graphene.String, required=True),
        program=graphene.String(required=True),
        curriculum_year=graphene.Int(required=True),
    )
    batch_selected_extra_courses = graphene.List(
        ExtraCourseType,
        batch_id=graphene.ID(required=True),
    )

    @login_required
    def resolve_course(self, info, code: str):
        try:
            course = Course.objects.get(code=code)
        except:
            raise APIException("Course not found", code="COURSE_NOT_FOUND")
        return course
    

    @login_required
    def resolve_courses(self, info, identifier:IdentfierInput=None):
        if identifier is None:
            identifier = Config.objects.first().current_preference_sem
        
        batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not identifier.is_even_sem , sem_year=identifier.year)
        courses_in_batches = Course.objects.filter(batch__in=batches)
        return courses_in_batches
    

    @login_required
    def resolve_courseLabs(self, info, program:str, year:int, sem=None):
        try:
            p = Program.objects.get(name=program)
            batches = Batch.objects.filter(program=p, year=year)
            if sem is not None and batches.exists():
                batches = batches.filter(sem=sem)
            if not batches.exists():
                raise APIException("Batch not found", code="BATCH_NOT_FOUND")

            courses = Course.objects.filter(batch__in=batches)
            if not courses.exists():
                raise APIException("Courses not found", code="COURSES_NOT_FOUND")

            courseLabs = CourseLab.objects.filter(course__in=courses)
            if not courseLabs.exists():
                raise APIException("Course Lab mapping not found", code="COURSELABS_NOT_FOUND")
            
            return courseLabs
        except Program.DoesNotExist:
            raise APIException("Program not found", code="PROGRAM_NOT_FOUND")
    
    @login_required
    def resolve_curriculum_extra_courses(self, info, extras:List[str], program:str, curriculum_year:int):
        if len(extras) == 0 or len(extras) > 10:
            raise APIException(message="Invalid lengths of array extras passed")
        extra_names = []
        for e in extras:
            if e not in extra_names:
                extra_names.append(e)
        print(extra_names)
        if len(extras) != len(extra_names):
            raise APIException(message="Duplicate extra found", code="DUPLICATE_EXTRA")
        try:
            c = Curriculum.objects.get(year=curriculum_year, program__name=program)
        except Curriculum.DoesNotExist:
            raise APIException(message="Curriculum does not exist", code="CURRICULUM_DOES_NOT_EXISt")
        print(c)
        qs = CurriculumExtras.objects.filter(curriculum=c, name__in=extra_names)
        print(qs)
        if qs.count() != len(extra_names):
            raise APIException(message="Invalid extra found in input")
        return qs
    
    @login_required
    def resolve_batch_selected_extra_courses(self, info, batch_id: int):
        try:
            b = Batch.objects.get(id=batch_id)
        except Batch.DoesNotExist:
            raise APIException(message="Invalid Batch Id", code="BATCH_NOT_FOUND")
        return b.selected_extra_courses.all()
__all__ = [
    'CourseQueries'
]