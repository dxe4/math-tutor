import uuid

import django_filters
import manifold_rs
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, mixins
from rest_framework.response import Response

from math_content import models, serializers
from math_content.tasks import is_prime_task


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


class PrimeCheckView(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        session_id = str(uuid.uuid4())

        data = {"start": request.GET.get("start"), "end": request.GET.get("end")}
        serializer = serializers.PrimeRangeSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        task_data = (
            session_id,
            serializer.data["start"],
            serializer.data["end"],
        )
        is_prime_task.apply_async(task_data, countdown=5)

        return Response({"session_id": session_id}, status=200)


class PowerOfTwoConvergence(generics.GenericAPIView):
    """
    TODO any better name for this?
    """

    def get(self, request, *args, **kwargs):
        result = manifold_rs.power_of_two_exponent_10n_py(1, 1000)
        data = {"powers": result}
        return Response(data, status=200)


class CollatzFilter(django_filters.FilterSet):
    start = django_filters.NumberFilter(
        field_name="start_number", lookup_expr="gte", required=True
    )
    end = django_filters.NumberFilter(
        field_name="start_number", lookup_expr="lte", required=True
    )

    class Meta:
        model = models.CollatzConjecture
        fields = ["start", "end"]


class CollatzConjectureView(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = models.CollatzConjecture.objects.all()
    serializer_class = serializers.CollatzSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = CollatzFilter

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
