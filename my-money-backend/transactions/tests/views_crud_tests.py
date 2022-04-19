### people visibility permissions start ###
def test_default_user_people_list(default_user, superuser):
    response = default_user["client"].get('/people/')
    assert response.data["count"] == 1


def test_superuser_people_list(default_user, superuser):
    response = superuser["client"].get('/people/')
    assert response.data["count"] == 2


def test_default_user_get_himself(default_user, superuser):
    response = default_user["client"].get(f'/people/{default_user["person"].id}/')
    assert response.data["id"] == default_user["person"].id


def test_default_user_does_not_get_superuser(default_user, superuser):
    response = default_user["client"].get(f'/people/{superuser["person"].id}/')
    assert response.status_code == 404


def test_superuser_get_himself(default_user, superuser):
    response = superuser["client"].get(f'/people/{superuser["person"].id}/')
    assert response.data["id"] == superuser["person"].id


def test_superuser_get_default_user(default_user, superuser):
    response = superuser["client"].get(f'/people/{default_user["person"].id}/')
    assert response.data["id"] == default_user["person"].id
### people visibility permissions end ###


### transactions visibility permissions start ###
def test_default_user_transactions_list(
        default_user,
        default_user_transaction,
        superuser_transaction,
    ):
    response = default_user["client"].get('/transactions/')
    assert response.data["count"] == 1


def test_superuser_transactions_list(
        superuser,
        superuser_transaction,
        default_user_transaction,
    ):
    response = superuser["client"].get('/transactions/')
    assert response.data["count"] == 2


def test_default_user_get_its_transaction(
        default_user,
        default_user_transaction,
    ):
    response = default_user["client"].get(f"/transactions/{default_user_transaction.id}/")
    assert response.data["id"] == default_user_transaction.id


def test_default_user_does_not_get_superuser_transaction(
        default_user,
        superuser_transaction,
    ):
    response = default_user["client"].get(f"/transactions/{superuser_transaction.id}/")
    assert response.status_code == 404


def test_superuser_get_its_transaction(
        superuser,
        superuser_transaction,
    ):
    response = superuser["client"].get(f"/transactions/{superuser_transaction.id}/")
    assert response.data["id"] == superuser_transaction.id


def test_superuser_get_default_user_transaction(
        superuser,
        default_user_transaction,
    ):
    response = superuser["client"].get(f"/transactions/{default_user_transaction.id}/")
    assert response.data["id"] == default_user_transaction.id
### transactions visibility permissions end ###


### transactions update permissions start ###
def test_default_user_update_its_transaction_with_put(
        default_user,
        default_user_transaction,
    ):
    response = default_user["client"].put(f"/transactions/{default_user_transaction.id}/",
        {
            "date": "2022-01-03",
            "category": "transportation",
            "description": "dummy_description_3",
            "value": "-3.00",
        },
    )
    assert response.data["date"] == "2022-01-03"
    assert response.data["category"] == "transportation"
    assert response.data["description"] == "dummy_description_3"
    assert response.data["value"] == "-3.00"


def test_default_user_does_not_update_superuser_transaction_with_put(
        default_user,
        superuser_transaction,
    ):
    response = default_user["client"].put(f"/transactions/{superuser_transaction.id}/",
        {
            "date": "2022-01-03",
            "category": "transportation",
            "description": "dummy_description_3",
            "value": "-3.00",
        },
    )
    assert response.status_code == 404


def test_superuser_update_its_transaction_with_put(
        superuser,
        superuser_transaction,
    ):
    response = superuser["client"].put(f"/transactions/{superuser_transaction.id}/",
        {
            "date": "2022-01-03",
            "category": "transportation",
            "description": "dummy_description_3",
            "value": "-3.00",
        },
    )
    assert response.data["date"] == "2022-01-03"
    assert response.data["category"] == "transportation"
    assert response.data["description"] == "dummy_description_3"
    assert response.data["value"] == "-3.00"


def test_superuser_update_default_user_transaction_with_put(
        superuser,
        default_user_transaction,
    ):
    response = superuser["client"].put(f"/transactions/{default_user_transaction.id}/",
        {
            "date": "2022-01-03",
            "category": "transportation",
            "description": "dummy_description_3",
            "value": "-3.00",
        },
    )
    assert response.data["date"] == "2022-01-03"
    assert response.data["category"] == "transportation"
    assert response.data["description"] == "dummy_description_3"
    assert response.data["value"] == "-3.00"


def test_default_user_update_its_transaction_with_patch(
        default_user,
        default_user_transaction,
    ):
    response = default_user["client"].patch(f"/transactions/{default_user_transaction.id}/",
        {
            "date": "2022-01-03",
        },
    )
    assert response.data["date"] == "2022-01-03"


def test_default_user_does_not_update_superuser_transaction_with_patch(
        default_user,
        superuser_transaction,
    ):
    response = default_user["client"].patch(f"/transactions/{superuser_transaction.id}/",
        {
            "date": "2022-01-03",
        },
    )
    assert response.status_code == 404


def test_superuser_update_its_transaction_with_patch(
        superuser,
        superuser_transaction,
    ):
    response = superuser["client"].patch(f"/transactions/{superuser_transaction.id}/",
        {
            "date": "2022-01-03",
        },
    )
    assert response.data["date"] == "2022-01-03"


def test_superuser_update_default_user_transaction_with_patch(
        superuser,
        default_user_transaction,
    ):
    response = superuser["client"].patch(f"/transactions/{default_user_transaction.id}/",
        {
            "date": "2022-01-03",
        },
    )
    assert response.data["date"] == "2022-01-03"
### transactions update permissions end ###


### transactions delete permissions start ###
def test_default_user_delete_its_transaction(
        default_user,
        default_user_transaction,
    ):
    response_1 = default_user["client"].delete(f"/transactions/{default_user_transaction.id}/")
    response_2 = default_user["client"].get(f"/transactions/{default_user_transaction.id}/")
    assert response_1.status_code == 204
    assert response_2.status_code == 404


def test_default_user_does_not_delete_superuser_transaction(
        default_user,
        superuser_transaction,
    ):
    response = default_user["client"].delete(f"/transactions/{superuser_transaction.id}/")
    assert response.status_code == 404


def test_superuser_delete_its_transaction(
        superuser,
        superuser_transaction,
    ):
    response_1 = superuser["client"].delete(f"/transactions/{superuser_transaction.id}/")
    response_2 = superuser["client"].get(f"/transactions/{superuser_transaction.id}/")
    assert response_1.status_code == 204
    assert response_2.status_code == 404


def test_superuser_delete_default_user_transaction(
        superuser,
        default_user_transaction,
    ):
    response_1 = superuser["client"].delete(f"/transactions/{default_user_transaction.id}/")
    response_2 = superuser["client"].get(f"/transactions/{default_user_transaction.id}/")
    assert response_1.status_code == 204
    assert response_2.status_code == 404
### transactions delete permissions end ###
