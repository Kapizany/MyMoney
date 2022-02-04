from rest_framework import viewsets
from .serializers import PersonSerializer, TransactionSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Person, Transaction


class PersonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows people to be viewed or edited.
    """
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

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
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
