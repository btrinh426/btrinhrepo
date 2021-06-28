import React from "react";
import { toast } from "react-toastify";
import * as productService from "../services/productService";

class ProductForm extends React.Component {
  state = {
    name: "",
    manufacturer: "",
    description: "",
    cost: "",
    tenantId: "U01EMG7DS8H",
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log(e);

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  };
  addProduct = (e) => {
    e.preventDefault();
    const newProduct = { ...this.state };

    productService
      .addProduct(newProduct)
      .then(this.onAddProductSuccess)
      .catch(this.onAddProductError);
  };

  onAddProductSuccess = (response) => {
    console.log(response.data);
    toast("Product Added Successfully");
  };
  onAddProductError = (response) => {
    console.warn(response);
    toast("Unable to Add Product");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 -md-4 p-5">
            <form>
              <label htmlFor="text">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.onFormFieldChanged}
                value={this.state.name}
              ></input>
              <label htmlFor="text">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                name="manufacturer"
                onChange={this.onFormFieldChanged}
                value={this.state.manufacturer}
              ></input>
              <label htmlFor="text">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={this.onFormFieldChanged}
                value={this.state.description}
              ></input>
              <label htmlFor="text">Cost</label>
              <input
                type="text"
                className="form-control"
                name="cost"
                onChange={this.onFormFieldChanged}
                value={this.state.cost}
              ></input>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.addProduct}
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductForm;
