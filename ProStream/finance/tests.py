from django.test import TestCase
from rest_framework import status
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Streamer, Verification  
from django.contrib.auth import get_user_model


class VerificationAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        self.user2 = get_user_model().objects.create_user(
            username='testuser2',
            email='test@example2.com',
            password='testpassword'
        )
        self.streamer = Streamer.objects.create(original_user=self.user)
        self.verification = Verification.objects.create(streamer = self.streamer, first_name = 'test_first_name', last_name = 'test_last_name' ) 
        self.user.streamer_id = self.streamer.id
        self.user.save()
        self.url = reverse('verification')
        self.client.force_authenticate(user=self.user)


    def test_get_verification(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')

    def test_post_verification(self):
        data = {
            "first_name" : "test_first_name",
            "last_name" : "test_last_name"
        }

        response = self.client.post(self.url, data)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')

    # def test_patch_verification(self):
    #     Verification.objects.create(streamer=self.streamer)

    #     data = {
    #         'first_name': 'test_first_name',
    #     }

    #     response = self.client.patch(self.url, data)
    #     print('hoice------------------------------')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data['status'], 'success')

