import graphene

class CourseInput(graphene.InputObjectType):
    code = graphene.String(required=True)
    name = graphene.String(required=True)
    L = graphene.Int(required=True)
    T = graphene.Int(required=True)
    P = graphene.Int(required=True)
    C = graphene.Int(required=True)

class SemesterInput(graphene.InputObjectType):
    sem = graphene.Int(required=True, description="number of semseter eg 1, 2, 3")
    courses = graphene.List(CourseInput, required=True)
    extra = graphene.List(graphene.String, required=True)

class ExtraInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    courses = graphene.List(CourseInput, required=True)

class CurriculumUploadInput(graphene.InputObjectType):
    program = graphene.String(required=True)
    year = graphene.Int(required=True)
    extra = graphene.List(ExtraInput, required=True)
    semesters = graphene.List(SemesterInput, required=True)

