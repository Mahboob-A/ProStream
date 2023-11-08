# Generated by Django 4.2.6 on 2023-11-07 12:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('streamer_profile', '0003_remove_stream_tags'),
        ('finance', '0003_paymentgatewaysettings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='verification',
            name='streamer',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='streamer_profile.streamer'),
        ),
    ]
