from django.core.management.base import BaseCommand
from course.models import Course, CourseIdentifer, CourseLab, Batch, Program
from datetime import datetime
import json

class Command(BaseCommand):
    help = 'Creates fake program data'
    
    def handle(self, *args, **options):
        create_fake_courses()


def create_fake_courses():
    with open('course/management/commands/course.json', 'r') as courseFile:
        output = json.load(courseFile)
        bca = Program.objects.get(name='BCA')

        labs = []
        for s in output.keys():
            courses = output[s]
            sem = int(s.split('SEMESTER ')[1])
            year = datetime.now().year
            batch, new = Batch.objects.get_or_create(program=bca, sem=sem, year=year)
            for c in courses:
                identifier, ok = CourseIdentifer.objects.get_or_create(code=c['code'], name=c['name'])
                course, ok = Course.objects.get_or_create(
                    batch = batch,
                    identifier = identifier,
                    l = int(c['L']),
                    t = int(c['T']),
                    p = int(c['P']),
                    credit = int(c['Cr']),
                    hours = 0,
                )
                if 'Lab' in identifier.name:
                    labs.append(course)
        for lab in labs:
            c_name = lab.identifier.name.split(' Lab')[0]
            qs = Course.objects.filter(identifier__name=c_name)
            if qs.count() == 1:
                CourseLab.objects.get_or_create(course=qs.first(), lab=lab)
        print('Done')