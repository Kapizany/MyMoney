from django.db.models import Sum
from datetime import date
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import PersonSerializer, TransactionSerializer
from .models import Person, Transaction
from decimal import Decimal
import json


class PersonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows people to be viewed or edited.
    """
    serializer_class = PersonSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Person.objects.all()
        return Person.objects.filter(email=self.request.user.email).all()

    @action(detail=False, methods=["get"], name="Get Authorization")
    def get_auth(self, format=None):
        content = {
            "user": str(self.request.user),
            "auth": str(self.request.auth),
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

    @action(detail=False, methods=["get"],
            name="Get monthly values for a year")
    def get_monthly_values(self, request):
        year = date.today().year
        if request.query_params.get("year"):
            year = request.query_params.get("year")

        months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November",
                  "December"]

        results = {}

        previous_cumulative_balance = 0
        for index, month in enumerate(months):
            debit = self.get_queryset().filter(
                date__year=year,
                date__month=index+1,
                value__lte=0).aggregate(Sum("value"))["value__sum"] or Decimal("0.00")

            credit = self.get_queryset().filter(
                date__year=year,
                date__month=index+1,
                value__gte=0).aggregate(Sum("value"))["value__sum"] or Decimal("0.00")

            if index > 0:
                previous_cumulative_balance = results[months[index-1]
                                                      ]["cumulative_balance"]

            results[month] = {
                "debit": debit,
                "credit": credit,
                "balance": debit + credit,
                "cumulative_balance": previous_cumulative_balance
                + debit + credit,
            }

        return Response(results)

    @action(detail=False, methods=["get"],
            name="Get years where there are transactions")
    def get_years(self, request):
        transactions = self.get_queryset()

        years = []

        for transaction in transactions:
            if str(transaction.date.year) not in years:
                years.append(str(transaction.date.year))

        years.sort()

        return Response(years)
