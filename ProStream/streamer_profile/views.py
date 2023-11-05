from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .models import * 
from .serializer import * 



class StreamerCreateAPI(APIView): 
        ''' Creates An Instance Of Streamer '''
        def post(self, request): 
                serializer = StreamerCRUDSerializer(data=request.data)
                if serializer.is_valid(): 
                        streamer = serializer.save()
                        user = streamer.original_user 
                        user.streamer_id = streamer.id
                        user.save()
                        return Response({'status' : 'success', 'data' : 'Streamer Created Successfully!'}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




class StreamGoLiveAPI(APIView): 
        ''' Creates An Instance Of Stream Model When A Streamer Goes Live '''
        def post(self, request): 
                serializer = StreamCRUDSerializer(data=request.data)
                if serializer.is_valid(): 
                        serializer.save()
                        return Response({'status' : 'success', 'data' : 'Stream InstanceCreated Successfully!'}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)