from django.core.management.base import BaseCommand, CommandError, CommandParser
from faker.providers import DynamicProvider
from user.models import User, Faculty, Track, Designation
from datetime import datetime
from faker import Faker


class Command(BaseCommand):
    help = 'Creates fake faculty data'

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument('-n', type=int, default=0)
    
    def handle(self, *args, **options):
        n = options['n']
        create_fake_faculties(n)


def create_fake_faculties(n: int):
    designations = Designation.objects.all()
    tracks = Track.objects.all()

    assert designations.count() >= 3, 'Atleast 3 different Desgination are required to generate faculty data'
    assert tracks.count() >=3, 'Atleast 3 different Tracks are required to generate faculty data'

    if n > 0:
        faker = Faker()
        faker.seed_instance(datetime.now().timestamp())
        faculties = []
        print(f'Creating {n} Users')
        for _ in range(n):
            user = User()
            faculty = Faculty()
            first_name, last_name = faker.unique.name().split(' ')[-2:]
            user.email = f'{first_name.lower()}.{last_name.lower()}@am.amrita.edu'
            user.first_name = first_name
            user.last_name = last_name
            user.username = f'{first_name} {last_name}'
            user.save()
            faculty.user = user
            faculty.designation = designations[faker.random.randint(0, designations.count() - 1)]
            faculty.track = tracks[faker.random.randint(0, tracks.count() - 1)]
            faculties.append(faculty)
        Faculty.objects.bulk_create(faculties)
        print('Done')
                    