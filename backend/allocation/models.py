from django.db import models


class CourseAllocation(models.Model):
    course = models.OneToOneField(
        'course.Course',
        on_delete=models.PROTECT,
    )
    faculty = models.ForeignKey(
        'user.Faculty',
        on_delete=models.PROTECT,
    )

    class Meta:
        unique_together = ('course', 'faculty')

    
    def save(self, *args, **kwargs):
        if self.course.is_lab:
            raise Exception("Course cannot be of type lab component")
        super().save(*args, **kwargs)

def __str__(self) -> str:
        return f'{self.course} {self.faculty}'
        
class LabAllocation(models.Model):
    course = models.ForeignKey(
        'course.Course',
        on_delete=models.PROTECT,
    )
    faculty = models.ForeignKey(
        'user.Faculty',
        on_delete=models.PROTECT,
    )
    is_in_charge = models.BooleanField()

    class Meta:
        unique_together = ('course', 'faculty')


    def save(self, *args, **kwargs):
        if self.is_in_charge and LabAllocation.objects.filter(course=self.course, is_in_charge=True).exists():
            raise Exception("Incharge already exists")
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f'{self.course} {self.faculty}'
