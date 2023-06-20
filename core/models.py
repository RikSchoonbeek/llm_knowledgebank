from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    created_dt = models.DateTimeField(default=timezone.now)
    updated_dt = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey("user.User", on_delete=models.CASCADE)

    class Meta:
        abstract = True
