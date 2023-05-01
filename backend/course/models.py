from django.db.models.signals import pre_save

from django.dispatch import receiver
from django.db import models
from typing import List


class CurriculumUpload(models.Model):
    program = models.ForeignKey(
        'Program',
        on_delete=models.PROTECT,
    )
    year = models.PositiveSmallIntegerField()
    data = models.JSONField() # to store the curriculum in json format
    is_populated = models.BooleanField(default=False)
    uploaded_on = models.DateTimeField(auto_now_add=True)
    # is_populated field specifies whether courses are created and assigned to batches
    # if is_popluated is true, then updation is not possible

    def __str__(self) -> str:
        return f'{self.program}  {self.year} curriculum data'


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


class AbstractCourse(models.Model):
    code = models.TextField()
    name = models.TextField()
    credit = models.SmallIntegerField()
    hours = models.SmallIntegerField()
    l = models.SmallIntegerField()
    t = models.SmallIntegerField()
    p = models.SmallIntegerField()
   
    class Meta:
        abstract = True 

    @property
    def is_lab(self):
        return self.code[-2] == '8'
    
    @property
    def is_lab_only(self):
        return self.is_lab and not CourseLab.objects.filter(lab=self).exists()
    
    @property
    def workload(self) -> int:
        return self.l + self.t + self.p;

    def __str__(self) -> str:
        return f'{self.code}  {self.name}'
        

class Course(AbstractCourse, models.Model):
    is_extra = models.BooleanField(default=False)
    batch = models.ForeignKey(
        'Batch',
        on_delete=models.PROTECT,
    )

class ExtraCourse(AbstractCourse, models.Model):
    is_elective = models.BooleanField(default=False)
    course_type = models.ForeignKey(
        'CurriculumExtras',
        on_delete=models.PROTECT,
    )


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

@receiver(pre_save, sender=Curriculum)
def verify_year(sender, instance, **kwargs):
    if instance.id is None:
        qs = Curriculum.objects.filter(program=instance.program).order_by('year').last()
        if qs is None:
            return
        expected_year = qs.year + qs.program.year
        if expected_year ==  instance.year:
            return
        raise Exception(f"Expected Year: {expected_year}")

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




class Batch(models.Model):
    curriculum = models.ForeignKey(
        'Curriculum',
        null=True,
        on_delete=models.PROTECT,
    )
    year = models.PositiveSmallIntegerField()
    sem = models.PositiveIntegerField()
    selected_extra_courses = models.ManyToManyField(ExtraCourse)


    def add_extra(self, ce: CurriculumExtras):
        bce, new = BatchCurriculumExtra.objects.get_or_create(batch=self, extra=ce)
        if not new:
            bce.count += 1
            bce.save()
    
    def remove_extra(self, ce: CurriculumExtras):
        qs = BatchCurriculumExtra.objects.filter(batch=self, extra=ce)
        if qs.exists():
            bce = qs.first()
            if bce.count > 1:
                bce.count -= 1
                bce.save()
                return
            bce.delete()
    
    def add_selected_extra_course(self, ec: ExtraCourse):
        qs = BatchCurriculumExtra.objects.filter(batch=self, extra=ec.course_type)
        exisiting_count = self.selected_extra_courses.filter(course_type=ec.course_type).count()
        if not qs.exists():
            raise Exception("Invalid Extra Course for semester")
        if exisiting_count >= qs.first().count:
            raise Exception("Invalid Extra Course for semester, maximum count already reached!")
            
        self.selected_extra_courses.add(ec)
        self.save()
    
    def remove_selected_extra_course(self, ec: ExtraCourse):
        self.selected_extra_courses.remove(ec)
        self.save()

    # def sem_identifier(self) -> Tuple[int, bool]:
    #     increment = (self.sem - 1) // 2
    #     return (self.year, False)
    @property
    def extras(self) -> List['BatchCurriculumExtra']:
        return [*BatchCurriculumExtra.objects.filter(batch=self)]

    # @property
    # def selectedExtraCourses(self) -> List['CourseExtraSelected']:
    #     return [*CourseExtraSelected.objects.filter(batch=self)]

    def __str__(self) -> str:
        return f'{self.curriculum.program.name} {self.year} S{self.sem}'


class BatchCurriculumExtra(models.Model):
    batch = models.ForeignKey(
        'Batch',
        on_delete=models.PROTECT,
    )
    extra = models.ForeignKey(
        'CurriculumExtras',
        on_delete=models.PROTECT,
    )
    count = models.PositiveSmallIntegerField(default=1)

    class Meta:
        unique_together = ('batch', 'extra')

class Program(models.Model):
    name = models.TextField(
        unique = True,
    )
    year = models.PositiveSmallIntegerField()

    def __str__(self) -> str:
        return self.name
