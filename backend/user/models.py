from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from preference.models import Identifier
from allocation.models import CourseAllocation, LabAllocation
from course.models import Course, Batch


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    username = models.CharField(max_length=30, unique=False)
    email = models.EmailField(('Email address'), unique=True)
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email

class Track(models.Model):
    TEACHING = 'TH'
    STANDARD = 'SD'
    RESEARCH = 'RH'

    CHOICES = {
        TEACHING: 'Teaching',
        STANDARD: 'Standard',
        RESEARCH: 'Research',
    }

    name = models.CharField(
        max_length = 2,
        choices = CHOICES.items(),
        unique = True,
    )


    @staticmethod
    def populate():
        tracks = [Track(name=choice) for choice in Track.CHOICES]
        Track.objects.bulk_create(tracks, ignore_conflicts=True)


    def __str__(self) -> str:
        return self.CHOICES[self.name]


class Designation(models.Model):
    ASSISTANT_PROF = 'ASP'
    ASSOCIATE_PROF = 'ACP'
    PROFESSOR = 'PRF'

    CHOICES = {
        ASSISTANT_PROF: 'Assistant Professor',
        ASSOCIATE_PROF: 'Associate Professor',
        PROFESSOR: 'Professor',
    }

    name = models.CharField(
        max_length = 3,
        choices = CHOICES.items(),
        unique = True,
    )


    @staticmethod
    def populate():
        designation = [Designation(name=choice) for choice in Designation.CHOICES]
        Designation.objects.bulk_create(designation, ignore_conflicts=True)


    def __str__(self) -> str:
        return self.CHOICES[self.name]


class Workload(models.Model):
    track = models.ForeignKey(
        'Track',
        on_delete=models.PROTECT
    )
    designation = models.ForeignKey(
        'Designation',
        on_delete=models.PROTECT
    )
    min_hours_per_week = models.PositiveSmallIntegerField()
    max_hours_per_week = models.PositiveSmallIntegerField()

    def save(self, *args, **kwargs):
        if (self.max_hours_per_week < self.min_hours_per_week):
            raise ValueError('Maximum hours per week should be greater than Minimum hours per week')
        super().save(*args, **kwargs)

    class Meta:
        unique_together = ('track', 'designation')

    def __str__(self) -> str:
        return f'{self.track} {self.designation}'


class Faculty(models.Model):
    user = models.OneToOneField(
        'User',
        on_delete=models.CASCADE,
        unique = True,
    )
    track = models.ForeignKey(
        'Track',
        on_delete=models.PROTECT
    )
    designation = models.ForeignKey(
        'Designation',
        on_delete=models.PROTECT
    )

    @property
    def min_workload(self) -> int: # minimum workload in hours
        return Workload.objects.first(track=self.track, designation=self.designation).min_hours_per_week

    @property
    def max_workload(self) -> int: # minimum workload in hours
        return Workload.objects.first(track=self.track, designation=self.designation).max_hours_per_week
    
    def workload(self, preference_sem_identifier: Identifier) -> int:
        batches = Batch.objects.filter(year=preference_sem_identifier.year, sem=preference_sem_identifier.se)
        courses = Course.objects.filter()
        # CourseAllocation.objects.filter(faculty=self, courses_in=courses)
        return 

    def __str__(self) -> str:
        return self.user.email




# class FacultyExperience(models.Model):
#     course = models.ForeignKey(
#         'course.CourseIdentifer',
#         on_delete=models.PROTECT
#     )
#     faculty = models.ForeignKey(
#         'user.User',
#         on_delete=models.PROTECT,
#     )
#     experience = models.SmallIntegerField()

#     class Meta:
#         unique_together = ('course', 'faculty')

#     def __str__(self) -> str:
#         return f'{self.course} {self.faculty}'