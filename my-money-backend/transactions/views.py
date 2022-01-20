from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import UserAuthorizationSerializer, UserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def example_view(request, format=None):
        content = {
            'user': str(request.user),  # django.contrib.auth.User instance.
            'auth': str(request.auth),  # None
        }
        return Response(UserAuthorizationSerializer(data=content))
