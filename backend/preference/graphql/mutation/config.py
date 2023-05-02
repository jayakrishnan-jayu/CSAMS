import graphene
from backend.api import APIException
from backend.api.decorator import login_required, resolve_user, staff_privilege_required
from preference.models import Config, Identifier

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
        year = graphene.Int(required=True)
        is_even_sem = graphene.Boolean(required=True)
    response = graphene.Boolean()
    
    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, year: int = None, is_even_sem:bool=None):
        if year is None and is_even_sem is None:
            raise APIException(message="year or is_even_sem required to update sem identifier", code="INVALID_ARGUMENTS")
        config = Config.objects.first()
        if config.current_preference_sem.is_even_sem == is_even_sem and config.current_preference_sem.year == year:
            raise APIException("No change detected", code="INVALID_ARGUMENT")
        
        
        identifier, new = Identifier.objects.get_or_create(year= year, is_even_sem = is_even_sem)
        config.current_preference_sem = identifier
        config.save()
        return UpdateSemIdentifier(response=True)

class ConfigMutation(graphene.ObjectType):
    update_preference_count = UpdatePreferenceCount.Field()
    update_sem_identifier = UpdateSemIdentifier.Field()
    


__all__ = [
    'ConfigMutation'
]