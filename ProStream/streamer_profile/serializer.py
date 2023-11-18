

from rest_framework import serializers


from .models import * 


class StreamerCRUDSerializer(serializers.ModelSerializer): 
        class Meta: 
                model = Streamer
                fields = '__all__'

class StreamerInfoSerialiser(serializers.ModelSerializer): 
        class Meta: 
                model = Streamer
                fields = ['first_name', 'last_name', 'is_actively_streraming', 'is_in_a_team', 'is_temporarily_deactivated', ]

class StreamCRUDSerializer(serializers.ModelSerializer): 
        ''' This Stream Model Stores Data For Each Stream Happening In The Platform '''
        class Meta: 
                model = Stream 
                fields = '__all__'
                
                
class CategorySerializer(serializers.ModelSerializer): 
        ''' Category Serializer '''
        class Meta: 
                model = Category
                exclude = ['createdAt', 'updatedAt', 'deletedAt']
                
class StreamerSerializerForYouSection(serializers.ModelSerializer): 
        ''' serializer for streamers details for For You Section '''
        username = serializers.CharField(source='original_user.username', read_only=True)
        profile_picture = serializers.ImageField(source='original_user.profile_picture', read_only=True) 
        class Meta: 
                model = Streamer
                fields = ['username', 'profile_picture']