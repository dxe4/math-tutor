from django.urls import re_path

from math_tutor.consumers import AnonymousTaskConsumer

websocket_urlpatterns = [
    re_path(r"ws/primes/(?P<session_id>[\w-]+)/$", AnonymousTaskConsumer.as_asgi()),
]
