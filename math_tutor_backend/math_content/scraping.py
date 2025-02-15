import time
from dataclasses import dataclass
from typing import List
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

URL = "https://mathshistory.st-andrews.ac.uk/HistTopics/"


@dataclass
class Link:
    text: str
    link: str


def get_links_and_text(
    response_text: str, selector: str, current_url: str
) -> List[Link]:
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
            new_link = Link(text=text, link=full_url)

            topic_links.append(new_link)

    return topic_links


def get_categories(topic_links: List[Link]):
    for topic_link in topic_links:
        topic_response = requests.get(topic_link.link)
        if topic_response.status_code != 200:
            raise Exception(f"failed to fetch url {topic_link.link}")

        BeautifulSoup(topic_response.text, "html.parser")
        categories = get_links_and_text(
            topic_response.text, "#main ul a", topic_link.link
        )

        for category in categories:
            time.sleep(1)
            yield (
                category.text,
                category.link,
                topic_link.text,
                topic_link.link,
            )
