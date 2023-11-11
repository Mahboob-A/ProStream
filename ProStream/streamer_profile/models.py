from django.db import models
from django.utils import timezone
from django.urls import reverse
import uuid
from django.core.mail import send_mail 
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator, MinLengthValidator, MaxLengthValidator

from taggit.managers import TaggableManager

# from accounts.models import CustomUser
from live_stream.models import Chat, Category
from django.conf import settings


# id = models.UUIDField(primary_key = True,default = uuid.uuid4, editable = False)
class Streamer(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        original_user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
        channel_id = models.CharField(max_length=100, null=True, blank=True)
        
        first_name = models.CharField(max_length=20, null=True, blank=True)
        last_name = models.CharField(max_length=20, null=True, blank=True)
        
        is_actively_streraming = models.BooleanField(default=True)
        
        # actions for Team activity 
        has_team_invitation_received = models.BooleanField(default=False)
        team_invite_acceptance_status = models.BooleanField(_("team invite acceptance status"), default=False)
        is_in_a_team = models.BooleanField(default=False) # check this to add an streamer into a team (and turn True if added the streamer into a team)
        
        # action for reporting
        max_warning = models.PositiveIntegerField(default=5) 
        # increase when the streamer is found guily for a report. when the max warning is reached, then take higher action  
        current_warning_count = models.PositiveIntegerField(default=0)  
        is_temporarily_deactivated = models.BooleanField(default=False)
        is_permanently_banned = models.BooleanField(default=False) 
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)

        class Meta:
                verbose_name = _("Streamer")
                verbose_name_plural = _("Streamers")

        def __str__(self):
               return self.first_name + " " + self.last_name + " " + str(self.id)

        def get_absolute_url(self):
                return reverse("streamer_detail", kwargs={"id": self.id})
        
        
class Channel(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        streamer = models.OneToOneField(Streamer, on_delete=models.CASCADE)
        
        bio = models.TextField(max_length=500, null=True, blank=True)
        channel_display_name = models.CharField(max_length=25, default='My Awesome Channel', null=True, blank=True)
        display_picture = models.ImageField(upload_to='Streamer/Channel/DisplayPictures/', null=True, blank=True)
        channel_banner_picture = models.ImageField(upload_to='Streamer/Channel/ChannelBanners/', null=True, blank=True)
        total_followers = models.IntegerField(default=0)
        streamer_about_1 = models.TextField(null=True, blank=True)
        streamer_about_2 = models.TextField(null=True, blank=True)
     
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        class Meta:
                verbose_name = _("Channel")
                verbose_name_plural = _("Channels")

        def __str__(self):
                return self.channel_display_name

        def get_absolute_url(self):
                return reverse("channel_detail", kwargs={"id": self.id})

# discardced - using TaggableManager form taggit 
# class Tags(models.Model): 
#         id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#         name = models.CharField(max_length=15)

#         def __str__(self): 
#                 return self.name 


CONTENT_CLASSIFICATIONS = (
    ('general', 'General Content'),
    ('family_friendly', 'Family-Friendly'),
    ('education', 'Educational Content'),
    ('entertainment', 'Entertainment'),
    ('music', 'Music'),
    ('art_culture', 'Art & Culture'),
    ('news', 'News & Updates'),
    ('gaming', 'Gaming'),
    ('sports', 'Sports'),
    ('comedy', 'Comedy'),
    ('technology', 'Technology'),
    ('cooking', 'Cooking & Food'),
    ('travel', 'Travel & Adventure'),
    ('lifestyle', 'Lifestyle & Fashion'),
    ('health_fitness', 'Health & Fitness'),
    ('business', 'Business & Finance'),
    ('history', 'History & Documentary'),
    ('science', 'Science & Nature'),
    ('extreme', 'Extreme Content'),
    ('nsfw', 'NSFW (Not Safe For Work)'),
    ('violence', 'Violence'),
    ('language', 'Strong Language'),
    ('horror', 'Horror'),
    ('shock', 'Shock Value'),
    ('taboo', 'Taboo Subjects'),
)


# create Chat and Category models 
class Stream(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        
        streamer = models.ForeignKey(Streamer, on_delete=models.CASCADE, related_name='streams', null=True, blank=True),
        category = models.ForeignKey(Category, on_delete=models.SET_NULL, related_name='category_streams'),
        stream_chat = models.OneToOneField(Chat, on_delete=models.CASCADE, null=True, blank=True)
        
        stream_title = models.CharField(max_length=150, validators=[MinLengthValidator(5, message='Your title is too short! Type at least 5 characters!')])
        go_live_notification = models.CharField(max_length=150, validators=[MinLengthValidator(5, message='Your notification title is too short! Type at least 5 characters!')], null=True, blank=True)
        thumbnail = models.URLField(max_length=500, null=True, blank=True)
        content_classification = models.CharField(max_length=15, default='General', choices=CONTENT_CLASSIFICATIONS, null=True, blank=True)
        has_content_classification = models.BooleanField(default=False)
        
        language = models.CharField(max_length=25, null=True, blank=True)
        follower_goals = models.IntegerField(default=0, null=True, blank=True)
        total_views_count = models.IntegerField(default=0, null=True, blank=True)
        is_previously_recorded = models.BooleanField(default=False, null=True, blank=True)
        has_branded_content = models.BooleanField(default=False, null=True, blank=True)
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def save(self, *args, **kwargs): 
                if self.content_classification: 
                        self.has_content_classification = True 
                else: 
                        self.has_content_classification = False 
                super().save(*args, **kwargs)

        

class SocialMedia(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        streamer = models.OneToOneField(Streamer, on_delete=models.CASCADE, null=True, blank=True)
        channel = models.OneToOneField(Channel, on_delete=models.CASCADE, null=True, blank=True)
        
        fb_link = models.URLField(null=True, blank=True)
        ig_link = models.URLField(null=True, blank=True)
        tiktok_link = models.URLField(null=True, blank=True)
        yt_link = models.URLField(null=True, blank=True)
        x_link = models.URLField(null=True, blank=True)
        link_tree = models.URLField(null=True, blank=True)
        other_link_1 = models.URLField(null=True, blank=True)
        other_link_2 = models.URLField(null=True, blank=True)
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def __str__(self): 
                return f"{self.streamer.first_name}'s social account"
        
        

# only stremers can create a team 
# class Team(models.Model): 
#         id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#         creator = models.OneToOneField(Streamer, on_delete=models.CASCADE, help_text='Team Creator')
#         members = models.ManyToManyField(Streamer, null=True, blank=True)
#         name = models.CharField(max_length=50, help_text='Team Name')
#         total_team_members = models.IntegerField(default=0, null=True, blank=True)
        
#         createdAt = models.DateTimeField(default=timezone.now)
#         updatedAt = models.DateTimeField(auto_now=True) 
#         deletedAt = models.DateTimeField(blank=True, null=True)
        
#         def __str__(self): 
#                 return self.name 


class Team(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        
        admin = models.OneToOneField(Streamer, on_delete=models.CASCADE, related_name='created_team', help_text='Team Creator', null=True, blank=True)
        members = models.ManyToManyField(Streamer, related_name='teams', blank=True)
        
        name = models.CharField(max_length=50, help_text='Team Name')
        total_team_members = models.IntegerField(default=0, null=True, blank=True)

        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def add_member(self, streamer):
                
                if streamer in self.members.all(): 
                        return False, f'{streamer.original_user.username} is already in your Squad!'
                
                if self.admin == streamer: 
                        return False, f'This is your Squad and you are alrady in!'
                
                # add the streamer. | other validation if the streamer is already in other team validated in view using is_in_a_team of Streamer field. 
                if not streamer.is_in_a_team:  
                        streamer.is_in_a_team = True 
                        streamer.save()
                        self.total_team_members += 1
                        self.members.add(streamer)
                        self.save()
                        return True,  f'{streamer.original_user.username} is added in your Squad!'
                else : 
                        return False, 'Member Streamer is alreay in another Squad!. Any streamer can join only a single Squad at a time! ' 
                
        # if the admin wants to remove the member from his team | other validations will be done in the views if needed. 
        def remove_member(self, streamer):
                if streamer in self.members.all(): 
                        self.members.remove(streamer)
                        streamer.is_in_a_team = False 
                        streamer.save()
                        self.total_team_members -= 1 
                        self.save()
                        return True,  f'{streamer.original_user.username} is removed from your Squad!'
                else: 
                        return False,  f'{streamer.original_user.username} is not found in your Squad!'
                
        # if the admin wants to exit the team, make the selected admin as new admin, and make the is_in_a_team field of the admin (Streamer Object) to False 
        def exit_team_admin(self, admin, new_admin): 
                if self.admin == admin: 
                        if new_admin in self.members.all(): 
                                admin.is_in_a_team = False # updating the old admin so that he can join other team 
                                admin.save()
                                self.admin = new_admin # making the new user as the admin 
                                self.total_team_members -= 1 
                                self.members.remove(new_admin)
                                self.save()
                                return True, 'Team admin exit is successfull!'
                        else : 
                                return False, f'New admin - {new_admin.original_user.username} is not a team member of your Squad!' 
                                
                return False,  'You are not admin of this squad!'
                                
        # if the team wants to change the admin | change the admin to the selected admin 
        def  change_admin_selected(self, admin, new_admin):
                if self.admin == admin: 
                        if new_admin in self.members.all(): 
                                self.admin = new_admin
                                self.members.add(admin)
                                self.save()
                                return True, f'New admin is successfully updated to {new_admin.original_user.username} !'
                return False,  'You are not admin of this Squad'
                 
                
class Follow(models.Model): 
        follower = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='following'),
        follwoing = models.ForeignKey(Streamer, on_delete=models.CASCADE, related_name='followers', null=True, blank=True),
        category_follwing = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category_follower', null=True, blank=True),
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        

# for scheduling live streams 
        
class ScheduleLiveStream(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        streamer = models.ForeignKey(Streamer, on_delete=models.CASCADE, related_name='scheduled_streams')
        followers  = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='followed_scheduled_streams')
        
        stream_title = models.CharField(max_length=50, help_text='Title for scheduling notification')
        scheduled_time = models.DateTimeField(help_text='Time for the scheduled stream')
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def __str__(self): 
                return f"{self.streamer.first_name}'s scheduled stream -  {self.stream_title}"
        
        
class ScheduledLiveStremFollowers(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        scheduled_live_stream = models.ForeignKey(ScheduleLiveStream, on_delete=models.CASCADE, related_name='scheduled_live_stream_followers')
        followers = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='scheduled_live_streams_following')
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        
        def __str__(self): 
                return f"{self.followers.username} is follwoing {self.scheduled_live_stream.stream_title} stream"