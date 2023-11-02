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
