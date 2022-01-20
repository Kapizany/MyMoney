from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']


class UserAuthorizationSerializer(serializers.Serializer):
    user=UserSerializer()
    auth=serializers.CharField()