import graphene
from user.graphql.types.user import PersonalProfile

class UserQueries(graphene.ObjectType):
    pass

__all__ = [
    'UserQueries'
]