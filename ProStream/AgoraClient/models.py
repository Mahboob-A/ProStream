from django.db import models

# Create your models here.



class RoomMembers(models.Model):
        uid = models.CharField(max_length=4)
        userName = models.CharField(max_length=50)
        roomName = models.CharField(max_length=50)
        
        
        def __str__(self): 
                return self.userName
        

class StreamInfo(models.Model): 
        streamName = models.CharField(max_length=50)
        tagLine = models.CharField(max_length=50, null=True, blank=True)
        isHost = models.BooleanField(default=True)
        
        def __str__(self): 
                return self.streamName 


class TempStremData(models.Model): 
        uid = models.CharField(max_length=25)
        channel_name = models.CharField(max_length=25, null=True, blank=True)
        token = models.CharField(max_length=255, null=True, blank=True)
        thumbnail = models.URLField(max_length=500, null=True, blank=True)
        streamer_id = models.CharField(max_length=255, null = True, blank = True)
        username = models.CharField(max_length=25, null=True, blank=True)  # store the streamer username to show in the recommendation 
        profile_image_url = models.CharField(max_length=255, null=True, blank=True) # store streamer profile pic to show in Recommendation 
        
        def __str__(self): 
                return f"Deporary data for {self.channel_name} channel "
        