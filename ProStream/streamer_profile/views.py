from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .models import * 
from .serializer import * 
from live_stream.models import Category 

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
                        streamer_social_media = SocialMedia.objects.get_or_create(streamer = instance, channel = streamer_channel) # when a streamer register then create his social media instance
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
                try:
                        streamer = Streamer.objects.get(id = streamer_id)
                except Streamer.DoesNotExist:
                        return Response({'status' : 'error', 'data' : 'Streamer not found'}, status=status.HTTP_400_BAD_REQUEST)

                if serializer.is_valid(): 
                        instance = serializer.save()
                        instance.streamer = streamer
                        instance.save()
                        return Response({'status' : 'success', 'data' : 'Stream InstanceCreated Successfully!'}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        


class UserFollowAPI(APIView):
        permission_classes = [IsAuthenticated]
        def get(self, request):
                user = request.user
                following_id = request.data.get('streamer_id')
                category_name = request.data.get('category')
                if following_id and category_name == None:
                        try:
                                Follow.objects.get(follower=user, following__id = following_id)
                        except Follow.DoesNotExist:
                                return Response({'status' : 'error', 'data' : 'User did not follow the streamer'}, status=status.HTTP_400_BAD_REQUEST)

                elif category_name:
                        try:
                                Follow.objects.get(follower=user, category_following__name = category_name)
                        except Follow.DoesNotExist:
                                return Response({'status' : 'error', 'data' : 'User did not follow this category'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                        return Response({'status': 'error', 'data': 'Invalid streamer id or category name'}, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({'status': 'success', 'data': 'Allready followed'}, status=status.HTTP_201_CREATED)

        def post(self, request):
                user = request.user
                following_id = request.data.get('streamer_id')
                category_name = request.data.get('category')

                if following_id:
                        try:
                                streamer = Streamer.objects.get(id = following_id)
                        except Streamer.DoesNotExist:
                                return Response({'status': 'error', 'data': 'Invalid Streamer id!'}, status=status.HTTP_400_BAD_REQUEST)
                        Follow.objects.get_or_create(follower=user, following_id = following_id)
                elif category_name:
                        try:
                                category = Category.objects.get(name = category_name)
                        except Category.DoesNotExist:
                                return Response({'status': 'error', 'data': 'Category does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
                        Follow.objects.get_or_create(follower=user, category_following = category)
                else:
                        return Response({'status': 'error', 'data': 'Invalid streamer id or category name'}, status=status.HTTP_400_BAD_REQUEST)
                return Response({'status': 'success', 'data': 'Followed successfully'}, status=status.HTTP_201_CREATED)
                
        def delete(self, request):
                user = request.user
                streamer_id = request.data.get('streamer_id')
                category_name = request.data.get('category')

                if streamer_id and category_name == None:
                        try:
                                Follow.objects.get(follower=user, following__id=streamer_id).delete()
                        except Follow.DoesNotExist:
                                return Response({'status': 'error', 'data': 'Invalid streamer id'}, status=status.HTTP_400_BAD_REQUEST)
                elif category_name:
                        try:
                                Follow.objects.get(follower=user, category_following_name = category_name).delete()
                        except:
                                return Response({'status': 'error', 'data': 'category name'}, status=status.HTTP_400_BAD_REQUEST)
                                
                else:
                        return Response({'status': 'error', 'data': 'Invalid streamer id or category name'}, status=status.HTTP_400_BAD_REQUEST)
                return Response({'status': 'success', 'data': 'Unfollowed successfully'}, status=status.HTTP_204_NO_CONTENT)
        
