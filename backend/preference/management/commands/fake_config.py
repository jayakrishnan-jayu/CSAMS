from django.core.management.base import BaseCommand
from preference.models import Config, Identifier
from datetime import datetime

class Command(BaseCommand):
    help = 'Creates fake program data'
    
    def handle(self, *args, **options):
        create_fake_config()

def create_fake_config():
    if not Config.objects.exists():
        print("Initializing config..")
        identifier, ok = Identifier.objects.get_or_create(
            year=datetime.now().year, 
            is_even_sem=datetime.now().month <= 6,
        )
        Config.objects.create(
            current_preference_sem=identifier,
        )
    print("done")