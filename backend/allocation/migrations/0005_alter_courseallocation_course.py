# Generated by Django 4.1.7 on 2023-05-20 15:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0007_curriculumextras_is_elective'),
        ('allocation', '0004_alter_courseallocation_faculty_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courseallocation',
            name='course',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='course.course'),
        ),
    ]