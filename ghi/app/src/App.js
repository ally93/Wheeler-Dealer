import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesList from './SalesList';
import SalesPersonForm from './SalesPersonForm';
import SalesPersonHistory from './SalesPersonHistory';
import SalesRecordForm from './SalesRecordForm';

function App(props) {
  if(props.sales === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
