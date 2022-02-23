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
            debit = Transaction.objects.filter(
                user=request.user,
                date__year=year,
                date__month=index+1,
                value__lte=0).aggregate(Sum("value"))["value__sum"] or 0

            credit = Transaction.objects.filter(
                user=request.user,
                date__year=year,
                date__month=index+1,
                value__gte=0).aggregate(Sum("value"))["value__sum"] or 0

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
