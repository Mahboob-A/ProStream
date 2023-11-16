from django.shortcuts import render
# APIs for user and streamer Dashboard's all apis 
# django imports 

# drf imports 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal


# local imports 
from accounts.models import CustomUser
from streamer_profile.models import * 
from . import serializers
from finance.models import *


############################ User Dashboard APIs ##################################

class UserWalletStatusAPI(APIView):
        permission_classes = [IsAuthenticated]
        def get(self, request):
                user = request.user
                try:
                        user_wallet = UserWallet.objects.get(user = user)
                except UserWallet.DoesNotExist:
                        return Response({'status' : 'error','message': 'No wallet found'}, status=status.HTTP_400_BAD_REQUEST)
                return Response({'status' : 'success', 'available_amount': user_wallet.available_amount}, status=status.HTTP_200_OK)


# class


############################ Streamer Dashboard APIs ##################################

''' # Prifile Section APIs | Accounts APP '''

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
                user = request.user
                streamer_id = request.query_params.get('streamer_id')
                print("Streamer id: ",streamer_id)
                try:
                        streamer = Streamer.objects.get(id = streamer_id)
                        print("Streamer : ",streamer)
                except Streamer.DoesNotExist:
                        return Response({'status' : 'error', 'data' : 'Streamer not found'}, status=status.HTTP_201_CREATED)
                try:
                        channel = Channel.objects.get(streamer = streamer)
                        print("Channel: ",channel)
                except Channel.DoesNotExist:
                        return Response({'status' : 'error', 'data' : 'Streamer not found'}, status=status.HTTP_201_CREATED)
                serializer = serializers.EditChannelSerializer(channel)
                print("Data: ",serializer.data)
                return Response({'status': 'success', 'data': { **serializer.data,'streamer_username': user.username,"streamer_id":streamer.id}}, status=status.HTTP_200_OK)


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
                
        
class AddSocialLinksAPI(APIView):
        '''This API for streamer to update/add social links'''
        permission_classes = [IsAuthenticated]
        def get(self, request):
                user = request.user 
                streamer_id = request.query_params.get('streamer_id')
                try:
                        streamer = Streamer.objects.get(id = streamer_id)
                except Streamer.DoesNotExist:
                        return Response({'status' : 'error','data': 'No streamer found'}, status=status.HTTP_400_BAD_REQUEST)
                try:
                        social_media = SocialMedia.objects.get(streamer = streamer)
                except SocialMedia.DoesNotExist:
                        return Response({'status' : 'error','data': 'No Social media instance found'}, status=status.HTTP_400_BAD_REQUEST)
                serializer = serializers.SocialMediaSerializer(social_media)
                return Response({'status' : 'success', 'data' : serializer.data}, status=status.HTTP_200_OK)

        def post(self, request):
                user = request.user 
                streamer_id = user.streamer_id
                if SocialMedia.objects.filter(streamer__id = streamer_id).exists():
                        return Response({'status' : 'error','data': 'Social media links already added, you can update'}, status=status.HTTP_400_BAD_REQUEST)
                try:
                        streamer = Streamer.objects.get(id = streamer_id)
                except Streamer.DoesNotExist:
                        return Response({'status' : 'error','data': 'No streamer found'}, status=status.HTTP_400_BAD_REQUEST)
                serializer = serializers.SocialMediaSerializer(data = request.data)
                if serializer.is_valid():
                        serializer.save()
                        return Response({'status' : 'success', 'data' : 'Added Successfully!'}, status=status.HTTP_200_OK)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                                      
        def patch(self, request):
                user = request.user 
                streamer_id = user.streamer_id
                try:
                        streamer = Streamer.objects.get(id = streamer_id)
                except Streamer.DoesNotExist:
                        return Response({'status' : 'error','data': 'No streamer found'}, status=status.HTTP_400_BAD_REQUEST)
                try:
                        social_media = SocialMedia.objects.get(streamer = streamer)
                except SocialMedia.DoesNotExist:
                        return Response({'status' : 'error','data': 'No Social media instance found'}, status=status.HTTP_400_BAD_REQUEST)
                serializer = serializers.SocialMediaSerializer(social_media, data=request.data, partial=True)
                if serializer.is_valid():
                        serializer.save()
                        return Response({'status' : 'success', 'data' : 'Data updated successfully!'}, status=status.HTTP_200_OK)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                                      

####################################################################
                
''' # Dashboard APIs For Finance Are In Finance APP  '''

class StreamerWalletAPI(APIView):
        '''This API for get Streamer wallet status and withdraw money from streamer wallet'''
        permission_classes = [IsAuthenticated]
        def get(self, request):
                user = request.user
                if user.is_a_streamer == False:
                        return Response({'status' : 'error','data': 'You are not streamer'}, status=status.HTTP_400_BAD_REQUEST)
                try:    
                        streamer = Streamer.objects.get(id = user.streamer_id)
                except Streamer.DoesNotExist:
                        return Response({'status' : 'error','data': 'No streamer found'}, status=status.HTTP_400_BAD_REQUEST)
                try:
                        streamer_wallet = StreamerWallet.objects.get(streamer = streamer)
                except StreamerWallet.DoesNotExist:
                        return Response({'status' : 'error','data': 'No streamer wallet found'}, status=status.HTTP_400_BAD_REQUEST)
                return Response({'status' : 'success', 'data' : {'available_amount': streamer_wallet.available_amount, 'total_tip_received':streamer_wallet.total_tip_received}}, status=status.HTTP_200_OK)

        def post(self, request):
                user = request.user
                
                if user.is_a_streamer == False:
                        return Response({'status' : 'error','data': 'You are not streamer'}, status=status.HTTP_400_BAD_REQUEST)
                try: #streamer
                        streamer = Streamer.objects.get(id = user.streamer_id)
                except Streamer.DoesNotExist:
                        return Response({'status' : 'error','data': 'No streamer found'}, status=status.HTTP_400_BAD_REQUEST)
                try: #streamer wallet
                        streamer_wallet = StreamerWallet.objects.get(streamer = streamer)
                except StreamerWallet.DoesNotExist:
                        return Response({'status' : 'error','data': 'No streamer wallet found'}, status=status.HTTP_400_BAD_REQUEST)
                try: # verification
                        streamer_verification = Verification.objects.get(streamer = streamer)
                except Verification.DoesNotExist:
                        return Response({'status' : 'error','data': 'You are not verified'}, status=status.HTTP_400_BAD_REQUEST)
                if streamer_verification.is_verification_approaved == False:
                        return Response({'status' : 'error','data': 'Your application is under proccess'}, status=status.HTTP_400_BAD_REQUEST)
                amount = request.data.get('amount')
                if amount == None:
                        return Response({'status' : 'error','data': 'You do not type amount'}, status=status.HTTP_400_BAD_REQUEST)

                if streamer_wallet.available_amount < Decimal(amount):
                        return Response({'status' : 'error','data': 'You have not sufficient money in your wallet'}, status=status.HTTP_400_BAD_REQUEST)                
                streamer_wallet.withdraw(Decimal(amount)) #withdraw function
                return Response({'status' : 'success', 'data' : 'Successfully Withdraw money'}, status=status.HTTP_200_OK)



class StreamerAnalytics(APIView):
        permission_classes = [IsAuthenticated]
        def get(self, request):
                user = request.user
                if user.is_a_streamer == False:
                        return Response({'status' : 'error','data': 'You are not streamer'}, status=status.HTTP_400_BAD_REQUEST)
                try: #streamer
                        streamer = Streamer.objects.get(id = user.streamer_id)
                except Streamer.DoesNotExist:
                        return Response({'status' : 'error','data': 'No streamer found'}, status=status.HTTP_400_BAD_REQUEST)
                follower_count = Follow.objects.filter(following = streamer).count() # total follower
                try:
                        streamer_wallet = StreamerWallet.objects.get(streamer = streamer)
                except StreamerWallet.DoesNotExist:
                        return Response({'status' : 'error','data': 'streamer have no wallet and streamer need to verified'}, status=status.HTTP_400_BAD_REQUEST)
                total_tip_recieved = streamer_wallet.total_tip_received # total tip recieved
                biggest_tipper = Tip.objects.filter(wallet = streamer_wallet).order_by('-amount').first()
                if biggest_tipper:
                        biggest_tipper_username = biggest_tipper.tipper.username
                else:
                        biggest_tipper_username = None         
                return Response({'status' : 'success', 'data' : {'follower_count':follower_count,'total_tip_recieved': total_tip_recieved, 'username':biggest_tipper_username}}, status=status.HTTP_200_OK)









####################################################################

''' # Team Section APIs | Streamer_Profile APP '''

class TeamCRUDAPI(APIView): 
        ''' Dashboard API for Team Model  '''
        
        def get(self, request): 
                try: 
                        streamer = Streamer.objects.get(id = request.user.streamer_id)
                        team = Team.objects.get(admin = streamer)
                except Streamer.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : 'Streamer Does Not Found!'}, status=status.HTTP_400_BAD_REQUEST)
                except Team.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : f'{streamer.original_user.username} Has Not Created Any Squad!'}, status=status.HTTP_200_OK)
                
                serializer = serializers.TeamSerializer(team)
                return Response({'status' : 'success', 'data' : serializer.data}, status=status.HTTP_200_OK)
                
        def post(self, request): 
                try: 
                        streamer = Streamer.objects.get(id = request.user.streamer_id)
                except Streamer.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : 'Streamer Does Not Found!'}, status=status.HTTP_400_BAD_REQUEST)
                serializer = serializers.TeamSerializer(data=request.data) 
                if serializer.is_valid(): 
                        instance = serializer.save()
                        instance.admin = streamer
                        instance.save()
                        return Response({'status' : 'success', 'data' : serializer.data}, status=status.HTTP_201_CREATED)
                return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

class TeamActionAPI(APIView): 
        ''' Dashboard API for Add streamer , remove streamer, exit admin and change admin functionalities '''
        permission_classes = [IsAuthenticated]
        
        def get(self, request): 
                member_streamer_username_or_email = request.data.get('credential') # pass the member stremer's username or email as " credential " | this user cum stremaer will have Team Functionality 
                action = request.data.get('action')  # aciton of the requst 
                # getting the user first 
                try : 
                        try : 
                                member_streamer_user = CustomUser.objects.get(email=member_streamer_username_or_email)
                        except CustomUser.DoesNotExist: 
                                member_streamer_user = CustomUser.objects.get(username=member_streamer_username_or_email)
                except CustomUser.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : 'User with this email or username does not exist!'})
                
                print('member streamer: ', member_streamer_user)
                print('admin streamer: ', request.user)
                
                try: 
                        admin_streamer = Streamer.objects.get(id = request.user.streamer_id)  # This is streamer is the admin of the Team 
                except Streamer.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : 'Admin streamer Is Not Found!'})
                
                try: 
                        team = Team.objects.get(admin = admin_streamer)
                except Team.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : f'{admin_streamer.original_user.username} Has Not Created Any Squad!'})
                
                try: 
                        member_streamer = Streamer.objects.get(id = member_streamer_user.streamer_id) # this streamer will be aded or removed from the squad 
                except Streamer.DoesNotExist: 
                        return Response({'status' : 'error', 'data' : 'Member streamer Is Not Found!'})

                if action == 'add': 
                        result, message = team.add_member(streamer=member_streamer)
                        if result: 
                                return Response({'status' : 'success', 'data' : message}, status=status.HTTP_200_OK)
                        return Response({'status' : 'error', 'data' : message}, status=status.HTTP_200_OK)
                
                elif action == 'remove': 
                        result, message = team.remove_member(streamer=member_streamer)
                        if result: 
                                return Response({'status' : 'success', 'data' : message}, status=status.HTTP_200_OK)
                        return Response({'status' : 'error', 'data' : message}, status=status.HTTP_200_OK)
                
                elif action == 'exit_admin': 
                        result, message = team.exit_team_admin(admin=admin_streamer, new_admin=member_streamer)
                        if result: 
                                return Response({'status' : 'success', 'data' : message}, status=status.HTTP_200_OK)
                        return Response({'status' : 'error', 'data' : message}, status=status.HTTP_200_OK)
                
                elif action == 'change_admin': 
                        result, message = team.change_admin_selected(admin=admin_streamer, new_admin=member_streamer)
                        if result: 
                                return Response({'status' : 'success', 'data' : message}, status=status.HTTP_200_OK)
                        return Response({'status' : 'error', 'data' : message}, status=status.HTTP_200_OK)
                
                else: 
                        return Response({'status' : 'error', 'data' : 'The action is not correct to proceed this request. Please check the action.'}, status=status.HTTP_400_BAD_REQUEST)
                

# class Schedule