#!/bin/sh
python manage.py makemigrations
python manage.py migrate
python manage.py shell < mixers/transactions_mixer.py
exec "$@"
