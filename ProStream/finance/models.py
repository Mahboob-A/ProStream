from django.db import models

import uuid 

from accounts.models import CustomUser
from streamer_profile.models import * 


# crate an wallent first before accepting Tip for Streamer         
class StreamerWallet(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        streamer = models.OneToOneField(Streamer, on_delete=models.CASCADE) 
        bank_account = models.OneToOneField('BankAccountDetails', on_delete=models.CASCADE)
        
        available_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # total amount of the streamer 
        ready_to_withdrawal_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # this money will be transferred into bank account 
        total_tip_received = models.DecimalField(max_digits=10, decimal_places=2, default=0) # this is the overall tip the streamer has received (only for representation purpose)
        last_recharged_amount  = models.DecimalField(max_digits=10, decimal_places=2, default=0)

        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def update_available_amout(self, amount): 
                self.available_amount += amount
                self.save()
                
        def update_total_tip_received(self, amount):
                self.total_tip_received += amount
                self.save()
                
        def update_last_recharged_amoount(self, amount):
                self.last_recharged_amount  = amount
                self.save()
                
        def get_available_amount(self): 
                return self.available_amount 

        # def recharge_wallet(self, amount): | not implemented. Implement as per logic 

        def withdraw(self, amount):  # for testing. add more validations 
                if self.available_amount >= amount:
                        self.available_amount -= amount
                        self.ready_to_withdrawal_amount += amount
                        self.bank_account.balance += amount
                        self.bank_account.save()
                        self.save()
                else:
                        raise Exception("Insufficient balance to withdraw.")



class ViewerWallet(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        viewer = models.OneToOneField(CustomUser, on_delete=models.CASCADE) 
        last_recharged_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
        available_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
        total_tipped_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def update_total_tipped_amount(self, amount): 
                self.total_tipped_amount += amount 
                self.save()
        
        def recharge_wallet(self, amount):
                self.last_recharged_amount  = amount
                self.available_amount += amount
                self.save()
                
        def update_last_recharged_amoount(self, amount):
                self.last_recharged_amount  = amount
                self.save()

        def tip_money(self, amount): 
                if self.available_amount >= amount: 
                        self.available_amount -= amount 
                        self.save()
                        return amount 
                else: 
                        return None # if none is returned, then the viewer does not have any money | handle in view while creating Tip instance 
        
                '''
                get the ViewerWallet instance of CustmUser. Then user resp_amount = wallet.tip_amout(amount 'get the amont from api')
                if the resp_amount is not None, then only create an instance of Tip (wallet=streamer wallet, tipper=user instance, stream = current stream instance, amount = resp_amount)
                '''


    
class Tip(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        wallet = models.OneToOneField(StreamerWallet, on_delete=models.CASCADE)
        tipper = models.ForeignKey(CustomUser , on_delete=models.CASCADE, related_name='tips_given')
        stream = models.ForeignKey(Stream, on_delete=models.CASCADE)
        amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)
        timestamp = models.DateTimeField(auto_now_add=True)

        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def save(self, *args, **kwargs):
                
                self.wallet.update_available_amout(self.amount)
                self.wallet.update_total_tip_received(self.amount)
                self.tipper.update_total_tipped_amount(self.amount)
                
                super(Tip, self).save(*args, **kwargs)
                
           

DOCUMENT_CHOICES = (
        ('VOTER', 'VOTER CARD'),
        ('NID', 'NID CARD'),
        ('AADHAR', 'AADHAR CARD'),
        ('PASSPORT', 'PASSPORT'),
        ('PAN', 'PAN CARD'),
        ('PASSBOOK', 'BANK PASSBOOK'),
)     

'''
Streamer will verify themselves, then they can add bank account 
'''
class Verification(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        streamer = models.OneToOneField(Streamer, on_delete=models.CASCADE)
        
        first_name = models.CharField(max_length=35, help_text='Your First Name')      
        last_name = models.CharField(max_length=30, help_text='Your Last Name')
        
        document_type = models.CharField(max_length=10, choices=DOCUMENT_CHOICES)
        document = models.ImageField(upload_to='Finance/Streamer/Documents/Verification/',)
        
        is_verification_approaved = models.BooleanField(default=False)
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def __str__(self): 
                return f"{self.first_name} {self.last_name}'s verification"


''''
at first, Verification instance of the streamer must be created, then Bank accout. 
i.e. streamer needs to verify themselves first, then they can add bank details. 
'''
class BankAccountDetails(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        streamer = models.OneToOneField(Streamer, on_delete=models.CASCADE)
        verification = models.OneToOneField(Verification, on_delete=models.CASCADE)
        
        first_name = models.CharField(max_length=35, help_text='Your First Name')      
        last_name = models.CharField(max_length=30, help_text='Your Last Name')
        
        bank_name = models.CharField(max_length=20)
        account_no = models.CharField(max_length=20)
        ifsc_code = models.CharField(max_length=10)
        passbook_img = models.ImageField(upload_to='Streamer/BankAccountDetails/Passbooks/', null=True, blank=True)
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        deletedAt = models.DateTimeField(blank=True, null=True)
        
        def __str__(self): 
                return f"{self.first_name} {self.last_name}'s Bank Account"

        


