from datetime import datetime, timezone
from decimal import Decimal


### default_user start ###
def test_set_check_default_username(default_user):
    assert default_user.username == ""


def test_set_check_default_email(default_user):
    assert default_user.email == ""


def test_set_check_default_password(default_user):
    assert default_user.password == ""


def test_set_check_default_is_active(default_user):
    assert default_user.is_active is True


def test_set_check_default_is_staff(default_user):
    assert default_user.is_staff is False


def test_set_check_default_is_superuser(default_user):
    assert default_user.is_superuser is False


def test_set_check_default_first_name(default_user):
    assert default_user.first_name == ""


def test_set_check_default_last_name(default_user):
    assert default_user.last_name == ""


def test_set_check_default_date_joined(default_user):
    assert default_user.date_joined.second == datetime.now(tz=timezone.utc).second
### default_user end ###


### superuser start ###
def test_set_check_username(superuser):
    assert superuser.username == "superuser@exampĺe.com"


def test_set_check_email(superuser):
    assert superuser.email == "superuser@exampĺe.com"


def test_set_check_password(superuser):
    assert superuser.password == "superuser_password"


def test_set_check_is_active(superuser):
    assert superuser.is_active is True


def test_set_check_is_staff(superuser):
    assert superuser.is_staff is True


def test_set_check_is_superuser(superuser):
    assert superuser.is_superuser is True


def test_set_check_first_name(superuser):
    assert superuser.first_name == "superuser_first_name"


def test_set_check_last_name(superuser):
    assert superuser.last_name == "superuser_last_name"


def test_set_check_date_joined(superuser):
    assert superuser.date_joined.second == datetime.now(tz=timezone.utc).second
### superuser end ###


### inactive_user ###
def test_set_check_is_not_active(inactive_user):
    assert inactive_user.is_active is False


### transactions start ###
def test_set_check_date(default_user_transaction):
    assert default_user_transaction.date == "2022-01-01"


def test_set_check_category(default_user_transaction):
    assert default_user_transaction.category == "other"


def test_set_check_description(default_user_transaction):
    assert default_user_transaction.description == "dummy_description_1"


def test_set_check_value(default_user_transaction):
    assert default_user_transaction.value == Decimal("-1.00")
### transactions end ###
