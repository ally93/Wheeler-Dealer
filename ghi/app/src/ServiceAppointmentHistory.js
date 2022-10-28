import React from 'react';
import { useState } from 'react'

// import { NavLink } from "react-router-dom";

// class ServiceAppointmentHistory extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             search: '',
//             appointments: [],
//             filteredAppointments: [],
//         };
//         // this.handleSearchChange = this.handleSearchChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleSearchChange = this.handleSearchChange.bind(this);
//     }

//     // handleSearchChange(event) {
//     //     const vinSearch = event.target.value;
//     //     this.setState({ search: vinSearch.toUpperCase() })
//     // let filtered = this.state.appointments.filter(appointment => appointment.vin.indexOf(vinSearch.toUpperCase()) > -1)
//     // this.setState({ search: vinSearch, filteredAppointments: filtered })
//     // }

//     handleSearchChange(event) {
//         const value = event.target.value;
//         this.setState({ search: value })
//     }

// async handleSubmit(event) {
//     event.preventDefault()
//     const data = { ...this.state }
//     const vinSearch = data.search;
//     let filtered = data.appointments.filter(appointment => appointment.vin === vinSearch && appointment.is_finished === true)
//     data.filteredAppointments = filtered
//     this.setState({ filteredAppointments: data.filteredAppointments })
//     const appointmentsUrl = "http://localhost:8080/api/appointments/";
//     const fetchConfig = {
//         method: "get",
//     }
//     const response = await fetch(appointmentsUrl, fetchConfig);
// }

//     async componentDidMount() {
//         const url = 'http://localhost:8080/api/appointments/'
//         const response = await fetch(url);

//         const data = await response.json();
//         this.setState({ appointments: data.appointments })
//     }

function ServiceAppointmentHistory(props) {
    // const { register, handleSubmit, reset } = useForm();
    const [vin, setVin] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    // super(props)
    // this.state = {
    //     vin: '',
    //     filteredAppointments: []
    // }

    // handleSearchChange(event) {
    //     const vinSearch = event.target.value;
    //     this.setState({ search: value })
    // }

    function handleVinChange(event) {
        setVin(event.target.value)
    }

    function handleSubmit(event) {
        // const vinSearch = event.target.value;
        event.preventDefault()
        let filtered = props.appointments.filter(appointment => appointment.vin === vin && appointment.is_finished)
        // console.log("vin", vin)
        // console.log("filtered", filtered)
        // console.log("data", data)
        // console.log("filtered", filtered)
        // data.filteredAppointments = filtered
        // setVin(vin)
        setFilteredAppointments(filtered)
    }

    // const searchVin = async (data) => {

    //     // let filtered = props.appointments.filter(appointment => appointment.vin === vinSearch && appointment.is_finished === true)
    //     // console.log("data", data)
    //     // console.log("filtered", filtered)
    //     // data.filteredAppointments = filtered
    //     // this.setState({ filteredAppointments: data.filteredAppointments })
    //     const appointmentsUrl = "http://localhost:8080/api/appointments/";
    //     const fetchConfig = {
    //         method: "get",
    //         body: JSON.stringify(data.filteredAppointments)
    //     }
    //     const response = await fetch(appointmentsUrl, fetchConfig);
    //     if (response.ok) {
    //         const filteredAppointments = await response.json();
    //     }
    // }

    // const [appointments, setAppointments] = useState([])

    // useEffect(() => {
    //     async function getAppointments() {
    //         const url = "http://localhost:8080/api/appointments/"

    //         const response = await fetch(url)

    //         if (response.ok) {
    //             const data = await response.json();
    //             setAppointments(data.appointments)
    //         }
    //     }
    //     getAppointments();
    // }, [])
    // let appointmentList = ''
    // if (this.state.search.length < 1) {
    //     appointmentList = 'd-none'
    // }

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
