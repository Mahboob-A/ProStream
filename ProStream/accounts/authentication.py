

from django.contrib.auth.backends import ModelBackend
from .models import CustomUser

class CustomUserBackend(ModelBackend):
    ''' A custom authentication backend for authenticate users in login apis '''
    def authenticate(self, request, username=None, email=None, password=None, **kwargs):
        try:
            if username: 
                user = CustomUser.objects.get(username=username)
            else:         
                user = CustomUser.objects.get(email=email)
            if user.check_password(password):
                return user
        except CustomUser.DoesNotExist:
            return None
