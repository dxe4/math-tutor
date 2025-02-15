from django.urls import path

from math_content.views import StAndrewTopicView

urlpatterns = [
    path("topics/", StAndrewTopicView.as_view(), name="topic-list"),
]
