import graphene
from chowkidar.graphql import AuthMutations, AuthQueries, RefreshTokenMutations
from user.graphql import UserQueries

class Query(
    AuthQueries,
    UserQueries,
    graphene.ObjectType
    ):
    hello = graphene.String(default_value="Hi!")

class Mutation(
    AuthMutations,
    RefreshTokenMutations,
    graphene.ObjectType
):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)