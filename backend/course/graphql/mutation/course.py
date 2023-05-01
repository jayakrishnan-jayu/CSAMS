
from django.forms import ValidationError
import graphene
from django.db import transaction

from .type import CurriculumUploadInput, SemesterInput, CourseInput, ExtraInput, CourseLabMapInput
from course.graphql.types.course import CurriculumUploadType
from backend.api.decorator import login_required, resolve_user, staff_privilege_required
from backend.api import APIException
from course.models import CurriculumUpload, Program, Curriculum, Batch, Course, CurriculumExtras, ExtraCourse, CourseLab
from typing import List

class VerifyCurriculumUpload(graphene.Mutation):
    class Arguments:
        curriculumUploadID = graphene.ID(required=True)

    response = graphene.Field(graphene.Boolean())

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, curriculumUploadID: graphene.ID):
        try:
            c : CurriculumUpload = CurriculumUpload.objects.get(id=curriculumUploadID)
        except CurriculumUpload.DoesNotExist:
            raise APIException(message="Invalid Argument, Curriculum Upload Does not exist")
        
        if c.is_populated or Curriculum.objects.filter(program=c.program, year=c.year).exists():
            raise APIException(message="Curriculum already uploaded", code="CURRICULUM_EXISTS")
        

        semesters_data = c.data['semesters']
        curriculum_extras = c.data['extra']

        try:
            with transaction.atomic():
                curriculum = Curriculum.objects.create(program=c.program, year=c.year)
                c_extras:List[CurriculumExtras] = []
                for e in curriculum_extras:
                    is_elective = e['isElective']
                    ce = CurriculumExtras.objects.create(curriculum=curriculum, name=e['name'])
                    c_extras.append(ce)
                    for ec in e['courses']:
                        ExtraCourse.objects.create(code=ec['code'].strip(),name=ec['name'], l=ec['L'], t=ec['T'], p=ec['P'], credit=ec['C'], hours=0, course_type=ce, is_elective=is_elective)
                

                for year_index in range(c.program.year):
                    for sem_index in range(1, (c.program.year*2)+1):
                        for sem in semesters_data:
                            if sem['sem'] == sem_index:
                                break
                        if sem['sem'] != sem_index:
                            raise APIException("Invalid Curriculum Data")

                        batch = Batch.objects.create(curriculum=curriculum, year=year_index+c.year, sem=int(sem['sem']))
                        courses = {}
                        for cr in sem['courses']:
                            courses[cr['code']] = Course.objects.create(code=cr['code'], name=cr['name'], batch=batch, l=cr['L'], t=cr['T'], p=cr['P'], credit=cr['C'], hours=0)
                        for cl in sem['courseLabs']:
                            CourseLab.objects.create(course=courses[cl['courseCode']], lab=courses[cl['labCode']])

                        sem_extras = sem['extra']
                        for extra in sem_extras:
                            for c_extra in c_extras:
                                c_extra:CurriculumExtras = c_extra
                                if extra == c_extra.name:
                                    batch.add_extra(c_extra)
                                    continue
                c.is_populated = True
                c.save()                              
                        #     CurriculumExtras.objects.create(curriculum=curriculum, name=)


        except Exception as e:
            raise APIException(message=e)
        return VerifyCurriculumUpload(response=True)


class DeleteCurriculumUpload(graphene.Mutation):
    class Arguments:
        curriculumUploadID = graphene.ID(required=True)
    response = graphene.Field(graphene.Boolean())

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, curriculumUploadID: graphene.ID):
        try:
            c : CurriculumUpload = CurriculumUpload.objects.get(id=curriculumUploadID)
        except CurriculumUpload.DoesNotExist:
            raise APIException(message="Invalid Argument, Curriculum Upload Does not exist")
        if c.is_populated:
            raise APIException(message="Curriculum is already populated, cannot delete verified curriculum")
        c.delete()
        return DeleteCurriculumUpload(response=True)
    
class UploadCurriculum(graphene.Mutation):
    class Arguments:
        data = graphene.Argument(CurriculumUploadInput, required=True)
    
    # uploaded_curriculum = CurriculumUploadType
    response = graphene.Field(CurriculumUploadType)
    
    @staticmethod
    def _check_course(course: CourseInput):
        course['code'] = course['code'].strip()
        course['name'] = course['name'].strip()
        assert course['code'] and len(course['code']) >= 5 and len(course['code']) <=9, "Invalid course code" # TODO: find out the minimum length of course code and max
        assert course['name'] and len(course['name']) >= 5, f"Course name short for {course['code']}"
        assert course['L'] >= 0, f"Invalid L for {course['code']}"
        assert course['T'] >= 0, f"Invalid T for {course['code']}"
        assert course['P'] >= 0, f"Invalid P for {course['code']}"
        assert course['C'] >= 0, f"Invalid Credit for {course['code']}"

    @staticmethod
    def _check_extra(extra: ExtraInput):
        extra['name'] = extra['name'].strip()
        assert extra['name'] and len(extra['name']) >= 3, f"Extra Courses Name short {extra['name']}"
        assert extra['courses'] and len(extra['courses']) >0, f"Extra Courses not found for {extra['name']}"
        for c in extra['courses']:
            assert isinstance(c, CourseInput), f"Invalid Course type for extra {extra['name']}"
            UploadCurriculum._check_course(c)

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, data: CurriculumUploadInput):
        try:
            assert data['program'], "Program name is required"
            assert data['year'], "Academic year is required"
            assert data['semesters'] and len(data['semesters']) > 0, "At least one semester is required"
            assert Program.objects.filter(name=data['program']).exists(), "Program not found"
            assert not CurriculumUpload.objects.filter(program__name=data['program'], year=data['year']).exists(), "Curriculum Data already uploaded"
            program = Program.objects.get(name=data['program'])
            qs = Curriculum.objects.filter(program__name=data['program']).order_by('year')
            if qs.exists():
                assert not qs.filter(year=data['year']).exists(), "Curriculum already Exists"
                c = qs.last()
                expected_year = c.year + c.program.year
                assert expected_year == data['year'], f"Expected program year {expected_year}"
            new_curriculum = Curriculum(program=program, year= data['year'])
            new_curriculum.full_clean()
            sem_nums = [] # to store sem_numbers [1,2,3..] TODO: check for highest semester possible
            extras = []
            for s in data['semesters']:
                assert isinstance(s, SemesterInput), "Invalid Semester"
                assert s['sem'] > 0, "Invalid semester number"
                sem_nums.append(s.sem)
                courseCodes = {}
                if s['extra'] is not None:
                    for extra in s['extra']:
                        extra = extra.strip()
                        assert isinstance(extra, str), f"Invalid type for extra in semester S{s.sem}"
                        extras.append(extra)
                assert s['courses'] and len(s['courses']) > 0, f"Courses not found in semester S{s.sem}"
                for course in s['courses']:
                    assert isinstance(course, CourseInput), f"Invalid Course type found in S{s.sem}"
                    courseCodes[course['code']] = True
                    UploadCurriculum._check_course(course)
                if s['courseLabs'] is not None:
                    for cl in s['courseLabs']:
                        assert 'courseCode' in cl and 'labCode' in cl, 'invalid course/lab code'
                        assert cl['labCode'][-2] == '8', "invalid lab component"
                        assert cl['courseCode'][-2] != '8', "invalid course component"
                        assert cl['labCode'] in courseCodes, "Course/Lab component not found in semester courses"
                        assert cl['courseCode'] in courseCodes, "Course/Lab component not found in semester courses"
            
            if len(extras)>0:
                unique_extras = list(set(extras))
                assert len(unique_extras) == len(data['extra']), "Extra courses mismatch"
                existing_extra_names = []
                for ext in data['extra']:
                    UploadCurriculum._check_extra(ext)
                    existing_extra_names.append(ext['name'])
                assert len(existing_extra_names) == len(unique_extras), "Extra courses length mismatch"
                assert (sorted(existing_extra_names) == sorted(unique_extras)), "Extra courses mismatch"
            
            assert (sorted(sem_nums) == sorted(list(set(sem_nums)))), "Duplicate Semester Numbering found"
            assert max(sem_nums) <= 20, "Unusually high semester number found" # TODO: Find out maximum semester numbering
            assert len(sem_nums) == max(sem_nums), f"Semester number higher than {len(sem_nums)} found"
            assert sem_nums == [i for i in range(1, len(sem_nums)+1)], "Invalid semester numbering"

            upload = CurriculumUpload.objects.create(program=program, year=data['year'], data=data)

                    # assert course.__class__
                # assert Curriculum.objects.filter(program__name=data.program).order_by('year').last()
        except AssertionError as e:
            raise ValidationError(str(e))
        return UploadCurriculum(response=upload)

class CourseMutation(graphene.ObjectType):
    upload_curriculum = UploadCurriculum.Field()
    delete_curriculum_upload = DeleteCurriculumUpload.Field()
    verify_curriculum_upload = VerifyCurriculumUpload.Field()

__all__ = [
    'CourseMutation'
]