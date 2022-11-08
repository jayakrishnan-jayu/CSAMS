from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

class User(AbstractUser):
    USERNAME_FIELD = 'email'
    email = models.EmailField(('Email address'), unique=True)
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email


class Faculty(models.Model):
    user = models.OneToOneField(
        'User',
        on_delete=models.CASCADE
    )
    track = models.ForeignKey(
        'Track',
        on_delete=models.PROTECT
    )
    designation = models.ForeignKey(
        'Designation',
        on_delete=models.PROTECT
    )


class Track(models.Model):
    TEACHING = 'TH'
    STANDARD = 'SD'
    RESEARCH = 'RH'

    name = models.CharField(
        max_length = 2,
        choices = [
            (TEACHING, 'Teaching'),
            (STANDARD, 'Standard'),
            (RESEARCH, 'Research'),
        ],
    )


class Designation(models.Model):
    ASSISTANT_PROF = 'ASP'
    ASSOCIATE_PROF = 'ACP'
    PROFESSOR = 'PRF'

    name = models.CharField(
        max_length = 3,
        choices = [
            (ASSISTANT_PROF, 'Assistant Professor'),
            (ASSOCIATE_PROF, 'Associate Professor'),
            (PROFESSOR, 'Professor'),
        ],
    )


class Workload(models.Model):
    track = models.ForeignKey(
        'Track',
        on_delete=models.PROTECT
    )
    designation = models.ForeignKey(
        'Designation',
        on_delete=models.PROTECT
    )
    min_hours_per_week = models.SmallIntegerField()
    max_hours_per_week = models.SmallIntegerField()


class FacultyExperience(models.Model):
    course = models.ForeignKey(
        'course.CourseIdentifer',
        on_delete=models.PROTECT
    )
    faculty = models.ForeignKey(
        'user.User',
        on_delete=models.PROTECT,
    )
    experience = models.SmallIntegerField()
