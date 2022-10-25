from django.urls import path
from .api_views import customer_list, sales_person_list, show_sales_person, list_sales

urlpatterns = [
    path("sales/", list_sales, name="list_sales"),
    path("sales/person/", sales_person_list, name="sales_person_list"),
    path("sales/person/<int:sales_person_id", show_sales_person, name="show_sales_person"),
    path("customers/", customer_list, name="customer_list"),
    # path("customers/<int:customer_id>", customer_detail, name="customer_detail"),
]