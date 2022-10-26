import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link"  to="/vehicles/models">Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"  to="/sales">Sales Records</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"  to="/sales/person/history">Sales History</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav my-2 my-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link"  to="/sales/person/add">Create New Sales Person</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"  to="/customers/add">Create New Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"  to="/sales/record/add">Create New Sales Record</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
