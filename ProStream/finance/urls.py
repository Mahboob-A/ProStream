# django
from django.urls import path

# local import
# from .views import recharge_wallet,success,failed
from .views import rechargeWalletApi, successApi, failedApi

urlpatterns = [
    # for DTL
    # path('recharge/',recharge_wallet, name = 'recharge_wallet'),
    # path('success/',success, name = 'success'),
    # path('failed/',failed, name = 'failed'),

    path('recharge/',rechargeWalletApi.as_view(), name = 'recharge_wallet'),
    path('success/',successApi.as_view(), name = 'payment_success'),
    path('failed/',failedApi.as_view(), name = 'payment_failed'),
]