

from rest_framework import serializers

from .models import * 

class CategoryCRUDSerializer(serializers.ModelSerializer): 
        class Meta: 
                model = Category
                fields = '__all__'
                 
                 