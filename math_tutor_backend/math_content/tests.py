import pytest
from django.urls import reverse

from math_content.factories import StAndrewsTopicFactory


@pytest.mark.django_db
def test_get_topics(client):
    topic = StAndrewsTopicFactory(
        title="title",
        html="<body> body </body>",
        link="https://wwww.example.com/123",
        topic="topic1",
        topic_link="https://wwww.example.com/topic1",
    )
    url = reverse("topic-list")
    response = client.get(url)

    assert response.status_code == 200
    assert len(response.json()) == 1
    expected = [
        {
            "id": topic.id,
            "title": "title",
            "link": "https://wwww.example.com/123",
            "topic": "topic1",
            "topic_link": "https://wwww.example.com/topic1",
        }
    ]
    assert response.json() == expected
