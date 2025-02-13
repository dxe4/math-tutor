class MillerRabin:

    @classmethod
    def is_strong_pseudoprime(cls, n, a):
        d, s = n - 1, 0

        # while d % 2**6 == 0:
        #     d, s = d >> 5, s+6

        # while d % 2**5 == 0:
        #     d, s = d >> 4, s+5

        # while d % 2**4 == 0:
        #     d, s = d >> 3, s+4

        while d % 2**3 == 0:
            d, s = d >> 2, s + 3

        while d % 2 == 0:
            d, s = d / 2, s + 1

        t = pow(a, d, n)

        if t == 1:
            return True

        while s > 0:
            if t == n - 1:
                return True

            t, s = pow(t, 2, n), s - 1

        return False

    @classmethod
    def is_prime(cls, n):
        """
        TODO use manifold
        https://github.com/dxe4/manifold
        """
        if n % 2 == 0:
            return n == 2

        if n < 2047:
            a = [2]
        if n < 1373653:
            a = [2, 3]
        if n < 9080191:
            a = [31, 73]
        if n < 25326001:
            a = [2, 3, 5]
        if n < 3215031751:
            a = [2, 3, 5, 7]
        if n < 4759123141:
            a = [2, 7, 61]
        if n < 1122004669633:
            a = [2, 13, 23, 1662803]
        if n < 2152302898747:
            a = [2, 3, 5, 7, 11]
        if n < 3474749660383:
            a = [2, 3, 5, 7, 11, 13]
        if n < 341550071728321:
            a = [2, 3, 5, 7, 11, 13, 17]
        if n < 3825123056546413051:
            a = [2, 3, 5, 7, 11, 13, 17, 19, 23]
        else:
            a = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]

        for i in a:
            if not cls.is_strong_pseudoprime(n, i):
                return False

        return True
