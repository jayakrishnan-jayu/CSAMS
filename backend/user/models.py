from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from preference.models import Identifier
from allocation.models import CourseAllocation, LabAllocation
from django.db.models import F
from django.db.models import Sum
from course.models import Course, Batch


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    username = models.CharField(max_length=30, unique=False)
    email = models.EmailField(('Email address'), unique=True)
    sub = models.CharField(max_length=30, null=True)
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
        return Workload.objects.filter(track=self.track, designation=self.designation).first().min_hours_per_week

    @property
    def max_workload(self) -> int: # maximum workload in hours
        return Workload.objects.filter(track=self.track, designation=self.designation).first().max_hours_per_week
    
    def workload(self, identifier: Identifier) -> int:
        batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not identifier.is_even_sem, sem_year=identifier.year)
        courses = Course.objects.filter(batch__in=batches)
        course_hours = CourseAllocation.objects.filter(course__in=courses, faculty=self).aggregate(total=Sum(F('course__l') + F('course__t') + F('course__p')))['total']
        labs_allocations = LabAllocation.objects.filter(course__in=courses, faculty=self)
        in_charge_lab_hours = labs_allocations.filter(is_in_charge=True).aggregate(total=Sum(F('course__l') + F('course__t') + F('course__p')))['total']
        assistant_lab_hours = labs_allocations.filter(is_in_charge=False).aggregate(total=Sum(F('course__p')))['total']
        if course_hours is None:
            course_hours = 0
        if in_charge_lab_hours is None:
            in_charge_lab_hours = 0
        if assistant_lab_hours is None:
            assistant_lab_hours = 0
        return course_hours + in_charge_lab_hours + assistant_lab_hours

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