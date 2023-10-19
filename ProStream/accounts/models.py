from django.db import models
from django.contrib.auth.models import User, AbstractUser, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.urls import reverse
from django.utils import timezone
import uuid
from django.core.mail import send_mail 
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.core.validators import RegexValidator

phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")


class CustomUser(AbstractBaseUser, PermissionsMixin): 
        id = models.UUIDField(primary_key = True,default = uuid.uuid4, editable = False)
        username = models.CharField(_('username'), max_length=25, unique=True)
        email = models.EmailField(_('email address'), max_length=50, unique=True, default='abc@gmail.com')
        phone_number = models.CharField(_('phone no'), validators=[phone_regex],  max_length=15, null=True, blank=True)
        dob = models.DateField(_('date of birth'), null=True, blank=True)
        gender = models.CharField(_('gender'), max_length=3, choices=(('m', 'Male'), ('f', 'Female'), ('o', 'Other')), null=True, blank=True)
        
        
        is_active = models.BooleanField(default=True)
        is_staff = models.BooleanField(default=False)
        is_temporarily_suspended = models.BooleanField(default=False)
        is_permanently_banned = models.BooleanField(default=False)
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True) 
        
        objects = CustomUserManager()
        
        USERNAME_FIELD = 'username'
        REQUIRED_FIELDS = ['email']  # this is for superuser only 
        
        def __str__(self): 
                return self.username 
        
        class Meta:
                verbose_name = _('Custom User')
                verbose_name_plural = _('Custom Users')
        
        def get_username(self): 
                '''
                retunrs the username of the user
                '''
                return self.username 

        def get_email(self): 
                return self.email
        
        def get_phone_number(self): 
                return self.phone_number 
        
        def email_user(self, subject, message, from_email=None, **kwargs): 
                send_mail(subject, message, from_email, [self.email], **kwargs)


        
        
        
        
        
        
         
        