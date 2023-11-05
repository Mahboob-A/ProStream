from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView

from rest_framework import status

from rest_framework.response import Response




from .models import * 

from .serializer import * 




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