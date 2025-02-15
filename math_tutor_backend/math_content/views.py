from rest_framework import generics, mixins

from math_content.models import StAndrewsTopic
from math_content.serializers import StAndrewsTopicSerializer


class StAndrewTopicView(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = StAndrewsTopic.objects.all()
    serializer_class = StAndrewsTopicSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
