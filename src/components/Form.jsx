//import { Toast } from "bootstrap";
import { toast } from "react-toastify";
import React from "react";
import * as widgetService from "../services/widgetService";
class Form extends React.Component {
  state = {
    vehicleInfo: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0,
    },
  };

  onButtonClicked = (e) => {
    e.preventDefault();
    widgetService
      .submit(this.state.newVehicleInfo)
      .then(this.onSubmitSuccess)
      .catch(this.onSubmitFailure);
    console.log("Submit button was clicked");
  };

  onSubmitSuccess = (response) => {
    console.log(response);
    console.log("Submitted succesfully");
    toast(`Vehicle created id ${response.data.item}`);
    //success handler for toast widget goes here
  };

  onSubmitFailure = (err) => {
    console.log(err);
    console.log("Submit button failed");
    toast(`Failed to return vehicle`);
    //failure handler for toast widget goes here
  };
  onChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    this.setState((prevState) => {
      return {
        ...prevState,

        newVehicleInfo: {
          ...prevState.newVehicleInfo,

          [name]: value,
        },
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Form</h1>
        <form>
          <div className="mb-3 col-md-3">
            <label htmlFor="name1" className="form-label">
              Vehicle Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={this.onChange}
            />
            <div id="nameHelp" className="form-text"></div>
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="lastName1" className="form-label">
              Manufacturer
            </label>
            <input
              type="text"
              className="form-control"
              id="manufacturer"
              name="manufacturer"
              onChange={this.onChange}
            />
            <div id="manufacturerHelp" className="form-text"></div>
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="description1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={this.onChange}
            />
            <div id="descriptionHelp" className="form-text"></div>
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="cost1" className="form-label">
              Cost
            </label>
            <input
              type="number"
              className="form-control"
              id="cost"
              name="cost"
              onChange={this.onChange}
            />
          </div>

          <button
            type="button"
            onClick={this.onButtonClicked}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Form;
