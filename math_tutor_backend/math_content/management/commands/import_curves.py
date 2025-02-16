from typing import List

import requests
from django.core.management.base import BaseCommand

from math_content.models import StAndrewsCurve
from math_content.scraping import (
    get_links_and_text
)

URL = "https://mathshistory.st-andrews.ac.uk/Biographies/chronological/"


class Command(BaseCommand):
    help = "Import st Andrew curves"

    def handle(self, *args, **options):
        self.stdout.write("starting scraping of st andrew topics")
        self.stdout.flush()
        response = requests.get(URL)
        if response.status_code != 200:
            raise Exception(f"failed to fetch url {URL}")

        links = get_links_and_text(response.text, "#main li a", URL)
        self.stdout.write(f"found {len(links)} curves")
        self.stdout.flush()
        curves = [
            StAndrewsCurve(**{"title": i.text, "link": i.link})
            for i in links
        ]
        StAndrewsCurve.objects.bulk_create(curves)
