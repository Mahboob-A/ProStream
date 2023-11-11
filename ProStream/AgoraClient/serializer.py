from rest_framework import serializers

from .models import *


class TempStremDataSerializer(serializers.ModelSerializer): 
        class Meta: 
                model = TempStremData 
                fields = '__all__'
