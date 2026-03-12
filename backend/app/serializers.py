import cloudinary
from rest_framework import serializers

from .models import MediaModel


class MediaSerializer(serializers.ModelSerializer):
    # image = serializers.ImageField(use_url=True)

    special_image = serializers.SerializerMethodField()
    special_thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = MediaModel
        fields = ["title", "special_image", "special_thumbnail"]

    def get_special_image(self, obj):
        return cloudinary.CloudinaryImage(str(obj.special_image)).build_url()

    def get_special_thumbnail(self, obj):
        return cloudinary.CloudinaryImage(str(obj.special_thumbnail)).build_url()
