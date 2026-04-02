# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import InspectionViewSet

# router = DefaultRouter()
# router.register(r"inspections", InspectionViewSet, basename="inspection")

# urlpatterns = [
#     path("", include(router.urls)),
# ]


# from django.urls import path
# from .views import InspectorUpdateStatusView

# urlpatterns = [
#     path('complaints/<int:pk>/update-status/', InspectorUpdateStatusView.as_view(), name='update-status'),
# ]



from django.urls import path
from .views import ComplaintInspectionListView, AddInspectionView, InspectorUpdateStatusView

urlpatterns = [
    path('complaints/<int:pk>/update-status/', InspectorUpdateStatusView.as_view(), name='update-status'),
    path('complaints/<int:complaint_id>/inspections/', ComplaintInspectionListView.as_view(), name='inspection-list'),
    path('complaints/<int:complaint_id>/inspections/add/', AddInspectionView.as_view(), name='inspection-add'),
]