from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Technician, ServiceAppointment

# Create your views here.
# show list of all technicians, for listing and creating a technician

# show list of all appointments, for listing and creating new appointment

# show single appointment, for del, update, or get details of single appointment


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
        "id",
    ]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "vin",
        "owner",
        "date_time",
        "technician",
        "reason",
        "is_vip",
        "is_finished",
        "id",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


# list technicians, or create a technician
@require_http_methods(["GET", "POST"])
def api_technicians_list(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


# get details of single technician, update details, or delete a tech?
@require_http_methods(["GET", "PUT", "DELETE"])
def api_technician_detail(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
        )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=pk).update(**content)
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


# list service appointments, create a service appointment
@require_http_methods(["GET", "POST"])
def api_service_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentEncoder,
        )
    else:
        content = json.loads(request.body)

        appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentEncoder,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_service_appointment_detail(request, pk):
    if request.method == "GET":
        appointment = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            {"appointment": appointment},
            encoder=ServiceAppointmentEncoder,
        )
    elif request.method == "DELETE":
        count, _ = ServiceAppointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        ServiceAppointment.objects.filter(id=pk).update(**content)
        appointment = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )
