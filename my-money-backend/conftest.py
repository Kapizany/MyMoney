import pytest
from rest_framework.test import APIClient
from transactions.models import Person, Transaction
from decimal import Decimal


@pytest.fixture()
def default_user(db):
    person = Person(
        username="default_user",
        email="default_user@exampĺe.com",
        first_name="default_user_first_name",
        last_name="default_user_last_name",
    )
    person.set_password("default_user_password")
    person.save()
    client = APIClient()
    response = client.post("/api-token-auth/", {
        "username": person.email,
        "password": "default_user_password",
    }, format="json")
    client.credentials(HTTP_AUTHORIZATION="Token " + response.data["token"])
    return { "person": person, "client": client }


@pytest.fixture()
def superuser(db):
    person = Person(
        username="superuser",
        email="superuser@exampĺe.com",
        is_staff=True,
        is_superuser=True,
        first_name="superuser_first_name",
        last_name="superuser_last_name",
    )
    person.set_password("superuser_password")
    person.save()
    client = APIClient()
    response = client.post("/api-token-auth/", {
        "username": person.email,
        "password": "superuser_password",
    }, format="json")
    client.credentials(HTTP_AUTHORIZATION="Token " + response.data["token"])
    return { "person": person, "client": client }


@pytest.fixture
def inactive_user(db):
    person = Person(
        is_active=False,
        username="inactive_user",
        email="inactive_user@exampĺe.com",
        first_name="inactive_user_first_name",
        last_name="inactive_user_last_name",
    )
    person.set_password("inactive_user_password")
    person.save()
    return person


@pytest.fixture
def default_user_transaction(db, default_user):
    transaction = Transaction(
        user=default_user["person"],
        date="2022-01-01",
        category="other",
        description="dummy_description_1",
        value=Decimal("-1.00"),
    )
    transaction.save()
    return transaction


@pytest.fixture
def default_user_credit_transaction(db, default_user):
    transaction = Transaction(
        user=default_user["person"],
        date="2022-01-02",
        category="other",
        description="dummy_description_1.5",
        value=Decimal("2.00"),
    )
    transaction.save()
    return transaction


@pytest.fixture
def superuser_transaction(db, superuser):
    transaction = Transaction(
        user=superuser["person"],
        date="2022-01-02",
        category="market",
        description="dummy_description_2",
        value=Decimal("-2.00"),
    )
    transaction.save()
    return transaction


@pytest.fixture
def superuser_credit_transaction(db, superuser):
    transaction = Transaction(
        user=superuser["person"],
        date="2022-01-03",
        category="other",
        description="dummy_description_3",
        value=Decimal("0.50"),
    )
    transaction.save()
    return transaction


@pytest.fixture
def superuser_transaction_year_2000(db, superuser):
    transaction = Transaction(
        user=superuser["person"],
        date="2000-01-04",
        category="bills",
        description="dummy_description_4",
        value=Decimal("-4.00"),
    )
    transaction.save()
    return transaction
