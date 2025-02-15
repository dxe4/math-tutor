import os
from urllib.parse import urljoin, urlparse


def normalize_url(base_url, relative_path):
    """
    Some urls come in the form of
    https://mathshistory.st-andrews.ac.uk/HistTopics/../../Education/
    """
    full_url = urljoin(base_url, relative_path)
    parsed_url = urlparse(full_url)
    normalized_path = os.path.normpath(parsed_url.path)

    result = parsed_url._replace(path=normalized_path).geturl()
    return result
