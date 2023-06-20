from django.urls import include, path
from rest_framework import routers

from knowledge.views import DocumentViewSet, TagViewSet

router = routers.DefaultRouter()
router.register(r'documents', DocumentViewSet)
router.register(r'tags', TagViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
