from rest_framework import generics, mixins

from math_content import models, serializers


class StAndrewTopicView(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = models.StAndrewsTopic.objects.all()
    serializer_class = serializers.StAndrewsTopicSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class StAndrewsCurveView(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = models.StAndrewsCurve.objects.all()
    serializer_class = serializers.StAndrewsCurveSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class StAndrewsBiographyView(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = models.StAndrewsBiography.objects.all()
    serializer_class = serializers.StAndrewsBiographySerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
