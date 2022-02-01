from rest_framework import serializers
from .models import Person, Transaction


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'full_name', 'email']


class TransactionSerializer(serializers.ModelSerializer):
    user=serializers.EmailField(source='user.email')
    class Meta:
        model = Transaction
        fields = ['id', 'value', 'date', 'description', 'user']