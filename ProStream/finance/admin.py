from django.contrib import admin

# local import
from .models import PaymentGateWaySettings, UserWallet, Verification, BankAccountDetails, StreamerWallet, Tip
# Register your models here.



admin.site.register(PaymentGateWaySettings)

@admin.register(UserWallet)
class UserWalletAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'available_amount', 'last_recharged_amount', 'total_tipped_amount']

@admin.register(Verification)
class VerificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'streamer', 'is_verification_approaved',]

@admin.register(BankAccountDetails)
class BnakAccountDetailsAdmin(admin.ModelAdmin):
    list_display = ['id', 'streamer', 'verification', 'first_name', 'last_name']


@admin.register(StreamerWallet)
class StreamerWalletAdmin(admin.ModelAdmin):
    list_display = ['id', 'streamer', 'bank_account']

@admin.register(Tip)
class TipAdmin(admin.ModelAdmin):
    list_display = ['id', 'tipper', 'wallet', 'amount']

