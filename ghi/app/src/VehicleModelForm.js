import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

function VehicleModelForm() {
    const { register, handleSubmit, reset } = useForm();

    const createVehicle = async (data) => {
        const url = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            const newModel = await response.json();
            reset();
        }
    };

    const [manufacturers, setManufacturers] = useState([]);
    
    async function loadManufacturers() {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        loadManufacturers();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a New Vehicle Model</h1>
                    <form onSubmit={handleSubmit(createVehicle)} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input {...register("name")} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input {...register("picture_url")} placeholder="Picture Url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <select {...register("manufacturer_id")} required id="manufacturer_id" name="manufacturer_id" className="form-select">
                                <option value="">Choose a manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )


}

export default VehicleModelForm;
