import graphene


from django.contrib.auth import get_user_model

from user.graphql.types.user import UserType, FacultyType
from backend.api import APIException
from user.models import Faculty
from backend.api.decorator import login_required, resolve_user

class UserQueries(graphene.ObjectType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)
    faculty = graphene.Field(FacultyType,faculty_id=graphene.ID(description= "Id of the faculty"))
    faculties = graphene.Field(FacultyType)
    
    
    @login_required
    def resolve_users(self, info):
        return get_user_model().objects.all()
    
    @login_required
    @resolve_user
    def resolve_me(self, info):
        user = info.context.resolved_user
        if user.is_anonymous:
            raise Exception('Authentication Failure!')
        return user
    
    @login_required
    def resolve_faculty(self, info, faculty_id:int=None):
        if id is not None:
            try:
                faculty = Faculty.objects.get(user_id = faculty_id)
            except Faculty.DoesNotExist:
                raise APIException("Faculty object not found")
        return faculty

    @login_required
    def resolve_faculties(self,info):
        faculties = Faculty.objects


    # @login_required
    # @resolve_user
    # def resolve_faculty(self, info):
    #     user = info.context.resolved_user
    #     try:
    #         faculty = Faculty.objects.get(user_id = user.id)
    #     except Faculty.DoesNotExist:
    #         raise APIException("Faculty object not found")
    #     return faculty
        


__all__ = [
    'UserQueries'
]