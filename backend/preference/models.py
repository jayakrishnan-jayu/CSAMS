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
