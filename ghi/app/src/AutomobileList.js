import React from 'react';

// function AutoMobileList(props) {
//     return (
//         <table className="table table-striped">
//             <thead>
//                 <tr>
//                     <th>Vin</th>
//                     <th>Year</th>
//                     <th>Color</th>
//                     <th>Manufacturer</th>
//                     <th>Model</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {props.automobiles.map(automobile => {
//                     return (
//                         <tr key={automobile.id}>
//                             <td>{automobile.vin}</td>
//                             <td>{automobile.year}</td>
//                             <td>{automobile.color}</td>
//                             <td>{automobile.model.manufacturer.name}</td>
//                             <td>{automobile.model.name}</td>
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     )
// }

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
        )
    }
}

export default AutoMobileList
