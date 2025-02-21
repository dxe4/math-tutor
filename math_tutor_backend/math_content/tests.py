from urllib.parse import urlencode

import manifold_rs
import pytest
from django.urls import reverse

from math_content.factories import (
    StAndrewsBiographyFactory,
    StAndrewsCurveFactory,
    StAndrewsTopicFactory,
)
from math_content.models import CollatzConjecture


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


@pytest.mark.django_db
def test_colllatz(client):
    collatz = manifold_rs.collatz_sequence(11)
    sequence = collatz.get_seq_str()
    two_adic_distances = collatz.two_adic_disntace_str()
    total_distance = collatz.total_distance()
    total_2adic_distance = collatz.total_2adic_distance()

    CollatzConjecture.objects.create(
        start_number=11,
        sequence=sequence,
        two_adic_distance_sequence=two_adic_distances,
        total_distance=total_distance,
        two_adic_total_distance=total_2adic_distance,
    )
    url = reverse("collatz")
    query_params = {"start": 5, "end": 20}
    url = f"{url}?{urlencode(query_params)}"
    response = client.get(url)

    assert response.status_code == 200
    assert len(response.json()) == 1
    expected = [
        {
            "start_number": 11,
            "sequence": [
                "11",
                "34",
                "17",
                "52",
                "26",
                "13",
                "40",
                "20",
                "10",
                "5",
                "16",
                "8",
                "4",
                "2",
                "1",
            ],
            "two_adic_distance_sequence": [
                "1/1",
                "1/1",
                "1/1",
                "1/2",
                "1/1",
                "1/1",
                "1/4",
                "1/2",
                "1/1",
                "1/1",
                "1/8",
                "1/4",
                "1/2",
                "1/1",
            ],
            "total_distance": 259,
            "two_adic_total_distance": "81/8",
        }
    ]

    assert response.json() == expected


@pytest.mark.django_db
def test_colllatz_missing_end(client):
    collatz = manifold_rs.collatz_sequence(11)
    sequence = collatz.get_seq_str()
    two_adic_distances = collatz.two_adic_disntace_str()
    total_distance = collatz.total_distance()
    total_2adic_distance = collatz.total_2adic_distance()

    CollatzConjecture.objects.create(
        start_number=11,
        sequence=sequence,
        two_adic_distance_sequence=two_adic_distances,
        total_distance=total_distance,
        two_adic_total_distance=total_2adic_distance,
    )
    url = reverse("collatz")
    query_params = {"start": 5}
    url = f"{url}?{urlencode(query_params)}"
    response = client.get(url)

    assert response.status_code == 400
