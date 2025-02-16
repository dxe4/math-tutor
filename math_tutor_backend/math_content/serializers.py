from rest_framework import serializers

from math_content import models


class StAndrewsTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StAndrewsTopic
        fields = [
            "id",
            "link",
            "title",
            "topic",
            "topic_link",
        ]


class StAndrewsCurveSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StAndrewsCurve
        fields = [
            "id",
            "link",
            "title",
        ]


class StAndrewsBiographySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StAndrewsBiography
        fields = [
            "id",
            "link",
            "title",
            "year_start",
            "year_end",
            "year_start_bc",
            "year_end_bc",
            "year_order",
        ]
