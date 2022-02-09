import email
from rest_framework import viewsets
from .serializers import PersonSerializer, TransactionSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Person, Transaction


class PersonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows people to be viewed or edited.
    """
    serializer_class = PersonSerializer
    def get_queryset(self):
        if self.request.user.is_superuser:
            return Person.objects.all()
        return Person.objects.filter(email=self.request.user.email).all()

    @action(detail=False, methods=['get'], name="Get Authorization")
    def get_auth(self, format=None):
        content = {
            'user': str(self.request.user),
            'auth': str(self.request.auth),
        }
        return Response(content)

class TransactionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows transactions to be viewed or edited.
    """
    serializer_class = TransactionSerializer
    def get_queryset(self):
        if self.request.user.is_superuser:
            return Transaction.objects.all()
        return Transaction.objects.filter(user=self.request.user).all()
