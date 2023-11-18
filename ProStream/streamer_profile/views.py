from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q 

from .models import * 
from .serializer import * 
from accounts.models import CustomUser
from live_stream.models import Category 
from dashboards.serializers import EditChannelSerializer
from accounts.utils import EmailUser, updated_email_formatter

class StreamerCreateAPI(APIView): 
        ''' Creates An Instance Of Streamer '''
        permission_classes = [IsAuthenticated]
        def post(self, request): 
                if request.user.is_a_streamer == True:
                        return Response({'status' : 'error', 'data' : "You are already a Streamer"}, status=status.HTTP_201_CREATED)
                serializer = StreamerCRUDSerializer(data=request.data)
                email_send = False 
                if serializer.is_valid(): 
                        instance = serializer.save()
                        user = request.user
                        user.streamer_id = instance.id
                        instance.original_user = user
                        streamer_channel = Channel.objects.create(streamer=instance)  # when a user registers as streamer, create a channel for that streamer 
                        instance.channel_id = streamer_channel.id
                        user.is_a_streamer = True
                        user.save()
                        instance.save()
                        streamer_social_media = SocialMedia.objects.get_or_create(streamer = instance, channel = streamer_channel) # when a streamer register then create his social media instance
                        try: 
                                email_body = updated_email_formatter(request.user, user_sign_up_as_streamer=True)
                                EmailUser.send_email(email_body)
                                email_send = True 
                        except Exception as e: 
                                print('streamer create email not send: ',  str(e))
                                email_send = False 
                                pass 
                        if email_send: 
                                return Response({'status' : 'success', 'data' : "Streamer and Streamer's Channel Created, Email Send Successfull!"}, status=status.HTTP_201_CREATED)
                        return Response({'status' : 'success', 'data' : "Streamer and Streamer's Channel Created, But Eamil Send Unsuccessfull!"}, status=status.HTTP_201_CREATED)
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
                        if streamer.original_user.profile_picture: 
                                data = {
                                        'streamer_id' : streamer.id,  
                                        'user_username' : streamer.original_user.username,  # to store in temp data model, so that these can be shown in For You sectuion with the Temp Data GET API 
                                        'profile_image_url' : streamer.original_user.profile_picture, 
                                }
                        else : 
                                data = {
                                        'streamer_id' : streamer.id,  
                                        'user_username' : streamer.original_user.username,  # to store in temp data model, so that these can be shown in For You sectuion with the Temp Data GET API 
                                        'profile_image_url' : None 
                                }
                        return Response({'status' : 'success', 'data' : data}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        


class UserFollowAPI(APIView):
        permission_classes = [IsAuthenticated]
        def get(self, request):
                user = request.user
                following_id = request.query_params.get('streamer_id')
                category_name = request.data.get('category')
                if following_id and category_name == None:
                        try:
                                Follow.objects.get(follower=user, following__id = following_id)
                        except Follow.DoesNotExist:
                                return Response({'status' : 'error', 'data' : "Does not follow streamer"}, status=status.HTTP_200_OK) # this user has not followed the streamer

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
                        if user.streamer_id == following_id:
                                return Response({'status': 'error', 'data': 'Streamer can not himself'}, status=status.HTTP_400_BAD_REQUEST)

                        try:
                                streamer = Streamer.objects.get(id = following_id)
                        except Streamer.DoesNotExist:
                                return Response({'status': 'error', 'data': 'Invalid Streamer id!'}, status=status.HTTP_400_BAD_REQUEST)
                        try:
                                channel = Channel.objects.get(streamer = streamer)
                        except:
                                return Response({'status': 'error', 'data': 'Channel not found'}, status=status.HTTP_400_BAD_REQUEST)
                        if Follow.objects.filter(follower=user, following = streamer).exists(): 
                                return Response({'status' : 'error', 'data' : 'You have already followed'}, status=status.HTTP_400_BAD_REQUEST)
                        channel.total_followers += 1
                        channel.save()
                        Follow.objects.get_or_create(follower=user, following = streamer)

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
                
                try:
                        channel = Channel.objects.get(streamer__id = streamer_id)
                except:
                        return Response({'status': 'error', 'data': 'Channel not found'}, status=status.HTTP_400_BAD_REQUEST)
                       
                channel.total_followers -= 1
                channel.save()
                return Response({'status': 'success', 'data': 'Unfollowed successfully'}, status=status.HTTP_204_NO_CONTENT)
        


class GetAllStreamersAPI(APIView): 
        ''' API to get all the streamers in For You Section | (these are not the currently live streamers) '''
        def get(self, request): 
                all_streamers = Streamer.objects.all()
                serializers = StreamerSerializerForYouSection(all_streamers, many=True)
                return Response({'status' : 'success', 'data' : serializers.data}, status=status.HTTP_200_OK) 



class StreamerDetailsAPI(APIView): 
        ''' API to show Streamer details | Takes username of the user in QueryParameter  '''
        
        def get(self, request):  
                username = request.query_params.get('username')
                try: 
                        user = CustomUser.objects.get(username=username)
                        streamer = user.streamer # reverse relationship 
                        # channel_id = streamer.channel_id  no use here 
                        channel = Channel.objects.get(streamer=streamer)
                        
                        streamer_serializer = StreamerInfoSerialiser(streamer)
                        channel_serializer = EditChannelSerializer(channel)
                        data = {
                                'streamer' : streamer_serializer.data, 
                                'channel' : channel_serializer.data
                        }
                        return Response({'status' : 'success', 'data' : data}, status=status.HTTP_200_OK)
                except CustomUser.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : f'User with this username - {username} could not be found'}, status=status.HTTP_400_BAD_REQUEST)
                

class CategoryAPI(APIView): 
        ''' API to show categories in home page and show all the Categories Based On Tag Click '''
        # Categories will be added by admin | users are not allowed to add categories 
        def get(self, request): 
                tag = request.query_params.get('tag')
                if tag: 
                        categories_with_searched_tags = Category.objects.filter(Q(tag1__icontains=tag) | Q(tag2__icontains=tag))
                        serializer = CategorySerializer(categories_with_searched_tags, many=True)
                        return Response({'status' : 'success', 'data' : serializer.data}, status=status.HTTP_200_OK)
                else: 
                        categories = Category.objects.all()
                        serializer = CategorySerializer(categories, many=True)
                        return Response({'status' : 'success', 'data' : serializer.data}, status=status.HTTP_200_OK)
        
        
        
        
        
        
        
        
        
        
        