from django.contrib import admin
from .models import Batch, Course, CourseLab, Program, Curriculum, CurriculumExtras, BatchCurriculumExtra, ExtraCourse

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Batch)
class BatchAdmin(admin.ModelAdmin):
    list_display = ['curriculum', 'year', 'sem']
    list_filter = ['curriculum__program__name', 'year', 'sem']
    search_fields = ['curriculum__program_name', 'year', 'sem']


@admin.register(Curriculum)
class CurriculumAdmin(admin.ModelAdmin):
    list_display = ['program', 'year']
    list_filter = ['year']


@admin.register(CurriculumExtras)
class CurriculumExtrasAdmin(admin.ModelAdmin):
    list_display = ['name', 'curriculum']
    search_fields = ['name']

@admin.register(BatchCurriculumExtra)
class BatchCurriculumExtraAdmin(admin.ModelAdmin):
    list_display = ['batch', 'extra', 'count']
    list_filter = ['batch__curriculum__program__name']


@admin.register(ExtraCourse)
class ExtraCourseAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'course_type', 'credit', 'is_elective']
    list_filter = ['credit', 'is_elective']


@admin.register(CourseLab)
class CourseLabAdmin(admin.ModelAdmin):
    list_display = ['course', 'lab']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'batch', 'credit']
    list_filter = ['credit', 'batch__curriculum__program__name', 'batch__year', 'batch__sem']

