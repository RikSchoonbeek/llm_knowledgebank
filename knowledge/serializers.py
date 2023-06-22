from rest_framework import serializers

from knowledge.models import Document, Tag


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = (
            "id",
            "name",
            "content",
            "description",
            "tags",
            "owner",
        )


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = (
            "id",
            "name",
            "description",
            "owner",
        )
