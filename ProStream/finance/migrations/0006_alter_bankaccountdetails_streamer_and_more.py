# Generated by Django 4.2.6 on 2023-11-07 13:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('streamer_profile', '0003_remove_stream_tags'),
        ('finance', '0005_alter_verification_document_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bankaccountdetails',
            name='streamer',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='streamer_profile.streamer'),
        ),
        migrations.AlterField(
            model_name='bankaccountdetails',
            name='verification',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='finance.verification'),
        ),
    ]
