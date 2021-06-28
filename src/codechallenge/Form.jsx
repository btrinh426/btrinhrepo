import React from "react";
import * as userService from "./userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Form extends React.Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: null,
    },
  };

  notify = (response) =>
    toast.success(
      "You have successfully created your item! Item Id: " + response
    );

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };
  onCreateClicked = (e) => {
    e.preventDefault();
    // console.log("I was clicked.", new Date());
    // console.log("state", this.state.formData);

    userService
      .addItem(this.state.formData)
      .then(this.onCreateSuccess)
      .catch(this.onCreateError);
  };

  onCreateSuccess = (response) => {
    console.log(response);
    this.notify(response.data.item);
  };

  onCreateError = (errResponse) => {
    console.log(errResponse);
  };

  render() {
    return (
      <React.Fragment>
        <form style={{ position: "relative", top: "100px" }}>
          <p align="center">Create your item!</p>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={this.state.formData.name}
              onChange={this.onFormFieldChanged}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="manufacturer"
              value={this.state.formData.manufacturer}
              onChange={this.onFormFieldChanged}
              placeholder="Manufacturer"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="description"
              value={this.state.formData.description}
              onChange={this.onFormFieldChanged}
              placeholder="Description"
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="cost"
              value={this.state.formData.cost}
              onChange={this.onFormFieldChanged}
              placeholder="Cost"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onCreateClicked}
          >
            Create
          </button>
          <ToastContainer />
        </form>
      </React.Fragment>
    );
  }
}

export default Form;
