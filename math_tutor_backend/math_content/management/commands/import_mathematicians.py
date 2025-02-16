from typing import List

import requests
from django.core.management.base import BaseCommand

from math_content.models import StAndrewsBiography
from math_content.scraping import get_mathematician_info

URL = "https://mathshistory.st-andrews.ac.uk/Biographies/chronological/"


class Command(BaseCommand):
    help = "Import st Andrew biographics"

    def handle(self, *args, **options):
        self.stdout.write("starting scraping of st andrew topics")
        self.stdout.flush()
        response = requests.get(URL)
        if response.status_code != 200:
            raise Exception(f"failed to fetch url {URL}")

        biobraphy_objects = get_mathematician_info(response.text, URL)
        self.stdout.write(f"found {len(biobraphy_objects)} mathematicians")
        self.stdout.flush()
        StAndrewsBiography.objects.bulk_create(biobraphy_objects)
