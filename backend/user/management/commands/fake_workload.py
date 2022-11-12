from django.core.management.base import BaseCommand, CommandParser
from user.models import Designation, Track, Workload
from random import randint

class Command(BaseCommand):
    help = 'Creates Fake workload Data'
    
    def handle(self, *args, **options):
        Designation.populate()
        Track.populate()
        designations = Designation.objects.all()
        tracks = Track.objects.all()

        for designation in designations:
            for track in tracks:
                try:
                    Workload.objects.get(track=track, designation=designation)
                    continue
                except Workload.DoesNotExist:
                    Workload.objects.create(
                        track=track, 
                        designation=designation, 
                        min_hours_per_week=randint(2, 5),
                        max_hours_per_week=randint(5, 8)
                        )
