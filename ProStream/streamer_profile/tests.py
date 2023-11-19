from django.test import TestCase

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from accounts.models import CustomUser
from .models import Category, Streamer

# Create your tests here.

class StreamerCreateAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create(
            username='testuser',
            email='test@example.com',
            password='testpassword@'
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


class StreamGoLiveAPITest(TestCase):
    def setUp(self):
        # load testcases
        self.client = APIClient()

        # create test user
        self.user = CustomUser.objects.create(
            username='testuser',
            email='test@example.com',
            password='testpassword@'
        )
        # create test streamer
        self.streamer = Streamer.objects.create(original_user=self.user)
        self.user.streamer_id = self.streamer.id # update user streamer id
        self.user.save()

        self.category = Category.objects.create(name = 'Sports', language = 'English')
        self.url = reverse('create_stream')
        self.client.force_authenticate(user=self.user)

    ''' Stream go live api test'''
    def test_stream_go_live(self):
        data = {
            "category": self.category.id,
            "stream_title": "test title",
            "is_previously_recorded": "False",
            "follower_goals" : 1000
        }

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'success')
        self.assertIn('streamer_id', response.data['data'])