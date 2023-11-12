

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
                print('Sending email...')
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

def format_email(user, link=None, reset_otp=None, login_otp=None): 
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
        elif reset_otp: 
                email_body = format_html(
        ''' 
        Howdy {}! <br> <br>
        You requested to reset your password in ProStream. We forget, it happens, after all - we all are humans! &#128578;<br> <br>
        Here is your OTP {} to reset your password. Never share this OTP with anyone. <br> <br>
        Remember, this OTP is only valid for 5 minutes! <br> <br>

       <br><br><br><br> <br> <br> <br> <br> 

        Thank you, <br>
        ProStream Team. <br> 
                                
        ''', user.username, reset_otp)
        else: 
                email_body = format_html(
        ''' 
        Howdy {}! <br> <br>
        You requested to login in ProStream using OTP.  <br> <br>
        Here is your OTP {} to login to your account. Never share this OTP with anyone.&#128578; <br> <br>
        Remember, this OTP is only valid for 5 minutes! <br> <br>

       <br><br><br><br> <br> <br> <br> <br> 

        Thank you, <br>
        ProStream Team. <br> 
                                
        ''', user.username, login_otp)
                
        
        # email data  
        if link or reset_otp: 
                data = {
                        'subject' : 'Reset Your Password in ProStream!',
                        'body' : email_body, 
                        'recipient_email' : user.email, 
                }
                return data 
        else: # if login_otp is sent 
                data = {
                        'subject' : 'OTP to Login in ProStream!',
                        'body' : email_body, 
                        'recipient_email' : user.email, 
                }
                return data 
                


def generate_otp(otp_size=6): 
        ''' generates 6 digits otp for password reset '''
        digits = string.digits 
        otp = ''.join([random.choice(digits) for _ in range(otp_size)])
        return otp 


# updated email body formatter for other administrative works 
def updated_email_formatter(user, **kwargs): 
        reset_pass_with_otp_url = 'http://127.0.0.1:8000/auth/reset-password-email-otp/'
   
 
        email_body = ""
        if 'verification_created' in kwargs:  # Verification POST request
                email_body = format_html(
        ''' 
        Howdy {}! <br> <br>
        We have received your request to verify yourself in ProStream! This email is to notify you that we have received your details. <br> <br>
        You will receive an update regarding your verification within the next 48 business hours. <br> <br> 
        Please note that you must need to provide your authenticate details in verification process otherwise <br>
        you would not  be able to add Bank Account in ProStream. This is to keep ProStream free from any fraudulently activities. &#128578;<br> <br>
        
        <br> <br> <br> 
        Anything suspicious? You did not request the Verification process? <br> <br> 
        If this is not done by you then please -   <a href="{}"> click here </a> to reset your password. <br><br><br><br> <br> <br> <br> <br> 



        Thank you, <br>
        ProStream Team. <br> 
                                
        ''', user.username, reset_pass_with_otp_url)
        
                data = {
                        'subject' : 'Verification Is Under Process!',
                        'body' : email_body, 
                        'recipient_email' : user.email, 
                }

        if 'verification_updated' in kwargs: 
                email_body = format_html(
        ''' 
        Howdy {}! <br> <br>
        We have received your request to update your verification details in ProStream! This email is to notify you that we have received your details. <br> <br>
        You will receive an update regarding your verification within the next 48 business hours. <br> <br> 
        Please note that you must need to provide your authenticate details in verification process otherwise <br>
        you would not  be able to add Bank Account in ProStream. This is to keep ProStream free from any fraudulently activities. &#128578;<br> <br>
        
        <br> <br> <br> 
        Anything suspicious? You did not request the Verification process? <br> <br> 
        If this is not done by you then please -   <a href="{}"> click here </a> to reset your password. <br><br><br><br> <br> <br> <br> <br> 
      


        Thank you, <br>
        ProStream Team. <br> 
                                
        ''', user.username, reset_pass_with_otp_url)
                data = {
                        'subject' : 'Verification Details Are Updated!',
                        'body' : email_body, 
                        'recipient_email' : user.email, 
                }
        
        if 'bank_account_created' in kwargs: 
                email_body = format_html(
        ''' 
        Howdy {}! <br> <br>
        Your bank account details have been added in ProStream! This email is to notify you that we have added your Bank Account details in your ProStream account. <br> <br>
        You can now receive donation / tip from viewers! <br> <br> 
        Please note that you must need adhere ProStream guidelines to keep streaming in ProStream. &#128578;<br> <br>
        
        <br> <br> <br> 
        Anything suspicious? You did not request the Verification process? <br> <br> 
        If this is not done by you then please -   <a href="{}"> click here </a> to reset your password. <br><br><br><br> <br> <br> <br> <br> 
     


        Thank you, <br>
        ProStream Team. <br> 
                                
        ''', user.username, reset_pass_with_otp_url)
                
                data = {
                'subject' : 'Congratulations Chad! Bank Account Added In ProStream!',
                'body' : email_body, 
                'recipient_email' : user.email, 
                }
        
        if 'bank_account_updated' in kwargs: 
                email_body = format_html(
        ''' 
        Howdy {}! <br> <br>
        Your request to update your bank account in ProStream is successfull! This email is to notify you that we have received your request to update your Bank Account details in your Prostream account. <br> <br>
        IMPORTANT: You can not receive any donation / tip in your updated account untill the your updated bank account details are verified! <br> <br> 
        This Verification process will take upto 48 business hours! <br>
        For verification, ProStream will verify your Updated Bank Account details with the document you have provided in Verification Stage.<br><br>
        If you need to update your information in Verification Stage, you are encouraged to update Verification Stage first and then update Bank Account!<br><br>
        Please note that you must need adhere ProStream guidelines to keep streaming in ProStream. &#128578;<br> <br>
        
        <br> <br> <br> 
        Anything suspicious? You did not request the Verification process? <br> <br> 
        If this is not done by you then please -   <a href="{}"> click here </a> to reset your password. <br><br><br><br> <br> <br> <br> <br> 
      


        Thank you, <br>
        ProStream Team. <br> 
                                
        ''', user.username, reset_pass_with_otp_url)
                data = {
                'subject' : 'Bank Account Update Is Under Process In ProStream!',
                'body' : email_body, 
                'recipient_email' : user.email, 
                }
        
        return data 

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