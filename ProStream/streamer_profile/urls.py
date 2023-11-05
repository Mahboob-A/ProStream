

from django.urls import path 

from . import views 

urlpatterns = [
        path('create-streamer/api/', views.StreamerCreateAPI.as_view(), name='create_streamer'),
        path('create-stream/api/', views.StreamGoLiveAPI.as_view(), name='create_stream'),
]