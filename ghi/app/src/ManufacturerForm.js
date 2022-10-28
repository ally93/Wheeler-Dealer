import React from 'react';
import { useForm } from "react-hook-form";

function ManufacturerForm() {
    const { register, handleSubmit, reset } = useForm();

    const createManufacturer = async (data) => {
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(":::::::::::::", newManufacturer)
            reset();
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a New Manufacturer</h1>
                    <form onSubmit={handleSubmit(createManufacturer)} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input {...register("name")} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default ManufacturerForm
