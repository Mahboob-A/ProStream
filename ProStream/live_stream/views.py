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
                streamer_id = user.streamer_id
                query_streamer_id = request.query_params.get('streamer_id')
                if streamer_id == query_streamer_id:
                        try:
                                streamer = Streamer.objects.get(id = streamer_id)
                        except Streamer.DoesNotExist:
                                return Response({'status' : 'error', 'data' : 'Streamer not found'}, status=status.HTTP_201_CREATED)
                                
                        current_stream = Stream.objects.filter(streamer=streamer).order_by('-createdAt').first()
                        serializer = StreamSerializer(current_stream)
                        return Response({'status': 'success', 'data': serializer.data, "streamer_id":streamer_id}, status=status.HTTP_200_OK)
                else:
                        return Response({'status' : 'error', 'data' : 'Streamer id mis match'}, status=status.HTTP_201_CREATED)



