import pytest
from model_bakery import baker
from transactions.models import Person, Transaction
from decimal import Decimal


@pytest.fixture
def default_user(db):
    default_user = Person()
    default_user.save()
    return default_user


@pytest.fixture
def superuser(db):
    superuser = baker.make(
        "transactions.Person",
        username="superuser@exampĺe.com",
        email="superuser@exampĺe.com",
        password="superuser_password",
        is_staff=True,
        is_superuser=True,
        first_name="superuser_first_name",
        last_name="superuser_last_name",
    )
    return superuser


@pytest.fixture
def inactive_user(db):
    inactive_user = Person(
        "transactions.Person",
        is_active=False,
    )
    return inactive_user


@pytest.fixture
def default_user_transaction(db, default_user):
    transaction = Transaction(
        user=default_user,
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
        user=default_user,
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
        user=superuser,
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
        user=superuser,
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
        user=superuser,
        date="2000-01-04",
        category="bills",
        description="dummy_description_4",
        value=Decimal("-4.00"),
    )
    transaction.save()
    return transaction
