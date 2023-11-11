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
from .models import UserWallet, Verification, StreamerWallet, BankAccountDetails
from streamer_profile.models import Streamer, Stream
from .serializer import UserWalletRechargeSerializer, VerificationSerializer, BankAccountDetailsSerializer, TipSerializer

from accounts.utils import EmailUser, updated_email_formatter


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
        return Response({'status' : 'success','data': 'Payment successful'}, status=status.HTTP_200_OK)


# @csrf_exempt
# def failed(request):
#     return HttpResponse('failed')

class failedApi(APIView):
    '''Payment unsuccessfull'''
    def post(self, request):
        return Response({'status' : 'error','data': 'failed'}, status=status.HTTP_400_BAD_REQUEST)

class verificationAPI(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request): 
        try: 
            print('streamer id : ', request.user.streamer_id)
            veirfication = Verification.objects.get(streamer=request.user.streamer_id)
        except Verification.DoesNotExist: 
            return Response({'status' : 'error','data': 'Streamer Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        
        seirializer = VerificationSerializer(veirfication)
        return Response({'status' : 'success', 'data' : seirializer.data}, status=status.HTTP_200_OK)
        
    
    def post(self, request):
        user = request.user
        streamer_id = user.streamer_id
        try: 
            streamer = Streamer.objects.get(id = streamer_id)
        except Streamer.DoesNotExist:
            return Response({'status' : 'error','data': 'Streamer Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = VerificationSerializer(data = request.data)
        if serializer.is_valid():
            instance = serializer.save() 
            instance.streamer = streamer
            instance.save()  
            
            try: # send an email to the user telling the verification has been started. 
                email_data = updated_email_formatter(user, verification_created = True)
                EmailUser.send_email(email_data)
                return Response({'status' : 'success','data': 'Verification process is initiated! You will receive email shortly!'}, status=status.HTTP_200_OK)
            
            except Exception as e: 
                return Response({'status' : 'error', 'data' : serializer.errors, 'email_status' : 'Email sending is unsuccessful!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'status' : 'error','data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    
    def patch(self, request): 
        streamer_id = request.user.streamer_id 
        try: 
            verification = Verification.objects.get(streamer=streamer_id)
        except Verification.DoesNotExist: 
            return Response({'status' : 'error','data': 'streamer not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = VerificationSerializer(verification, data=request.data, partial=True)
        if serializer.is_valid():  
            serializer.save() 
            
            try: # send an email to the streamer telling the process of verification is reinitialized with updated data.  
                email_data = updated_email_formatter(request.user, verification_updated = True)
                EmailUser.send_email(email_data)
                return Response({'status' : 'success', 'data' : 'Verification Data Updated Successfully! You will receive email shortly!'}, status=status.HTTP_200_OK)
           
            except Exception as e: 
                return Response({'status' : 'error', 'data' : serializer.errors, 'email_status' : 'Email sending is unsuccessful!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
    

class BankAccountDetailsAPI(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request): 
        try: 
            verification = Verification.objects.get(streamer = request.user.streamer_id)
        except Verification.DoesNotExist: 
            return Response({'status' : 'error','data': 'Your verification has not started yet. Please verify yourself.'}, status=status.HTTP_400_BAD_REQUEST)
        try: 
            bank_account = BankAccountDetails.objects.get(streamer = request.user.streamer_id, verification = verification)
        except BankAccountDetails.DoesNotExist: 
            return Response({'status' : 'error','data': 'No bank account found'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = BankAccountDetailsSerializer(bank_account)
        return Response({'status' : 'success', 'data' : serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request):
        user = request.user
        streamer_id = user.streamer_id
        try: 
            streamer = Streamer.objects.get(id = streamer_id)
        except Streamer.DoesNotExist:
            return Response({'status' : 'error','data': 'Streamer not found'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            streamer_verification = Verification.objects.get(streamer = streamer)
        except Verification.DoesNotExist:
            return Response({'status' : 'error','data': 'Please add details in Verification Stage in order to add Bank Account!'}, status=status.HTTP_400_BAD_REQUEST)
        if streamer_verification.is_verification_approaved == False:
            return Response({'status' : 'error','data': "Your verification is under process. You can add bank account once your verification is completed."}, status=status.HTTP_200_OK)
        serializer = BankAccountDetailsSerializer(data = request.data)
        if serializer.is_valid():
            instance = serializer.save()
            instance.streamer = streamer
            instance.verification = streamer_verification
            instance.save() 
            
            try:  # send email to streamer that bank account is created. 
                email_data = updated_email_formatter(user, bank_account_created = True)
                EmailUser.send_email(email_data)
                streamer_wallet = StreamerWallet.objects.create(streamer = streamer, bank_account = instance)  # creating a wallter for streamer 
                return Response({'status' : 'success','data': 'Bank Account, Streamer Wallet Created! You will receive email shortly!'}, status=status.HTTP_200_OK)
            
            except Exception as e: 
                return Response({'status' : 'error', 'data' : 'Bank Account Is Created, Email Send Unsuccessfull!', 'email_status' : 'Email sending is unsuccessful!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'status' : 'error','data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    
    def patch(self, request): 
            try: 
                verification = Verification.objects.get(streamer = request.user.streamer_id)
                bank_account = BankAccountDetails.objects.get(streamer = request.user.streamer_id, verification = verification)
            except Verification.DoesNotExist: 
                return Response({'status' : 'error','data': 'Your verification has not started yet. Please verify yourself.'}, status=status.HTTP_400_BAD_REQUEST)        
            except BankAccountDetails.DoesNotExist: 
                return Response({'status' : 'error','data': 'No bank account found'}, status=status.HTTP_400_BAD_REQUEST)

            serializer = BankAccountDetailsSerializer(bank_account, data=request.data, partial=True)
            if serializer.is_valid(): 
                # making the verification as False as we need to verify the new bank account details with verification data. 
                # altough we are updating the data in bank account, the streamer will not be able to take any tip now, untill 
                # is_verification_approved in set to True by administrators 
                verification.is_verification_approaved = False 
                verification.save()  
                # save the data. if the data is found not matching, the user needs to update the data again. 
                serializer.save()
                
                try :  # send an eamil to user that bank account is updated. 
                    email_data = updated_email_formatter(request.user, bank_account_updated = True)
                    EmailUser.send_email(email_data)
                    return Response({'status' : 'success','data': 'Bank Account Details Updated Successfully! You will receive email shortly!'}, status=status.HTTP_200_OK)
                
                except Exception as e: 
                    return Response({'status' : 'error', 'data' : serializer.errors, 'email_status' : 'Email sending is unsuccessful!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response({'status' : 'error','data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


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
            return Response({'status' : 'error','data': 'User Does Not Have Any  Wallet'}, status=status.HTTP_400_BAD_REQUEST)
        # streamer
        try: 
            streamer = Streamer.objects.get(id = streamer_id)
        except Streamer.DoesNotExist:
            return Response({'status' : 'error','data': 'Streamer Does Not Found'}, status=status.HTTP_400_BAD_REQUEST)    
        # streamer Wallet
        try: 
            streamer_wallet = StreamerWallet.objects.get(streamer = streamer)
        except StreamerWallet.DoesNotExist:
            return Response({'status' : 'error','data': 'Streamer is not verified yet to receive tip amount'}, status=status.HTTP_400_BAD_REQUEST)
        
        # stream
        try: 
            stream = Stream.objects.get(id = stream_id)
        except Stream.DoesNotExist:
            return Response({'status' : 'error','data': 'No Stream Found'}, status=status.HTTP_400_BAD_REQUEST)
        
        # verification
        try: 
            verification = Verification.objects.get(streamer = streamer)
        except Verification.DoesNotExist:
            return Response({'status' : 'error','data': 'Streamer is not verified yet to receive tip amount'}, status=status.HTTP_400_BAD_REQUEST)
        if verification.is_verification_approaved == False:
            return Response({'status' : 'error','data': 'Streamer is not verified yes, verification is under proccess'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = TipSerializer(data = request.data)
        if serializer.is_valid():
            amount = serializer.validated_data['amount']
            if user_wallet.available_amount < amount:
                return Response({'status' : 'error','data': 'You have not sufficient money in your wallet','available_amount': user_wallet.available_amount}, status=status.HTTP_400_BAD_REQUEST)
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
            return Response({'status' : 'success','data': 'Amount Tipped Successfully', 'available_amount': user_wallet.available_amount}, status=status.HTTP_200_OK)
        return Response({'status' : 'error','data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
         


