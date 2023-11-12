# django
from django.urls import path

# local import
# from .views import recharge_wallet,success,failed
from .views import rechargeWalletApi, successApi, failedApi, verificationAPI, BankAccountDetailsAPI, TipAPI

urlpatterns = [
    # for DTL
    # path('recharge/',recharge_wallet, name = 'recharge_wallet'),
    # path('success/',success, name = 'success'),
    # path('failed/',failed, name = 'failed'),

    path('recharge/',rechargeWalletApi.as_view(), name = 'recharge_wallet'),
    path('success/',successApi.as_view(), name = 'payment_success'),
    path('failed/',failedApi.as_view(), name = 'payment_failed'),
    path('verification/', verificationAPI.as_view(), name = 'verification'),
    path('add-bank-details/', BankAccountDetailsAPI.as_view(), name = 'add_bank_details'),
    path('tip/', TipAPI.as_view(), name = 'tip-money'),

]