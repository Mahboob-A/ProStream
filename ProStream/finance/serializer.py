# django
from rest_framework import serializers 

# local
from .models import UserWallet

class UserWalletRechargeSerializer(serializers.Serializer):
    '''Name, amount validation'''
    name = serializers.CharField(max_length = 255)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
