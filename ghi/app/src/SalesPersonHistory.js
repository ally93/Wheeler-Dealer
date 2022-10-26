import React from 'react';

class SalesPersonHistory extends React.Component{
    constructor(props){
        super(props);
        this.state={
            salesPerson: '',
            salesPersons:[],
            sales: props.sales,
            filteredSales: []
        };
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    }

    async componentDidMount() {
        const salesPerson_url = 'http://localhost:8090/api/sales/person/';
    
        const response = await fetch(salesPerson_url);
        
        if (response.ok) {
          const data = await response.json();
          this.setState({salesPersons: data.sales_person});
        //   console.log(data)
          
        }
    }

    handleSalesPersonChange(event){
        let salesPersonId = event.target.value
        console.log('sales:', this.state.sales)
        console.log('salesPersonID:', salesPersonId)
        let filtered = this.state.sales.filter(sale => sale.sales_person.id == salesPersonId);
        console.log('filtered:::', filtered)
        this.setState({salesPerson : event.target.value, filteredSales: filtered})
    }

    render() {
        return (
            <>
            <div className="mb-3">
                <select onChange={this.handleSalesPersonChange} value={this.state.salesPerson} required name="salesPerson" id="salesPerson" className="form-select">
                    <option value="">Choose a Sales Person</option>
                    {this.state.salesPersons.map(salesPerson => {
                        return (
                            <option key={salesPerson.id} value={salesPerson.id}>
                                {salesPerson.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Purchaser Name</th>
                    <th>Automobile VIN</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {this.state.filteredSales.map(sale => {
                    return (
                    <tr key={sale.id}>
                        <td>{ sale.sales_person.name }</td>
                        <td>{ sale.customer.name }</td>
                        <td>{ sale.automobile.vin }</td>
                        <td>${ sale.price.toLocaleString() }</td>
                    </tr>
                    );
                })}

                </tbody>
            </table>
            </>
        );
    }


}
export default SalesPersonHistory;

