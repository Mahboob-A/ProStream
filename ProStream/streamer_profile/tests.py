from django.test import TestCase

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
import jwt
from django.contrib.auth import get_user_model

# Create your tests here.

class StreamerCreateAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        self.url = reverse('create_streamer')

    def test_create_streamer(self):
        self.client.force_authenticate(user=self.user)

        data = {
            'first_name': 'fist_test',
            'last_name': 'last_test',
        }
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'success')
