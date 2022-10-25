import React from 'react';

function ManufacturerList(props) {
    console.log(":::props:::", props)
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {props.manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.href}>
                            <td>{manufacturer.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default ManufacturerList
