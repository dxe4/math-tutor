def collatz(n):
    if n % 2 == 0:
        return int(n / 2)
    return (n * 3) + 1


def collatz_series(n):
    sequence = []
    while n > 4:
        sequence.append(n)
        n = collatz(n)
    return sequence


class CollatzWithCache:

    def __init__(self, cache=None):
        self.cache = cache or {}

    def generate_series(self, n):
        sequence = []
        while n > 4:
            if n in self.cache:
                sequence.extend(self.cache[n])
                return sequence

            sequence.append(n)
            n = collatz(n)
        self.cache[n] = sequence
        return sequence

    def generate_from_range(self, start, end):
        return self.generate_from_iterable(range(start, end))

    def generate_from_iterable(self, iterable):
        result = {}
        for i in iterable:
            result[i] = self.generate_series(i)
        return result
