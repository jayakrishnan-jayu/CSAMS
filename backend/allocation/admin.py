from django.contrib import admin
from .models import CourseAllocation, LabAllocation

@admin.register(CourseAllocation)
class CourseAllocationAdmin(admin.ModelAdmin):
    list_display = ['course', 'faculty']
    search_fields = ['course', 'faculty']

@admin.register(LabAllocation)
class LabAllocationAllocationAdmin(admin.ModelAdmin):
    list_display = ['course', 'faculty', 'is_in_charge']
    list_filter = ['is_in_charge']
    search_fields = ['course', 'faculty']
