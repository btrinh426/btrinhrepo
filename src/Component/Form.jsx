import React from "react";
import { toast, ToastContainer } from "react-toastify";

import * as formService from "../services/formService";

class Form extends React.Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    },
    id: { carId: "" },
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    formService
      .postForm(this.state.formData)
      .then(this.postFormSuccess)
      .catch(this.postFormError);
  };

  postFormSuccess = (response) => {
    toast.success("successfully posted");

    let carIdNumber = response.data.item;

    this.setState(() => {
      let newCarId = { ...this.state.id };

      newCarId.idNumber = carIdNumber;

      let id = { id: newCarId };

      return id;
    });
  };

  postFormError = () => {
    toast.error("Data invalid. Try again.");
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <form style={{ margin: "50px " }}>
          <div>
            <label>
              <h1 style={{ color: "red", backgroundColor: "lightblue" }}>
                Car Form
              </h1>
            </label>

            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={this.onFormFieldChange}
                id="name"
                name="name"
                placeholder="Civic, Accord, etc."
                value={this.state.formData.name}
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="body">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                onChange={this.onFormFieldChange}
                id="manufacturer"
                name="manufacturer"
                placeholder="Toyota, Honda, etc."
                value={this.state.formData.manufacturer}
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="userId">Description</label>
              <input
                type="text"
                className="form-control"
                onChange={this.onFormFieldChange}
                id="description"
                name="description"
                placeholder="Sedan, SUV, etc."
                value={this.state.formData.description}
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="userId">Cost</label>
              <input
                type="text"
                className="form-control"
                onChange={this.onFormFieldChange}
                id="cost"
                name="cost"
                placeholder="Price of the car"
                value={this.state.formData.cost}
              ></input>
            </div>

            <label>
              <h1 style={{ color: "blue", backgroundColor: "mediumpurple" }}>
                Click the button for Car ID Number: {this.state.id.idNumber}
              </h1>
              <button
                type="submit"
                className="bt btn-success"
                onClick={this.submitForm}
              >
                I love being a button
              </button>
            </label>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default Form;
