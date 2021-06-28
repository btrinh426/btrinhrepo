import React from "react";
import * as userService from "../services/userService";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Products extends React.Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onClick = () => {
    console.log("submit form button is working");

    const user = this.state.formData;
    userService
      .submitProduct(user)
      .then(this.onSubmitSuccess)
      .catch(this.onSubmitError);
  };

  onSubmitSuccess = (response) => {
    console.log(response.data);
    toast.success("Submitted Successfully!");
  };

  onSubmitError = (errResponse) => {
    console.log(errResponse);
    toast.error("Couldn't submit form");
  };

  render() {
    return (
      <div className="form-group">
        <div className="container">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.name}
          ></input>
          <div className="form-group">
            <label htmlFor="inputManufacturer">Manufacturer</label>
            <input
              type="text"
              className="form-control"
              name="manufacturer"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.manufacturer}
            ></input>
            <div className="form-group">
              <label htmlFor="inputDescription">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.description}
              ></input>
              <div className="form-group">
                <label htmlFor="inputCost">Cost</label>
                <input
                  type="number"
                  className="form-control"
                  name="cost"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.cost}
                ></input>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onClick}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
