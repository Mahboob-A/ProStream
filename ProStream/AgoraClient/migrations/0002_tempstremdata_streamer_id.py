# Generated by Django 4.2.6 on 2023-11-16 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AgoraClient', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tempstremdata',
            name='streamer_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
