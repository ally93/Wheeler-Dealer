from django.urls import path
from .api_views import customer_list, show_customer, sales_person_list, show_sales, show_sales_person, list_sales

urlpatterns = [
    path("sales/", list_sales, name="list_sales"),
    path("sales/<int:pk>/", show_sales, name="show_sales"),
    path("sales/person/", sales_person_list, name="sales_person_list"),
    path("sales/person/<int:pk>/", show_sales_person, name="show_sales_person"),
    path("customers/", customer_list, name="customer_list"),
    path("customers/<int:pk>/", show_customer, name="show_customer"),
]