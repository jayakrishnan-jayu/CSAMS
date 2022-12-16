from django.core.management.base import BaseCommand
from course.models import Course, Curriculum, CourseLab, Batch, Program, CurriculumExtras
from datetime import datetime
from random import randint
import json

class Command(BaseCommand):
    help = 'Creates fake program data'
    
    def handle(self, *args, **options):
        create_fake_courses()


def create_fake_courses():
    files = ['BCA2018', 'MCA2018']
    for file in files:
        with open(f'course/management/commands/{file}.json', 'r') as courseFile:
            output = json.load(courseFile)
            program = Program.objects.get(name=output['course'])
            year = int(output['year'])
            curriculum, new = Curriculum.objects.get_or_create(program=program, year=year)
            semsters = output['semsters']
            for sem in semsters:
                batch, new = Batch.objects.get_or_create(curriculum=curriculum, year=year, sem=int(sem))
                courses = [Course.objects.get_or_create(code=c['code'], name=c['name'], batch=batch, l=c['L'], t=c['T'], p=c['P'], credit=c['C'], hours=0)[0] for c in semsters[sem]['courses']]
                labs = [c for c in courses if 'Lab' in c.name]
                for lab in labs:
                    c_name = lab.name.split(' Lab')[0]
                    qs = Course.objects.filter(name=c_name)
                    if qs.count() == 1:
                        CourseLab.objects.get_or_create(course=qs.first(), lab=lab)
                
                extras = semsters[sem]["extra"]
                extraCourses = []
                for extra in extras:
                    is_elective = extra.lower().__contains__('elective')
                    course_type, new = CurriculumExtras.objects.get_or_create(curriculum=curriculum, name=extra)
                    batch.add_extra(course_type)
                    extraCourses += [Course.objects.get_or_create(code=ec['code'].strip(),name=ec['name'], l=ec['L'], t=ec['T'], p=ec['P'], credit=ec['C'], hours=0, is_extra=True, course_type=course_type, is_elective=is_elective)[0] for ec in output['extra'][extra] ]
                
                # Randomly Assign Extra Courses to Batch Courses
                for bce in batch.extras:
                    ce = bce.extra
                    batch = bce.batch
                    for _ in range(bce.count):
                        qs = Course.objects.filter(course_type=ce)
                        while True:
                            extra_course = qs[randint(0, qs.count()-1)]
                            if extra_course.is_selected:
                                continue
                            extra_course.batch = batch 
                            extra_course.save()
                            print(extra_course)
                            break
                batch.save()
                


            # labs = []
            # for s in output.keys():
            #     courses = output[s]
            #     sem = int(s.split('SEMESTER ')[1])
            #     year = datetime.now().year
            #     batch, new = Batch.objects.get_or_create(program=bca, sem=sem, year=year)
            #     for c in courses:
            #         identifier, ok = CourseIdentifer.objects.get_or_create(code=c['code'], name=c['name'])
            #         course, ok = Course.objects.get_or_create(
            #             batch = batch,
            #             identifier = identifier,
            #             l = int(c['L']),
            #             t = int(c['T']),
            #             p = int(c['P']),
            #             credit = int(c['Cr']),
            #             hours = 0,
            #         )
            #         if 'Lab' in identifier.name:
            #             labs.append(course)
            # for lab in labs:
            #     c_name = lab.identifier.name.split(' Lab')[0]
            #     qs = Course.objects.filter(identifier__name=c_name)
            #     if qs.count() == 1:
            #         CourseLab.objects.get_or_create(course=qs.first(), lab=lab)
            # print('Done')