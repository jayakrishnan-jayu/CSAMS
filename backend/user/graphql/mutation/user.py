import graphene
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType

from backend.api.APIException import APIException
from ..types.user import WorkloadType
from user.models import Track, Designation, Workload
from backend.api.decorator import login_required, resolve_user, staff_privilege_required


class UpdateWorkload(graphene.Mutation):
    workload = graphene.Field(WorkloadType)
    class Arguments:
        track = graphene.String(required=True)
        designation = graphene.String(required=True)
        min_hours_per_week = graphene.Int(required=True)
        max_hours_per_week = graphene.Int(required=True)
    
    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, track, designation, min_hours_per_week, max_hours_per_week):
        if not track in Track.CHOICES.values():
            raise APIException(message='Invalid Track String', code='INVALID_TRACK_INPUT')
        track_code = next(key for key, val in Track.CHOICES.items() if val == track)
        if not designation in Designation.CHOICES.values():
            raise APIException(message='Invalid Track String', code='INVALID_TRACK_INPUT')
        designation_code = next(key for key, val in Designation.CHOICES.items() if val == designation)

        if min_hours_per_week < 0 or max_hours_per_week < 0 or min_hours_per_week >= 168 or max_hours_per_week >= 168 or min_hours_per_week > max_hours_per_week or max_hours_per_week == 0:
            raise APIException(message='Invalid hours', code='INVALID_HOURS_INPUT')
        try:
            workload = Workload.objects.get(track__name=track_code, designation__name=designation_code)
        except Workload.DoesNotExist:
            raise APIException(message='Workload instance not found', code='WORKLOAD_NOT_FOUND')
        workload.max_hours_per_week = max_hours_per_week
        workload.min_hours_per_week = min_hours_per_week
        workload.save()
        return UpdateWorkload(workload=workload)

class UserMutation(graphene.ObjectType):
    update_workload = UpdateWorkload.Field()

__all__ = [
    'UserMutation'
]