from django.shortcuts import render

# Create your views here.

# django 
from django.contrib.auth import authenticate  # this authenticate uses custom authentication Backend 
from django.utils.encoding import smart_str
from django.utils.http import urlsafe_base64_decode
# rest framework 
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# local import 
# AuthAPIRenderer - for custom json renderer | stops the browsable api (renderer_classes = [AuthAPIRenderer])
# currently passing "status" key for sucess and error checking in the client side 
from .renderer import AuthAPIRenderer 
from .serializer import * 
# to send email 
from .utils import EmailUser, format_email, generate_otp, get_tokens_for_user



class RegistrationAPI(APIView):
        ''' Registers an user with username, email and password and passes token  '''
        def post(self, request): 
                serializer = RegistrationAPISerializer(data=request.data)
                if serializer.is_valid(): # do not raise exception here, let the structured erros pass to the client 
                        user = serializer.save()
                        token = get_tokens_for_user(user)
                        return Response({'status' : 'success', 'token' : token}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        

class LoginAPI(APIView): 
        ''' Authenticates an user with either username or email and password, and passes token '''
        def post(self, request): 
                serializer = LoginSerializer(data=request.data)
                if serializer.is_valid(): 
                        
                        username = serializer.validated_data.get('username', None)
                        email = serializer.validated_data.get('email', None)
                        password = serializer.validated_data.get('password', None)
                        
                        # users are able to log in using either username or email and password 
                        if username: 
                                user = authenticate(request, username=username,  password=password)
                        else: 
                                user = authenticate(request, email=email,  password=password)
                                 
                        if user is not None: 
                                token = get_tokens_for_user(user)
                                return Response({'status' : 'success', 'token' : token}, status=status.HTTP_200_OK)
                        return Response({'status' : 'error', 'data' : {'non_field_errors' : ['Username, email or password is incorrect']}}, status=status.HTTP_404_NOT_FOUND)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_404_NOT_FOUND)
                        


class ChangePasswordAPI(APIView):
        ''' Changes password of an authenticated user '''
        permission_classes = [IsAuthenticated]
        def post(self, request): 
                serializer = ChangePasswordAPISerializer(data=request.data, context={'user' : request.user})
                if serializer.is_valid(): 
                        token = get_tokens_for_user(request.user)
                        return Response({'status' : 'success', 'token' : token, 'data' : 'Password changed successfully !'}, status=status.HTTP_200_OK)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_404_NOT_FOUND)
                        

class ResetPaswordEmailLinkRequestAPI(APIView): 
        ''' Reset Password. Sends a password reset link to the user's email '''
        def post(self, request): 
                serializer = ResetPasswordEmailLinkRequestSerializer(data=request.data)
                if serializer.is_valid(): 
                        return Response({'status' : 'success', 'data' : 'Password reset email sent successfully!'}, status=status.HTTP_200_OK)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

class ResetPasswordEmailConfirmationAPI(APIView): 
        ''' Validates and changes the password from email link '''
        
        def post(self, request, encoded_uuid, password_token): 
                serializer = ResetPasswordEmailConfirmationSerializer(data=request.data, context={
                        'encoded_uuid' : encoded_uuid, 'password_token' : password_token, 
                })
                if serializer.is_valid(): 
                        # no validation is needed here as everything is taken care in the serializer class 
                        # if anything goes wrong, serilaiser.errors will catch it.
                        decoded_uuid = smart_str(urlsafe_base64_decode(encoded_uuid))
                        user = CustomUser.objects.get(id=decoded_uuid)
                        token = get_tokens_for_user(user)
                        return Response({'status' : 'success', 'token' : token, 'data' : 'Password changed successfully !'}, status=status.HTTP_200_OK)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        


class ResetPasswordEmailOtpAPI(APIView): 
        ''' Sends and OTP to the user's email to reset password ''' 
        ''' user may pass either username or email (client should redirect to otp input page) '''
        def post(self, request): 
                print("request.data, : ",  request.data)
                username_or_email = request.data.get('credential')  # in the client side, this "credential" must be cached, and when the user inputs the otp, then this cached credential must be sent to the backend 
                try : 
                        try : 
                                user = CustomUser.objects.get(email=username_or_email)
                        except CustomUser.DoesNotExist: 
                                user = CustomUser.objects.get(username=username_or_email)
                except CustomUser.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : 'User with this email or username does not exist!'})
                
                otp = generate_otp(otp_size=6)
                user.otp = otp 
                user.save()
                data = format_email(user=user, otp=otp)  # from util | takes care of otp and link both 
                EmailUser.send_email(data)
                return Response({'status' : 'success', 'data' : 'Password reset email sent successfully!'}, status=status.HTTP_200_OK)
        


class ResetPasswordEmailOtpConfirmationAPI(APIView): 
        ''' Validates and changes the password from email OTP. The user may pass either username or email. '''
        ''' User credential must be stored in cached and passed with the otp in the  (ResetPasswordEmailOtpAPI) API. '''

        def post(self, request): 
                username_or_email = request.data.get('credential')  # assume the cached "credential" is passed along with the otp 
                otp = request.data.get('otp')
                try : 
                        try : 
                                user = CustomUser.objects.get(email=username_or_email)
                        except CustomUser.DoesNotExist: 
                                user = CustomUser.objects.get(username=username_or_email)
                except CustomUser.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : 'User with this email or username does not exist!'})
                serializer = ResetPasswordEmailOtpConfirmationSerializer(data=request.data, context={'user' : user, 'otp' : otp, 'view' : self}) 
                if serializer.is_valid(): 
                        token = get_tokens_for_user(user)
                        return Response({'status' : 'success', 'token' : token, 'data' : 'Password changed successfully !'}, status=status.HTTP_200_OK)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                        