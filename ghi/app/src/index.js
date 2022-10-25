import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadManufacturers() {
  const response = await fetch('http://localhost:8100/api/manufacturers/');
  console.log(":::response:::", response)
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App manufacturers={data.manufacturers} />
      </React.StrictMode>
    );
    console.log(":::::data::::::", data)
    console.log(":::::data.man::::::", data.manufacturers)

  } else {
    console.error(response);
  }
}
loadManufacturers();
