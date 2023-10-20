
from rest_framework import serializers 
from .models import CustomUser 


class UserSignUpSerializer(serializers.ModelSerializer): 
        email = serializers.EmailField(required=True)
        class Meta: 
                model = CustomUser 
                fields = ['username', 'email', 'password']
                extra_fields = {'password' : {'write_only' : True}}


class UserLoginSerializer(serializers.ModelSerializer): 
        username = serializers.CharField(max_length=25)
        class Meta: 
                model = CustomUser 
                fields = ['username', 'password']
                extra_fields = {'password' : {'write_only' : True}}

                