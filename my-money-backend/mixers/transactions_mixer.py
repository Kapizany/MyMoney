from mixer.backend.django import mixer
from transactions.models import Transaction

mixer.cycle(100).blend(Transaction, user__password='pbkdf2_sha256$320000$60Eqz8lvPWZ06VRL2tLnxL$JQKOBkgE2XgkyZZCEW6K7nXW9NbBy2pcF4gI914WE94=')
