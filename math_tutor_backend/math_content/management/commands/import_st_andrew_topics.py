import time
from dataclasses import dataclass
from typing import List

import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand

from math_base.utils import normalize_url
from math_content.models import StAndrewsTopic

URL = "https://mathshistory.st-andrews.ac.uk/HistTopics/"


@dataclass
class _Link:
    text: str
    link: str


def _get_links_and_text(response_text: str, selector: str) -> List[_Link]:
    soup = BeautifulSoup(response_text, "html.parser")
    topic_links = []
    for link in soup.select(selector):
        href = link.get("href")
        text = link.get_text(strip=True)
        if href and text:
            full_url = URL + href if not href.startswith("http") else href
            new_link = _Link(text=text, link=normalize_url(full_url))

            topic_links.append(new_link)

    return topic_links


class Command(BaseCommand):
    help = "Import st Andrew topics"

    def get_categories(self, topic_links: List[_Link]):
        for topic_link in topic_links:
            topic_response = requests.get(topic_link.link)
            if topic_response.status_code != 200:
                raise Exception(f"failed to fetch url {topic_link.link}")

            BeautifulSoup(topic_response.text, "html.parser")
            categories = _get_links_and_text(topic_response.text, "#main ul a")

            for category in categories:
                time.sleep(1)
                self.stdout.write(
                    f"fetched {category.text} {category.link} {topic_link.link} {topic_link.text}",
                    ending="\n",
                )
                self.stdout.flush()

                category_response = requests.get(category.link)
                if topic_response.status_code != 200:
                    raise Exception(f"failed to fetch url {topic_link.link}")

                yield (
                    category.text,
                    category.link,
                    topic_link.link,
                    topic_link.text,
                    category_response.text,
                )

    def handle(self, *args, **options):
        self.stdout.write("starting scraping of st andrew topics")
        self.stdout.flush()
        response = requests.get(URL)
        if response.status_code != 200:
            raise Exception(f"failed to fetch url {URL}")

        topic_links: List[_Link] = _get_links_and_text(response.text, "#main table a")

        self.stdout.write(f"found {len(topic_links)} topics", ending="\n")
        self.stdout.flush()

        for category, link, topic, topic_link, html in self.get_categories(topic_links):
            StAndrewsTopic.objects.get_or_create(
                link=link,
                defaults={
                    "title": category,
                    "topic": topic,
                    "topic_link": topic_link,
                    "html": html,
                }
            )
