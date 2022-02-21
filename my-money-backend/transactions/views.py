from django.db.models import Sum
from datetime import date
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import PersonSerializer, TransactionSerializer
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
    
    @action(detail=False, methods=['get'], name="Get months values for a year")
    def get_months_values(self, request):
        year = date.today().year
        if request.query_params.get('year'):
            year = request.query_params.get('year')
        
        months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]
        results = {}
        for index, month in enumerate(months):
            credit = Transaction.objects.filter(user=request.user,date__month=index+1, date__year=year, value__gte=0).aggregate(Sum('value'))['value__sum']
            debit = Transaction.objects.filter(user=request.user,date__month=index+1, date__year=year, value__lte=0).aggregate(Sum('value'))['value__sum']
            if not credit:
                credit = 0
            if not debit:
                debit = 0
            last_month_cumulative_balance = 0
            if index > 0:
                last_month_cumulative_balance = results[months[index-1]]['cumulative_balance']
            results[month] = {
                "credit":credit,
                "debit":debit,
                "balance":credit+debit,
                "cumulative_balance":last_month_cumulative_balance + credit + debit,
            }

        return Response(results)
