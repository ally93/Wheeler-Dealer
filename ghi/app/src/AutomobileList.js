import React from 'react';

function AutoMobileList(props) {
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
                {props.automobiles.map(automobile => {
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

export default AutoMobileList
