import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { unstable_HistoryRouter } from 'react-router-dom';
import App from './App';

function SalesRecordForm2(props) {
    const [automobiles, setAutomobiles] = useState([]);
    const [salesPersons, setSalesPersons] = useState([]);
    const [customers, setCustomers] = useState([]);

    async function fetchInformation() {
        const automobileUrl = 'http://localhost:8100/api/automobiles/'
        const sales_personUrl = 'http://localhost:8090/api/sales/person/'
        const customerUrl = 'http://localhost:8090/api/customers/'

        const autoResponse = await fetch(automobileUrl)
        const salesResponse = await fetch(sales_personUrl)
        const customerResponse = await fetch(customerUrl)

        if(autoResponse.ok && salesResponse.ok && customerResponse.ok){
            const data_customer = await customerResponse.json();
            const data_salesPerson = await salesResponse.json();
            const data_automobile = await autoResponse.json();

            const unsoldAutos = data_automobile.automobiles.filter(car => !car.sold);
            
            setAutomobiles(unsoldAutos);
            setSalesPersons(data_salesPerson.sales_person);
            setCustomers(data_customer.customers);

        }
    }

    useEffect(() => {
        fetchInformation();
    }, []);

    async function markCarAsSold(automobile_vin){
        const url = `http://localhost:8100/api/automobiles/${automobile_vin}/`;
        const data = {
          automobile : automobile_vin,
          sold : true
        }
        const fetchConfig = {
          method: "put",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          }
        }
  
        const response = await fetch(url, fetchConfig);
  
        if (response.ok) {
            console.log('mark car as sold', response);
        }
    }

    const { register, handleSubmit, reset } = useForm();

    const createNewSale = async (data) => {
        data.sales_person = data.salesPerson;
        delete data.salesPerson;
        console.log(data);

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            await markCarAsSold(data.automobile);
        }
        fetchInformation();

        // reload sales from App.js
        console.log("reset sales");
        props.setReloadSalesCounter(props.reloadSalesCounter + 1);

        reset();
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a new sales record</h1>
              <form onSubmit={handleSubmit(createNewSale)} id="create-salesrecord-form">
                <div className="mb-3">
                  <select {...register("automobile")} required name="automobile" id="automobile" className="form-select">
                    <option value="">Choose an automobile</option>
                    {automobiles.map((automobile) => {
                      return (
                        <option key={automobile.href} value={automobile.vin}>
                          {automobile.vin}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <select {...register("salesPerson")} required name="salesPerson" id="salesPerson" className="form-select">
                      <option value="">Choose a Sales Person</option>
                      {salesPersons.map(salesPerson => {
                          return (
                              <option key={salesPerson.id} value={salesPerson.id}>
                                  {salesPerson.name} - {salesPerson.employee_number}
                              </option>
                          );
                      })}
                  </select>
                  </div>
                <div className="mb-3">
                  <select {...register("customer")} required name="customer" id="customer" className="form-select">
                    <option value="">Choose a customer</option>
                    {customers.map((customer) => {
                      return (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} - {customer.phone_number}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-floating mb-3">
                  <input {...register("price")} placeholder="Price" required type="number" name="price" id="price" className="form-control"/>
                  <label htmlFor="price">Price</label>
                </div>
              <button className="btn btn-primary">Create</button>
              </form>
              </div>
      </div>
    </div>

  );
}

export default SalesRecordForm2;