import React from "react";
import { toast } from "react-toastify";
import * as productServices from "../services/productService";

class ProductForm extends React.Component {
  state = {
    formData: {
      productName: "",
      manufacturerName: "",
      description: "",
      cost: "",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let formData = { ...prevState.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onAddButton = (e) => {
    e.preventDefault();
    productServices
      .addProduct(this.state.formData)
      .then(this.onFormSuccess)
      .catch(this.onFormError);
  };

  onFormSuccess = (response) => {
    console.log(response);
    toast.success("product, add successful.");
  };

  onFormError = (response) => {
    console.warn(response);
    toast.error("product, add not successful.");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <form>
              <div className="form-group bg-light">
                <label htmlFor="nameInput" className="form-label">
                  name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userProductName"
                  placeholder="enter product name"
                  name="productName"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.productName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="manufacturerInput" className="form-label">
                  manufacturer
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userManufacturerName"
                  placeholder="enter manufacturer name"
                  name="manufacturerName"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.manufacturerName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="descriptionInput" className="form-label">
                  description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userDescription"
                  placeholder="enter product description"
                  name="description"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.description}
                />
              </div>
              <div className="input-group form-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  step="0.01"
                  min="0.00"
                  id="userCost"
                  placeholder="product cost"
                  name="cost"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.cost}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-dark"
                onClick={this.onAddButton}
              >
                add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductForm;
