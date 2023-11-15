# Generated by Django 4.2.6 on 2023-11-15 02:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('streamer_profile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BankAccountDetails',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('first_name', models.CharField(help_text='Your First Name', max_length=35)),
                ('last_name', models.CharField(help_text='Your Last Name', max_length=30)),
                ('bank_name', models.CharField(max_length=20)),
                ('account_no', models.CharField(max_length=20)),
                ('ifsc_code', models.CharField(max_length=10)),
                ('passbook_img', models.ImageField(blank=True, null=True, upload_to='Streamer/BankAccountDetails/Passbooks/')),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('streamer', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='streamer_profile.streamer')),
            ],
        ),
        migrations.CreateModel(
            name='PaymentGateWaySettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('store_id', models.CharField(blank=True, max_length=500, null=True)),
                ('store_pass', models.CharField(blank=True, max_length=500, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='StreamerWallet',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('available_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('ready_to_withdrawal_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('total_tip_received', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('last_recharged_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('bank_account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='finance.bankaccountdetails')),
                ('streamer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='streamer_profile.streamer')),
            ],
        ),
        migrations.CreateModel(
            name='Verification',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('first_name', models.CharField(help_text='Your First Name', max_length=35)),
                ('last_name', models.CharField(help_text='Your Last Name', max_length=30)),
                ('document_type', models.CharField(blank=True, choices=[('VOTER', 'VOTER CARD'), ('NID', 'NID CARD'), ('AADHAR', 'AADHAR CARD'), ('PASSPORT', 'PASSPORT'), ('PAN', 'PAN CARD'), ('PASSBOOK', 'BANK PASSBOOK')], max_length=10, null=True)),
                ('document', models.ImageField(blank=True, null=True, upload_to='Finance/Streamer/Documents/Verification/')),
                ('is_verification_approaved', models.BooleanField(default=False)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('streamer', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='streamer_profile.streamer')),
            ],
        ),
        migrations.CreateModel(
            name='UserWallet',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('last_recharged_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('available_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('total_tipped_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Tip',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=6)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('stream', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='streamer_profile.stream')),
                ('tipper', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tips_given', to=settings.AUTH_USER_MODEL)),
                ('wallet', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='finance.streamerwallet')),
            ],
        ),
        migrations.AddField(
            model_name='bankaccountdetails',
            name='verification',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='finance.verification'),
        ),
    ]
