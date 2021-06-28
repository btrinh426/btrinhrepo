import React from "react";
import * as productService from "./services/productService";
import { toast } from "react-toastify";

class ProductForm extends React.Component {
  state = {
    formData: {
      pName: "name",
      manufacturer: "Manufacturer",
      description: "Description",
      cost: "0.00",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state.formData };
      newState[inputName] = newValue;
      return { formData: newState };
    });
  };

  onButtonClicked = (e) => {
    e.preventDefault();
    console.log("button clicked");
    console.log(this.state.formData);

    productService
      .addNewProduct(this.state.formData)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log(response.data.item);
    let entityId = response.data.item;
    toast("Product Added -- item ID:" + entityId, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  onActionError = (response) => {
    toast("Oh no, that didn't work", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className=" bg-text container col-md-6">
          <form>
            <h1>Add a new product</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="form-wrapper">
                  <label>Name</label>
                  <input
                    type="text"
                    name="pName"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.pName}
                  />
                </div>
                <div className="form-wrapper">
                  <label>Manufacturer</label>
                  <input
                    type="text"
                    name="manufacturer"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.manufacturer}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-wrapper">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.description}
                  />
                </div>
                <div className="form-wrapper">
                  <label>Cost</label>
                  <input
                    type="number"
                    name="cost"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.cost}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              id="addProduct"
              className="btn btn-primary"
              onClick={this.onButtonClicked}
            >
              Add Product
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default ProductForm;
