# Generated by Django 4.2.6 on 2023-11-19 14:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0002_alter_streamerwallet_bank_account_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bankaccountdetails',
            options={'verbose_name': 'Bank Account Detail', 'verbose_name_plural': 'Bank Account Details'},
        ),
        migrations.AlterModelOptions(
            name='paymentgatewaysettings',
            options={'verbose_name': 'PaymentGateWaySetting', 'verbose_name_plural': 'PaymentGateWaySettings'},
        ),
        migrations.RenameField(
            model_name='paymentgatewaysettings',
            old_name='store_pass',
            new_name='tore_pass',
        ),
    ]
