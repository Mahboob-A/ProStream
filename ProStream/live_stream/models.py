from django.db import models

# Create your models here.

import uuid 
from django.utils import timezone 
from django.conf import settings
from taggit.managers import TaggableManager

from accounts.models import CustomUser
from streamer_profile.models import * 




class Category(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        
        name = models.CharField(max_length=30, help_text='Category Name')
        
        language = models.CharField(max_length=20, null=True, blank=True)
        total_views_count = models.PositiveIntegerField(default=0, null=True, blank=True)
        total_followers = models.PositiveIntegerField(default=0,  null=True, blank=True)
        tags = TaggableManager()
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True) 
        
        def __str__(self): 
                return self.name 
        

class Chat(models.Model): 
        ''' a single chat instance for a single stream instance   '''
        
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        stream = models.OneToOneField(Stream, on_delete=models.CASCADE)
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def __str__(self): 
                return f"{self.stream.stream_title}'s chat"
        
        

class Message(models.Model): 
        ''' messages will represent all the text sent in the Chat box'''
        
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
        sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_messages')   
        
        text = models.TextField()
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
             
# create the model 
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
        
        
        
        