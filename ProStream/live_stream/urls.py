

from django.urls import path 

from . import views  

urlpatterns = [
        path('category-crud/api/', views.CategoryCRUDAPI.as_view(), name='category_crud'), 
        path('get/current-stream-details/api/', views.GetCurrentStreamDetails.as_view(), name='current_stream_details'), 
        path('get/channel-details/api/', views.GetChannelDetails.as_view(), name='channel_details'), 
]