from rest_framework.test import APIClient
from decimal import Decimal


### get_monthly_values start ###
def test_default_user_get_monthly_values_action_for_current_year(
        default_user,
        default_user_transaction,
        default_user_credit_transaction,
        superuser_transaction,
        superuser_credit_transaction,
        superuser_transaction_year_2000,
    ):
    client = APIClient()
    client.force_authenticate(user=default_user)
    response = client.get(f"/transactions/get_monthly_values/")
    for month in response.data:
        if month == "January":
            debit = default_user_transaction.value
            credit = default_user_credit_transaction.value
            balance = debit + credit
            assert response.data[month]["debit"] == debit
            assert response.data[month]["credit"] == credit
            assert response.data[month]["balance"] == balance
        else:
            assert response.data[month]["debit"] == Decimal("0.00")
            assert response.data[month]["credit"] == Decimal("0.00")
            assert response.data[month]["balance"] == Decimal("0.00")


def test_default_user_get_monthly_values_action_for_a_year_without_transactions(
        default_user,
        default_user_transaction,
        default_user_credit_transaction,
        superuser_transaction,
        superuser_credit_transaction,
        superuser_transaction_year_2000,
    ):
    client = APIClient()
    client.force_authenticate(user=default_user)
    response = client.get(f"/transactions/get_monthly_values/?year=2021")
    for month in response.data:
        assert response.data[month]["debit"] == Decimal("0.00")
        assert response.data[month]["credit"] == Decimal("0.00")
        assert response.data[month]["balance"] == Decimal("0.00")


def test_superuser_get_monthly_values_action_for_current_year(
        superuser,
        default_user_transaction,
        default_user_credit_transaction,
        superuser_transaction,
        superuser_credit_transaction,
        superuser_transaction_year_2000,
    ):
    client = APIClient()
    client.force_authenticate(user=superuser)
    response = client.get(f"/transactions/get_monthly_values/")
    for month in response.data:
        if month == "January":
            debit = default_user_transaction.value + superuser_transaction.value
            credit = default_user_credit_transaction.value + superuser_credit_transaction.value
            balance = debit + credit
            assert response.data[month]["debit"] == debit
            assert response.data[month]["credit"] == credit
            assert response.data[month]["balance"] == balance
        else:
            assert response.data[month]["debit"] == Decimal("0.00")
            assert response.data[month]["credit"] == Decimal("0.00")
            assert response.data[month]["balance"] == Decimal("0.00")


def test_superuser_get_monthly_values_action_for_a_year_without_transactions(
        superuser,
        default_user_transaction,
        default_user_credit_transaction,
        superuser_transaction,
        superuser_credit_transaction,
        superuser_transaction_year_2000,
    ):
    client = APIClient()
    client.force_authenticate(user=superuser)
    response = client.get(f"/transactions/get_monthly_values/?year=2021")
    for month in response.data:
        assert response.data[month]["debit"] == Decimal("0.00")
        assert response.data[month]["credit"] == Decimal("0.00")
        assert response.data[month]["balance"] == Decimal("0.00")
### get_monthly_values end ###


### get_years start ###
def test_default_user_get_years_action(
        default_user,
        default_user_transaction,
        default_user_credit_transaction,
        superuser_transaction,
        superuser_credit_transaction,
        superuser_transaction_year_2000,
    ):
    client = APIClient()
    client.force_authenticate(user=default_user)
    response = client.get(f"/transactions/get_years/")
    assert response.data == ["2022"]


def test_superuser_get_years_action(
        superuser,
        default_user_transaction,
        superuser_transaction_year_2000,
    ):
    client = APIClient()
    client.force_authenticate(user=superuser)
    response = client.get(f"/transactions/get_years/")
    assert response.data == ["2022", "2000"]
### get_years end ###


### get_categories start ###
def test_default_user_get_categories_action_for_current_year(
        default_user,
        default_user_transaction,
        default_user_credit_transaction,
        superuser_transaction,
        superuser_credit_transaction,
        superuser_transaction_year_2000,
    ):
    client = APIClient()
    client.force_authenticate(user=default_user)
    response = client.get(f"/transactions/get_categories/")
    assert response.data["market"] == 0
    assert response.data["bills"] == 0
    assert response.data["other"] == 100


def test_default_user_get_categories_action_for_a_year_without_transactions(
        default_user,
        default_user_transaction,
        default_user_credit_transaction,
        superuser_transaction,
        superuser_credit_transaction,
        superuser_transaction_year_2000,
    ):
    client = APIClient()
    client.force_authenticate(user=default_user)
    response = client.get(f"/transactions/get_categories/?year=2021")
    absolute_sum = Decimal("0.00")
    for value in response.data.values():
        absolute_sum += value
    assert value == Decimal("0.00")


def test_superuser_get_categories_action_for_current_year(
        superuser,
        default_user_transaction,
        default_user_credit_transaction,
        superuser_transaction,
        superuser_credit_transaction,
        superuser_transaction_year_2000,
    ):
    client = APIClient()
    client.force_authenticate(user=superuser)
    response = client.get(f"/transactions/get_categories/")
    total = default_user_transaction.value + superuser_transaction.value
    market = Decimal(abs(superuser_transaction.value / total) * 100)
    other = Decimal(abs(default_user_transaction.value / total * 100))
    assert abs(response.data["market"] - market) < 0.01
    assert abs(response.data["other"] - other) < 0.01
    assert market + other == 100
    assert response.data["bills"] == 0
### get_categories end ###
