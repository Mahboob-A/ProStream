from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from accounts.models import CustomUser
from streamer_profile.models import Stream, Streamer, Category
import uuid
# Create your tests here.

class GetCurrentStreamDetailsTest(TestCase):
    '''Currrent stream details api test'''
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

        #create test catagory
        self.category = Category.objects.create(name = 'Sports', language = 'English')

        # create test stream
        self.stream = Stream.objects.create(streamer=self.streamer, category = self.category, stream_title = "test title", follower_goals = 1000) 


        self.url = reverse('current_stream_details')
        self.client.force_authenticate(user=self.user)


    def test_get_current_stream_details_success(self):
        response = self.client.get(self.url, {'streamer_id': self.streamer.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')
        self.assertIn('streamer_id', response.data)
        self.assertIn('data', response.data)


    '''check with invalid streamer id'''
    def test_get_current_stream_details_streamer_not_found(self):
        # create dummy uuid
        dummy_uuid = uuid.uuid4()

        response = self.client.get(self.url, {'streamer_id': dummy_uuid})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'error')
        self.assertIn('Streamer not found', response.data['data'])
