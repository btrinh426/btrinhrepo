import React, { Component } from "react";

import "./App.css";

import FooterComponent from "./FooterComponent";
import SiteNavComponent from "./SiteNavComponent";

import * as userService from "./services/userService";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

class App extends Component {
  state = {
    productData: {},
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = { ...this.state.productData };
      newState[inputName] = newValue;

      return { productData: newState };
    });
  };

  submitClicked = (e) => {
    e.preventDefault();
    userService
      .postEntity(this.state)
      .then(this.submitSuccess)
      .catch(this.submitFail);
  };

  submitSuccess = (response) => {
    toast.success("The Product was created");
    Swal.fire(`Product ID: ${response.data.item}`);

    console.log(response.data.item);
  };

  submitFail = (err) => {
    toast.error("Submit Failed");
    console.error(err);
  };

  render() {
    return (
      <React.Fragment>
        <SiteNavComponent {...this.props}></SiteNavComponent>

        <h1 className="registerHeader">Product Registration Form</h1>

        <form onSubmit={this.submitClicked}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="fname"
              onChange={this.onFormFieldChanged}
              value={this.state.productData.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              className="form-control"
              id="manufacturer"
              name="manufacturer"
              onChange={this.onFormFieldChanged}
              value={this.state.productData.manufacturer}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={this.onFormFieldChanged}
              value={this.state.productData.description}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Cost</label>
            <input
              type="number"
              className="form-control"
              placeholder="Numbers Only"
              id="cost"
              name="cost"
              onChange={this.onFormFieldChanged}
              value={this.state.productData.cost}
            />
          </div>

          <button type="submit" className="submit">
            Submit
          </button>
        </form>

        <FooterComponent></FooterComponent>
      </React.Fragment>
    );
  }
}

export default App;
