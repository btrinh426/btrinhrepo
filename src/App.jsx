import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";

import Nav from "./components/Nav";
import * as entityService from "./services/entityService";

import "./App.css";

class App extends Component {
  state = {
    product: {},
    id: 0,
  };

  handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let val = e.target.value;

    this.setState((prevState) => {
      let product = { ...prevState.product };
      product[name] = val;
      return { product };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let data = this.state.product;

    entityService.add(data).then(this.onActionSuccess).catch(this.onActionErr);
  };

  onActionSuccess = (res) => {
    // console.log(res.data.item);
    this.setState({ id: res.data.item });
    toast.success("The Product was created.");
  };

  onActionErr = (errResponse) => {
    console.log(errResponse);
    toast.error("Sorry. Failed to create the Product.");
  };

  render() {
    return (
      <Router>
        <Nav />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={this.state.product.name || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="manufacture">Manufacture</label>
            <input
              type="text"
              name="manufacture"
              className="form-control"
              id="manufacture"
              value={this.state.product.manufacture || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={this.state.product.description || ""}
              className="form-control"
              id="description"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cost">cost</label>
            <input
              type="number"
              className="form-control"
              id="cost"
              name="cost"
              value={this.state.product.cost || ""}
              onChange={this.handleChange}
            />
          </div>

          <div>{this.state.id ? `ProductId: ${this.state.id}` : ""}</div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Router>
    );
  }
}

export default App;
