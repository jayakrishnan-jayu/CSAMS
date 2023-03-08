
import graphene

# from backend.api import APIException, resolve_user, staff_privilege_required
# from backend.api.decorator import login_required
from .type import CurriculumUploadInput

class UploadCurriculum(graphene.Mutation):
    curriculum = graphene.JSONString()
    class Arguments:
        data = graphene.Argument(CurriculumUploadInput, required=True)
    
    # @login_required
    # @resolve_user
    # @staff_privilege_required
    # TODO: WIP
    def mutate(self, info, data):
        print(data)
        return UploadCurriculum(curriculum={"key":123})

class CourseMutation(graphene.ObjectType):
    upload_curriculum = UploadCurriculum.Field()

__all__ = [
    'CourseMutation'
]