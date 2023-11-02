from django.urls import path 

from . import views 

urlpatterns = [
    path('home/', views.home, name='home'),
    path('stream/', views.stream, name='stream'),
    path('get-token/', views.getToken, name='get_token'),
    path('get-token/', views.getToken, name='get_token'),
    path('take-stream-info/', views.stream_info, name='take_stream_info'),

    
    path('create-user/', views.createUser, name='create_user '),
    path('get-user-name/', views.getMemberName, name='get_user_name'),
    path('delete-user/', views.deleteUser, name='delete_user'),
]