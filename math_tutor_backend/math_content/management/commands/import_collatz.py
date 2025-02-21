import manifold_rs
from django.core.management.base import BaseCommand

from math_content.models import CollatzConjecture

URL = "https://mathshistory.st-andrews.ac.uk/Curves/"


class Command(BaseCommand):
    help = "Import st Andrew curves"

    def handle(self, *args, **options):
        new_objects = []
        for i in range(1, 2000):
            collatz = manifold_rs.collatz_sequence(i)
            sequence = collatz.get_seq_str()
            two_adic_distances = collatz.two_adic_disntace_str()
            total_distance = collatz.total_distance()
            total_2adic_distance = collatz.total_2adic_distance()

            new_obj = CollatzConjecture(
                start_number=i,
                sequence=sequence,
                two_adic_distance_sequence=two_adic_distances,
                total_distance=total_distance,
                two_adic_total_distance=total_2adic_distance,
            )
            new_objects.append(new_obj)
        CollatzConjecture.objects.bulk_create(new_objects)
