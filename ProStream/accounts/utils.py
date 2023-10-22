

from django.core.mail import EmailMessage 
from django.core.mail import BadHeaderError, send_mail
from django.utils.html import format_html 
# import os 
from rest_framework_simplejwt.tokens import RefreshToken
import random
import string
from django.conf import settings 


# in use 
class EmailUser: 
        @staticmethod
        def send_email(data): 
                email = EmailMessage(
                        subject=data.get('subject'),
                        body=data.get('body'),
                        from_email=  settings.EMAIL_HOST_USER,  # os.environ.get('EMAIL_HOST_USER'), #settings.EMAIL_HOST_USER,  
                        to=[data.get('recipient_email')]
                )
                print('here now')
                email.content_subtype = 'html'
                email.send()
                


# not using this one 
def send_password_reset_email(data):
        subject=data.get('subject'),
        message=data.get('body'),
        from_email=settings.EMAIL_HOST_USER,  
        recipient_list=[data.get('recipient_email')]
        
        try : 
                send_mail(subject, message, from_email, recipient_list)
        except BadHeaderError:
            raise BadHeaderError('Something wrong occured!')

# for creating jwt token 
def get_tokens_for_user(user):
        refresh = RefreshToken.for_user(user)

        return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
        }

def format_email(user, link=None, otp=None): 
        ''' formats the email body based on the reset type - link and otp  '''
        ''' returns the fully formatted email body  '''
        
        email_body = ''
        if link: 
                email_body = format_html(
        ''' 
        Howdy {}! <br> <br>
        You requested to reset your password in ProStream. We forget, it happens, after all - we all are humans! &#128578;<br> <br>
        Here is your access to reset your password. Never share this email with anyone. <br> <br>
        Remember, this link is only valid for 5 minutes! <br> <br>

        <a href="{}"> click here </a> to reset your password. <br><br><br><br> <br> <br> <br> <br> 

        Thank you, <br>
        ProStream Team. <br> 
                                
        ''', user.username, link)
        else: 
                email_body = format_html(
        ''' 
        Howdy {}! <br> <br>
        You requested to reset your password in ProStream. We forget, it happens, after all - we all are humans! &#128578;<br> <br>
        Here is your OTP {} to reset your password. Never share this OTP with anyone. <br> <br>
        Remember, this OTP is only valid for 5 minutes! <br> <br>

       <br><br><br><br> <br> <br> <br> <br> 

        Thank you, <br>
        ProStream Team. <br> 
                                
        ''', user.username, otp)
        
        # email data  
        data = {
                'subject' : 'Reset Your Password in ProStream!',
                'body' : email_body, 
                'recipient_email' : user.email, 
        }
        return data 


def generate_otp(otp_size=6): 
        ''' generates 6 digits otp for password reset '''
        digits = string.digits 
        otp = ''.join([random.choice(digits) for _ in range(otp_size)])
        return otp 

# documentation code 
# email = EmailMessage(
#     "Hello",
#     "Body goes here",
#     "from@example.com",
#     ["to1@example.com", "to2@example.com"],
#     ["bcc@example.com"],
#     reply_to=["another@example.com"],
#     headers={"Message-ID": "foo"},
# )