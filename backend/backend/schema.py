import graphene
from user.graphql import UserQueries, UserMutation
from course.graphql import CourseQuery
from allocation.graphql import AllocationQuery

class Query(
    UserQueries,
    CourseQuery,
    AllocationQuery,
    graphene.ObjectType
    ):
    hello = graphene.String(default_value="Hi!")

class Mutation(
    UserMutation,
    graphene.ObjectType
):
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)