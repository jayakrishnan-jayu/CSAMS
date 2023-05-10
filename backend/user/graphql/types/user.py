import graphene
from backend.api import APIException

from user.models import User, Faculty
from preference.models import Config, Identifier

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

class WorkloadType(graphene.ObjectType):
    track = graphene.String()
    designation = graphene.String()
    min_hours_per_week = graphene.Int()
    max_hours_per_week = graphene.Int()

class IdentiferType(graphene.ObjectType):
    year = graphene.Int()
    is_even_sem = graphene.Boolean()
    start_timestamp = graphene.DateTime()
    end_timestamp = graphene.DateTime()
    is_paused = graphene.Boolean()
    are_courses_verified = graphene.Boolean()

class ConfigType(graphene.ObjectType):
    preference_count = graphene.Int()
    current_preference_sem = graphene.Field(IdentiferType)

class MetaDataType(graphene.ObjectType):
    user = graphene.Field(UserType)
    faculty = graphene.Field(FacultyType)
    config = graphene.Field(ConfigType)

    def resolve_user(self, info):
        if not isinstance(self, User):
            raise APIException(message="User not found", code="USER_NOT_FOUND")
        return self
    
    def resolve_faculty(self, info):
        if not isinstance(self, User):
            raise APIException(message="User not found", code="USER_NOT_FOUND")
        try:
            faculty = Faculty.objects.get(user=self)
        except Faculty.DoesNotExist:
            faculty = None
        return faculty
    
    def resolve_config(self, info):
        if not isinstance(self, User):
            raise APIException(message="User not found", code="USER_NOT_FOUND")
        return Config.objects.first()

__all__ = [
    'UserType',
    'FacultyType',
    'MetaDataType',
    'ConfigType',
]