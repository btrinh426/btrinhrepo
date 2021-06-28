import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import "./App.css";

class Product extends React.Component {
  state = {
    name: "",
    manufacturer: "",
    description: "",
    cost: ""
  };

  handleNameChange = (event) => {
    console.log("event.target", event.target);
    const name = event.target.value;
    this.setState({ name });
  };

  handleManufacturerChange = (event) => {
    console.log("event.target", event.target);
    const manufacturer = event.target.value;
    this.setState({ manufacturer });
  };

  handleDescriptionChange = (event) => {
    console.log("event.target", event.target);
    const description = event.target.value;
    this.setState({ description });
  };

  handleCostChange = (event) => {
    console.log("event.target", event.target);
    const cost = event.target.value;
    this.setState({ cost });
  };

  onRegisterSuccess = () => {
    //put whatever you want to happen after they register
    console.log("Registered Successfully!");
    //toastr.info("Are you the 6 fingered man?");
  };

  onRegisterError = (error) => {
    //If they fail to register
    console.log("Register Failed!", error);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      name: this.state.name,
      manufacturer: this.state.manufacturer,
      description: this.state.description,
      cost: this.state.cost,
      tenantId: "U01G6AS2WER",
    };
    console.log("userData", userData);
    register(userData, this.onRegisterSuccess, this.onRegisterError);
  };

  render() {

    console.log("string of whatever");

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}></form>
          <h1> Product </h1>
          <div className="mb-3 col-md-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="Name"
              placeholder="Brian, Bill, etc."
              value={this.state.Name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="Manufacturer" className="form-label">
              Manufacturer
            </label>
            <input
              type="text"
              className="form-control"
              id="Manufacturer"
              placeholder="Rose, Garcia, etc."
              value={this.state.Manufacturer}
              onChange={this.handleManufacturerChange}
            />
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="Description " className="form-label">
            Description 
            </label>
            <input
              type="text"
              className="form-control"
              id="Description"
              placeholder="Full Service, etc"
              value={this.state.email}
              onChange={this.handleDescriptionChange}
            />
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="cost" className="form-label">
              Cost
            </label>
            <input
              type="text"
              className="form-control"
              id="Cost"
              placeholder="after taxes"
              value={this.state.cost}
              onChange={this.handleCostChange}
            />
          </div> 
          <button className="btn-primary" type="submit">
          Submit
          </button>
        </form>
        </React.Fragment>
    );
}
}

export default Product; 