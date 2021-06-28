import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as productService from "./services/productService";

class ProductForm extends React.Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0,
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

  submitForm = (e) => {
    e.preventDefault();
    productService
      .addProduct(this.state.formData)
      .then(this.onAddProductSuccess)
      .catch(this.onAddProductError);
  };

  onAddProductSuccess = (response) => {
    console.log(response.data.item);
    let id = response.data.item;
    toast.success(`Product with id: ${id} added successfully!`);
  };
  onAddProductError = (err) => {
    console.warn(err);
    toast.error("Oops, please enter your data correctly.");
  };

  render() {
    return (
      <div className="container pt-5 pb-5">
        <ToastContainer />
        <form className="card">
          <div className="card-header text-center">Product Form</div>
          <div className="form-group row m-3">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.name}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="manufacturer" className="col-sm-2 col-form-label">
              Manufacturer
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="manufacturer"
                name="manufacturer"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.manufacturer}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.description}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="cost" className="col-sm-2 col-form-label">
              Cost
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="cost"
                name="cost"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.cost}
              />
            </div>
          </div>
          <div className="form-group row mx-auto">
            <button className="btn btn-primary" onClick={this.submitForm}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProductForm;
