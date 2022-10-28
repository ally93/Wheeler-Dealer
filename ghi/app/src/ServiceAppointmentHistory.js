import React from 'react';
import { useState } from 'react'

function ServiceAppointmentHistory(props) {
    const [vin, setVin] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    function handleVinChange(event) {
        setVin(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        let filtered = props.appointments.filter(appointment => appointment.vin === vin && appointment.is_finished)
        setFilteredAppointments(filtered)
    }

    return (
        <div className="container">
            <h3 className="display-6 fw-bold">Completed Appointment History</h3>
            <form onSubmit={handleSubmit}>
                <input onChange={handleVinChange} type="text" placeholder="Start Typing Vin" className='form-control' />
                <button onClick={handleSubmit} className="btn btn-primary">Search</button>
            </form>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map(appointment => {
                        return (
                            <tr key={appointment.id} >
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ServiceAppointmentHistory
