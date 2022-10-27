from django.urls import path

from .api_views import (
    api_technicians,
    api_technician,
    api_service_appointments,
    api_service_appointment,
)

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:pk>/", api_technician, name="api_technician"),
    path(
        "appointments/",
        api_service_appointments,
        name="api_appointments",
    ),
    path(
        "appointments/<int:pk>/",
        api_service_appointment,
        name="api_appointment",
    ),
]
