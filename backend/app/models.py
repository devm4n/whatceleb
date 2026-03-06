from django.db import models


class MediaModel(models.Model):
    title = models.CharField()
    thumbnail = models.ImageField(upload_to="")
    image = models.ImageField(upload_to="")

    def __str__(self):
        return self.title
