from django.contrib import admin

# local import
from .models import PaymentGateWaySettings, UserWallet
# Register your models here.



admin.site.register(PaymentGateWaySettings)

@admin.register(UserWallet)
class UserWalletAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'available_amount', 'last_recharged_amount', 'total_tipped_amount']
