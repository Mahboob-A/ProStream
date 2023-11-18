# Generated by Django 4.2.6 on 2023-11-18 05:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AgoraClient', '0002_tempstremdata_streamer_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='tempstremdata',
            name='profile_image_url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='tempstremdata',
            name='username',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
    ]