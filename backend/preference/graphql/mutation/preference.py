import graphene
from backend.api import APIException
from backend.api.decorator import login_required, resolve_user
from course.models import Course, Batch
from preference.models import Config, Preference
from user.models import Faculty

class AddPreference(graphene.Mutation):
    class Arguments:
        course_id = graphene.ID(required=True)
        weightage = graphene.Int(required=True)
        experience = graphene.Int(required=True)
    response = graphene.Boolean()

    @login_required
    @resolve_user
    def mutate(self, info, course_id: int, weightage: int, experience: int):
        config: Config = Config.objects.first()
        pref_count = config.preference_count
        identifier = config.current_preference_sem

        user = info.context.resolved_user
        try:
            faculty = Faculty.objects.get(user=user)
        except Faculty.DoesNotExist:
            raise APIException(message="User is not a faculty", code="PERMISSION_DENIED")

        if weightage < 1 or weightage > pref_count:
            raise APIException(message="Invalid Weightage", code="INVALID_ARGUMENT")
        if experience < 0:
            raise APIException(message="Invalid Experience", code="INVALID_ARGUMENT")
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            raise APIException(message="Invalid course ID", code="INVALID_ARGUMENT")
        batch: Batch = course.batch
        print(config.current_preference_sem)
        
        is_same_sem = batch.sem%2 != config.current_preference_sem.is_even_sem
        is_same_sem_year = batch.year + int((batch.sem-1)/2) == config.current_preference_sem.year

        if not is_same_sem or not is_same_sem_year:
            raise APIException(message="Invalid course", code="INVALID_ARGUMENT")


        preferences = Preference.objects.filter(preference_sem_identifier=identifier, faculty=faculty)
        if preferences.count() >= pref_count:
            raise APIException(message="Maximum allowed preferences saved", code="MAX_PREF_COUNT_REACHED")
        if preferences.filter(course=course).exists():
            raise APIException(message="Preference already given to course", code="COURSE_PREFERENCE_EXISTS")
        if preferences.filter(weigtage=weightage).exists():
            raise APIException(message="Preference weightage already", code="COURSE_PREFERENCE_WEIGHTAGE_EXISTS")
        Preference.objects.create(preference_sem_identifier=identifier, faculty=faculty, course=course, weigtage=weightage, experience=experience)

        return AddPreference(response=True)

class PrefMutation(graphene.ObjectType):
    add_preference = AddPreference.Field()
    

__all__ = [
    'PrefeMutation'
]