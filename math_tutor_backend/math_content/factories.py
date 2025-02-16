import random

import factory

from math_content import models


class StAndrewsTopicFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.StAndrewsTopic
        django_get_or_create = ["link"]

    title = factory.Faker("sentence", nb_words=6)
    link = factory.Faker("url")
    topic = factory.Faker("word")
    topic_link = factory.Faker("url")


class StAndrewsCurveFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.StAndrewsCurve
        django_get_or_create = ["link"]

    title = factory.Faker("sentence", nb_words=6)
    link = factory.Faker("url")


def _year_order(o: models.StAndrewsBiography) -> int:
    if o.year_start_bc:
        return -o.year_start
    else:
        return o.year_start


class StAndrewsBiographyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.StAndrewsBiography
        django_get_or_create = ["link"]

    title = factory.Faker("sentence", nb_words=6)
    link = factory.Faker("url")

    year_start = factory.LazyAttribute(lambda _: random.randint(0, 3000))
    year_end = factory.LazyAttribute(lambda _: random.randint(0, 3000))
    year_start_bc = factory.LazyAttribute(lambda _: bool(random.getrandbits(1)))
    year_end_bc = factory.LazyAttribute(lambda _: bool(random.getrandbits(1)))
    year_order = factory.LazyAttribute(_year_order)
