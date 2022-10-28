import React from 'react';
import { NavLink } from 'react-router-dom'

function SalesList(props) {
    return (
        <div className="container">
            <h3 className="display-6 fw-bold">Sales Records</h3>
            <button type="button" className="btn btn-outline-light"><NavLink className="nav-link" aria-current="page" to="/salesrecords-new">Create a Sales Record</NavLink></button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person (Employee Number)</th>
                        <th>Purchaser Name</th>
                        <th>Automobile VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {props.sales.map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.sales_person.name}  ({sale.sales_person.employee_number})</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>${sale.price.toLocaleString()}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    );
}
export default SalesList;

// class SalesList extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = { sales: props.sales };

//     }

//     render() {
//         return (
//             <div className="container">
//                 <h3 className="display-6 fw-bold">Sales Records</h3>
//                 <button type="button" className="btn btn-outline-light"><NavLink className="nav-link" aria-current="page" to="/salesrecords-new">Create a Sales Record</NavLink></button>
//                 <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Sales Person (Employee Number)</th>
//                             <th>Purchaser Name</th>
//                             <th>Automobile VIN</th>
//                             <th>Price</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.sales.map(sale => {
//                             return (
//                                 <tr key={sale.id}>
//                                     <td>{sale.sales_person.name}  ({sale.sales_person.employee_number})</td>
//                                     <td>{sale.customer.name}</td>
//                                     <td>{sale.automobile.vin}</td>
//                                     <td>${sale.price.toLocaleString()}</td>
//                                 </tr>
//                             );
//                         })}

//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }


