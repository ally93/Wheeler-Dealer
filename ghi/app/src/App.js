import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';

import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';
import AutoMobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';

import SalesList from './SalesList';
import SalesRecordForm from './SalesRecordForm';
import SalesPersonHistory from './SalesPersonHistory';
import SalesPersonForm from './SalesPersonForm';
import CustomerForm from './CustomerForm';

import TechnicianForm from './TechnicianForm';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceAppointmentList from './ServiceAppointmentList';
import ServiceAppointmentHistory from './ServiceAppointmentHistory';


function App(props) {
  const[salesRecords, setSalesRecords] = useState([]);

  const[reloadSalesCounter, setReloadSalesCounter] = useState(0);

  async function loadSalesRecords() {
    const salesResponse = await fetch('http://localhost:8090/api/sales');

    if(salesResponse.ok){
      // code gets the data from the responses json method
      const salesData = await salesResponse.json();
      setSalesRecords(salesData.sales_record);
      console.log('sales', salesData.sales_record)
    }
  }

  useEffect(() => {
    loadSalesRecords();
  }, [reloadSalesCounter]);

  if (props.appointments === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="manufacturers-new" element={<ManufacturerForm />} />
          <Route path="vehicles" element={<VehicleModelList />} />
          <Route path="vehicles-new" element={<VehicleModelForm />} />
          <Route path="automobiles" element={<AutoMobileList />} />
          <Route path="automobiles-new" element={<AutomobileForm />} />
          <Route path="salesrecords" element={<SalesList sales={salesRecords} />} />
          <Route path="salesrecords-new" element={<SalesRecordForm 
              reloadSalesCounter={reloadSalesCounter} setReloadSalesCounter={setReloadSalesCounter}/>} />
          <Route path="salesperson-history" element={<SalesPersonHistory sales={salesRecords} />} />
          <Route path="salesperson-new" element={<SalesPersonForm />} />
          <Route path="customers-new" element={<CustomerForm />} />
          <Route path="technicians-new" element={<TechnicianForm />} />
          <Route path="appointments" element={<ServiceAppointmentList appointments={props.appointments} />} />
          <Route path="appointments-new" element={<ServiceAppointmentForm />} />
          <Route path="appointments-history" element={<ServiceAppointmentHistory appointments={props.appointments} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
