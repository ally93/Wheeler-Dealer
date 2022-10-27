import React from 'react';
import { NavLink } from 'react-router-dom'

class ManufacturerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { manufacturers: [] }
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers })
        }
    }

    render() {
        return (
            <div className="container">
                <h3 className="display-6 fw-bold">Manufacturers</h3>
                <button type="button" className="btn btn-outline-light"><NavLink className="nav-link" aria-current="page" to="/manufacturers-new">Add a Manufacturer</NavLink></button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.manufacturers.map(manufacturer => {
                            return (
                                <tr style={{ height: 60 }} key={manufacturer.href}>
                                    <td>{manufacturer.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ManufacturerList
