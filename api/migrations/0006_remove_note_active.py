# Generated by Django 4.0.4 on 2022-04-28 08:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_task_created_task_text_task_updated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='active',
        ),
    ]
