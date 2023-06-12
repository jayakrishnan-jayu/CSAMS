import graphene
from allocation.graphql.types.allocation import AllocationBatchType
from backend.api import APIException
from backend.api.decorator import login_required, resolve_user
from course.models import Course, Batch
from preference.graphql.types.preference import CourseAllocationPreferenceType
from preference.models import Config, Preference, Identifier
from user.models import Faculty
from django.utils import timezone

class PrefernceMutationResponse(graphene.ObjectType):
    preferences = graphene.List(CourseAllocationPreferenceType)

class AddPreference(graphene.Mutation):
    class Arguments:
        course_id = graphene.ID(required=True)
        weightage = graphene.Int(required=True)
        experience = graphene.Int(required=True)
    response = graphene.Field(PrefernceMutationResponse)

    @login_required
    @resolve_user
    def mutate(self, info, course_id: int, weightage: int, experience: int):
        config: Config = Config.objects.first()
        pref_count = config.preference_count
        identifier: Identifier = config.current_preference_sem

        user = info.context.resolved_user
        try:
            faculty = Faculty.objects.get(user=user)
        except Faculty.DoesNotExist:
            raise APIException(message="User is not a faculty", code="PERMISSION_DENIED")
        now = timezone.now()
        if not identifier.are_courses_verified:
            raise APIException(message="Courses are not yet verified")
        if identifier.start_timestamp is None:
            raise APIException(message="Deadline has not yet been set")
        if identifier.start_timestamp > now:
            raise APIException(message="Deadline has not yet started")
        if identifier.end_timestamp < now:
            raise APIException(message="Late submission is not allowed")
        if weightage < 1 or weightage > pref_count:
            raise APIException(message="Invalid Weightage", code="INVALID_ARGUMENT")
        if experience < 0:
            raise APIException(message="Invalid Experience", code="INVALID_ARGUMENT")
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            raise APIException(message="Invalid course ID", code="INVALID_ARGUMENT")
        batch: Batch = course.batch
        
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

        preferences = Preference.objects.filter(preference_sem_identifier=identifier)


        return AddPreference(response=PrefernceMutationResponse(preferences=preferences))

class UpdatePreference(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        weightage = graphene.Int(required=False)
        experience = graphene.Int(required=False)
    response = graphene.Field(PrefernceMutationResponse)

    @login_required
    @resolve_user
    def mutate(self, info, id: int, weightage: int = None, experience: int = None):
        if weightage is None and experience is None:
            raise APIException(message="Weightage or Experience required to update")
        config: Config = Config.objects.first()
        pref_count = config.preference_count
        identifier: Identifier = config.current_preference_sem
        user = info.context.resolved_user
        try:
            faculty = Faculty.objects.get(user=user)
        except Faculty.DoesNotExist:
            raise APIException(message="User is not a faculty", code="PERMISSION_DENIED")
        now = timezone.now()
        
        if not identifier.are_courses_verified:
            raise APIException(message="Courses are not yet verified")
        if identifier.start_timestamp is None:
            raise APIException(message="Deadline has not yet been set")
        if identifier.start_timestamp > now:
            raise APIException(message="Deadline has not yet started")
        if identifier.end_timestamp < now:
            raise APIException(message="Late submission is not allowed")
        
        if weightage is not None and weightage < 1 or weightage > pref_count:
            raise APIException(message="Invalid Weightage", code="INVALID_ARGUMENT")
        if experience is not None and experience < 0:
            raise APIException(message="Invalid Experience", code="INVALID_ARGUMENT")
        
        qs = Preference.objects.filter(faculty=faculty, preference_sem_identifier=identifier)
        try:
            preference = qs.get(id=id)
        except Preference.DoesNotExist:
            raise APIException(message="Invalid preference ID", code="INVALID_ARGUMENT")
        
        if weightage is not None:
            if qs.exclude(id=id).filter(weigtage=weightage).exists():
                raise APIException(message="Weightage already exists for another coures preference")
            preference.weigtage = weightage
        if experience is not None:
            preference.experience = experience
        
        preference.save()
        preferences = Preference.objects.filter(preference_sem_identifier=identifier)
        return UpdatePreference(response=PrefernceMutationResponse(preferences=preferences))
    
class DeletePreference(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    response = graphene.Field(PrefernceMutationResponse)

    @login_required
    @resolve_user
    def mutate(self, info, id: int):
        config: Config = Config.objects.first()
        pref_count = config.preference_count
        identifier: Identifier = config.current_preference_sem

        user = info.context.resolved_user
        try:
            faculty = Faculty.objects.get(user=user)
        except Faculty.DoesNotExist:
            raise APIException(message="User is not a faculty", code="PERMISSION_DENIED")
        now = timezone.now()
        
        if not identifier.are_courses_verified:
            raise APIException(message="Courses are not yet verified")
        if identifier.start_timestamp is None:
            raise APIException(message="Deadline has not yet been set")
        if identifier.start_timestamp > now:
            raise APIException(message="Deadline has not yet started")
        if identifier.end_timestamp < now:
            raise APIException(message="Late submission is not allowed")
        
        try:
            preference = Preference.objects.get(id=id, faculty=faculty)
        except Preference.DoesNotExist:
            raise APIException(message="Invalid preference ID", code="INVALID_ARGUMENT")
        preference.delete()
        preferences = Preference.objects.filter(preference_sem_identifier=identifier)
        return DeletePreference(response=PrefernceMutationResponse(preferences=preferences))

class PrefMutation(graphene.ObjectType):
    add_preference = AddPreference.Field()
    update_preference = UpdatePreference.Field()
    delete_preference = DeletePreference.Field()
    

__all__ = [
    'PrefeMutation'
]