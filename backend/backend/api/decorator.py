from django.db import transaction
from django.contrib.auth import get_user_model
from user.models import Faculty, Designation, Track
from .APIException import APIException
import requests

User = get_user_model()
def login_required(func):
    def wrapper(parent, info, *args, **kwargs):
        sub = getattr(info.context, "sub", None)
        authorization = getattr(info.context, "authorization", None)
        if not sub or not authorization:
            raise APIException(message='User not authenticated', code='AUTHENTICATION_FAILURE')
        qs = User.objects.filter(sub=sub)
        if not qs.exists():
            url = "https://csams-dev.eu.auth0.com/userinfo"
            headers = { 'Authorization': authorization, 'Content-Type': 'application/json'}
            response = requests.get(url, headers=headers)
            if response.status_code != 200:
                raise APIException(message='Failed to fetch user details', code='AUTHENTICATION_FAILURE')
            user_details = response.json()
            with transaction.atomic():
                user = User()
                faculty = Faculty()
                user.email = user_details['email']
                user.username = user_details['name']
                user.sub = sub
                user.save()
                faculty.user = user
                faculty.designation = Designation.objects.first()
                faculty.track = Track.objects.first()
                faculty.save()
        info.context.userID = sub
        return func(parent, info, *args, **kwargs)

    return wrapper

def resolve_user(func):
    def wrapper(parent, info, *args, **kwargs):
        userID = getattr(info.context, "userID", None)
        if not userID:
            raise APIException(message='User not authenticated', code='AUTHENTICATION_FAILURE')
        try:
            user = User.objects.get(sub=userID)
            info.context.resolved_user = user
            return func(parent, info, *args, **kwargs)
        except User.DoesNotExist:
            raise APIException(message='Invalid ID', code='AUTHENTICATION_FAILURE')
    return wrapper