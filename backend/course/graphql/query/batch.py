import graphene
from ..types.course import ProgramType, BatchType, BatchInfoType
from course.models import Batch, Program
from graphql_jwt.decorators import login_required
from backend.api import APIException

class BatchQueries(graphene.ObjectType):
    programs = graphene.List(
        ProgramType
    )
    batches = graphene.List(
        BatchType,
        program=graphene.String(description="Department Program eg BCA"),
        year=graphene.Int(description="Year of Batch"),
    )
    batch_info = graphene.Field(
        BatchInfoType,
        program=graphene.String(description="Department Program eg BCA"),
    )
    
    @login_required
    def resolve_programs(self, info):
        programs = Program.objects.all()
        if not programs.exists():
            raise APIException('Programs not found', 'PROGRAMS_NOT_FOUND')
        return programs
    

    @login_required
    def resolve_batches(self, info, program:str=None, year:int=None):
        if program is None and year is None:
            raise APIException('Required argument year or program missing', code='INVALID_INPUT')
        batches = Batch.objects.all()
        if not batches.exists():
            raise APIException('Batches not found', 'BATCHES_NOT_FOUND')
        if program is not None:
            try:
                p = Program.objects.get(name=program)
                batches.filter(program=p)
            except Program.DoesNotExist:
                raise APIException('Program not found', code='PROGRAM_NOT_FOUND')
        if year is not None:
            batches.filter(year=year)
        if not batches.exists():
            raise APIException('Batches not found', 'BATCHES_NOT_FOUND')
        return batches
    
    @login_required
    def resolve_batch_info(self, info, program:str):
        try:
            p = Program.objects.get(name=program)
            return p
        except Program.DoesNotExist:
                raise APIException('Program not found', code='PROGRAM_NOT_FOUND')
