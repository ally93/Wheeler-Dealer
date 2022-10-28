import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

function VehicleModelList() {
    const [models, setModels] = useState([]);

    async function loadModels() {
        const url = "http://localhost:8100/api/models/"
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        loadModels();
    }, []);

    return (
        <div className="container">
            <h3 className="display-6 fw-bold">Vehicle Models</h3>
            <button type="button" className="btn btn-outline-light"><NavLink className="nav-link" aria-current="page" to="/vehicles-new">Add a Vehicle Model</NavLink></button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: 300 }}>Manufacturer</th>
                        <th style={{ width: 300 }}>Name</th>
                        <th width="40%">Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{model.manufacturer.name}</td>
                                <td>{model.name}</td>
                                <td><img src={model.picture_url} alt="null" width="60%" height="20%" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default VehicleModelList;
