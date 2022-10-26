import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// async function loadManufacturers() {
//   const response = await fetch('http://localhost:8100/api/manufacturers/');

//   if (response.ok) {
//     const data = await response.json();
//     root.render(
//       <React.StrictMode>
//         <App manufacturers={data.manufacturers} />
//       </React.StrictMode>
//     );
//   } else {
//     console.error(response);
//   }
// }
// loadManufacturers();

// async function loadAutomobiles() {
//   const response = await fetch('http://localhost:8100/api/automobiles/');

//   if (response.ok) {
//     const data = await response.json();
//     // console.log(":::::data::::::", data)
//     root.render(
//       <React.StrictMode>
//         {/* <App automobiles={data.automobiles} /> */}
//         <App automobiles={data.automobiles} />
//       </React.StrictMode>
//     );
//   } else {
//     console.error(response);
//   }
// }

// loadAutomobiles()

async function loadAppointments() {
  const response = await fetch('http://localhost:8080/api/service-appointments/');

  if (response.ok) {
    const data = await response.json();
    // console.log(":::::data::::::", data)
    root.render(
      <React.StrictMode>
        {/* <App automobiles={data.automobiles} /> */}
        <App appointments={data.appointments} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
}

loadAppointments()
