from django.core.management.base import BaseCommand, CommandParser
from preference.models import Config, Identifier
from user.models import Faculty
from course.models import Course, Batch
from preference.models import Preference
from random import randint
from django.db.models import Q, F

class Command(BaseCommand):
    help = 'Creates fake faculty preference'
    
    def handle(self, *args, **options):
        create_fake_preference()

def create_fake_preference():
    faculties = Faculty.objects.all()
    if faculties.count() < 10:
        print("More faculties required")
        return
    try:
        limit = Config.objects.get(id=1).preference_count
        identifier = Config.objects.get(id=1).current_preference_sem
    except Config.DoesNotExist:
        print("Department Config not set")
        return
    batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not identifier.is_even_sem, sem_year=identifier.year)
    courses = Course.objects.filter(batch__in=batches)

    for faculty in faculties:
        prefered_courses = [p.course.pk for p in Preference.objects.filter(faculty=faculty, preference_sem_identifier=identifier)]
        for _ in range(limit-len(prefered_courses)):
            index = randint(0, courses.count()-1)
            while (courses[index].pk in prefered_courses):
                index = randint(0, courses.count()-1)
            course = courses[index]
            prefered_courses.append(course.pk)
            p = Preference()
            p.faculty = faculty
            p.experience = randint(0,5)
            p.preference_sem_identifier = identifier
            p.course = course
            p.weigtage = len(prefered_courses)
            p.save()
    print("done")