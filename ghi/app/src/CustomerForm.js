import React from 'react';
import { useForm } from "react-hook-form";

function CustomerForm2(props) {
    const { register, handleSubmit, reset } = useForm();
    
    const createCustomer = async (data) => {
        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log("new customer", newCustomer);
            reset();
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new customer</h1>
                    <form onSubmit={handleSubmit(createCustomer)} id="create-customer-form">
                        <div className="form-floating mb-3">
                            <input {...register("name")} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input {...register("phone_number")} placeholder="Phone number" required type="text" name="phone_number" id="phone_number" className="form-control"/>
                            <label htmlFor="phone_number">Phone number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea {...register("address")} placeholder="Address" required name="address" id="address" className="form-control"></textarea>
                            <label htmlFor="address">Address</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomerForm2;