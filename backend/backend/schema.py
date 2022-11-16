import graphene
import graphql_jwt
from user.graphql import UserQueries, UserMutation
from course.graphql import CourseQueries

class Query(
    UserQueries,
    CourseQueries,
    graphene.ObjectType
    ):
    hello = graphene.String(default_value="Hi!")

class Mutation(
    UserMutation,
    graphene.ObjectType
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)