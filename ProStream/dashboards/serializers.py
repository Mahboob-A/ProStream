
from rest_framework import serializers

from accounts.models import CustomUser
from streamer_profile.models import * 



class EditProfileSerializer(serializers.ModelSerializer): 
        class Meta: 
                model = CustomUser 
                fields = ['email', 'profile_picture', 'phone_number', 'dob', 'gender']
                
class EditChannelSerializer(serializers.ModelSerializer): 
        class Meta: 
                model = Channel
                fields = [ 'bio', 'channel_display_name', 'display_picture', 'channel_banner_picture', 'streamer_about_1', 'streamer_about_2']
                