from django.shortcuts import render
from .serializer import UserSignUpSerializer, UserLoginSerializer
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# Create your views here.

# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

# signup view
class UserSignUp(APIView):  
        def post(self, request, format=None): 
                serializer = UserSignUpSerializer(data=request.data)
                if serializer.is_valid(raise_exception=True): 
                        user = serializer.save()
                        '''generate token'''
                        token = get_tokens_for_user(user)
                        return Response({'status' : 'success', 'token':token, 'data' : 'user created successfully !!'}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# login view
class UserLogin(APIView):
        def post(self, request, format = None):
                serializer = UserLoginSerializer(data=request.data)
                if serializer.is_valid(raise_exception=True):
                        print(serializer.data)
                        username = serializer.data.get('username')
                        password = serializer.data.get('password')
                        user = authenticate(username = username, password=password)
                        if user is not None:
                            '''generate token'''               
                            token = get_tokens_for_user(user)
                            return Response({'status' : 'success', 'token' : token}, status=status.HTTP_200_OK)
                        return Response({'status' : 'error', 'data' : 'login failed'}, status=status.HTTP_404_NOT_FOUND)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




