from django.contrib import admin
from .models import Config, Identifier, Preference

@admin.register(Preference)
class PreferenceAdmin(admin.ModelAdmin):
    list_display = ['preference_sem_identifier', 'faculty', 'course', 'timestamp']
    list_filter = ['preference_sem_identifier__year', 'preference_sem_identifier__is_even_sem', 'timestamp']
    search_fields = ['faculty']
    readonly_fields= ['timestamp']


@admin.register(Identifier)
class IdentifierAdmin(admin.ModelAdmin):
    list_display = ['year', 'is_even_sem']
    list_filter = ['year', 'is_even_sem']

@admin.register(Config)
class ConfigAdmin(admin.ModelAdmin):
    list_display = ['preference_count', 'current_preference_sem']
