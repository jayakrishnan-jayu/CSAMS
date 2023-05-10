import graphene
from backend.api import APIException
from backend.api.decorator import login_required, resolve_user, staff_privilege_required
from preference.models import Config, Identifier
from course.graphql.types.course import IdentifierInput
from course.models import Batch
from django.db.models import F

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


class ReleaseCoursesForFaculty(graphene.Mutation):
    class Arguments:
        identifier = graphene.Argument(IdentifierInput, required=True)
    response = graphene.Boolean()
    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, identifier: IdentifierInput):
        config = Config.objects.first()
        i: Identifier = config.current_preference_sem
        if i.year != identifier.year or i.is_even_sem != identifier.is_even_sem:
            raise APIException(message="Identifier Passed is not current Identifier")
        if i.are_courses_verified:
            raise APIException(message="Courses are already released for faculties")
        batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not identifier.is_even_sem , sem_year=identifier.year)
        for b in batches:
            selected_courses = b.selected_extra_courses.all() 
            batch_curriculum_extras = b.extras
            selected_courses_count = len(selected_courses)
            batch_extra_courses_count = 0
            for bce in batch_curriculum_extras:
                batch_extra_courses_count += bce.count
            if batch_extra_courses_count - selected_courses_count != 0:
                raise APIException(message=f"Extra Courses left to be assigned for {b.year} {b.curriculum.program.name} batch")
        i.are_courses_verified = True
        i.save()
        return ReleaseCoursesForFaculty(response=True)

class UpdateDeadline(graphene.Mutation):
    class Arguments:
        identifier = graphene.Argument(IdentifierInput, required=True)
        start_timestamp = graphene.DateTime(required=True)
        end_timestamp = graphene.DateTime(required=True)
    response = graphene.Boolean()

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, identifier: IdentifierInput, start_timestamp: graphene.DateTime, end_timestamp: graphene.DateTime):
        config = Config.objects.first()
        i: Identifier = config.current_preference_sem
        if i.year != identifier.year or i.is_even_sem != identifier.is_even_sem:
            raise APIException(message="Identifier Passed is not current Identifier")
        i.start_timestamp = start_timestamp
        i.end_timestamp = end_timestamp
        i.save()
        return UpdateDeadline(response=True)

class ConfigMutation(graphene.ObjectType):
    update_preference_count = UpdatePreferenceCount.Field()
    update_sem_identifier = UpdateSemIdentifier.Field()
    release_courses_for_faculty = ReleaseCoursesForFaculty.Field()
    update_deadline = UpdateDeadline.Field()
    


__all__ = [
    'ConfigMutation'
]