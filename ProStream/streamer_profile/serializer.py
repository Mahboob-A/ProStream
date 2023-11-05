

from rest_framework import serializers


from .models import * 

class StreamerCRUDSerializer(serializers.ModelSerializer): 
        class Meta: 
                model = Streamer
                fields = '__all__'


class StreamCRUDSerializer(serializers.ModelSerializer): 
        ''' This Stream Model Stores Data For Each Stream Happening In The Platform '''
        class Meta: 
                model = Stream 
                fields = '__all__'