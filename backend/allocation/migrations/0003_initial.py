# Generated by Django 3.2 on 2022-11-27 10:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('allocation', '0002_laballocation_course'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='laballocation',
            name='faculty',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='courseallocation',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='course.course'),
        ),
        migrations.AddField(
            model_name='courseallocation',
            name='faculty',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='laballocation',
            unique_together={('course', 'faculty')},
        ),
        migrations.AlterUniqueTogether(
            name='courseallocation',
            unique_together={('course', 'faculty')},
        ),
    ]