from django.db import models

class Course(models.Model):
    batch = models.ForeignKey(
        'Batch',
        on_delete=models.PROTECT,
    )
    identifier = models.ForeignKey(
        'CourseIdentifer',
        on_delete=models.PROTECT,
    )
    credit = models.SmallIntegerField()
    hours = models.SmallIntegerField()
    l = models.SmallIntegerField()
    t = models.SmallIntegerField()
    p = models.SmallIntegerField()
    is_elective = models.BooleanField()


class CourseLab(models.Model):
    course = models.ForeignKey(
        'Course',
        on_delete=models.PROTECT,
        related_name = '+'
    )
    lab = models.ForeignKey(
        'Course',
        on_delete=models.PROTECT,
    )


class CourseIdentifer(models.Model):
    code = models.TextField()
    name = models.TextField()


class Batch(models.Model):
    program = models.ForeignKey(
        'Program',
        on_delete=models.PROTECT,
    )
    advisors = models.ManyToManyField(
        'user.User',
    )
    year = models.PositiveSmallIntegerField()
    sem = models.PositiveIntegerField()


class Program(models.Model):
    name = models.TextField()

