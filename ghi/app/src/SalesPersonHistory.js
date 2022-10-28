import React, { useState, useEffect } from 'react';

function SalesPersonHistory2(props) {
    const [salesPerson, setSalesPerson] = useState('');
    const [filteredSales, setFilteredSales] = useState([]);

    function handleSalesPersonChange(event) {
        const newSalesPerson = event.target.value;
        let filtered = props.sales.filter(sale => sale.sales_person.id == newSalesPerson);
        setSalesPerson(newSalesPerson);
        setFilteredSales(filtered);
    }

    const [salesPersons, setSalesPersons] = useState([]);

    useEffect(() => {
        async function fetchSalesPersons() {
            const url = 'http://localhost:8090/api/sales/person/';

            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setSalesPersons(data.sales_person);
            }
        }

        fetchSalesPersons();
    }, []);

    // console.log('Sales Persons', salesPersons, ' filtered sales ', filteredSales);

    return (
        <div className="container">
            <h3 className="display-6 fw-bold">Sales History</h3>
            <div className="mb-3">
                <select value={salesPerson} onChange={handleSalesPersonChange} required name="salesPerson" id="salesPerson" className="form-select">
                    <option value="">Choose a Sales Person</option>
                    {salesPersons.map(salesPerson => {
                        return (
                            <option key={salesPerson.id} value={salesPerson.id}>
                                {salesPerson.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person</th>
                        <th>Purchaser Name</th>
                        <th>Automobile VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.sales_person.name}</td>
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

export default SalesPersonHistory2;