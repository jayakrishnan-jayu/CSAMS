# Generated by Django 3.2 on 2022-11-10 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0002_auto_20221110_1121'),
        ('user', '0003_auto_20221110_1126'),
        ('preference', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='identifier',
            name='year',
            field=models.PositiveSmallIntegerField(),
        ),
        migrations.AlterUniqueTogether(
            name='identifier',
            unique_together={('year', 'is_even_sem')},
        ),
        migrations.AlterUniqueTogether(
            name='preference',
            unique_together={('faculty', 'course')},
        ),
    ]