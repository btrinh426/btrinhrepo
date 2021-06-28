import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as productsService from "../services/productsService";

class ProductForm extends React.Component {
  initialState = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    },
  };
  state = this.initialState;

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = e.currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  createProduct = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    const data = this.state.formData;

    productsService
      .addProduct(data)
      .then(this.onRegisterProductSuccess)
      .catch(this.onRegisterProductError);
  };

  formReset = () => {
    this.setState(() => this.initialState);
  };

  onRegisterProductSuccess = (response) => {
    console.log(response);
    let prodId = response.data.item;
    toast.success(`Product ${prodId} added`);
    this.formReset();
  };

  onRegisterFriendError = (err) => {
    console.log(err);
    toast.error("Could not add product");
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            <form>
              <div style={{ padding: 20 }}>
                <h1 className="text-center">Register a Product</h1>
              </div>
              <hr />
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="manufacturer">Manufacturer</label>
                <input
                  type="text"
                  className="form-control"
                  name="manufacturer"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.manufacturer}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.description}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cost">Cost</label>
                <input
                  type="number"
                  className="form-control"
                  name="cost"
                  onChange={this.onFormFieldChanged}
                  value={Number(this.state.formData.cost)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.createProduct}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductForm;
