from django.contrib import admin
from .models import Batch, Course, CourseIdentifer, CourseLab, Program

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Batch)
class BatchAdmin(admin.ModelAdmin):
    list_display = ['program', 'year', 'sem']
    list_filter = ['program__name', 'year', 'sem']
    search_fields = ['program__name', 'year', 'sem']


@admin.register(CourseIdentifer)
class CourseIdentifer(admin.ModelAdmin):
    list_display = ['code', 'name']


@admin.register(CourseLab)
class CourseLabAdmin(admin.ModelAdmin):
    list_display = ['course', 'lab']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['batch', 'identifier', 'credit', 'is_elective']
    list_filter = ['credit', 'is_elective', 'batch__year', 'batch__sem']
    search_fields = ['identifier__name', 'identifier__code']

