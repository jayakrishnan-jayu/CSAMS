from django.contrib import admin
from .models import User, Designation, Faculty, FacultyExperience, Track, Workload


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'date_joined']
    list_filter = [
        'is_active', 'is_staff','date_joined'
    ]
    search_fields = ['email']


@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ['user', 'track', 'designation']
    list_filter = ['track', 'designation']


@admin.register(FacultyExperience)
class FacultyExperienceAdmin(admin.ModelAdmin):
    list_display = ['course', 'faculty', 'experience']
    search_fields = ['faculty__email', 'faculty__username']


@admin.register(Workload)
class WorkloadAdmin(admin.ModelAdmin):
    list_display = ['track', 'designation', 'min_hours_per_week', 'max_hours_per_week']
    list_filter = ['track', 'designation']


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Designation)
class DesignationAdmin(admin.ModelAdmin):
    list_display = ['name']

