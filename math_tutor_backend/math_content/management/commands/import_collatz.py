import manifold_rs
from django.core.management.base import BaseCommand

from math_content.models import CollatzConjecture

URL = "https://mathshistory.st-andrews.ac.uk/Curves/"


class Command(BaseCommand):
    help = "Import Collatz"

    def add_arguments(self, parser):
        parser.add_argument(
            '--start',
            type=int,
            default=1,
            help='Starting value (default: 1)',
        )
        parser.add_argument(
            '--end',
            type=int,
            default=2000,
            help='Ending value (default: 2000)',
        )

    def handle(self, *args, **options):
        new_objects = []
        start = options['start']
        end = options['end']
        if end < start:
            self.stdout.write(self.style.ERROR(
                f"end must be bigger than start. \n"
                "start: {start} end: {end}")
            )
            self.stdout.flush()
            return

        created_in_range = CollatzConjecture.objects.filter(
            start_number__gte=start,
            start_number__lte=end,
        ).values_list("start_number", flat=True)
        created_in_range = set(created_in_range)

        for i in range(start, end + 1):
            if i in created_in_range:
                continue
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
