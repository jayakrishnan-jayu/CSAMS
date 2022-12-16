import graphene
from course.graphql.types.course import CourseType, CourseLabType, ExtraCourseType, SemesterCourseType
from course.models import Course, Program, Batch, CourseLab, Curriculum
from backend.api import APIException
from graphql_jwt.decorators import login_required

class CourseQueries(graphene.ObjectType):
    course = graphene.Field(
        CourseType,
        code=graphene.String(description="Course code", required=True)
    )

    courses = graphene.Field(
        SemesterCourseType,
        curriculum_id=graphene.ID(description="Curriculum ID", required=True),
        year=graphene.Int(description="Year of Batch", required=True),
        sem=graphene.Int(description="Semster of Batch", required=True),
    )

    courseLabs = graphene.List(
        CourseLabType,
        program=graphene.String(description="Department Program eg BCA", required=True),
        year=graphene.Int(description="Year of Batch", required=True),
        sem=graphene.Int(description="Semster of Batch"),
    )

    @login_required
    def resolve_course(self, info, code: str):
        try:
            course = Course.objects.get(code=code)
        except:
            raise APIException("Course not found", code="COURSE_NOT_FOUND")
        return course
    

    @login_required
    def resolve_courses(self, info, curriculum_id:int, year:int, sem:int):
        try:
            batch = Batch.objects.get(curriculum_id=curriculum_id, year=year, sem=sem)
            print("Batch:", batch)
            return batch
        except Batch.DoesNotExist as e:
            raise APIException("Batch or Curriculum not found", code="INVALID_INPUT")
    

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
    
    
__all__ = [
    'CourseQueries'
]