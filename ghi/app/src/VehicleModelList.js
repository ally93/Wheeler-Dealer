import React from 'react';
import { NavLink } from 'react-router-dom'

class VehicleModelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            models: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/models/"
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ models: data.models });
        }
    }


    render() {
        return (
            <div className="container">
                <h3 className="display-6 fw-bold">Vehicle Models</h3>
                <button type="button" className="btn btn-outline-light"><NavLink className="nav-link" aria-current="page" to="/vehicles-new">Add a Vehicle Model</NavLink></button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: 300 }}>Manufacturer</th>
                            <th style={{ width: 300 }}>Name</th>
                            <th width="40%">Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.models.map(model => {
                            return (
                                <tr key={model.id}>
                                    <td>{model.manufacturer.name}</td>
                                    <td>{model.name}</td>
                                    <td><img src={model.picture_url} alt="null" width="60%" height="20%" /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default VehicleModelList;
