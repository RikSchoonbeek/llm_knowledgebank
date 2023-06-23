from django.db import models
from django.utils import timezone

from core.models import BaseModel


class Document(BaseModel):
    """
    A document is any file that can be uploaded to be added to the knowledge base
    of a user.
    """

    name = models.CharField(max_length=255)
    description = models.TextField()
    content = models.FileField(
        upload_to=lambda instance, filename: f"documents/{timezone.now().strftime('%Y_%m_%d')}/{filename}"
    )
    tags = models.ManyToManyField(
        "knowledge.Tag",
        related_name="documents",
        blank=True,
    )
    owner = models.ForeignKey(
        "user.User",
        on_delete=models.CASCADE,
        related_name="documents",
    )


class Tag(BaseModel):
    """
    A tag is a label that can be applied to a document to help categorize it.
    """

    name = models.CharField(max_length=255)
    description = models.TextField()
    owner = models.ForeignKey(
        "user.User",
        on_delete=models.CASCADE,
        related_name="tags",
    )
