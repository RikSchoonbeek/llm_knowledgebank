from rest_framework import viewsets

from knowledge.models import Document, Tag
from knowledge.serializers import DocumentSerializer, TagSerializer


class DocumentViewSet(viewsets.ModelViewSet):

    def create(self, request):
        response = super().create(request)
        return response
    
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
