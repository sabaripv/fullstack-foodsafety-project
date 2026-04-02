from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Complaint
from .serializers import ComplaintSerializer
from rest_framework.response import Response

class ComplaintViewSet(viewsets.ModelViewSet):
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user

        if user.role == "admin":
            return Complaint.objects.all().order_by("-created_at")

        elif user.role == "inspector":
            return Complaint.objects.filter(
            assigned_inspector=user
        ).order_by("-created_at")

        else:  # citizen
            return Complaint.objects.filter(
            user=user
            ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        if request.user.role != "citizen":
            return Response(
            {"error": "Only citizens can create complaints."},
            status=403
        )
        return super().create(request, *args, **kwargs)
    
    
    def update(self, request, *args, **kwargs):
        complaint = self.get_object()

    # Inspector can only update status
        if request.user.role == "inspector":
            allowed_fields = ["status"]
            data = {key: request.data[key] for key in allowed_fields if key in request.data}
            serializer = self.get_serializer(complaint, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        return super().update(request, *args, **kwargs)