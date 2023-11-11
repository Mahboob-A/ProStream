from django.shortcuts import render
import random
import string 
import time 
from django.http import JsonResponse 
from django.views.decorators.csrf import csrf_exempt
import json 

from .models import RoomMembers, StreamInfo, TempStremData

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 


from agora_token_builder import RtcTokenBuilder
from .serializer import TempStremDataSerializer

def get_random_channel_name(): 
        string_length = random.randint(5, 15)  
        letters = 'ABCDE1FG34H45IJK86LM7N3OPQ86RS0T23UV9WZ2Y6Z'
        result = ''.join(random.choice(letters) for _ in range(string_length))
        return result


currentId = 0 
def get_uid(): 
        global currentId
        if currentId == 0: 
                currentId += 1 
                return 1 
        currentId += 1 
        return currentId


def getToken(request): 
        appId = '165129b40d854d378bb66172725f9dd2'
        appCertificate = '42aba9a313ab4670b594e68608433084'
        channelName = request.GET.get('channel')
        uid = random.randint(1, 230) * 30
        role = 2
        expirationTime = 3600 # seconds
        curerntTimeStamp = time.time()
        privilegeExpiredTs = curerntTimeStamp + expirationTime 
        
        token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
        return JsonResponse({'token' : token, 'uid' : uid, 'role' : role, 'channel' : channelName}, safe=False)


# APIs For Agora Token 
class GetTokenForHostAPI(APIView): 
        ''' API For Agora Video SDK Token For Host '''
        def get(self, request): 
                appId = '165129b40d854d378bb66172725f9dd2'
                appCertificate = '42aba9a313ab4670b594e68608433084'
                channelName = get_random_channel_name()
                uid = random.randint(1, 230) * 25
                role = 2
                expirationTime = 3600 # seconds
                curerntTimeStamp = time.time()
                privilegeExpiredTs = curerntTimeStamp + expirationTime 
                print('host channel : ', channelName)
                token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
                return Response({'token' : token, 'uid' : uid, 'role' : role, 'channel' : channelName}, status=status.HTTP_200_OK)
        


class GetTokenForViewerAPI(APIView): 
        ''' API For Agora Video SDK Token For Viewer  '''
        def get(self, request): 
                appId = '165129b40d854d378bb66172725f9dd2'
                appCertificate = '42aba9a313ab4670b594e68608433084'
                channelName = request.GET.get('channel',) 
                uid = random.randint(1, 230) * 25
                role = 2
                expirationTime = 3600 # seconds
                curerntTimeStamp = time.time()
                privilegeExpiredTs = curerntTimeStamp + expirationTime 
                
                token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
                return Response({'token' : token, 'uid' : uid, 'role' : role, 'channel' : channelName}, status=status.HTTP_200_OK)




def stream_info(request): 
        return render(request, 'AgoraClient/take_stream_info.html')


                        
         

























@csrf_exempt
def createUser(request): 
        data = json.loads(request.body)
        userName = data.get('username')
        uid = data.get('uid')
        roomName = data.get('room')
        user, created = RoomMembers.objects.get_or_create(uid=uid, userName=userName, roomName=roomName)
        return JsonResponse({'username' : userName}, safe=False)
        

def getMemberName(request): 
        uid = request.GET.get('uid')
        roomName = request.GET.get('room')
        user = RoomMembers.objects.get(uid=uid, roomName=roomName)
        return JsonResponse({'username' : user.userName}, safe=False)


@csrf_exempt
def deleteUser(request): 
        data = json.loads(request.body)
        userName = data.get('username')
        uid = data.get('uid')
        roomName = data.get('room')
        user = RoomMembers.objects.get(uid=uid, userName=userName, roomName=roomName)
        user.delete()
        return JsonResponse({'status' : 'User deleted'}, safe=False)


def home(request): 
        return render(request, 'AgoraClient/home.html')

def stream(request): 
        return render(request, 'AgoraClient/stream.html')



class TempStremDataAPI(APIView): 
        '''' api for temporary data '''
        def get(self, request): 
                all_data = TempStremData.objects.all()
                serializer = TempStremDataSerializer(all_data, many=True)
                return Response({'status' : 'success', 'data' : serializer.data}, status=status.HTTP_200_OK)
        
        def post(self, request): 
                serializer = TempStremDataSerializer(data=request.data)
                if serializer.is_valid(): 
                        serializer.save()
                        return Response({'status' : 'success', 'data' : 'Data Created Successfully!'}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_404_NOT_FOUND)
        
        def delete(self, request): 
                # uid = request.data.get('uid')
                # channel_name = request.data.get('channel_name')
                channel_name = request.query_params.get('channel_name')
                print("Channel name",channel_name)
                # token = request.data.get('token')
                try : 
                        item = TempStremData.objects.get( channel_name=channel_name )
                        item.delete()
                        print("Item delete")
                        return Response({'status' : 'success', 'data' : 'Data Deleted Successfully!'}, status=status.HTTP_204_NO_CONTENT)
                except TempStremData.DoesNotExist: 
                        print("Could not delete")
                        return Response({'status' : 'error', 'data' : 'Data Not Found'}, status=status.HTTP_404_NOT_FOUND)
