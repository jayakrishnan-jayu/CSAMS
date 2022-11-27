from django.core.management.base import BaseCommand
from course.models import Program

class Command(BaseCommand):
    help = 'Creates fake program data'
    
    def handle(self, *args, **options):
        create_fake_programs()


def create_fake_programs():
    programs = Program.objects.all()
    assert programs.count() == 0, 'Programs already exists!'
    print('Creating Programs...')
    available_programs = [Program(name=p[0], year=p[1]) for p in [['BCA', 3], ['BCA DS', 3], ['MCA', 2]]]
    Program.objects.bulk_create(available_programs, ignore_conflicts=True)
    print('Done')
                    