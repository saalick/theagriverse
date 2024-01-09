# Generated by Django 3.2.19 on 2023-07-05 14:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_appointment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='End_Appointment_Date',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='Start_Appointment_Date',
        ),
        migrations.AddField(
            model_name='appointment',
            name='Appointment_Date',
            field=models.DateField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='appointment',
            name='End_Appointment_Time',
            field=models.TimeField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='appointment',
            name='Start_Appointment_Time',
            field=models.TimeField(default=datetime.datetime.now),
        ),
    ]