from django.shortcuts import render
# APIs for user and streamer Dashboard's all apis 
# django imports 

# drf imports 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


# local imports 
from accounts.models import CustomUser
from streamer_profile.models import * 
from . import serializers




############################ Streamer Dashboard APIs ##################################

#Prifile Section APIs 

class EditProfileAPI(APIView): 
        ''' API for editing CustomUser model attributes: email, profile_picture, phone_number, dob, and gender '''
        permission_classes = [IsAuthenticated]
        
        def get(self, request): 
                try: 
                        serializer = serializers.EditProfileSerializer(request.user)
                        return Response({'status' : 'success', 'data' : serializer.data}, status=status.HTTP_200_OK)
                except CustomUser.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        def patch(self, request): 
                user = CustomUser.objects.get(id = request.user.id)
                serializer = serializers.EditProfileSerializer(user, data=request.data,  partial=True)
                if serializer.is_valid(): 
                        serializer.save()
                        return Response({'status' : 'success', 'data' : 'Data Updated Successfully!'}, status=status.HTTP_200_OK)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                
 


class EditChannelAPI(APIView): 
        ''' API for editing Channel Information of a Streamer : bio, channel_display_name display_picture channel_banner_picture streamer_about_1 streamer_about_2 '''
        permission_classes = [IsAuthenticated]
        
        def get(self, request):
                try: 
                        streamer_id = request.user.streamer_id
                        serializer = serializers.EditChannelSerializer(streamer_id)
                        return Response({'status' : 'success', 'data' : serializer.data}, status=status.HTTP_200_OK)
                except Channel.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                
        def patch(self, request): 
                streamer_id = request.user.streamer_id        
                try: 
                        channel = Channel.objects.get(streamer=streamer_id)
                except Channel.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                serializer = serializers.EditChannelSerializer(channel, data=request.data, partial=True)
                if serializer.is_valid(): 
                        serializer.save()
                        return Response({'status' : 'success', 'data' : 'Data Updated Successfully!'}, status=status.HTTP_200_OK)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                
        
                        
                
        