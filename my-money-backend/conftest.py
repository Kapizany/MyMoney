import pytest
from model_bakery import baker


@pytest.fixture
def new_user1(db):
    new_user = baker.make(
            'transactions.Person',
            email="new_user1@exampĺe.com",
        )
    new_user.set_password('password123')
    new_user.save()
    return new_user