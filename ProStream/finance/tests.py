from django.test import TestCase
from rest_framework import status
from django.urls import reverse
from accounts.models import CustomUser
from rest_framework.test import APIClient
from .models import Streamer, Verification  
from django.contrib.auth import get_user_model


class VerificationAPITest(TestCase):
    '''Streamer verification api testing'''
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        self.streamer = Streamer.objects.create(original_user=self.user)
        self.verification = Verification.objects.create(streamer = self.streamer, first_name = 'test_first_name', last_name = 'test_last_name' ) 
        self.user.streamer_id = self.streamer.id
        self.user.save()
        
        self.user2 = CustomUser.objects.create(
            username='testuser2',
            email='test@example2.com',
            password='testpassword@'
        )
        self.streamer2 = Streamer.objects.create(original_user=self.user2)
        self.user2.streamer_id = self.streamer2.id
        self.user2.save()

        self.url = reverse('verification')

    '''get verification'''
    def test_get_verification(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')

    '''post request verification'''
    def test_post_verification(self):
        self.client.force_authenticate(user=self.user2)
        data = {
            "first_name" : "test_first_name2",
            "last_name" : "test_last_name2"
        }

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')

    '''patch request verification'''
    def test_patch_verification(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'first_name': 'test_first_name1',
        }

        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')


