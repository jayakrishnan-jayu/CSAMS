import graphene
from preference.models import Identifier, Preference, Config
from backend.api.decorator import login_required
from backend.api import APIException
from ..types.preference import PreferenceType, IdentfierInput


class PreferenceQueries(graphene.ObjectType):
    preferences = graphene.List(
        PreferenceType,
        identifier = graphene.Argument(IdentfierInput, required=False),
        course_id = graphene.ID(required=False)
    )

    @login_required
    def resolve_preferences(self, info, identifier: IdentfierInput = None, course_id: int = None):
        if Config.objects.first() is None:
            raise APIException("Identifier Not Set", code="IDENTIFIER_NOT_SET")
        i = Config.objects.first().current_preference_sem
        if identifier is not None:
            if identifier.year is None or identifier.is_even_sem is None:
                raise APIException("Invalid Identifier Argument", code="IDENTIFIER_INVALID")
            try:
                i = Identifier.objects.get(year=identifier.year, is_even_sem=identifier.is_even_sem)
            except Identifier.DoesNotExist:
                raise APIException("Invalid Identifier Argument", code="IDENTIFIER_INVALID")
        
        qs = Preference.objects.filter(preference_sem_identifier=i)
        if course_id is None:
            return qs
        return qs.filter(course=course_id)

__all__ = [
    'PreferenceQueries'
]