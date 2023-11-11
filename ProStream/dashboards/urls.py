
# 111123, Saturday, 11.00 am 


from django.urls import path 
from . import views

urlpatterns = [
        # APIs for Edit Profile 
        path('edit-profile/api/', views.EditProfileAPI.as_view(), name='edit_profile'),
        path('edit-channel/api/', views.EditChannelAPI.as_view(), name='edit_profile'),
]
