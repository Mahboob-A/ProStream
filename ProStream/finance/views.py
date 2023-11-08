# django
from django.shortcuts import render, redirect

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login
from decimal import Decimal

# restframework
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# local import
# sslcommerz_payment_gateway for payment method
from .ssl import sslcommerz_payment_gateway
from accounts.models import CustomUser
from .models import UserWallet, Verification, StreamerWallet
from streamer_profile.models import Streamer, Stream
from .serializer import UserWalletRechargeSerializer, VerificationSerializer, BankAccountDetailsSerializer, TipSerializer
# Create your views here.


# @csrf_exempt
# def recharge_wallet(request):
#     if request.method == 'GET':
#         return render(request, "finance/recharge.html")
#     if request.method == 'POST':
#         data = request.POST
#         name = data['name']
#         amount = data['amount']
#         return redirect(sslcommerz_payment_gateway(request, name, amount))


class rechargeWalletApi(APIView):
    '''An Authenticated user can recharge in his wallet by passing name, amount and token  '''
    permission_classes = [IsAuthenticated]
    def post(self, request): 
        serializer = UserWalletRechargeSerializer(data = request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            amount = serializer.validated_data['amount']
            return Response({'status' : 'success','redirect_url': sslcommerz_payment_gateway(request, name, amount)}, status=status.HTTP_200_OK)
        return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

     
# @csrf_exempt
# def success(request):
#     if request.method == 'POST':
#         data = request.POST
#         user = CustomUser.objects.get(id = data['value_a'])
#         '''user authomatically logout so again login'''
#         login(request, user)

#         amount = data['amount']
#         user_wallet = UserWallet.objects.get(user = user)
#         user_wallet.recharge_wallet(Decimal(amount))
#         user_wallet.update_last_recharged_amoount(Decimal(amount))
#         return HttpResponse('success')


class successApi(APIView):
    '''Payment successfull and add amount in user wallet'''
    def post(self, request):
        print(request.user)
        user_id = request.data.get('value_a')
        amount = request.data.get('amount')
        user = CustomUser.objects.get(id = user_id)      
        
        user_wallet = UserWallet.objects.get(user = user)
        user_wallet.recharge_wallet(Decimal(amount))
        user_wallet.update_last_recharged_amoount(Decimal(amount))
        return Response({'status' : 'success','message': 'Payment successful'}, status=status.HTTP_200_OK)


# @csrf_exempt
# def failed(request):
#     return HttpResponse('failed')

class failedApi(APIView):
    '''Payment unsuccessfull'''
    def post(self, request):
        return Response({'status' : 'error','message': 'failed'}, status=status.HTTP_400_BAD_REQUEST)

class verificationAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        streamer_id = user.streamer_id
        try: 
            streamer = Streamer.objects.get(id = streamer_id)
        except Streamer.DoesNotExist:
            return Response({'status' : 'error','message': 'streamer not found'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = VerificationSerializer(data = request.data)
        if serializer.is_valid():
            instance = serializer.save() 
            instance.streamer = streamer
            instance.save()
            return Response({'status' : 'success','message': 'verification complete!'}, status=status.HTTP_200_OK)
        return Response({'status' : 'error','message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

class AddBankAccountDetailsAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        streamer_id = user.streamer_id
        try: 
            streamer = Streamer.objects.get(id = streamer_id)
        except Streamer.DoesNotExist:
            return Response({'status' : 'error','message': 'Streamer not found'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            streamer_verification = Verification.objects.get(streamer = streamer)
        except Verification.DoesNotExist:
            return Response({'status' : 'error','message': 'Verification not found'}, status=status.HTTP_400_BAD_REQUEST)
        if streamer_verification.is_verification_approaved == False:
            return Response({'status' : 'error','message': "Your verification didn't approve"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = BankAccountDetailsSerializer(data = request.data)
        if serializer.is_valid():
            instance = serializer.save()
            instance.streamer = streamer
            instance.verification = streamer_verification
            instance.save()
            streamer_wallet = StreamerWallet.objects.create(streamer = streamer, bank_account = instance)
            return Response({'status' : 'success','message': 'Bank details added and Streamer wallet created'}, status=status.HTTP_200_OK)
        return Response({'status' : 'error','message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

class TipAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        streamer_id = request.data.get('streamer_id', None)
        stream_id = request.data.get('stream_id', None)
        # user_wallet
        try: 
            user_wallet = UserWallet.objects.get(user = user)
        except UserWallet.DoesNotExist:
            return Response({'status' : 'error','message': 'user have not wallet'}, status=status.HTTP_400_BAD_REQUEST)
        # streamer
        try: 
            streamer = Streamer.objects.get(id = streamer_id)
        except Streamer.DoesNotExist:
            return Response({'status' : 'error','message': 'Streamer not found'}, status=status.HTTP_400_BAD_REQUEST)    
        # streamer Wallet
        try: 
            streamer_wallet = StreamerWallet.objects.get(streamer = streamer)
        except StreamerWallet.DoesNotExist:
            return Response({'status' : 'error','message': 'Streamer have no wallet'}, status=status.HTTP_400_BAD_REQUEST)
        
        # stream
        try: 
            stream = Stream.objects.get(id = stream_id)
        except Stream.DoesNotExist:
            return Response({'status' : 'error','message': 'No stream here'}, status=status.HTTP_400_BAD_REQUEST)
        
        # verification
        try: 
            verification = Verification.objects.get(streamer = streamer)
        except Verification.DoesNotExist:
            return Response({'status' : 'error','message': 'Streamer is not verified'}, status=status.HTTP_400_BAD_REQUEST)
        if verification.is_verification_approaved == False:
            return Response({'status' : 'error','message': 'Streamer is not verified, verification under proccess'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = TipSerializer(data = request.data)
        if serializer.is_valid():
            amount = serializer.validated_data['amount']
            if user_wallet.available_amount < amount:
                return Response({'status' : 'error','message': 'You have not sufficient money','available_amount': user_wallet.available_amount}, status=status.HTTP_400_BAD_REQUEST)
            instance = serializer.save()
            instance.wallet = streamer_wallet
            instance.tipper = user
            instance.stream = stream
            # user wallet update
            user_wallet.tip_money(amount=amount)
            user_wallet.update_total_tipped_amount(amount=amount)

            # streamer wallet update
            streamer_wallet.update_available_amout(amount=amount)
            streamer_wallet.update_total_tip_received(amount=amount)
            instance.save()
            return Response({'status' : 'success','message': 'Tip Successfully', 'available_amount': user_wallet.available_amount}, status=status.HTTP_200_OK)
        return Response({'status' : 'error','message': 'Tip Unsuccessful'}, status=status.HTTP_400_BAD_REQUEST)
         


