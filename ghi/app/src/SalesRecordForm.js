import React from 'react';


class SalesRecordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      automobiles: [],
      salesPersons: [],
      customers: [],
      automobile: '',
      salesPerson: '',
      customer: '',
      price: '',
    };
    this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.sales_person = data.salesPerson
    delete data.salesPerson
    delete data.automobiles
    delete data.customers
    delete data.salesPersons


    const salesUrl = 'http://localhost:8090/api/sales/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(salesUrl, fetchConfig);
    if (response.ok) {
      this.markCarAsSold(data.automobile);


    }
  }

  async markCarAsSold(automobile_vin) {
    const url = `http://localhost:8100/api/automobiles/${automobile_vin}/`;
    const data = {
      automobile: automobile_vin,
      sold: true
    }
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch(url, fetchConfig);

    if (response.ok) {

      // reset the page to refresh list of automobiles & sales records
      window.location.reload(true);

    }


  }

  handleAutomobileChange(event) {
    const value = event.target.value;
    this.setState({ automobile: value });
  }

  handleSalesPersonChange(event) {
    const value = event.target.value;
    this.setState({ salesPerson: value })
  }

  handleCustomerChange(event) {
    const value = event.target.value;
    this.setState({ customer: value })
  }

  handlePriceChange(event) {
    const value = event.target.value;
    this.setState({ price: value })
  }


  async componentDidMount() {
    const automobileUrl = 'http://localhost:8100/api/automobiles/'
    const sales_personUrl = 'http://localhost:8090/api/sales/person/'
    const customerUrl = 'http://localhost:8090/api/customers/'

    const autoResponse = await fetch(automobileUrl)
    const salesResponse = await fetch(sales_personUrl)
    const customerResponse = await fetch(customerUrl)

    if (autoResponse.ok && salesResponse.ok && customerResponse.ok) {
      const data_customer = await customerResponse.json();
      const data_salesPerson = await salesResponse.json();
      const data_automobile = await autoResponse.json();

      const unsoldAutos = data_automobile.automobiles.filter(car => !car.sold);


      this.setState({ salesPersons: data_salesPerson.sales_person })
      this.setState({ customers: data_customer.customers })
      this.setState({ automobiles: unsoldAutos })
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new sales record</h1>
            <form onSubmit={this.handleSubmit} id="create-salesrecord-form">
              <div className="mb-3">
                <select onChange={this.handleAutomobileChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                  <option value="">Choose an automobile</option>
                  {this.state.automobiles.map((automobile) => {
                    return (
                      <option key={automobile.href} value={automobile.vin}>
                        {automobile.vin}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={this.handleSalesPersonChange} value={this.state.salesPerson} required name="salesPerson" id="salesPerson" className="form-select">
                  <option value="">Choose a Sales Person</option>
                  {this.state.salesPersons.map(salesPerson => {
                    return (
                      <option key={salesPerson.id} value={salesPerson.id}>
                        {salesPerson.name} - {salesPerson.employee_number}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={this.handleCustomerChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                  <option value="">Choose a customer</option>
                  {this.state.customers.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} - {customer.phone_number}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handlePriceChange} value={this.state.price} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                <label htmlFor="price">Price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

    );
  }


}

export default SalesRecordForm;
