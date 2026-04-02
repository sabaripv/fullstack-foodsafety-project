# inspections/views.py

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Inspection
from .serializers import InspectionSerializer, InspectorUpdateStatusSerializer
from complaints.models import Complaint

# ==============================
# Update complaint status (existing)
# ==============================
class InspectorUpdateStatusView(generics.UpdateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = InspectorUpdateStatusSerializer
    permission_classes = [permissions.IsAuthenticated]  # Must be logged in

    def get_queryset(self):
        # Only complaints assigned to this inspector
        return Complaint.objects.filter(assigned_inspector=self.request.user)

    def patch(self, request, *args, **kwargs):
        if request.user.role != 'inspector':
            return Response({"detail": "Not authorized"}, status=403)
        return self.partial_update(request, *args, **kwargs)


# ==============================
# List all inspections for a specific complaint
# ==============================
class ComplaintInspectionListView(generics.ListAPIView):
    serializer_class = InspectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        complaint_id = self.kwargs['complaint_id']
        return Inspection.objects.filter(complaint_id=complaint_id)


# ==============================
# Add a new inspection (only assigned inspector)
# ==============================
class AddInspectionView(generics.CreateAPIView):
    serializer_class = InspectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        complaint_id = self.kwargs['complaint_id']
        try:
            complaint = Complaint.objects.get(id=complaint_id)
        except Complaint.DoesNotExist:
            raise Response({"detail": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)

        if user != complaint.assigned_inspector:
            raise permissions.PermissionDenied("You are not assigned to this complaint.")

        serializer.save(inspector=user, complaint=complaint)