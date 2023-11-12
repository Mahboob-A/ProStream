from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .models import * 
from .serializer import * 

from rest_framework.permissions import IsAuthenticated

class StreamerCreateAPI(APIView): 
        ''' Creates An Instance Of Streamer '''
        permission_classes = [IsAuthenticated]
        def post(self, request): 
                serializer = StreamerCRUDSerializer(data=request.data)
                if serializer.is_valid(): 
                        instance = serializer.save()
                        user = request.user
                        user.streamer_id = instance.id
                        instance.original_user = user
                        streamer_channel = Channel.objects.create(streamer=instance)  # when a user registers as streamer, create a channel for that streamer 
                        instance.channel_id = streamer_channel.id
                        user.save()
                        instance.save()
                        return Response({'status' : 'success', 'data' : "Streamer and Streamer's Channel Created Successfully!"}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




class StreamGoLiveAPI(APIView): 
        permission_classes = [IsAuthenticated]
        ''' Creates An Instance Of Stream Model When A Streamer Goes Live '''
        def post(self, request): 
                user = request.user 
                streamer_id = user.streamer_id
                print('streamer_id: ', streamer_id)
                serializer = StreamCRUDSerializer(data=request.data)
                print('data :  ', request.data)
                print('user : ', user)
                if serializer.is_valid(): 
                        instance = serializer.save()
                        instance.streamer = streamer_id
                        instance.save()
                        return Response({'status' : 'success', 'data' : 'Stream InstanceCreated Successfully!'}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)