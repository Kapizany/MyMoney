from mixer.backend.django import mixer
from transactions.models import Transaction

mixer.cycle(100).blend(Transaction)