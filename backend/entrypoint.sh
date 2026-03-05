#!/bin/bash

echo "migations"
uv run python manage.py migrate

echo "runserver"
uv run python manage.py runserver 0.0.0.0:8000
