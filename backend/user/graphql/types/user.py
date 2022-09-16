import graphene

class PersonalProfile(graphene.ObjectType):
    email = graphene.String()

__all__ = [
    'PersonalProfile'
]