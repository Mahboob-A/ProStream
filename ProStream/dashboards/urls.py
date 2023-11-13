
# 111123, Saturday, 11.00 am 


from django.urls import path 
from . import views

urlpatterns = [
        # APIs for Edit Profile 
        path('edit-profile/api/', views.EditProfileAPI.as_view(), name='edit_profile'),
        path('edit-channel/api/', views.EditChannelAPI.as_view(), name='edit_profile'),
        path('team-crud/api/', views.TeamCRUDAPI.as_view(), name='team_crud_api'),
        path('team-action/api/', views.TeamActionAPI.as_view(), name='team_action_api'),
        path('get/user-wallet-status/', views.UserWalletStatusAPI.as_view(), name='user_wallet_status'),
        path('add/social-media-links/api/', views.AddSocialLinksAPI.as_view(), name = 'add_social_media_links')
]
