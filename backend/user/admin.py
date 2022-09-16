from django.contrib import admin
from .models import User
# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'date_joined']
    list_filter = [
        'is_active', 'is_staff','date_joined'
    ]
    search_fields = ['email']

