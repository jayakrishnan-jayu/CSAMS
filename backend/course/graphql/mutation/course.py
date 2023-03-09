
from django.forms import ValidationError
import graphene

from .type import CurriculumUploadInput, SemesterInput, CourseInput, ExtraInput
from course.graphql.types.course import CurriculumUploadType
from backend.api.decorator import login_required, resolve_user, staff_privilege_required
from course.models import CurriculumUpload, Program, Curriculum


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
                if s['extra'] is not None:
                    for extra in s['extra']:
                        extra = extra.strip()
                        assert isinstance(extra, str), f"Invalid type for extra in semester S{s.sem}"
                        extras.append(extra)
                assert s['courses'] and len(s['courses']) > 0, f"Courses not found in semester S{s.sem}"
                for course in s['courses']:
                    assert isinstance(course, CourseInput), f"Invalid Course type found in S{s.sem}"
                    UploadCurriculum._check_course(course)
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
        print(upload)
        return UploadCurriculum(response=upload)

class CourseMutation(graphene.ObjectType):
    upload_curriculum = UploadCurriculum.Field()

__all__ = [
    'CourseMutation'
]