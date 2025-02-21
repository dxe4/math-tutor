from enum import Enum

from django.db import models
from model_utils.models import TimeStampedModel

from math_base.models import CustomUser


class ProjectEulerProblem(TimeStampedModel):
    problem_number = models.IntegerField()
    text = models.TextField()


class EulerArchive(TimeStampedModel):
    paper_number = models.IntegerField()
    paper_link = models.URLField()


class CollatzConjecture(TimeStampedModel):
    start_number = models.IntegerField(unique=True)
    sequence = models.JSONField()
    two_adic_distance_sequence = models.JSONField()
    total_distance = models.IntegerField()
    # This is a rational
    two_adic_total_distance = models.TextField()

    def __eq__(self, o):
        return self.start_number == o.start_number

    @classmethod
    def load_collatz_cache(cls, limit=None):
        query = CollatzConjecture.objects.all()
        if limit:
            query = query[0:limit]

        return {i.start_number: i for i in query}

    @classmethod
    def get_numbers_not_processed(cls, start, end):
        existing_numbers = CollatzConjecture.objects.filter(
            start_number__gte=start, start_number__lte=end
        ).values_list("start_number")
        existing_numbers = set(existing_numbers)
        numbers_to_generate = [
            i for i in range(start, end) if i not in existing_numbers
        ]
        return numbers_to_generate


class ChoicesEnumMixin(Enum):
    """
    todo mode this to base
    usage example:
    class LinkResourceType(ChoicesEnumMixin):
        BOOK = "BOOK"
        PAPER = "PAPER"
        ARTICLE = "ARTICLE"
        VIDEO = "VIDEO"
    """

    @classmethod
    def choices(cls):
        return [(resource_type, resource_type.value) for resource_type in cls]


class LinkResourceType(ChoicesEnumMixin):
    BOOK = "BOOK"
    PAPER = "PAPER"
    ARTICLE = "ARTICLE"
    VIDEO = "VIDEO"


class LinkResource(TimeStampedModel):
    title = models.TextField()
    text = models.TextField(blank=True)
    link = models.URLField(blank=True)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    resource_type = models.CharField(max_length=128, choices=LinkResourceType.choices())

    @staticmethod
    def create_book(*args, **kwargs):
        return LinkResource.objects.create(
            status=LinkResourceType.BOOK,
            **kwargs,
        )

    @staticmethod
    def create_paper(*args, **kwargs):
        return LinkResource.objects.create(
            status=LinkResourceType.PAPER,
            **kwargs,
        )

    @staticmethod
    def create_article(*args, **kwargs):
        return LinkResource.objects.create(
            status=LinkResourceType.ARTICLE,
            **kwargs,
        )

    @staticmethod
    def create_video(*args, **kwargs):
        return LinkResource.objects.create(
            status=LinkResourceType.VIDEO,
            **kwargs,
        )


class StAndrewsResource(TimeStampedModel):
    """
    # https://mathshistory.st-andrews.ac.uk/
    """

    title = models.TextField()
    link = models.URLField(unique=True)

    class Meta:
        abstract = True


class StAndrewsBiography(StAndrewsResource):
    year_start = models.IntegerField()
    year_end = models.IntegerField(null=True)
    year_start_bc = models.BooleanField()
    year_end_bc = models.BooleanField()
    year_order = models.IntegerField()

    class Meta:
        ordering = ["year_order", "title"]


class StAndrewsCurve(StAndrewsResource):
    class Meta:
        ordering = ["title"]


class StAndrewsTopic(StAndrewsResource):
    topic = models.TextField()
    topic_link = models.URLField()

    class Meta:
        ordering = ["topic", "title"]
