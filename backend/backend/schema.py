import graphene
from user.graphql import UserQueries, UserMutation
from course.graphql import CourseQuery, CourseMutation
from preference.graphql import PreferenceQueries, PreferenceMutation
from allocation.graphql import AllocationQuery, AllocationMutation

class Query(
    UserQueries,
    CourseQuery,
    PreferenceQueries,
    AllocationQuery,    
    graphene.ObjectType
    ):
    hello = graphene.String(default_value="Hi!")

class Mutation(
    UserMutation,
    CourseMutation,
    PreferenceMutation,
    AllocationMutation,
    graphene.ObjectType
):
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)