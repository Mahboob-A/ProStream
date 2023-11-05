from django.contrib import admin

from .models import CustomUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin  


class CustomUserAdmin(BaseUserAdmin):

        list_display = ['id', 'username', 'email', 'phone_number',  'is_a_user', 'is_a_streamer', 
                       'is_staff', 'createdAt', 'updatedAt', ]
        list_filter = ["email"]
        fieldsets = [
                ('User Credentials' , {"fields": ["email",  "username", "is_a_user", "is_a_streamer"]}),
                ("Personal info", {"fields": ['phone_number',"dob", "gender",]}),
                ("Permissions", {"fields": ["is_staff", "is_email_verified", "is_temporarily_suspended", "is_permanently_banned"]}),
        ]
        add_fieldsets = [
                (
                None,{
                        "classes": ["wide"],
                        "fields": ["email", 'username', "password1", "password2", "is_a_user", "is_a_streamer", "is_staff", "dob", "gender", "phone_number"],
                },
        ),
        ]
        search_fields = ["email", "username"]
        ordering = ["email", "username"]
        filter_horizontal = []

admin.site.register(CustomUser, CustomUserAdmin)
