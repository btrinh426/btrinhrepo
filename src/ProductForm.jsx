import React from "react";
import * as productService from "./productService";
import { toast, ToastContainer } from "react-toastify";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        manufacturer: "",
        description: "",
        cost: 3,
      },
    };
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log(inputName);

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onSubmitForm = (e) => {
    e.preventDefault();

    productService
      .addProduct(this.state.formData)
      .then(this.onAddProductSuccess)
      .catch(this.onAddProductError);
  };

  onAddProductSuccess = (response) => {
    toast.success("Product " + response.data.item + " successfully added!");
    console.log(response.data.item);
  };

  onAddProductError = () => {
    toast.error("Product could not be added");
  };

  render() {
    return (
      <form>
        <ToastContainer />

        <div className="form-group">
          <label htmlFor="name">Search by Name</label>
          <input
            type="text"
            className="htmlForm-control"
            id="name"
            name="name"
            onChange={this.onFormFieldChanged}
            // placeholder="Toyota, Honda, etc"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="manufacturer">Search by Manufacturer</label>
          <input
            type="text"
            className="htmlForm-control"
            id="manufacturer"
            name="manufacturer"
            onChange={this.onFormFieldChanged}
            // placeholder="Camry, Corolla, etc"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Search by Description</label>
          <input
            type="text"
            className="htmlForm-control"
            id="description"
            name="description"
            onChange={this.onFormFieldChanged}
            // placeholder="1993, etc"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="cost">Search by Cost</label>
          <input
            type="text"
            className="htmlForm-control"
            id="cost"
            name="cost"
            onChange={this.onFormFieldChanged}
            // placeholder="1993, etc"
          ></input>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onSubmitForm}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default ProductForm;
