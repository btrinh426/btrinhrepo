import React from "react";
import * as entitiesService from "../services/entitiesService";
import { toast } from "react-toastify";

class ProductForm extends React.Component {
  initialState = {
    name: "",
    manufacturer: "",
    description: "",
    cost: 0,
  };

  state = {
    name: "",
    manufacturer: "",
    description: "",
    cost: 0,
  };

  onCreateClicked = (e) => {
    // console.log("Create was clicked", e);
    entitiesService
      .create(this.state)
      .then(this.onCreateSuccess)
      .catch(this.onCreateError);
  };

  onCreateSuccess = (response) => {
    // console.log(response);
    toast.success(
      <div>
        Product Successfully Added
        <br />
        Product ID is {response.data.item}
      </div>
    );
    this.setState(() => this.initialState);
  };

  onCreateError = (error) => {
    // console.error(error);
    toast.error(<div>Product Creation failed</div>);
  };

  onFormFieldChanged = (e) => {
    // console.log(e);
    let newValue = e.currentTarget.value;
    let inputName = e.currentTarget.name;

    // console.log(newValue, inputName);

    this.setState(() => {
      let formData = { ...this.state };
      formData[inputName] = newValue;
      return formData;
    });
  };

  render() {
    return (
      <form className="w-50 p-5">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.name}
            name="name"
            onChange={this.onFormFieldChanged}
          />
        </div>

        <div className="form-group">
          <label>Manufacturer</label>
          <input
            type="text"
            className="form-control"
            name="manufacturer"
            value={this.state.manufacturer}
            onChange={this.onFormFieldChanged}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={this.state.description}
            onChange={this.onFormFieldChanged}
          ></textarea>

          <div className="form-group">
            <label>Cost</label>
            <input
              type="text"
              className="form-control"
              name="cost"
              value={this.state.cost}
              onChange={this.onFormFieldChanged}
            />
          </div>
        </div>

        <div className="form-floating  mb-3">
          <div
            type="button"
            className="btn btn-primary"
            name="signIn"
            onClick={this.onCreateClicked}
          >
            Create Product
          </div>
        </div>
      </form>
    );
  }
}

export default ProductForm;
