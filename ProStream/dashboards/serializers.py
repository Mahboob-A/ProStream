
from rest_framework.serializers import ModelSerializer 

from accounts.models import CustomUser
from streamer_profile.models import * 
from finance.models import StreamerWallet


''' APIs For Edit Profile Section '''
class EditProfileSerializer(ModelSerializer): 
        class Meta: 
                model = CustomUser 
                fields = ['email', 'profile_picture', 'phone_number', 'dob', 'gender']
                

class EditChannelSerializer(ModelSerializer): 
        class Meta: 
                model = Channel
                fields = ['bio','channel_display_name','display_picture','channel_banner_picture','total_followers','streamer_about_1','streamer_about_2']
                 


''' APIs For Team Section  '''

class StreamSerializerForTeam(ModelSerializer): 
        class Meta: 
                model = Streamer
                fields = ['id',  'first_name', 'last_name', 'is_in_a_team']
class TeamSerializer(ModelSerializer): 
        admin = StreamSerializerForTeam(read_only=True)
        members = StreamSerializerForTeam(many=True, read_only=True)
        class Meta: 
                model = Team 
                fields = '__all__'

class SocialMediaSerializer(ModelSerializer):
        class Meta:
                model = SocialMedia 
                fields = '__all__' 