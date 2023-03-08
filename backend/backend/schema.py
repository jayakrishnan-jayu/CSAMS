import graphene
from user.graphql import UserQueries, UserMutation
from course.graphql import CourseQuery, CourseMutation

class Query(
    UserQueries,
    CourseQuery,
    graphene.ObjectType
    ):
    hello = graphene.String(default_value="Hi!")

class Mutation(
    UserMutation,
    CourseMutation,
    graphene.ObjectType
):
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)