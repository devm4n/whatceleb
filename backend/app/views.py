from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import MediaModel
from .serializers import MediaSerializer


class MediaView(generics.ListCreateAPIView):
    queryset = MediaModel.objects.all()
    permission_classes = [IsAdminUser]
    serializer_class = MediaSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = MediaSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)

    def get_queryset(self):
        return MediaModel.objects.order_by("?")[:1]

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return [AllowAny()]
