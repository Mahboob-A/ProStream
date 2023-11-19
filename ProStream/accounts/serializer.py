
# django 
from django.core.validators import MinLengthValidator, MaxLengthValidator

# for resetting password  using email 
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator 
# from django.utils.http import urlencode

# drf 
from rest_framework import serializers 

#local 
from accounts.models import CustomUser
# send email and formatting body of email 
from .utils import EmailUser,  format_email 



def special_characters_validator(value): 
        special_characters = set('@#!$&*')
        if not any(char in special_characters for char in value): 
                raise serializers.ValidationError('Password must contain at least one of the special characters: @#!$&*')

def consecutive_characters_validator(value): 
        for i in range(len(value) - 2): 
                if value[i] == value[i+1] == value[i+2]: 
                        raise serializers.ValidationError('Password can not have three same character or digits!')

def mixed_character_validator(value): 
        if value.isdigit(): 
                raise serializers.ValidationError('Password should not be entirely numeric')
        elif value.isalpha(): 
                raise serializers.ValidationError('Password should not be entirely characters')

class RegistrationAPISerializer(serializers.ModelSerializer): 
        ''' Serializer for registering an user and passes token  '''
        password = serializers.CharField(validators= [MinLengthValidator(5, 'Password must be at least 5 characters'), MaxLengthValidator(15, "Password can not be more than 15 characters"),
                        special_characters_validator, consecutive_characters_validator, mixed_character_validator],
                        style={'input_type' : 'password'}, write_only=True, required=True
                )

        password2 = serializers.CharField(validators= [MinLengthValidator(5, 'Password must be at least 5 characters'), MaxLengthValidator(15, "Password can not be more than 15 characters")],
                        style={'input_type' : 'password'}, write_only=True, required=True
                )
        
        class Meta: 
                model = CustomUser
                fields = ['username', 'email', 'password', 'password2']
                extra_kwargs = {
                        'password' : {'write_only' : True}
                }
                
        def validate(self, attrs):
                pass1 = attrs.get('password')
                pass2 = attrs.get('password2')
                if pass1 and pass2 and pass1 != pass2: 
                        raise serializers.ValidationError('Password does not match!')
                attrs.pop('password2')
                return attrs 
        
        def create(self, validated_data): 
                return CustomUser.objects.create_user(
                        username=validated_data.get('username'), 
                        email=validated_data.get('email'), 
                        password=validated_data.get('password'),
                        # **validated_data
                )
                
                 
                 
class LoginSerializer(serializers.ModelSerializer): 
        ''' Serializer for authenticating an existing user and generates a access token '''
        email = serializers.EmailField(max_length=50, required=False)
        username = serializers.CharField(max_length=50, required=False)
        class Meta: 
                model = CustomUser 
                fields = ['username', 'email', 'password']
                
                
class ChangePasswordAPISerializer(serializers.ModelSerializer): 
        ''' changes password for authenticated users  '''
        password = serializers.CharField(max_length=15, style={'input_type' : 'password'}, write_only=True, required=True)
        password2 = serializers.CharField(max_length=15, style={'input_type' : 'password'}, write_only=True, required=True)
        
        class Meta: 
                model = CustomUser 
                fields = ['password', 'password2']
                
        def validate(self, attrs):
                pass1 = attrs.get('password')
                pass2 = attrs.get('password2')
                
                # get the user from the passed context
                user = self.context.get('user')

                if pass1 and pass2 and pass1 != pass2: 
                        raise serializers.ValidationError('Password does not match!')
                
                if user.check_password(pass1): 
                        raise serializers.ValidationError('New password can not be the old password')
                
                user.set_password(pass1)
                user.save()
                return attrs 
        


class ResetPasswordEmailLinkRequestSerializer(serializers.ModelSerializer): 
        ''' Resets user's password given a registered email | sends reset link to the email '''
        email = serializers.EmailField(max_length=50, required=True)
        class Meta: 
                model = CustomUser
                fields = ['email']
                
        def validate(self, attrs): 
                email = attrs.get('email')
                try: 
                        user = CustomUser.objects.get(email=email)
                        encoded_uuid = urlsafe_base64_encode(force_bytes(user.id))
                        password_token = PasswordResetTokenGenerator().make_token(user)
                        link = 'http://16.171.185.111/auth/reset-password/'+encoded_uuid+'/'+password_token # here is the endpoint to get the new passwords 
                        data = format_email(user=user, link=link)
                        # send email 
                        EmailUser.send_email(data)
                        return attrs 
                except CustomUser.DoesNotExist: 
                        raise serializers.ValidationError('User with this email does not exist!')


class ResetPasswordEmailConfirmationSerializer(serializers.ModelSerializer): 
        ''' Reset password confirmation from the reset password LINK email '''
        ''' Sets the given password as new password for the user after validation  '''

        password = serializers.CharField(validators= [MinLengthValidator(5, 'Password must be at least 5 characters'), MaxLengthValidator(15, "Password can not be more than 15 characters"),
                        special_characters_validator, consecutive_characters_validator, mixed_character_validator],
                        style={'input_type' : 'password'}, write_only=True, required=True
                )

        password2 = serializers.CharField(validators= [MinLengthValidator(5, 'Password must be at least 5 characters'), MaxLengthValidator(15, "Password can not be more than 15 characters")],
                        style={'input_type' : 'password'}, write_only=True, required=True
                )
        
        class Meta: 
                model = CustomUser 
                fields = ['password', 'password2']
                
        def validate(self, attrs):
                pass1 = attrs.get('password')
                pass2 = attrs.get('password2')
                
                if pass1 and pass2 and pass1 != pass2: 
                        raise serializers.ValidationError('Password does not match!')
                try: 
                        # get the user from the passed context 
                        encoded_uuid = self.context.get('encoded_uuid')
                        password_token = self.context.get('password_token')
                        
                        decoded_uuid = smart_str(urlsafe_base64_decode(encoded_uuid))
                        user = CustomUser.objects.get(id=decoded_uuid)
                        
                        # if token is expired, already used, or manipulated or the correct token of the user 
                        if not PasswordResetTokenGenerator().check_token(user=user, token=password_token): 
                                raise serializers.ValidationError('Token is not valid or expired!') # PASSWORD_RESET_TIMEOUT = 300 (SECONDS)
                        
                        # check if same old password is given for the new password
                        if user.check_password(pass1): 
                                raise serializers.ValidationError('New password can not be the old password')
                        
                        # all set, change the password 
                        user.set_password(pass1)
                        user.save()
                        return attrs 
                except CustomUser.DoesNotExist: 
                        raise serializers.ValidationError('User with this id does not exist or the email link might be manipulated!')
                except DjangoUnicodeDecodeError: # if anything related to decode goes wrong
                        PasswordResetTokenGenerator().check_token(user=user, token=password_token)
                        raise serializers.ValidationError('Token is not valid or expired!')
                



class ResetPasswordEmailOtpConfirmationSerializer(serializers.ModelSerializer): 
        ''' Reset password confirmation from the reset password OTP email '''
        ''' Sets the given password as new password for the user after validation  '''
        password = serializers.CharField(validators= [MinLengthValidator(5, 'Password must be at least 5 characters'), MaxLengthValidator(15, "Password can not be more than 15 characters"),
                        special_characters_validator, consecutive_characters_validator, mixed_character_validator],
                        style={'input_type' : 'password'}, write_only=True, required=True
                )

        password2 = serializers.CharField(validators= [MinLengthValidator(5, 'Password must be at least 5 characters'), MaxLengthValidator(15, "Password can not be more than 15 characters")],
                        style={'input_type' : 'password'}, write_only=True, required=True
                )
        class Meta: 
                model = CustomUser 
                fields = ['password', 'password2']
                
        def validate(self, attrs): 
                pass1 = attrs.get('password')
                pass2 = attrs.get('password2')
                
                user = self.context.get('user')
                otp = self.context.get('otp')  
                
                if otp : 
                        # if otp matches, only then proceed 
                        if user.otp == otp: 
                                # as the otp is matched, remove the otp so that this otp becomes obsolate to use furthur 
                                user.otp = None  
                                # check if pass if correct 
                                if pass1 and pass2 and pass1 != pass2: 
                                        raise serializers.ValidationError('Password does not match!')
                                user.save()
                                # check if same old password is given for the new password
                                if user.check_password(pass1): 
                                        raise serializers.ValidationError('New password can not be the old password')
                                
                                user.set_password(pass1)
                                user.save()
                                return attrs 
                        else : 
                                raise serializers.ValidationError('Invalid OTP or OTP is expired!')
                else : 
                        raise serializers.ValidationError('Invalid OTP or OTP is expired!')
                

class UserDetailsSerializers(serializers.ModelSerializer):
        class Meta:
                model = CustomUser
                exclude = ["password","user_permissions","groups"]



                                                        