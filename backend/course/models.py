from django.db import models

class AbstractCourse(models.Model):
    code = models.TextField()
    name = models.TextField()
    # identifier = models.ForeignKey(
    #     'CourseIdentifer',
    #     on_delete=models.PROTECT,
    # )
    credit = models.SmallIntegerField()
    hours = models.SmallIntegerField()
    l = models.SmallIntegerField()
    t = models.SmallIntegerField()
    p = models.SmallIntegerField()
   
    class Meta:
        unique_together = ('code', 'name')
        abstract = True 

    @property
    def is_lab(self):
        return self.code[-2] == '8',

    def __str__(self) -> str:
        return f'{self.code}  {self.name}'
        

class Course(AbstractCourse, models.Model):
    batch = models.ForeignKey(
        'Batch',
        on_delete=models.PROTECT,
    )


class CourseLab(models.Model):
    course = models.OneToOneField(
        'Course',
        on_delete=models.PROTECT,
        related_name = '+',
    )
    lab = models.OneToOneField(
        'Course',
        on_delete=models.PROTECT,
    )

    class Meta:
        unique_together = ('course', 'lab')

    def __str__(self) -> str:
        return f'{self.course.code}  {self.lab.code}'


class Curriculum(models.Model):
    program = models.ForeignKey(
        'Program',
        on_delete=models.PROTECT,
    )
    year = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ('program', 'year')

    def __str__(self) -> str:
        return f'{self.program} {self.year}'

class CurriculumExtras(models.Model):
    curriculum = models.ForeignKey(
        'Curriculum',
        on_delete=models.PROTECT,
    )
    name = models.TextField()

    class Meta:
        unique_together = ('curriculum', 'name')
    

    def __str__(self) -> str:
        return self.name


class ExtraCourse(AbstractCourse, models.Model):
    selected = models.ManyToManyField('Batch')
    is_elective = models.BooleanField(default=False)
    course_type = models.ForeignKey(
        'CurriculumExtras',
        on_delete=models.PROTECT,
    )




class Batch(models.Model):
    curriculum = models.ForeignKey(
        'Curriculum',
        null=True,
        on_delete=models.PROTECT,
    )
    extras = models.ManyToManyField(
        'CurriculumExtras'
    )
    advisors = models.ManyToManyField(
        'user.User',
    )
    year = models.PositiveSmallIntegerField()
    sem = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f'{self.curriculum.program.name} {self.year} S{self.sem}'


class Program(models.Model):
    name = models.TextField(
        unique = True,
    )
    year = models.PositiveSmallIntegerField()

    def __str__(self) -> str:
        return self.name

