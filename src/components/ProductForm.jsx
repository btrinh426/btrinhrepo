import React, { Component } from "react";
import * as productsServices from "../services/productsServices";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

class ProductForm extends Component {
  state = {
    productInfo: { Name: "", Manufacturer: "", Description: "", Cost: 0 },
  };

  onFromFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newProductInfo = { ...this.state.productInfo };
      newProductInfo[inputName] = newValue;
      console.log({ newProductInfo });

      return { productInfo: newProductInfo };
    });
  };
  addProductRequested = () => {
    let data = this.state.productInfo;
    console.log("addProduct requested for: ", data);

    productsServices
      .add(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    Swal.fire(
      `product w/ the productId-${response.data.item} was successfully added!`
    );
  };

  onActionError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="form-row text-center">
            <div className="col-sm-10">
              <h5>REACT FORM CHALLENGE</h5>
            </div>
          </div>
        </div>
        <form>
          <div className="form-row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="Name"
                placeholder="Product Name"
                value={this.state.productInfo.Name}
                onChange={this.onFromFieldChanged}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="Manufacturer"
                placeholder="Product Manufacturer"
                value={this.state.productInfo.Manufacturer}
                onChange={this.onFromFieldChanged}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="Description"
                placeholder="Product Description"
                value={this.state.productInfo.Description}
                onChange={this.onFromFieldChanged}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="Cost"
                placeholder="Product Cost"
                value={this.state.productInfo.Cost}
                onChange={this.onFromFieldChanged}
              />
            </div>
          </div>
        </form>
        <div className="col-sm-10">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.addProductRequested}
          >
            Add Product
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default ProductForm;
