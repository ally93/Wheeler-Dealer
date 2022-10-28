import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Wheeler Dealer</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Inventory</NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/manufacturers">Manufacturer List</NavLink></li>
                <li><NavLink className="dropdown-item" to="/vehicles">Vehicle Model List</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles">Automobile List</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers-new">Add a Manufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/vehicles-new">Add New Vehicle Model</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles-new">Create New Automobile</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Sales</NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/salesrecords">Sales Records</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salesperson-history">Sales History</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salesperson-new">Create New Sales Person</NavLink></li>
                <li><NavLink className="dropdown-item" to="/customers-new">Create New Customer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salesrecords-new">Create New Sales Record</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Service</NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/technicians-new">Add a Technician</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments-new">Create a Service Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments">Service Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments-history">Appointment History</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
