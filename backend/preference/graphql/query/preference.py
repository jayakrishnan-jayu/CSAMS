import graphene
from allocation.models import CourseAllocation, LabAllocation
from course.models import Batch, Course, CourseLab
from preference.models import Identifier, Preference, Config
from backend.api.decorator import login_required, resolve_user
from backend.api import APIException
from user.models import Faculty
from ..types.preference import PreferenceType, IdentfierInput, PreferenceAllocationFacultyType, IdentifierType
from django.db.models import F


class PreferenceQueries(graphene.ObjectType):
    preferences = graphene.List(
        PreferenceType,
        identifier = graphene.Argument(IdentfierInput, required=False),
        course_id = graphene.ID(required=False),
        user_id = graphene.ID(required=False),
    )

    courses_for_preference = graphene.Field(
        PreferenceAllocationFacultyType
    )

    report_time_periods = graphene.List(
        IdentifierType
    )


    @login_required
    @resolve_user
    def resolve_courses_for_preference(self, info):
        if Config.objects.first() is None:
            raise APIException("Identifier Not Set", code="IDENTIFIER_NOT_SET")
        i = Config.objects.first().current_preference_sem
        
        faculties = Faculty.objects.filter(user__is_active=True)
        batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not i.is_even_sem, sem_year=i.year)
        courses = Course.objects.filter(batch__in=batches)
        preferences = Preference.objects.filter(preference_sem_identifier=i)


        for b in batches:
            b.course_labs = CourseLab.objects.filter(course__in=courses.filter(batch=b))
            b.course_ids = courses.filter(batch=b).values_list('id', flat=True)
            b.course_allocations = CourseAllocation.objects.filter(course__id__in=b.course_ids)
            b.lab_allocations = LabAllocation.objects.filter(course__id__in=b.course_ids)
        
        return PreferenceAllocationFacultyType(faculties=faculties, batches=batches, courses=courses, preferences=preferences)

    @login_required
    @resolve_user
    def resolve_preferences(self, info, identifier: IdentfierInput = None, course_id: int = None, user_id: int = None):
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
        if course_id is None and user_id is None:
            return qs
        if course_id is not None and user_id is not None:
            raise APIException("Provide only either course_id or user_id")
        if course_id is not None:
            return qs.filter(course=course_id)
        return qs.filter(faculty=user_id)

    @login_required
    @resolve_user
    def resolve_report_time_periods(self, info):
        return Identifier.objects.filter(is_hod_approved=True)

__all__ = [
    'PreferenceQueries'
]