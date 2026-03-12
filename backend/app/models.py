from cloudinary.models import CloudinaryField
from django.db import models


class MediaModel(models.Model):
    title = models.CharField()
    # thumbnail = models.ImageField(upload_to="")
    # image = models.ImageField(upload_to="")
    special_image = CloudinaryField("cloud-image")
    special_thumbnail = CloudinaryField("cloud-thumbnail")

    def __str__(self):
        return self.title
