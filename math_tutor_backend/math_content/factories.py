import factory

from math_content.models import StAndrewsTopic


class StAndrewsTopicFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = StAndrewsTopic
        django_get_or_create = ["link"]

    title = factory.Faker("sentence", nb_words=6)
    html = factory.Faker("paragraph", nb_sentences=3)
    link = factory.Faker("url")
    topic = factory.Faker("word")
    topic_link = factory.Faker("url")
