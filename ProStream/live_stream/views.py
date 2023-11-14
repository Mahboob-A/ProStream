from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView

from rest_framework import status

from rest_framework.response import Response




from .models import * 

from .serializer import * 
from streamer_profile.models import *

from rest_framework.permissions import IsAuthenticated

class CategoryCRUDAPI(APIView): 
        ''' CRUD of Category Model '''
        def get(self, request): 
                categories = Category.objects.all()
                serializers = CategoryCRUDSerializer(categories, many=True)
                return Response({'status' : 'success', 'data' : serializers.data}, status=status.HTTP_200_OK)

        def post(self, request): 
                serializer = CategoryCRUDSerializer(data=request.data)
                if serializer.is_valid(): 
                        serializer.save()
                        return Response({'status' : 'success', 'data' : 'Category Created Successfully!'}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class GetCurrentStreamDetails(APIView):
        permission_classes = [IsAuthenticated]
        def get(self, request):
                user = request.user
                try:
                        streamer = Streamer.objects.get(id = user.streamer_id)
                except Streamer.DoesNotExist:
                        return Response({'status' : 'error', 'data' : 'Streamer not found'}, status=status.HTTP_201_CREATED)
                         
                current_stream = Stream.objects.filter(streamer=streamer).order_by('-createdAt').first()
                serializer = StreamSerializer(current_stream)
                return Response({'status': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)
                

# class GetChannelDetails(APIView):
#         permission_classes = [IsAuthenticated]
#         def get(self, request):
#                 user = request.user
#                 try:
#                         streamer = Streamer.objects.get(id = user.streamer_id)
#                 except Streamer.DoesNotExist:
#                         return Response({'status' : 'error', 'data' : 'Streamer not found'}, status=status.HTTP_201_CREATED)
#                 try:
#                         channel = Channel.objects.get(streamer = streamer)
#                 except Channel.DoesNotExist:
#                         return Response({'status' : 'error', 'data' : 'Streamer not found'}, status=status.HTTP_201_CREATED)
#                 serializer = ChannelDetailsSerializer(channel)
#                 return Response({'status': 'success', 'data': { **serializer.data,'streamer_username': user.username}}, status=status.HTTP_200_OK)

