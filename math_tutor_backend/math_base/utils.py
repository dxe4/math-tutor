import posixpath
from urllib.parse import urlparse, urlunparse


def normalize_url(url):
    """
    Some urls come in the form of
    https://mathshistory.st-andrews.ac.uk/HistTopics/../../Education/
    """
    parsed = urlparse(url)
    normalized_path = posixpath.normpath(parsed.path)
    normalized_url = urlunparse(parsed._replace(path=normalized_path))
    return str(normalized_url)
