from rest_framework import serializers
from .models import Person, Transaction


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'full_name', 'email']


class TransactionSerializer(serializers.ModelSerializer):
    user=serializers.EmailField(source='user.email', read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        model = Transaction
        fields = ['id', 'date', 'description', 'value', 'category','user']

    def create(self, validated_data):
        data = validated_data.copy()
        data['user'] = self.context['request'].user
        return super().create(data)
