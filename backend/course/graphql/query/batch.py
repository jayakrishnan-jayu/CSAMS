import graphene

from preference.models import Config
from ..types.course import ProgramType, CurriculumType,BatchType, BatchInfoType, CurriculumUploadType, BatchManagementType, IdentifierInput
from course.models import Batch, Program, Curriculum, CurriculumUpload
from backend.api import APIException
from backend.api.decorator import login_required, resolve_user, staff_privilege_required
from django.db.models import F

class BatchQueries(graphene.ObjectType):
    programs = graphene.List(
        ProgramType
    )
    curriculums = graphene.List(
        CurriculumType,
        program=graphene.String(description="Department Program eg BCA"),
        year=graphene.Int(description="Year of Curriculum"),
    )
    curriculum_upload = graphene.Field(
        CurriculumUploadType,
        program=graphene.String(description="Department Program eg BCA", required=True),
        year=graphene.Int(description="Year of Curriculum", required=True),
    )
    curriculum_uploads = graphene.List(
        CurriculumUploadType
    )
 
    verify_new_curriculum = graphene.List(
        BatchType,
        program=graphene.String(description="Department Program eg BCA", required=True),
        year=graphene.Int(description="Year of Curriculum", required=True),
    )
    batch = graphene.Field(
        BatchType,
        batch_id=graphene.ID(required=True)
    )
    batches = graphene.List(
        BatchType,
        identifier=graphene.Argument(IdentifierInput, required=False)
    )
    batch_info = graphene.Field(
        BatchInfoType,
        program=graphene.String(description="Department Program eg BCA"),
    )

    batch_management = graphene.Field(
        BatchManagementType
    )

    @login_required
    @resolve_user
    def resolve_programs(self, info):
        programs = Program.objects.all()
        if not programs.exists():
            raise APIException('Programs not found', 'PROGRAMS_NOT_FOUND')
        return programs
    
    @login_required
    @resolve_user
    def resolve_curriculums(self, info, program:str=None, year:int=None):
        curriculums = Curriculum.objects.all()
        if year is not None:
            curriculums = curriculums.filter(year=year)
        if program is not None:
            try:
                p = Program.objects.get(name=program)
                curriculums = curriculums.filter(program=p)
            except Program.DoesNotExist:
                raise APIException('Program not found', code='PROGRAM_NOT_FOUND')
        
        if not curriculums.exists():
            raise APIException('Curriculums not found', 'CURRICULUM_NOT_FOUND')
        return curriculums
    
    @login_required
    @resolve_user
    def resolve_batch(self, info, batch_id:int):
        try:
            batch = Batch.objects.get(id=batch_id)
        except Batch.DoesNotExist:
            raise APIException('Batch not found', 'BATCH_NOT_FOUND')
        return batch
    
    @login_required
    @resolve_user
    def resolve_batches(self, info, identifier:IdentifierInput = None):
        if identifier is None:
            identifier = Config.objects.first().current_preference_sem
        batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not identifier.is_even_sem , sem_year=identifier.year)
        return batches
    
    @login_required
    @resolve_user
    def resolve_batch_info(self, info, program:str):
        try:
            p = Program.objects.get(name=program)
            return p
        except Program.DoesNotExist:
            raise APIException('Program not found', code='PROGRAM_NOT_FOUND')

    @login_required
    @resolve_user
    @staff_privilege_required
    def resolve_verify_new_curriculum(self, info, program:str, year:int):
        try:
            p = Program.objects.get(name=program)
        except Program.DoesNotExist:
            raise APIException('Program not found', code='PROGRAM_NOT_FOUND')
        
        c = Curriculum.objects.filter(program=p).order_by('year')
        if not c.exists():
            result = []
            for yr in range(year, year+p.year):
                for sem in range(p.year*2):
                    result.append(BatchType(curriculum=CurriculumType(program=p, year=year, duration=p.year), year=yr, sem=sem+1))
            return result
        lc = c.last()
        expected_year = lc.year + lc.program.year
        if expected_year != year:
            raise APIException(f'Invalid Curriculum Year, expected year: {lc.year + lc.program.year}', code='INVALID_YEAR')
        result = []
        for yr in range(expected_year, expected_year+lc.program.year):
            for sem in range(lc.program.year*2):
                result.append(BatchType(curriculum=CurriculumType(program=p, year=expected_year, duration=lc.year), year=yr, sem=sem+1))
        return result

    @login_required
    @resolve_user
    @staff_privilege_required
    def resolve_curriculum_upload(self, info, program: str, year: int):
        try:
            c =  CurriculumUpload.objects.get(program__name=program, year=year)
        except CurriculumUpload.DoesNotExist:
            raise APIException(message="Curriculum Upload not found")
        return c

    @login_required
    @resolve_user
    @staff_privilege_required
    def resolve_curriculum_uploads(self, info):
        return CurriculumUpload.objects.all()
    
    @login_required
    @resolve_user
    @staff_privilege_required
    def resolve_batch_management(self, info):
        return {}