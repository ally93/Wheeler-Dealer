import React from 'react';

class ServiceAppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            owner: '',
            date: '',
            time: '',
            technicians: [],
            reason: '',
        };
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    };

    handleOwnerChange(event) {
        const value = event.target.value;
        this.setState({ owner: value })
    }

    handleDateChange(event) {
        const value = event.target.value;
        this.setState({ date: value })
    }

    handleTimeChange(event) {
        const value = event.target.value;
        this.setState({ time: value })
    }

    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({ technician: value })
    }

    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({ reason: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.technicians
        // console.log(":::data::::", data)

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
            // console.log(":::::new appointment::::::", newServiceAppointment)

            const cleared = {
                vin: '',
                owner: '',
                date: '',
                time: '',
                technician: '',
                reason: '',
            };
            this.setState(cleared)
        }
    }

    async componentDidMount() {
        const techniciansUrl = 'http://localhost:8080/api/technicians/';

        const response = await fetch(techniciansUrl);

        if (response.ok) {
            const data = await response.json();
            // console.log("::::mount data::::", data)
            this.setState({ technicians: data.technicians });
        };
    };

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new service appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-service-appointment-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleVinChange} value={this.state.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                                <label htmlFor="vin">Vin</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleOwnerChange} value={this.state.owner} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" />
                                <label htmlFor="owner">Owner</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleDateChange} value={this.state.date} placeholder="Date YYYY-MM-DD" required type="text" name="date" id="date" className="form-control" />
                                <label htmlFor="date">Date: YYYY-MM-DD</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleTimeChange} value={this.state.time} placeholder="Time" required type="text" name="time" id="time" className="form-control" />
                                <label htmlFor="time">Time: HH:mm</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleTechnicianChange} value={this.state.technician} required name="technician" id="technician" className="form-select">
                                    <option value="">Choose a Technician</option>
                                    {this.state.technicians.map(technician => {
                                        return (
                                            <option key={technician.id} value={technician.id}>
                                                {technician.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleReasonChange} value={this.state.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                                <label htmlFor="reason">Reason</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceAppointmentForm
