from django.contrib import admin
from .models import Batch, Course, CourseLab, Program, Curriculum, CurriculumExtras, BatchCurriculumExtra, ExtraCourse, CurriculumUpload
from django.db.models import JSONField 
from django.forms import widgets
import json

class PrettyJSONWidget(widgets.Textarea):
    def format_value(self, value):
        try:
            value = json.dumps(json.loads(value), indent=2, sort_keys=True)
            row_lengths = [len(r) for r in value.split('\n')]
            self.attrs['rows'] = min(max(len(row_lengths) + 2, 10), 30)
            self.attrs['cols'] = min(max(max(row_lengths) + 2, 40), 120)
            return value
        except Exception as e:
            return super(PrettyJSONWidget, self).format_value(value)

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


@admin.register(CurriculumUpload)
class CurriculumUploadAdmin(admin.ModelAdmin):
    list_display = ['program', 'year', 'uploaded_on']
    list_filter = ['year']
    formfield_overrides = {
        JSONField: {'widget': PrettyJSONWidget}
    }


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
    list_filter = ['course__credit', 'lab__credit','course__batch__curriculum__program__name', 'course__batch__year', 'course__batch__sem']

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'batch', 'credit']
    list_filter = ['credit', 'batch__curriculum__program__name', 'batch__year', 'batch__sem']
    search_fields = ['name', 'code']

