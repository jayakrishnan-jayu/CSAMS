import graphene
from chowkidar.graphql.decorators import resolve_user
from user.graphql.types.user import PersonalProfile

class UserQueries(graphene.ObjectType):
    me = graphene.Field(
        PersonalProfile,
        description="View your own profile"
    )

    @resolve_user
    def resolve_me(self, info, **kwargs):
        return info.context.user

__all__ = [
    'UserQueries'
]