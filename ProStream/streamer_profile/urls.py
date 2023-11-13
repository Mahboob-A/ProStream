

from django.urls import path 

from . import views 

urlpatterns = [
        path('create-streamer/api/', views.StreamerCreateAPI.as_view(), name='create_streamer'),
        path('create-stream/api/', views.StreamGoLiveAPI.as_view(), name='create_stream'),
        path('follow-streamer-category/api/', views.UserFollowAPI.as_view(), name='follow_streamer_category'),
        # path('unfollow-streamer-category/api/', views.FollowRemoveAPI.as_view(), name='unfollow_streamer_category'),
]