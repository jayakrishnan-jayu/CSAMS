import graphene
from user.graphql import UserQueries

class Query(
    UserQueries,
    graphene.ObjectType
    ):
    hello = graphene.String(default_value="Hi!")


schema = graphene.Schema(query=Query)