from django.core.management.base import BaseCommand
from course.models import Course, Curriculum, CourseLab, Batch, Program, CurriculumExtras, ExtraCourse
from datetime import datetime
from random import randint
import json

class Command(BaseCommand):
    help = 'Creates fake program data'
    
    def handle(self, *args, **options):
        create_fake_courses()


def create_fake_courses():
    files = ['BCA2018', 'MCA2018']
    years = [3, 2]
    for file, course_year in zip(files, years):
        with open(f'course/management/commands/{file}.json', 'r') as courseFile:
            output = json.load(courseFile)
            program = Program.objects.get(name=output['course'])
            year = int(output['year'])
            curriculum, new = Curriculum.objects.get_or_create(program=program, year=year)
            semsters = output['semsters']
            for year_index in range(course_year):
                for sem in semsters:
                    batch, new = Batch.objects.get_or_create(curriculum=curriculum, year=year+year_index, sem=int(sem))
                    courses = [Course.objects.get_or_create(code=c['code'], name=c['name'], batch=batch, l=c['L'], t=c['T'], p=c['P'], credit=c['C'], hours=0)[0] for c in semsters[sem]['courses']]
                    labs = [c for c in courses if 'Lab' in c.name]
                    for lab in labs:
                        c_name = lab.name.split(' Lab')[0]
                        qs = Course.objects.filter(name=c_name, batch=batch)
                        if qs.count() == 1:
                            CourseLab.objects.get_or_create(course=qs.first(), lab=lab)
                    
                    extras = semsters[sem]["extra"]
                    extraCourses = []
                    for extra in extras:
                        is_elective = extra.lower().__contains__('elective')
                        course_type, new = CurriculumExtras.objects.get_or_create(curriculum=curriculum, name=extra)
                        batch.add_extra(course_type) 
                        for i in output['extra']:
                            if extra in i:
                                extraCourses += [ExtraCourse.objects.get_or_create(code=ec['code'].strip(),name=ec['name'], l=ec['L'], t=ec['T'], p=ec['P'], credit=ec['C'], hours=0, course_type=course_type, is_elective=is_elective)[0] for ec in i[extra]]
                                break
                    # Randomly Assign Extra Courses to Batch Courses
                    for bce in batch.extras:
                        ce = bce.extra
                        batch: Batch = bce.batch
                        qs = ExtraCourse.objects.filter(course_type=ce)
                        while True:
                            selected_ec = batch.selected_extra_courses.all()
                            if selected_ec.count() >= bce.count:
                                break
                            extra_course = qs[randint(0, qs.count()-1)]
                            if not selected_ec.filter(id=extra_course.id).exists():
                                batch.add_selected_extra_course(extra_course)
                    batch.save()
                    