import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadSalesAndAppointments() {
  const salesResponse = await fetch('http://localhost:8090/api/sales');
  // const appointmentsResponse = await fetch('http://localhost:8080/api/appointments/');

  if (salesResponse.ok /*&& appointmentsResponse.ok*/) {
    // code gets the data from the responses json method
    const salesData = await salesResponse.json();
    // const appointmentsData = await appointmentsResponse.json();

    root.render(
      <React.StrictMode>
        <App sales={salesData.sales_record} /*appointments={appointmentsData.appointments}*/ />
      </React.StrictMode>
    );
  } else {
    console.error(salesResponse);
    // console.error(appointmentsResponse);
  }
}

loadSalesAndAppointments();
