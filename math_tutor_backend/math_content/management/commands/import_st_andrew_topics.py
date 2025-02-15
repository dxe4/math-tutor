import time
from dataclasses import dataclass
from typing import List
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand

from math_content.models import StAndrewsTopic

URL = "https://mathshistory.st-andrews.ac.uk/HistTopics/"


@dataclass
class _Link:
    text: str
    link: str


def _get_links_and_text(
    response_text: str, selector: str, current_url: str
) -> List[_Link]:
    soup = BeautifulSoup(response_text, "html.parser")
    topic_links = []
    for link in soup.select(selector):
        href = link.get("href")
        text = link.get_text(strip=True)
        if href and text:
            if str(href).startswith("http"):
                full_url = href
            else:
                full_url = urljoin(current_url, href)
            new_link = _Link(text=text, link=full_url)

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
            categories = _get_links_and_text(
                topic_response.text, "#main ul a", topic_link.link
            )

            for category in categories:
                time.sleep(0.1)
                self.stdout.write(
                    f"fetched {category.text} {category.link}"
                    f"{topic_link.link} {topic_link.text}",
                    ending="\n",
                )
                self.stdout.flush()

                yield (
                    category.text,
                    category.link,
                    topic_link.text,
                    topic_link.link,
                )

    def handle(self, *args, **options):
        self.stdout.write("starting scraping of st andrew topics")
        self.stdout.flush()
        response = requests.get(URL)
        if response.status_code != 200:
            raise Exception(f"failed to fetch url {URL}")

        topic_links: List[_Link] = _get_links_and_text(
            response.text, "#main table a", URL
        )

        self.stdout.write(f"found {len(topic_links)} topics", ending="\n")
        self.stdout.flush()

        for category, link, topic, topic_link in self.get_categories(topic_links):
            StAndrewsTopic.objects.get_or_create(
                link=link,
                defaults={
                    "title": category,
                    "topic": topic,
                    "topic_link": topic_link,
                },
            )
