from django.urls import path
from .views import UserSignUp, UserLogin

urlpatterns = [
        path('register/', UserSignUp.as_view(), name='register'),
        path('login/', UserLogin.as_view(), name='login'),
]
