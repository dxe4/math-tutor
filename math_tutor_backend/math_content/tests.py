import pytest
from django.urls import reverse

from math_content.factories import (
    StAndrewsBiographyFactory,
    StAndrewsCurveFactory,
    StAndrewsTopicFactory,
)


@pytest.mark.django_db
def test_get_topics(client):
    topic = StAndrewsTopicFactory(
        title="title",
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


@pytest.mark.django_db
def test_get_curves(client):
    curve = StAndrewsCurveFactory(
        title="title",
        link="https://wwww.example.com/123",
    )
    url = reverse("curve-list")
    response = client.get(url)

    assert response.status_code == 200
    assert len(response.json()) == 1
    expected = [
        {
            "id": curve.id,
            "title": "title",
            "link": "https://wwww.example.com/123",
        }
    ]
    assert response.json() == expected


@pytest.mark.django_db
def test_get_biographies(client):
    bio = StAndrewsBiographyFactory(
        title="title",
        link="https://wwww.example.com/123",
        year_start=1000,
        year_end=950,
        year_start_bc=True,
        year_end_bc=True,
        year_order=-1000,
    )
    url = reverse("biography-list")
    response = client.get(url)

    assert response.status_code == 200
    assert len(response.json()) == 1
    expected = [
        {
            "id": bio.id,
            "title": "title",
            "link": "https://wwww.example.com/123",
            "year_start": 1000,
            "year_end": 950,
            "year_start_bc": True,
            "year_end_bc": True,
            "year_order": -1000,
        }
    ]
    assert response.json() == expected
