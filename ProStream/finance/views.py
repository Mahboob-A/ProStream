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
from .models import UserWallet
from .serializer import UserWalletRechargeSerializer
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
