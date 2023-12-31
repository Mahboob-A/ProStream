# Generated by Django 4.2.6 on 2023-11-15 02:21

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('live_stream', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('bio', models.TextField(blank=True, max_length=500, null=True)),
                ('channel_display_name', models.CharField(blank=True, default='My Awesome Channel', max_length=25, null=True)),
                ('display_picture', models.ImageField(blank=True, null=True, upload_to='Streamer/Channel/DisplayPictures/')),
                ('channel_banner_picture', models.ImageField(blank=True, null=True, upload_to='Streamer/Channel/ChannelBanners/')),
                ('total_followers', models.IntegerField(default=0)),
                ('streamer_about_1', models.TextField(blank=True, null=True)),
                ('streamer_about_2', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'Channel',
                'verbose_name_plural': 'Channels',
            },
        ),
        migrations.CreateModel(
            name='Streamer',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('channel_id', models.CharField(blank=True, max_length=100, null=True)),
                ('first_name', models.CharField(blank=True, max_length=20, null=True)),
                ('last_name', models.CharField(blank=True, max_length=20, null=True)),
                ('is_actively_streraming', models.BooleanField(default=True)),
                ('has_team_invitation_received', models.BooleanField(default=False)),
                ('team_invite_acceptance_status', models.BooleanField(default=False, verbose_name='team invite acceptance status')),
                ('is_in_a_team', models.BooleanField(default=False)),
                ('max_warning', models.PositiveIntegerField(default=5)),
                ('current_warning_count', models.PositiveIntegerField(default=0)),
                ('is_temporarily_deactivated', models.BooleanField(default=False)),
                ('is_permanently_banned', models.BooleanField(default=False)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('original_user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Streamer',
                'verbose_name_plural': 'Streamers',
            },
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(help_text='Team Name', max_length=50)),
                ('total_team_members', models.IntegerField(blank=True, default=0, null=True)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('admin', models.OneToOneField(blank=True, help_text='Team Creator', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_team', to='streamer_profile.streamer')),
                ('members', models.ManyToManyField(blank=True, related_name='teams', to='streamer_profile.streamer')),
            ],
        ),
        migrations.CreateModel(
            name='Stream',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('stream_title', models.CharField(max_length=150, validators=[django.core.validators.MinLengthValidator(5, message='Your title is too short! Type at least 5 characters!')])),
                ('go_live_notification', models.CharField(blank=True, max_length=150, null=True, validators=[django.core.validators.MinLengthValidator(5, message='Your notification title is too short! Type at least 5 characters!')])),
                ('thumbnail', models.URLField(blank=True, max_length=500, null=True)),
                ('content_classification', models.CharField(blank=True, choices=[('general', 'General Content'), ('family_friendly', 'Family-Friendly'), ('education', 'Educational Content'), ('entertainment', 'Entertainment'), ('music', 'Music'), ('art_culture', 'Art & Culture'), ('news', 'News & Updates'), ('gaming', 'Gaming'), ('sports', 'Sports'), ('comedy', 'Comedy'), ('technology', 'Technology'), ('cooking', 'Cooking & Food'), ('travel', 'Travel & Adventure'), ('lifestyle', 'Lifestyle & Fashion'), ('health_fitness', 'Health & Fitness'), ('business', 'Business & Finance'), ('history', 'History & Documentary'), ('science', 'Science & Nature'), ('extreme', 'Extreme Content'), ('nsfw', 'NSFW (Not Safe For Work)'), ('violence', 'Violence'), ('language', 'Strong Language'), ('horror', 'Horror'), ('shock', 'Shock Value'), ('taboo', 'Taboo Subjects')], default='General', max_length=15, null=True)),
                ('has_content_classification', models.BooleanField(default=False)),
                ('language', models.CharField(blank=True, max_length=25, null=True)),
                ('follower_goals', models.IntegerField(blank=True, default=0, null=True)),
                ('total_views_count', models.IntegerField(blank=True, default=0, null=True)),
                ('is_previously_recorded', models.BooleanField(blank=True, default=False, null=True)),
                ('has_branded_content', models.BooleanField(blank=True, default=False, null=True)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='category_streams', to='live_stream.category')),
                ('stream_chat', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='live_stream.chat')),
                ('streamer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='streams', to='streamer_profile.streamer')),
            ],
        ),
        migrations.CreateModel(
            name='SocialMedia',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fb_link', models.URLField(blank=True, null=True)),
                ('ig_link', models.URLField(blank=True, null=True)),
                ('tiktok_link', models.URLField(blank=True, null=True)),
                ('yt_link', models.URLField(blank=True, null=True)),
                ('x_link', models.URLField(blank=True, null=True)),
                ('link_tree', models.URLField(blank=True, null=True)),
                ('other_link_1', models.URLField(blank=True, null=True)),
                ('other_link_2', models.URLField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('channel', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='streamer_profile.channel')),
                ('streamer', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='streamer_profile.streamer')),
            ],
        ),
        migrations.CreateModel(
            name='ScheduleLiveStream',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('stream_title', models.CharField(help_text='Title for scheduling notification', max_length=50)),
                ('scheduled_time', models.DateTimeField(help_text='Time for the scheduled stream')),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('followers', models.ManyToManyField(related_name='followed_scheduled_streams', to=settings.AUTH_USER_MODEL)),
                ('streamer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scheduled_streams', to='streamer_profile.streamer')),
            ],
        ),
        migrations.CreateModel(
            name='ScheduledLiveStremFollowers',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('followers', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scheduled_live_streams_following', to=settings.AUTH_USER_MODEL)),
                ('scheduled_live_stream', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scheduled_live_stream_followers', to='streamer_profile.schedulelivestream')),
            ],
        ),
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('deletedAt', models.DateTimeField(blank=True, null=True)),
                ('category_following', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='category_follower', to='live_stream.category')),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to=settings.AUTH_USER_MODEL)),
                ('following', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='followers', to='streamer_profile.streamer')),
            ],
        ),
        migrations.AddField(
            model_name='channel',
            name='streamer',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='streamer_profile.streamer'),
        ),
    ]
