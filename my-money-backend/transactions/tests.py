import pytest

# Create your tests here.
@pytest.mark.django_db
def test_set_check_password(new_user1):
    assert new_user1.check_password("password123") is True
# Testar criação, get, list, update, delete
# Segurança, visibilidade, user e super_user