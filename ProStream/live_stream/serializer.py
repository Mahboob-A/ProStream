

from rest_framework import serializers

from .models import * 
from streamer_profile.models import Stream, Channel

class CategoryCRUDSerializer(serializers.ModelSerializer): 
        class Meta: 
                model = Category
                fields = '__all__'

class StreamSerializer(serializers.ModelSerializer):
        class Meta: 
                model = Stream
                fields = ['id', 'category','streamer', 'stream_title','language','follower_goals', 'content_classification', 'total_views_count', 'is_previously_recorded', 'has_branded_content']

        def get_category(self, obj):
                return obj.category.name if obj.category else None

        def to_representation(self, instance):
                data = super().to_representation(instance)
                data['category'] = self.get_category(instance)
                return data

class ChannelDetailsSerializer(serializers.ModelSerializer):
        class Meta: 
                model = Channel
                fields = ['bio','channel_display_name','display_picture','channel_banner_picture','total_followers','streamer_about_1','streamer_about_2']

