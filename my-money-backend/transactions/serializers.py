from rest_framework import serializers
from .models import Person, Transaction
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ["id", "full_name", "email"]


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=Person.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Person
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = Person.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )


        user.set_password(validated_data['password'])
        user.save()

        return user


class TransactionSerializer(serializers.ModelSerializer):
    user=serializers.EmailField(source="user.email", read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        model = Transaction
        fields = ["id", "category", "date", "description", "value", "user"]

    def create(self, validated_data):
        data = validated_data.copy()
        data["user"] = self.context["request"].user
        return super().create(data)
