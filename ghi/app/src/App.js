import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import MainPage from './MainPage';
import Nav from './Nav';

import SalesList from './SalesList';
import SalesPersonForm from './SalesPersonForm';
import SalesPersonHistory from './SalesPersonHistory';
import SalesRecordForm from './SalesRecordForm';

import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutoMobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';

import TechnicianForm from './TechnicianForm';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceAppointmentList from './ServiceAppointmentList';
import ServiceAppointmentHistory from './ServiceAppointmentHistory';


function App(props) {
  if(props.sales === undefined || props.appointments === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="vehicles">
            <Route path="models">
              <Route path="" element={<VehicleModelList/>}/>
              <Route path="add" element={<VehicleModelForm/>}/>
            </Route>
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList sales={props.sales}/>}/>
            <Route path="person">
              <Route path="add" element={<SalesPersonForm/>}/>
              <Route path="history" element={<SalesPersonHistory sales={props.sales}/>}/>
            </Route>
            <Route path="record">
              <Route path="add" element={<SalesRecordForm/>}/>
            </Route>
          </Route>
          <Route path="customers">
            <Route path="add" element={<CustomerForm/>}/>
          </Route>
          <Route path="manufacturers">
            <Route path="" element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutoMobileList automobiles={props.automobiles} />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="new" element={<ServiceAppointmentForm />} />
            <Route path="" element={<ServiceAppointmentList appointments={props.appointments} />} />
            <Route path="history" element={<ServiceAppointmentHistory appointments={props.appointments} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
