import React from 'react';
import { NavLink } from 'react-router-dom'

class AutoMobileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { automobiles: [] }
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/automobiles/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({ automobiles: data.automobiles })
        }
    }

    render() {
        return (
            <div className="container">
                <h3 className="display-6 fw-bold">Automobiles Inventory</h3>
                <button type="button" className="btn btn-outline-light"><NavLink className="nav-link" aria-current="page" to="/automobiles-new">Create an Automobile</NavLink></button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Year</th>
                            <th>Color</th>
                            <th>Manufacturer</th>
                            <th>Model</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.automobiles.map(automobile => {
                            return (
                                <tr key={automobile.id}>
                                    <td>{automobile.vin}</td>
                                    <td>{automobile.year}</td>
                                    <td>{automobile.color}</td>
                                    <td>{automobile.model.manufacturer.name}</td>
                                    <td>{automobile.model.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AutoMobileList
