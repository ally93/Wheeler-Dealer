import React from 'react';

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            color: '',
            vin: '',
            models: [],
        };
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleYearChange(event) {
        const value = event.target.value;
        this.setState({ year: value });
    };

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({ color: value });
    };

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    };

    handleModelChange(event) {
        const value = event.target.value;
        this.setState({ model: value });
    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.models
        console.log(":::::data:::::", data);

        const automobilesUrl = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(automobilesUrl, fetchConfig);
        console.log(":::::response::::::", response)
        if (response.ok) {
            const newAutomobile = await response.json();
            console.log("New Automobile", newAutomobile);

            const cleared = {
                year: '',
                color: '',
                vin: '',
                model: '',
            };
            this.setState(cleared);
        };
    };

    async componentDidMount() {
        const modelsUrl = 'http://localhost:8100/api/models/';

        const response = await fetch(modelsUrl);

        if (response.ok) {
            const data = await response.json();
            console.log("::::mount data::::", data)
            this.setState({ models: data.models });
        };
    };

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a New Automobile</h1>
                        <form onSubmit={this.handleSubmit} id="create-automobile-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleYearChange} value={this.state.year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
                                <label htmlFor="year">Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color"
                                    className="form-control" />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleVinChange} value={this.state.vin} placeholder="Vin" required type="text" name="vin" id="vin"
                                    className="form-control" />
                                <label htmlFor="vin">Vin</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleModelChange} value={this.state.model} required name="model" id="model" className="form-select">
                                    <option value="">Choose a Model</option>
                                    {this.state.models.map(model => {
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
}

export default AutomobileForm
