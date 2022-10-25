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

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        'name',
        'employee_number',
        'id'
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        'name',
        'address',
        'phone_number',
        'id'
    ]


class SalesRecordEncoder(ModelEncoder):
    model=SalesRecord
    properties = [
        'automobile',
        'sales_person',
        'customer',
        'price',
        'id'
    ]
    encoders = {
        'automobile': AutomobileVOEncoder(),
        'sales_person': SalesPersonEncoder(),
        'customer': CustomerEncoder(),
    }


# sales person functions

# Create your views here.
@require_http_methods(["GET", "POST"])
def sales_person_list(request):
    if request.method == 'GET':
        sales_person = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_person": sales_person},
            encoder=SalesPersonEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            sales_person= SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
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
            encoder=SalesPersonEncoder,
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
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
            {"message": "Sales Person does not exist"},
            status = 404
            )

# customer functions
@require_http_methods(["GET", "POST"])
def customer_list(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe= False
            )

        except:
            return JsonResponse(
                {'message': 'Invalid information, could not create a customer.'},
                status=400,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def show_customer(request, pk):
    if request.method == "GET":
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )

    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
        
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=pk).update(**content)
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )



# sales record functions

@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales_record = SalesRecord.objects.all()
        return JsonResponse(
            {"sales_record": sales_record}, 
            encoder=SalesRecordEncoder,
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
            encoder=SalesRecordEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def show_sales(request, pk):
    if request.method == "GET":     
        sales = SalesRecord.objects.get(id=pk)
        return JsonResponse(
            sales,
            encoder=SalesRecordEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = SalesRecord.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0}) 
    else:
        content = json.loads(request.body)
        try:
            if "automobile" in content:
                vin = content["automobile"]
                automobile = AutomobileVO.objects.get(vin=vin)
                content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile does not exist"},
                status = 404
            )
        try:
            if "sales_person" in content:
                id = content["sales_person"]
                sales_person = SalesPerson.objects.get(id=id)
                content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            return JsonResponse(
            {"message": "Sales Person does not exist"},
            status = 404
            )
        try:
            if "customer" in content:
                id = content["customer"]
                customer = Customer.objects.get(id=id)
                content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
            {"message": "Customer does not exist"},
            status = 404
            )
        try :
            SalesRecord.objects.filter(id=pk).update(**content)
            sales_record = SalesRecord.objects.get(id=pk)
            return JsonResponse(
            sales_record,
            encoder=SalesRecordEncoder,
            safe=False
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
            {"message": "Invalid sales record"},
            status=400,
            )
