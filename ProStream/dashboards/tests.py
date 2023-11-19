from django.test import TestCase

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from streamer_profile.models import Streamer
from finance.models import StreamerWallet, Verification, BankAccountDetails
from accounts.models import CustomUser
from decimal import Decimal 

# Create your tests here.
class StreamerWalletAPITest(TestCase):
    ''' This testing for streamer wallet status and withdraw money from streamer wallet'''
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create(
            username='testuser',
            email='test@example.com',
            password='testpassword@'
        )
        
        # create test streamer and set up
        self.streamer = Streamer.objects.create(original_user=self.user)
        self.user.is_a_streamer = True
        self.user.is_a_user = False
        self.user.streamer_id = self.streamer.id
        self.user.save()

        # test verification
        self.verification = Verification.objects.create(streamer = self.streamer, first_name = 'test_first_name', last_name = 'test_last_name' ) 

        # test add bank account details and create streamer wallet
        self.bank_account_details = BankAccountDetails.objects.create(streamer = self.streamer, verification = self.verification, first_name = 'test_first_name', last_name = 'test_last_name')
        self.streamer_wallet = StreamerWallet.objects.create(streamer = self.streamer)


        self.url = reverse('streamer_wallet_status') 
        self.client.force_authenticate(user=self.user)

    def test_get_streamer_wallet_success(self):
        '''test get all streamer wallet details'''
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')
        self.assertIn('available_amount', response.data['data'])
        self.assertIn('total_tip_received', response.data['data'])

    def test_get_streamer_wallet_not_a_streamer(self):
        '''test if streamer not a streamer'''
        self.user.is_a_streamer = False
        self.user.save()

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['status'], 'error')
        self.assertIn('You are not streamer', response.data['data'])

    def test_post_withdraw_money_success(self):
        '''test withdraw from streamer wallet'''

        # for withdraw from wallet at first streamer need to verified
        self.verification.is_verification_approaved = True
        self.verification.save()

        # add some money for withdraw
        self.streamer_wallet.available_amount += Decimal(50.00)
        self.streamer_wallet.save()

        data = {
            'amount': '50.00',
        }

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')
        self.assertEqual(response.data['data'], 'Successfully Withdraw money')

    def test_withdraw_money_fail_for_sufficient_money(self):
        '''test when amount is greater than available amount and getting error'''

        # for withdraw from wallet at first streamer need to verified
        self.verification.is_verification_approaved = True
        self.verification.save()

        # add some money for withdraw
        self.streamer_wallet.available_amount = Decimal(30.00)
        self.streamer_wallet.save()

        data = {
            'amount': '50.00',
        }

        response = self.client.post(self.url, data)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['status'], 'error')


    def test_streamer_not_verified(self):
        '''test streamer is not verified or verification is under process and getting error'''

        # for withdraw from wallet at first streamer need to verified
        self.verification.is_verification_approaved = False
        self.verification.save()

        # add some money for withdraw
        self.streamer_wallet.available_amount = Decimal(30.00)
        self.streamer_wallet.save()

        data = {
            'amount': '50.00',
        }

        response = self.client.post(self.url, data)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['status'], 'error')

