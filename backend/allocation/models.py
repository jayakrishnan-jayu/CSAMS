from django.db import models


class CourseAllocation(models.Model):
    course = models.ForeignKey(
        'course.Course',
        on_delete=models.PROTECT,
    )
    faculty = models.ForeignKey(
        'user.User',
        on_delete=models.PROTECT,
    )


class LabAllocation(models.Model):
    course = models.ForeignKey(
        'course.Course',
        on_delete=models.PROTECT,
    )
    faculty = models.ForeignKey(
        'user.User',
        on_delete=models.PROTECT,
    )
    is_in_charge = models.BooleanField()
