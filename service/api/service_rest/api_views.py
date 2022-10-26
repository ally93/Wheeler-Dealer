from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Technician, ServiceAppointment

# Create your views here.
# show list of all technicians and creating a technician

# show single technician, for deleting, updating, or getting details of single technician

# show list of all appointments and creating new appointment

# show single appointment, for del, update, or get details of single appointment


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
    ]


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
        "date",
        "time",
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
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create a technician, check required fields"}
            )
            response.status_code = 400
            return response


# get details of single technician, update details, or delete a tech?
@require_http_methods(["GET", "PUT", "DELETE"])
def api_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                {"message": "Technician has been deleted"},
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist"})
    else:
        try:
            content = json.loads(request.body)
            Technician.objects.filter(id=pk).update(**content)
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response


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
        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician not found"},
                status=404,
            )

        try:
            vin_id = content["vin"]
            vip_vin = AutomobileVO.objects.get(vin=vin_id)
            content["is_vip"] = True
        except AutomobileVO.DoesNotExist:
            content["is_vip"] = False

        try:
            appointment = ServiceAppointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create appointment, check required fields"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_service_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = ServiceAppointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                {"message": "Appointment has been deleted"},
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"})
    else:
        try:
            content = json.loads(request.body)
            ServiceAppointment.objects.filter(id=pk).update(**content)
            appointment = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


# @require_http_methods(["GET"])
# def appointment_history(request, vin):
#     appointments = ServiceAppointment.objects.filter(pk=vin)
#     return JsonResponse(
#         {"appointments": appointments},
#         encoder=ServiceAppointmentEncoder,
#     )
