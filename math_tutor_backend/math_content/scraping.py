import time
from dataclasses import dataclass
from typing import List, Tuple
from typing_extensions import Optional
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup
from math_content.models import StAndrewsBiography


URL = "https://mathshistory.st-andrews.ac.uk/HistTopics/"


@dataclass
class Link:
    text: str
    link: str


def _clean_year(year: str) -> Tuple[Optional[int], bool]:
    if not year.strip():
        return None, False
    bc = "BC" in year
    return int(year.replace("BC", "").strip()), bc


def _clean_year_text(year_text: str) -> Tuple[Optional[int], bool, Optional[int], bool]:
    # (1680 BC - 1620 BC)
    start_year, end_year = year_text.split("-")
    start_year, end_year = start_year.strip(), end_year.strip()
    start_year, start_year_bc = _clean_year(start_year)
    end_year, end_year_bc = _clean_year(end_year)
    return start_year, start_year_bc, end_year, end_year_bc


def get_mathematician_info(
    response_text: str,
    current_url: str
) -> List[StAndrewsBiography]:
    soup = BeautifulSoup(response_text, "html.parser")
    mathematicians: List[StAndrewsBiography] = []

    for mathematician in soup.select("li"):
        if len(mathematician.contents) == 1:
            # this should be th end
            continue
        years_text = mathematician.contents[0].strip()
        years_text = years_text.replace("(", "")
        years_text = years_text.replace(")", "")
        name = mathematician.a.text.strip()
        link_href = mathematician.a["href"]
        if str(link_href).startswith("http"):
            full_url = link_href
        else:
            full_url = urljoin(current_url, link_href)

        if not years_text:
            # theres an empty section in the list
            continue
        start_year, start_year_bc, end_year, end_year_bc = _clean_year_text(
            years_text
        )
        mathematicians.append(
            StAndrewsBiography(
                title=name,
                link=full_url,
                year_start=start_year,
                year_start_bc=start_year_bc,
                year_end=end_year,
                year_end_bc=end_year_bc,
            )
        )
    return mathematicians


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
