from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
from django.http import JsonResponse


# encoders
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin']

class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        'name',
        'employee_number',
        'id'
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        'name',
        'address',
        'phone_number',
        'id'
    ]

class SalesRecordListEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        'automobile',
        'sales_person',
        'customer',
        'price'
    ]
    def get_extra_data(self,o):
        return {
            'automobile': o.automobile.vin,
            'sales_person': {
                'name': o.sales_person.name,
                'employee_number': o.sales_person.employee_number,
            },
            'customer': o.customer.name
        }

class SalesRecordDetailEncoder(ModelEncoder):
    model=SalesRecord
    properties = [
        'automobile',
        'sales_person',
        'customer',
        'price'
    ]
    encoders = {
        'automobile': AutomobileVOEncoder(),
        'sales_person': SalesPersonListEncoder(),
        'customer': CustomerListEncoder(),
    }




# Create your views here.
@require_http_methods(["GET", "POST"])
def sales_person_list(request):
    if request.method == 'GET':
        sales_person = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_person": sales_person},
            encoder=SalesPersonListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            sales_person= SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonListEncoder,
                safe= False
            )

        except:
            return JsonResponse(
                {'message': 'Invalid information, could not create a sales person.'},
                status=400,
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def show_sales_person(request, pk):
    if request.method == "GET":
        sales_person = SalesPerson.objects.get(id=pk)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = SalesPerson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            SalesPerson.objects.filter(id=pk).update(**content)
            sales_person = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonListEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
            {"message": "Sales Person does not exist"},
            status = 404
            )

@require_http_methods(["GET", "POST"])
def customer_list(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe= False
            )

        except:
            return JsonResponse(
                {'message': 'Invalid information, could not create a customer.'},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales_record = SalesRecord.objects.all()
        return JsonResponse(
            {"sales_record": sales_record}, 
            encoder=SalesRecordListEncoder,
            safe=False 
        )
    else:
        content = json.loads(request.body)
        try:
            content["automobile"] = AutomobileVO.objects.get(vin=content['automobile'])
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
            {"message": "Automobile does not exist"},
            status = 404
            )
        try:
            id = content["sales_person"]
            sales_person = SalesPerson.objects.get(id=id)
            content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            return JsonResponse(
            {"message": "Sales Person does not exist"},
            status = 404
            )
        try:
            id = content["customer"]
            customer = Customer.objects.get(id=id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
            {"message": "Customer does not exist"},
            status = 404
            )
        sale = SalesRecord.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SalesRecordDetailEncoder,
            safe=False,
        )
