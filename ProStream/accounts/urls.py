

from django.urls import path 
from .views import * 

urlpatterns = [
        path('register/', RegistrationAPI.as_view(), name='registration_api'),
        path('login/', LoginAPI.as_view(), name='login_api'),
        path('change-password/', ChangePasswordAPI.as_view(), name='change_password'),
        path('reset-password/', ResetPaswordEmailLinkRequestAPI.as_view(), name='reset_password'),
        path('reset-password/<str:encoded_uuid>/<str:password_token>/', ResetPasswordEmailLinkConfirmationAPI.as_view(), name='reset_password_confirmation'),
        path('reset-password-email-otp/', ResetPasswordEmailOtpAPI.as_view(), name='reset_password_email_otp'),
        path('reset-password-email-otp-confirmation/', ResetPasswordEmailOtpConfirmationAPI.as_view(), name='reset_password_email_otp_confirmation'), # takes 2 pass, + cached credential + otp from http body 
        path('login-with-otp-email/', LoginWithEmailOtpAPI.as_view(), name='login_with_otp_email'),
        path('login-with-otp-email-confirmation/', LoginWithEmailOtpConfirmationAPI.as_view(), name='login_with_otp_email_confirmation'),
        path('get/user-all-details/', GetUserDetailsAPI.as_view(), name = 'get_user_details'),
]
