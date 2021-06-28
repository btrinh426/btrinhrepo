import React from "react";
import * as entityService from "../services/entityService";
import { toast } from "react-toastify";

class Assessment extends React.Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0,
    },
  };

  onAddClicked = (e) => {
    e.preventDefault();

    entityService
      .addItem(this.state.formData)
      .then(this.onSuccess)
      .catch(this.onFailure);
  };

  onSuccess = (response) => {
    let widget = response.data.item;
    toast.success("Added successfully" + widget);
  };

  onFailure = () => {
    toast.error("item not added");
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
  getAllClicked = (e) => {
    e.preventDefault();

    entityService.getAllItems().then(this.gotAll).catch(this.failed);
  };

  gotAll = (response) => {
    console.log(response);
  };

  render() {
    return (
      <div className="container">
        <h1>Widget</h1>
        <form>
          <label>Name</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            name="name"
            value={this.state.formData.name}
            type="name"
            placeholder="Name"
          />
          <label>Manufacturer</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            name="manufacturer"
            value={this.state.formData.manufacturer}
            type="name"
            placeholder="Manufacturer"
          />

          <label>Description</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            name="description"
            value={this.state.formData.description}
            type="textarea"
            placeholder="Enter description"
          />

          <label>Cost</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.cost}
            name="cost"
            type="number"
            placeholder="0.00"
          />
          <button
            onClick={this.onAddClicked}
            type="submit"
            className="btn btn-info"
          >
            Add Product
          </button>
          <button
            onClick={this.getAllClicked}
            type="submit"
            className="btn btn-warning"
          >
            Get product list (console.log)
          </button>
        </form>
      </div>
    );
  }
}

export default Assessment;
