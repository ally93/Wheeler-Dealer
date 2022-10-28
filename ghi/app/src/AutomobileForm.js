import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

function AutomobileForm(){
    const[ models, setModels] = useState([]);

    async function loadModels(){
        const modelsUrl = 'http://localhost:8100/api/models/';

        const response = await fetch(modelsUrl);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        };

    }
    useEffect(() => {
        loadModels();
    }, []);

    const {register, handleSubmit, reset} = useForm();
    const createAutomobile = async(data) => {
        const automobilesUrl = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(automobilesUrl, fetchConfig);
        if (response.ok) {
            const newAutomobile = await response.json();

            reset();
        };

    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a New Automobile</h1>
                    <form onSubmit={handleSubmit(createAutomobile)} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input {...register("year")} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input {...register("color")} placeholder="Color" required type="text" name="color" id="color"
                                className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input {...register("vin")} placeholder="Vin" required type="text" name="vin" id="vin"
                                className="form-control" />
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="mb-3">
                            <select {...register("model_id")} required name="model_id" id="model_id" className="form-select">
                                <option value="">Choose a Model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AutomobileForm;
