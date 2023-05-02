import graphene
from backend.api import APIException
from backend.api.decorator import login_required, resolve_user, staff_privilege_required
from preference.models import Config

class UpdatePreferenceCount(graphene.Mutation):
    class Arguments:
        count = graphene.Int(required=True)
    response = graphene.Boolean()

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, count: int):
        if count < 1:
            raise APIException(message="Invalid Count", code="INVALID_COUNT")
        config = Config.objects.first()
        config.preference_count = count
        config.save()
        return UpdatePreferenceCount(response=True)

class UpdateSemIdentifier(graphene.Mutation):
    class Arguments:
        year = graphene.Int()
        is_even_sem = graphene.Boolean()
    response = graphene.Boolean()
    
    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, year: int = None, is_even_sem:bool=None):
        if year is None and is_even_sem is None:
            raise APIException(message="year or is_even_sem required to update sem identifier", code="INVALID_ARGUMENTS")
        config = Config.objects.first()
        if year is not None:
            config.current_preference_sem.year = year
        if is_even_sem is not None:
            config.current_preference_sem.is_even_sem = is_even_sem
        config.current_preference_sem.save()
        return UpdateSemIdentifier(response=True)

class ConfigMutation(graphene.ObjectType):
    update_preference_count = UpdatePreferenceCount.Field()
    update_sem_identifier = UpdateSemIdentifier.Field()
    


__all__ = [
    'ConfigMutation'
]