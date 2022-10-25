import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './SalesPersonForm';
import SalesRecordForm from './SalesRecordForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="sales">
            <Route path="person">
              <Route path="add" element={<SalesPersonForm/>}/>
            </Route>
            <Route path="record">
              <Route path="add" element={<SalesRecordForm/>}/>
            </Route>
          </Route>
          <Route path="customers">
            <Route path="add" element={<CustomerForm/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
