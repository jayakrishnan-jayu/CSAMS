import graphene


from django.contrib.auth import get_user_model

from user.graphql.types.user import UserType
from graphql_jwt.decorators import login_required
class UserQueries(graphene.ObjectType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)
    
    
    @login_required
    def resolve_users(self, info):
        return get_user_model().objects.all()
    
    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication Failure!')
        return user

__all__ = [
    'UserQueries'
]