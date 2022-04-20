from django.db.models import Sum
from datetime import date
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import PersonSerializer, TransactionSerializer
from .models import Person, Transaction
from decimal import Decimal
from .serializers import RegisterSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny


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

    @action(detail=False, methods=["get"], name="Get username")
    def get_username(self, format=None):
        queryset= self.get_queryset().filter(email=self.request.user.email)
        username = [person.username for person in queryset][0]
        return Response(username)

    @action(detail=False, methods=["get"], name="Get full name")
    def get_full_name(self, format=None):
        queryset = self.get_queryset().filter(email=self.request.user.email)
        full_name = [person.full_name for person in queryset][0]
        return Response(full_name)


class RegisterView(generics.CreateAPIView):
    queryset = Person.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


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
            name="Get monthly values of a year")
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
            credit = (self.get_queryset().filter(
                date__year=year,
                date__month=index+1,
                value__gte=0).aggregate(Sum("value"))["value__sum"]
                or Decimal("0.00"))

            debit = (self.get_queryset().filter(
                date__year=year,
                date__month=index+1,
                value__lte=0).aggregate(Sum("value"))["value__sum"]
                or Decimal("0.00"))

            if index > 0:
                previous_cumulative_balance = results[months[index-1]
                                                      ]["cumulative_balance"]

            results[month] = {
                "debit": debit,
                "credit": credit,
                "balance": debit + credit,
                "cumulative_balance": previous_cumulative_balance
                + debit + credit
            }

        return Response(results)

    @action(detail=False, methods=["get"],
            name="Get all years in which there are transactions")
    def get_years(self, request):
        transactions = self.get_queryset()

        years = []

        for transaction in transactions:
            if str(transaction.date.year) not in years:
                years.append(str(transaction.date.year))

        years.sort(reverse=True)

        return Response(years)

    @action(detail=False, methods=["get"],
            name="Get expenses of a year distributed by category")
    def get_categories(self, request):
        year = date.today().year
        if request.query_params.get("year"):
            year = request.query_params.get("year")

        all_expenses = self.get_queryset().filter(
            date__year=year, value__lte=0)

        categories = ["market", "transportation", "clothing", "bills",
                      "health_expenses", "savings", "other"]

        results = {}

        for category in categories:
            results[category] = abs(all_expenses.filter(
                category=category).aggregate(Sum("value"))["value__sum"]
                or Decimal("0.00"))

        total = sum(results.values())

        if total != 0:
            results = {category: round(value / total * 100, 2)
                       for (category, value) in results.items()}

        return Response(results)
