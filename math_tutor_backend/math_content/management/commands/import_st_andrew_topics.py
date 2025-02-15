from typing import List

import requests
from django.core.management.base import BaseCommand

from math_content.models import StAndrewsTopic
from math_content.scraping import Link, get_links_and_text, get_categories

URL = "https://mathshistory.st-andrews.ac.uk/HistTopics/"


class Command(BaseCommand):
    help = "Import st Andrew topics"

    def handle(self, *args, **options):
        self.stdout.write("starting scraping of st andrew topics")
        self.stdout.flush()
        response = requests.get(URL)
        if response.status_code != 200:
            raise Exception(f"failed to fetch url {URL}")

        topic_links: List[Link] = get_links_and_text(
            response.text, "#main table a", URL
        )

        self.stdout.write(f"found {len(topic_links)} topics", ending="\n")
        self.stdout.flush()

        for category, link, topic, topic_link in get_categories(topic_links):
            StAndrewsTopic.objects.get_or_create(
                link=link,
                defaults={
                    "title": category,
                    "topic": topic,
                    "topic_link": topic_link,
                },
            )
