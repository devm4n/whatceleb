#!/bin/bash

echo "migrations"
uv run python manage.py migrate

uv run python manage.py shell << 'EOF'
from django.contrib.auth import get_user_model
import os

User = get_user_model()

username = os.environ["DJANGO_SUPERUSER_USERNAME"]
password = os.environ["DJANGO_SUPERUSER_PASSWORD"]

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username,email='',password=password)
    print(f"super user created:{username}")
else:
    print("Username exixsts")

EOF

echo "runserver"
uv run python manage.py runserver 0.0.0.0:8000
