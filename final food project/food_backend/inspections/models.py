# from django.db import models
# from django.contrib.auth.models import User
# from complaints.models import Complaint
# from django.conf import settings

# class Inspection(models.Model):
#     complaint = models.OneToOneField(
#         Complaint,
#         on_delete=models.CASCADE,
#         related_name="inspection"
#     )

    
#     inspector = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     related_name="inspections"
    

#     notes = models.TextField(blank=True, null=True)
#     result = models.CharField(
#         max_length=50,
#         choices=[
#             ("safe", "Safe"),
#             ("unsafe", "Unsafe"),
#             ("needs_followup", "Needs Follow-up"),
#         ],
#         default="needs_followup"
#     )

#     inspected_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Inspection for Complaint #{self.complaint.id}"



# inspections/models.py

from django.db import models
from complaints.models import Complaint
from django.conf import settings

class Inspection(models.Model):
    complaint = models.ForeignKey(
        Complaint,
        on_delete=models.CASCADE,
        related_name="inspections"
    )
    inspector = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="inspections"
    )
    remarks = models.TextField()
    image = models.ImageField(upload_to="inspection_images/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inspection by {self.inspector.username} for {self.complaint.title}"
