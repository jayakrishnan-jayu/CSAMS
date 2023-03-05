import graphene

class UserType(graphene.ObjectType):
    id = graphene.ID()
    email = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()
    username = graphene.String()
    is_staff = graphene.Boolean()
    is_active = graphene.Boolean()


class FacultyType(graphene.ObjectType):
    user = graphene.Field(UserType)
    track = graphene.String()
    designation = graphene.String()


__all__ = [
    'UserType',
    'FacultyType'
]