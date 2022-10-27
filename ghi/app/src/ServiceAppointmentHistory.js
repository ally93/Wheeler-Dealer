import React from "react";
// import { NavLink } from "react-router-dom";

class ServiceAppointmentHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            appointments: [],
            filteredAppointments: [],
        };
        // this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    // handleSearchChange(event) {
    //     const vinSearch = event.target.value;
    //     this.setState({ search: vinSearch.toUpperCase() })
    // let filtered = this.state.appointments.filter(appointment => appointment.vin.indexOf(vinSearch.toUpperCase()) > -1)
    // this.setState({ search: vinSearch, filteredAppointments: filtered })
    // }

    handleSearchChange(event) {
        const value = event.target.value;
        this.setState({ search: value })
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = { ...this.state }
        // console.log(":::data", data)
        const vinSearch = data.search;
        // console.log("::::vinSearch::", vinSearch)
        // this.setState({ search: vinSearch.toUpperCase() })
        // let filtered = data.appointments.filter(appointment => appointment.vin.indexOf(vinSearch) > -1)
        let filtered = data.appointments.filter(appointment => appointment.vin === vinSearch && appointment.is_finished === true)
        // console.log(":::::filtered", filtered)
        // console.log(":::data reassigned?:::", data)
        data.filteredAppointments = filtered
        this.setState({ filteredAppointments: data.filteredAppointments })
        // this.setState({ search: vinSearch.toUpperCase(), filteredAppointments: filtered })
        const appointmentsUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "get",
        }
        const response = await fetch(appointmentsUrl, fetchConfig);
        // console.log("::::response", response)
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url);

        const data = await response.json();
        // console.log(":::mount data:::", data)
        this.setState({ appointments: data.appointments })

    }

    render() {
        let appointmentList = ''
        if (this.state.search.length < 1) {
            appointmentList = 'd-none'
        }

        return (
            <div className="container">
                <h3 className="display-9 fw-bold">Completed Appointment History</h3>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleSearchChange} value={this.state.search} type="text" placeholder="Start Typing Vin" className='form-control' />
                    <button className="btn btn-primary">Search</button>
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
                        {this.state.filteredAppointments.map(appointment => {
                            return (
                                <tr className={appointmentList} key={appointment.id} >
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
}

export default ServiceAppointmentHistory
