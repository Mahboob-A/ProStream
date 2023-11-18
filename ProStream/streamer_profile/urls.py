

from django.urls import path 

from . import views 

urlpatterns = [
        path('create-streamer/api/', views.StreamerCreateAPI.as_view(), name='create_streamer'),
        path('create-stream/api/', views.StreamGoLiveAPI.as_view(), name='create_stream'),
        path('follow-streamer-category/api/', views.UserFollowAPI.as_view(), name='follow_streamer_category'),
        # path('unfollow-streamer-category/api/', views.FollowRemoveAPI.as_view(), name='unfollow_streamer_category'),
        
        # streamer details 
        path('get-streamer-details/api/', views.StreamerDetailsAPI.as_view(), name='streamer_details'), 
        
        # category api - fetches category based on tags if tags in query param, or passes all categorues 
        path('get-categories/api/', views.CategoryAPI.as_view(), name='category_api'),
        
        # get all the streamer details 
        path('get-all-streamer-details/api/', views.GetAllStreamersAPI.as_view(), name='get_all_streamer_details'),

]