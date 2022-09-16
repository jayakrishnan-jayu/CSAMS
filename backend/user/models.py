from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    email = models.EmailField(('Email address'), unique=True)
    REQUIRED_FIELDS = []
