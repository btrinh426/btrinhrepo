import React from "react";
import ProductService from "../services/ProductService";
import { toast } from "react-toastify";

class ProductForm extends React.Component {
  state = {
    name: "",
    manufacturer: "",
    description: "",
    cost: "",
  };

  updateState = (e) => {
    let targetName = e.currentTarget.name;
    let newVal = e.currentTarget.value;
    let newState = { ...this.state };
    this.setState(() => {
      newState[targetName] = newVal;
      return newState;
    });
  };

  createNewProduct = () => {
    if (this.state.name.length > 2 && this.state.cost.length > 0) {
      ProductService.addProduct(this.state)
        .then(this.onAddProductSuccess)
        .catch(this.onAddProductFail);
    } else {
      this.incompleteFormError();
    }
  };

  onAddProductSuccess = (response) => {
    //console.log(response);
    let productId = response.data.item;
    toast.success(`Product: ${productId} added`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    let newState = { ...this.state };
    this.setState(() => {
      newState.name = "";
      newState.manufacturer = "";
      newState.description = "";
      newState.cost = "";
      return newState;
    });
  };

  onAddProductFail = (error) => {
    console.log(error.response);
    toast.error(`Error adding product`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  incompleteFormError = () => {
    toast.error(`Incomplete Form`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <div className="col-12 mt-3">
        <div className="col-xl-5 col-lg-7 col-md-7 col-sm-10 col-10 bg-white border p-0">
          <div className="bg-white m-auto pb-1 pt-1 pl-3 border-bottom">
            <h6 className="text-muted mt-2 mb-2" id="editJobTitle">
              Add New Product
            </h6>
          </div>

          <form className="p-3">
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="name"
                  onChange={this.updateState}
                  value={this.state.name}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Manufacturer
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="manufacturer"
                  onChange={this.updateState}
                  value={this.state.manufacturer}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Description
              </label>
              <div className="col-sm-10">
                <textarea
                  type="text"
                  className="form-control form-control-sm"
                  rows="3"
                  name="description"
                  onChange={this.updateState}
                  value={this.state.description}
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Cost
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  name="cost"
                  onChange={this.updateState}
                  value={this.state.cost}
                ></input>
              </div>
            </div>

            <div className="col">
              <div className="row justify-content-end d-flex">
                <div>
                  <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    onClick={this.createNewProduct}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ProductForm;
