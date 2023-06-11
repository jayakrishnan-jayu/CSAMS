from django.db import models
from datetime import datetime

class Preference(models.Model):
    preference_sem_identifier = models.ForeignKey(
        'Identifier',
        on_delete=models.PROTECT,
    )
    faculty = models.ForeignKey(
        'user.Faculty',
        on_delete=models.PROTECT,
    )
    course = models.ForeignKey(
        'course.Course',
        on_delete=models.PROTECT,
    )
    weigtage = models.PositiveSmallIntegerField()
    experience = models.PositiveSmallIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('faculty', 'course')

    def __str__(self) -> str:
        return f'{self.preference_sem_identifier} {self.faculty}'
    

class Identifier(models.Model):
    year = models.PositiveSmallIntegerField()
    is_even_sem = models.BooleanField()

    start_timestamp = models.DateTimeField(null=True, blank=True) # Preference deadline for faculties - null : not set (not yet released)
    end_timestamp = models.DateTimeField(null=True, blank=True) # Preference deadline for faculties - null : not set (not yet released)
    is_paused = models.BooleanField(default=True) # is Preference Paused for faculties
    are_courses_verified = models.BooleanField(default=False)
    is_hod_approved = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.start_timestamp or self.end_timestamp:
            if not self.start_timestamp:
                raise Exception("Start timestamp is required")
            if not self.end_timestamp:
                raise Exception("End timestamp is required")
            if self.start_timestamp > self.end_timestamp:
                raise Exception("Start timestamp must be lesser than end timestamp")
            if not self.are_courses_verified:
                raise Exception("Courses should be verified before providing deadline")
        super().save(*args, **kwargs)

    class Meta:
        unique_together = ('year', 'is_even_sem')

    def __str__(self) -> str:
        t = 'Even' if self.is_even_sem else 'Odd'
        return f'{self.year} {t}'


class Config(models.Model):
    preference_count = models.PositiveSmallIntegerField(default = 3)
    current_preference_sem = models.ForeignKey(
        'Identifier',
        on_delete=models.PROTECT
    )
   

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)
    

    def __str__(self) -> str:
        return 'Department.Config'
