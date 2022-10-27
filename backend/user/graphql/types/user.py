import graphene

class UserType(graphene.ObjectType):
    email = graphene.String()

    

__all__ = [
    'UserType'
]