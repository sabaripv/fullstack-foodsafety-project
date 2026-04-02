# inspections/serializers.py

from rest_framework import serializers
from .models import Inspection
from complaints.models import Complaint

# ==============================
# Serializer for Inspections
# ==============================
class InspectionSerializer(serializers.ModelSerializer):
    inspector_name = serializers.CharField(source='inspector.username', read_only=True)

    class Meta:
        model = Inspection
        fields = ["id", "complaint", "inspector", "inspector_name", "remarks", "image", "created_at"]
        read_only_fields = ["inspector", "created_at"]

# ==============================
# Serializer for updating complaint status
# ==============================
class InspectorUpdateStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ['status']  # Only status is editable

    def validate_status(self, value):
        allowed_statuses = [choice[0] for choice in Complaint.STATUS_CHOICES]
        if value not in allowed_statuses:
            raise serializers.ValidationError("Invalid status.")
        return value