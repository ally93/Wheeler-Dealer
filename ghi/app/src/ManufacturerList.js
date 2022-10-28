import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);

    async function loadManufacturers() {
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        loadManufacturers();
    }, []);
    
    return (
        <div className="container">
            <h3 className="display-6 fw-bold">Manufacturers</h3>
            <button type="button" className="btn btn-outline-light"><NavLink className="nav-link" aria-current="page" to="/manufacturers-new">Add a Manufacturer</NavLink></button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return (
                            <tr style={{ height: 60 }} key={manufacturer.href}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default ManufacturerList
