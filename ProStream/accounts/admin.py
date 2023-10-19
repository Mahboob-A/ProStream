from django.contrib import admin

# Register your models here.
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):        
        list_display = ['id', 'username', 'email', 'phone_number', 'dob', 'gender', 'is_temporarily_suspended', 'is_permanently_banned', 
                       'is_staff', 'createdAt', 'updatedAt', ]