
from rest_framework.renderers import JSONRenderer
import json 

class AuthAPIRenderer(JSONRenderer): 
        charset = 'utf-8'
        def render(self, data, accepted_media_type=None, renderer_context=None):
                print('data:  ', data)
                response = ''
                if 'ErrorDetail' in str(data): 
                        response = json.dumps({'error' : data})
                else: 
                        response = json.dumps(data)
                return response 