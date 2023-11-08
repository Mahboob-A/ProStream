# django
from rest_framework import serializers 

# local
from .models import UserWallet, Verification, BankAccountDetails, Tip

class UserWalletRechargeSerializer(serializers.Serializer):
    '''Name, amount validation'''
    name = serializers.CharField(max_length = 255)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)


class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Verification
        fields = '__all__'

class BankAccountDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccountDetails
        fields = '__all__'

class TipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tip
        fields = '__all__'
