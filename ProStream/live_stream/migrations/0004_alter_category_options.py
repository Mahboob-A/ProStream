# Generated by Django 4.2.6 on 2023-11-19 14:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('live_stream', '0003_category_tag1_category_tag2'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'Category', 'verbose_name_plural': 'Categories'},
        ),
    ]