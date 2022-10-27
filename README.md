# CarCar

### Team:

* Derrick Wan - Service microservice
* Ally Chock - Sales microservice

# Design
This project consists of 3 microservices(Sales, Service, Inventory) operating within their own bounded contexts. There is an integration point between Service and Sales microservice with the Inventory microservice through the automobile model. The microservices integrates with the inventory system via polling. It periodically checks the inventory levels and compares them to the levels that are stored in the microservice. If there are any discrepancies, it updates the microservices accordingly.All these backend is used to build the frontend. When a user opens the site, they'll be able to use the navbar to check out different components.

# Service microservice

Explain your models and integration with the inventory
microservice, here.

# Sales microservice
Sales microservice is divided into 2 portions, 1 is the backend apis and another is the frontend built ontop of react. This service allows you to create and view customers, sales person, and sales records.
Below are the apis exposed to the main project. 

From Insomnia and your browser, you can access the sales endpoints at the following URLs.
### Customer api
| Action    | Method  | URL                             |
|-----------|---------|---------------------------------|
| List Customers| GET     | http://localhost:8090/api/cutomers |
| Create Customer| POST     | http://localhost:8090/api/customers |
| Customer detail| GET     | http://localhost:8090/api/customers/:id/ |
| Update Customer| PUT     | http://localhost:8090/api/customers/:id/ |
| Delete Customer| DELETE     | http://localhost:8090/api/customers/:id/ |


Example of creating a customer using post method. 
```
{ 
    "name" : "Bob234",
	"address" : "12 uphill ave, why, ca",
	"phone_number" : "900-100-2001"
}
```




### Sales person api

| Action    | Method  | URL                             |
|-----------|---------|---------------------------------|
| List Sales| GET     | http://localhost:8090/api/sales/person |
| Create Sale| POST     | http://localhost:8090/api/sales/person |
| Sale detail| GET     | http://localhost:8090/api/sales/person/:id/ |
| Update sale| PUT     | http://localhost:8090/api/sales/person/:id/ |
| Delete sale| DELETE     | http://localhost:8090/api/sales/person/:id/ |


Example of creating a sales person
```
{
    "name" : "Ron",
	"employee_number" : "006"
}
```


### Sales api



| Action    | Method  | URL                             |
|-----------|---------|---------------------------------|
| List Sales| GET     | http://localhost:8090/api/sales |
| Create Sale| POST     | http://localhost:8090/api/sales |
| Sale detail| GET     | http://localhost:8090/api/sales/:id/ |
| Update sale| PUT     | http://localhost:8090/api/sales/:id/ |
| Delete sale| DELETE     | http://localhost:8090/api/sales/:id/ |


Creating and updating a sale requires automobile vin, sales_person id and customer id.
```
{ 
    "price" : 1000,
	"automobile" : "1C3CC5FB2AN120174",
	"sales_person" : 1,
	"customer" : 1
}
```


### Approach for sales microservice
-Django is used to build the backend model, views and urls for sales microservice
-settings- Linked the django app and project and cors
-Models consist of AutomobileVO, SalesPerson, Customer, SalesRecord
-Registered models in the admin.py
-Views , utilized restful api (POST, GET, DELETE, PUT)
-URLS linking paths from both the app and project
-Ensured the correct polling of data 


# Application UI
You can navigate to create view customer, sales, and sales person through the app in localhost:3000


The frontend is set up in React as follow

| Method | Path                  | Description                                   |
| ------ | --------------------- | --------------------------------------------- |
| GET    | /api/sales/           | Get a list of sales                           |
| POST   | /api/sales/record/add | Create a new sales                            |
| GET    | /api/sales/person/history/ | Filter out the sales history of a sales staff |
| POST   | /api/sales/person/add  | Register a new sales staff                    |
| POST   | /api/customers/new/   | Register a new customer                       |
| GET    | /api/vehicles/models   | Get a list of vehicle models                     |
| POST   | /api/vehicles/models/add | Create a new vehicle models                     |




# How to run the app

After cloning the repo, use docker to build and run the application
```
docker volume create beta-data
docker-compose build
docker-compose up
```
