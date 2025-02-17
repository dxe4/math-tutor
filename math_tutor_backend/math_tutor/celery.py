import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "math_tutor.settings")

app = Celery("math_tutor")
app.conf.update(
    task_default_queue="default",
    task_create_missing_queues=True,
    worker_prefetch_multiplier=1,
)
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
