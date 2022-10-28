import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { useEffect, useState } from 'react';


function App(props) {

  const [appointments, setAppointments] = useState([])

  const [reloadAppointments, setReloadAppointments] = useState(0)

  async function getAppointments() {
    const appointmentsResponse = await fetch('http://localhost:8080/api/appointments/');
    if (appointmentsResponse.ok) {
      const serviceAppointments = await appointmentsResponse.json();

      setAppointments(serviceAppointments.appointments)
      console.log("serviceAppointments", serviceAppointments.appointments)
    }
  }

  useEffect(() => {
    getAppointments()
  }, [reloadAppointments])

  if (props.sales === undefined) {
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
          <Route path="salesrecords" element={<SalesList sales={props.sales} />} />
          <Route path="salesrecords-new" element={<SalesRecordForm />} />
          <Route path="salesperson-history" element={<SalesPersonHistory sales={props.sales} />} />
          <Route path="salesperson-new" element={<SalesPersonForm />} />
          <Route path="customers-new" element={<CustomerForm />} />
          <Route path="technicians-new" element={<TechnicianForm />} />
          <Route path="appointments" element={<ServiceAppointmentList appointments={appointments} reloadAppointments={reloadAppointments} setReloadAppointments={setReloadAppointments} />} />
          <Route path="appointments-new" element={<ServiceAppointmentForm reloadAppointments={reloadAppointments} setReloadAppointments={setReloadAppointments} />} />
          <Route path="appointments-history" element={<ServiceAppointmentHistory appointments={appointments} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
