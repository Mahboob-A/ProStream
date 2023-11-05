from django.db import models

# Create your models here.

import uuid 
from django.utils import timezone 
from taggit.managers import TaggableManager
# from streamer_profile.models import Streamer
from django.conf import settings




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
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def __str__(self): 
                return f"{self.stream.stream_title}'s chat"
        
        

class Message(models.Model): 
        ''' messages will represent all the text sent in the Chat box'''
        
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
        sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,  related_name='user_messages')   
        
        text = models.TextField()
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
             
# create the model 

        
        
        
        