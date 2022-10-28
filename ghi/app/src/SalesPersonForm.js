import React from 'react';
import { useForm } from "react-hook-form";


function SalesPersonForm() {
    const { register, handleSubmit, reset } = useForm();

    const submitNewSales = async (data) => {
        const salesPersonUrl = 'http://localhost:8090/api/sales/person/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salesPersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesPerson = await response.json();
        }
        reset();
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new sales person</h1>
                    <form onSubmit={handleSubmit(submitNewSales)} id="create-sales-person-form">
                        <div className="form-floating mb-3">
                            <input {...register("name")} placeholder="Name" required type="text" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input {...register("employee_number")} placeholder="Employee number" required type="number" className="form-control" />
                            <label htmlFor="employee_number">Employee number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SalesPersonForm;
