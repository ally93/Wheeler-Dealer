import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadSalesAndAppointments(){
  const appointmentsResponse = await fetch('http://localhost:8080/api/appointments/');

  if(appointmentsResponse.ok){
    // code gets the data from the responses json method
    const appointmentsData = await appointmentsResponse.json();

    root.render(
      <React.StrictMode>
        <App appointments={appointmentsData.appointments}/>
      </React.StrictMode>
    );
  } else {
    console.error(appointmentsResponse);
  }
}

loadSalesAndAppointments();

