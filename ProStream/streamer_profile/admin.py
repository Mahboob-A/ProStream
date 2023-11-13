from django.contrib import admin

# Register your models here.
from .models import * 

admin.site.register(Streamer)
admin.site.register(Stream)
admin.site.register(Channel)
admin.site.register(Team)
admin.site.register(Follow)
admin.site.register(SocialMedia)
