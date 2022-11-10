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

    def __str__(self) -> str:
        return f'{self.identifier.code}  {self.identifier.name}'


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

    class Meta:
        unique_together = ('course', 'lab')

    def __str__(self) -> str:
        return f'{self.course.identifier.code}  {self.lab.identifier.code}'


class CourseIdentifer(models.Model):
    code = models.TextField()
    name = models.TextField()

    # TODO: Make unique Pair(code, name)?
    
    def __str__(self) -> str:
        return f'{self.code} {self.name}'


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

    def __str__(self) -> str:
        return f'{self.program} {self.year} S{self.sem}'


class Program(models.Model):
    name = models.TextField(
        unique = True,
    )

    def __str__(self) -> str:
        return self.name

