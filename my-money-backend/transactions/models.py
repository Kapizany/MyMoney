from django.db import models
from django.db.models.fields.related import ForeignKey
from django.contrib.auth.models import User

class Transaction(models.Model):
    value = models.IntegerField()
    date = models.DateField()
    description = models.DateField()
    user = ForeignKey(User, on_delete=models.CASCADE)