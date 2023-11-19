from django.test import TestCase

from .models import CustomUser
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

class RegistrationAPITestCase(TestCase): 
    '''test registraition of a user'''
    def test_register_view_success(self):
        url = reverse('registration_api')

        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword@', 
            'password2': 'testpassword@'
        }
        response = self.client.post(url, data, format='json')
        self.assertIn('status', response.data)
        self.assertIn('token', response.data)
        self.assertIn('wallet_id', response.data)
        self.assertIn('email', response.data)

    def test_invalid_registration(self):
        url = reverse('registration_api')
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword@', 
            'password2': 'testpasswo@'  # confirmed password incorrect
        }
        response = self.client.post(url, data)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data.get('status'))


class LoginAPITestCase(TestCase):
    '''test login api'''
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        self.login_url = reverse('login_api')

    def test_login_with_username(self):
        data = {'credential': 'testuser', 'password': 'testpassword'}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        if response.status_code == status.HTTP_200_OK:
            self.assertIn('token', response.data)

    def test_login_with_email(self):
        data = {'credential': 'test@example.com', 'password': 'testpassword'}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        if response.status_code == status.HTTP_200_OK:
            self.assertIn('token', response.data)

    def test_invalid_login(self):
        data = {'credential': 'invaliduser', 'password': 'invalidpassword'}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
