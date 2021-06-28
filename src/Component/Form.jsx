import React from "react";
import { Render } from "react-dom";
import * as userService from "../services/userService";
import Toast from "react-toastify";
import { ToastContainer, toast } from "react-toastify";

class Form extends React.Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    },
  };

  notify = (response) => {
    console.log(response);
    toast(`Entity Created ${response.data.item}`);
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    if (this.state.formData)
      userService
        .createWidgetData(this.state.formData)
        .then(this.onCreateWSuccess)
        .catch(this.onCreateWFail);
  };

  onCreateWSuccess = (responseA) => {
    console.log("Success");
    this.notify(responseA);
  };
  onCreateWFail = () => {
    console.log("Failure");
  };

  onChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState((prevState) => {
      return {
        ...prevState,

        formData: {
          ...prevState.formData,

          [name]: value,
        },
      };
    });
  };

  render() {
    return (
      <form>
        <div className="mb-3 col-md-4">
          <label htmlFor="name" className="form-name">
            Name
          </label>
          <input
            onChange={this.onChange}
            name="name"
            value={this.state.formData.name}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3 col-md-4">
          <label htmlFor="manufacturer" className="form-manufacturer">
            manufacturer
          </label>
          <input
            onChange={this.onChange}
            name="manufacturer"
            value={this.state.formData.manufacturer}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3 col-md-4">
          <label htmlFor="discription" className="form-description">
            Description
          </label>
          <input
            onChange={this.onChange}
            type="text"
            value={this.state.formData.description}
            className="form-control"
            name="description"
          />
        </div>

        <div className="mb-3 col-md-4">
          <label htmlFor="Cost" className="form-cost">
            Cost
          </label>
          <input
            onChange={this.onChange}
            value={this.state.formData.cost}
            type="number"
            className="form-control"
            name="cost"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleClick}
        >
          Submit
        </button>
      </form>
    );
  }
}
export default Form;
