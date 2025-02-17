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


class PrimeRangeSerializer(serializers.Serializer):
    start = serializers.IntegerField(required=True)  # Required field
    end = serializers.IntegerField(
        required=False, allow_null=True
    )  # Optional field, can be null

    def validate(self, attrs):
        start = attrs.get("start")
        end = attrs.get("end")

        if end is None:
            attrs["end"] = start + 1

        if end is not None and end < start:
            raise serializers.ValidationError(
                "End must be greater than or equal to start."
            )

        return attrs
