from django.db import models

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
    

class Identifier(models.Model):
    year = models.PositiveIntegerField()
    is_even_sem = models.BooleanField()


class Config(models.Model):
    preference_count = models.PositiveSmallIntegerField(default = 3)
    current_preference_sem = models.ForeignKey(
        'Identifier',
        on_delete=models.PROTECT
    )
