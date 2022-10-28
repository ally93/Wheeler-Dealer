import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function serviceAppointmentList(props) {

    async function handleDelete(appointmentId) {
        const appointmentUrl = `http://localhost:8080/api/appointments/${appointmentId}`
        const fetchConfig = {
            method: "DELETE",
        }
        const response = await fetch(appointmentUrl, fetchConfig);

        if (response.ok) {
            props.setReloadAppointments(props.reloadAppointments + 1)
        }
    }

    async function handleCompletion(appointmentId) {
        const appointmentUrl = `http://localhost:8080/api/appointments/${appointmentId}/`
        const fetchConfig = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_finished: true }),
        }
        const response = await fetch(appointmentUrl, fetchConfig);

        if (response.ok) {
            console.log("response", response)
            props.setReloadAppointments(props.reloadAppointments + 1)
        }
    }

    return (
        <div className="container">
            <h3 className="display-6 fw-bold">Service Appointments</h3>
            <button type="button" className="btn btn-outline-light"><NavLink className="nav-link" aria-current="page" to="/appointments-new">Schedule an Appointment</NavLink></button>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>VIP?</th>
                    </tr>
                </thead>
                <tbody>
                    {props.appointments.map(appointment => {
                        let finished = ''
                        if (appointment.is_finished === true) {
                            finished = 'd-none'
                        };

                        return (
                            <tr className={finished} key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.is_vip ? "Yes" : "No"}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(appointment.id)} >Cancel</button>
                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleCompletion(appointment.id)}>Finished</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default serviceAppointmentList
