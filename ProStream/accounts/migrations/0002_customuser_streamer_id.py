# Generated by Django 4.2.6 on 2023-11-05 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='streamer_id',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]