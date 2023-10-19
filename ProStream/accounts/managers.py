
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager): 
        def _create_user(self, username, email, password, phone_number=None, **extra_fields): 
                if not username: 
                        raise ValueError('Username must be set')
                if not email: 
                        raise ValueError('Email must be set')
                
                email = self.normalize_email(email)
                        
                user = self.model(
                        username=username, 
                        email=email, 
                        phone_number=phone_number, 
                        **extra_fields, 
                )
                user.set_password(password)
                user.save()
                return user 
        
        def create_user(self,  username, email, password=None, phone_number=None, **extra_fields): 
                extra_fields.setdefault('is_superuser', False)
                extra_fields.setdefault('is_staff', False)
                return self._create_user(username=username, email=email, password=password, phone_number=phone_number, **extra_fields)
        
        def create_superuser(self, username, email, password, **extra_fields):
                extra_fields.setdefault('is_staff', True)
                extra_fields.setdefault('is_superuser', True)
                extra_fields.setdefault('is_active', True)

                if extra_fields.get('is_staff') is not True:
                        raise ValueError(_('Superuser must have is_staff=True.'))
                if extra_fields.get('is_superuser') is not True:
                        raise ValueError(_('Superuser must have is_superuser=True.'))
                return self._create_user(username=username, email=email, password=password, **extra_fields)