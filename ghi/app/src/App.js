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
  if (props.sales === undefined || props.appointments === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="vehicles" element={<VehicleModelList />} />
          <Route path="automobiles" element={<AutoMobileList />} />
          <Route path="manufacturers-new" element={<ManufacturerForm />} />
          <Route path="vehicles-add" element={<VehicleModelForm />} />
          <Route path="automobiles-new" element={<AutomobileForm />} />
          {/* <Route path="" element={<VehicleModelList />} /> */}
          {/* <Route path="add" element={<VehicleModelForm />} /> */}
          {/* </Route> */}
          {/* </Route> */}
          <Route path="salesrecords" element={<SalesList sales={props.sales} />} />
          {/* <Route path="" element={<SalesList sales={props.sales} />} /> */}
          <Route path="salesperson-history" element={<SalesPersonHistory sales={props.sales} />} />
          <Route path="salesperson-add" element={<SalesPersonForm />} />
          {/* <Route path="add" element={<SalesPersonForm />} /> */}
          {/* </Route> */}
          {/* <Route path="record"> */}
          <Route path="salesrecord-add" element={<SalesRecordForm />} />
          {/* </Route> */}
          {/* </Route> */}
          <Route path="customers-add" element={<CustomerForm />} />
          {/* <Route path="add" element={<CustomerForm />} /> */}
          {/* </Route> */}
          {/* <Route path="" element={<ManufacturerList manufacturers={props.manufacturers} />} /> */}
          {/* </Route> */}
          {/* <Route path="" element={<AutoMobileList automobiles={props.automobiles} />} /> */}
          {/* </Route> */}
          <Route path="technicians-new" element={<TechnicianForm />} />
          {/* <Route path="new" element={<TechnicianForm />} /> */}
          {/* </Route> */}
          <Route path="appointments" element={<ServiceAppointmentList appointments={props.appointments} />} />
          <Route path="appointments-new" element={<ServiceAppointmentForm />} />
          {/* <Route path="" element={<ServiceAppointmentList appointments={props.appointments} />} /> */}
          <Route path="appointments-history" element={<ServiceAppointmentHistory appointments={props.appointments} />} />
          {/* </Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
