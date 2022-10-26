# CarCar

Team:

* Derrick Wan - Service microservice
* Ally Chock - Sales microservice

## Design
This project consists of 3 microservices(Sales, Service, Inventory) operating within their own bounded contexts. There is an integration point between Service and Sales microservice with the Inventory microservice through the automoile model. The microservices integrates with the inventory system via polling. It periodically checks the inventory levels and compares them to the levels that are stored in the microservice. If there are any discrepancies, it updates the microservices accordingly.All these backend is used to build the frontend. When a user opens the site, they'll be able to use the navbar to check out different components.

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

-Django is used to build the backend model, views and urls for sales microservice
-settings- Linked the django app and project n cors
-Models consist of AutomobileVO, SalesPerson, Customer, SalesRecord
-Registered models in the admin.py
-Views , utilized restful api (POST, GET, DELETE, PUT)
-URLS linking paths from both the app and project
-Ensured the correct polling of data 
