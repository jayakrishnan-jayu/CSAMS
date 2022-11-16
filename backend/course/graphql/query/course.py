import graphene
from course.graphql.types.course import CourseType
from course.models import Course, Program, Batch
from backend.api import APIException
from graphql_jwt.decorators import login_required

class CourseQueries(graphene.ObjectType):
    course = graphene.Field(
        CourseType,
        code=graphene.String(description="Course code", required=True)
    )

    courses = graphene.List(
        CourseType,
        program=graphene.String(description="Department Program eg BCA", required=True),
        year=graphene.Int(description="Year of Batch", required=True),
        sem=graphene.Int(description="Semster of Batch"),
    )

    @login_required
    def resolve_course(self, info, code: str):
        try:
            course = Course.objects.get(identifier__code=code)
        except:
            raise APIException("Course not found", code="COURSE_NOT_FOUND")
        return course
    

    @login_required
    def resolve_courses(self, info, program:str, year:int, sem=None):
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
            return courses
        except Program.DoesNotExist:
            raise APIException("Program not found", code="PROGRAM_NOT_FOUND")


__all__ = [
    'CourseQueries'
]