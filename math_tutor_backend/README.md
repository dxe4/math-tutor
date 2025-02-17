uv sync
uv run daphne -b 0.0.0.0 -p 8000 math_tutor.asgi:application
uv run celery -A math_tutor worker --loglevel=info
