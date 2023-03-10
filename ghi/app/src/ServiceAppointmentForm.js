import React from 'react';
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';

function ServiceAppointmentForm(props) {
    const { register, handleSubmit, reset } = useForm();

    const createAppointment = async (data) => {
        const serviceAppointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(serviceAppointmentUrl, fetchConfig);
        if (response.ok) {
            const newServiceAppointment = await response.json();
            props.setReloadAppointments(props.reloadAppointments + 1)
            reset()
        }
    }

    const [technicians, setTechnicians] = useState([])

    async function getTechnicians() {
        const techniciansUrl = 'http://localhost:8080/api/technicians/';

        const response = await fetch(techniciansUrl);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        };
    };

    useEffect(() => {
        getTechnicians()
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new service appointment</h1>
                    <form onSubmit={handleSubmit(createAppointment)} id="create-service-appointment-form">
                        <div className="form-floating mb-3">
                            <input {...register("vin")} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input {...register("owner")} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" />
                            <label htmlFor="owner">Owner</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input {...register("date")} placeholder="Date YYYY-MM-DD" required type="text" name="date" id="date" className="form-control" />
                            <label htmlFor="date">Date: YYYY-MM-DD</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input {...register("time")} placeholder="Time" required type="text" name="time" id="time" className="form-control" />
                            <label htmlFor="time">Time: HH:mm</label>
                        </div>
                        <div className="mb-3">
                            <select {...register("technician")} required name="technician" id="technician" className="form-select">
                                <option value="">Choose a Technician</option>
                                {technicians.map(technician => {
                                    return (
                                        <option key={technician.id} value={technician.id}>
                                            {technician.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input {...register("reason")} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default ServiceAppointmentForm
