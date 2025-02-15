from rest_framework import serializers

from math_content.models import StAndrewsTopic


class StAndrewsTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = StAndrewsTopic
        fields = "__all__"
