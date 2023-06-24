from rest_framework import status
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from knowledge.models import Document, Tag
from knowledge.serializers import DocumentSerializer, TagSerializer


class DocumentViewSet(
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tags = serializer.validated_data.pop("tags")
        document = Document.objects.create(
            **serializer.validated_data,
            created_by=self.request.user,
        )
        document.tags.set(tags)
        response_serializer = self.get_serializer(instance=document)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)


class TagViewSet(
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tag = Tag.objects.create(
            **serializer.validated_data,
            created_by=self.request.user,
        )
        response_serializer = self.get_serializer(instance=tag)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)
