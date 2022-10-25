from django.urls import path

from .api_views import (
    api_technicians_list,
    api_technician_detail,
    api_service_appointments,
)

urlpatterns = [
    path("technicians/", api_technicians_list, name="api_technicians"),
    path("technicians/<int:pk>/", api_technician_detail, name="api_technician_detail"),
    path(
        "service-appointments/",
        api_service_appointments,
        name="api_service_appointments",
    ),
]
