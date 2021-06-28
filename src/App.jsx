import React, { Component } from "react";
import * as productService from "./services/productService";
import "./App.css";
import { toast } from "react-toastify";
class App extends Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    },
    productData: {
      id: 0,
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    },
    isProductCreated: false,
  };

  onFormInput = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let newValue = currentTarget.value;
    this.setState((prevState) => {
      let newFormData = { ...prevState.formData };
      newFormData[inputName] = newValue;
      return { formData: newFormData };
    });
  };

  onSubmitclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, manufacturer, description, cost } = this.state.formData;
    let payload = {
      name: [name],
      manufacturer: [manufacturer],
      description: [description],
      cost: [cost],
    };
    console.log(payload);
    productService.add(payload).then(this.onAddSuccess).catch(this.onAddError);
  };

  onAddSuccess = (res) => {
    toast.success("🦄 The Product was created!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    let productId = res.data.item;

    productService
      .getById(productId)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);
  };

  onAddError = (res) => {
    console.error(res);
  };

  onGetByIdSuccess = (res) => {
    let productData = res.data.item;
    this.setState((prevState) => {
      let newProductData = { ...prevState.productData };
      newProductData.id = productData.id;
      newProductData.name = productData.name;
      newProductData.description = productData.description;
      newProductData.manufacturer = productData.manufacturer;
      newProductData.cost = productData.cost;
      return { productData: newProductData, isProductCreated: true };
    });
  };

  onGetByIdError = (res) => {
    console.error(res);
  };
  render() {
    let addProductStyle = {
      margin: "0 auto",
      fontSize: "x-large",
    };
    let cardStyle = {
      borderBottomColor: "rgba(0, 0, 0, 0.1)",
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",

      boxShadow: "1px 3px 1px #dfe6e9",
      fontSize: "1rem",
      height: "28rem",
    };
    return (
      <div className="row">
        <div className="col-6">
          <div className="container-fluid">
            <div className="row bg-white p-3">
              <p className="font-weight-bolder" style={addProductStyle}>
                Create a Product
              </p>
            </div>
          </div>
          <div className="bg-light container-fluid">
            <div className="w-75 container">
              <form>
                <div className="form-group mb-5 pt-5">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Product Name"
                    value={this.state.formData.name}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-5">
                  <label>Manufacturer</label>
                  <input
                    type="text"
                    name="manufacturer"
                    className="form-control"
                    placeholder="Enter your manufacturer"
                    value={this.state.formData.manufacturer}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-5">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    value={this.state.formData.description}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-5">
                  <label>Cost</label>
                  <input
                    type="text"
                    name="cost"
                    className="form-control"
                    placeholder="Cost"
                    value={this.state.formData.cost}
                    onChange={this.onFormInput}
                  />
                </div>
                <button
                  className="btn btn-primary mb-5"
                  onClick={this.onSubmitclick}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        {this.state.isProductCreated && (
          <div className="pt-5 pr-3 pl-3 pb-5 col-3" style={cardStyle}>
            <h4 className="mb-1">
              {this.state.productData.name}
              {"  "}
              <h5>{"ID: " + this.state.productData.id}</h5>
            </h4>
            <div className="d-flex w-100 justify-content-between mb-1"></div>
            <div className="w-100 mt-1">
              <p className="mb-1">
                Description: {this.state.productData.description}
              </p>
            </div>
            <div className="d-flex w-100 justify-content-between p-3">
              <div></div>
              <div>
                <div>{this.state.productData.manufacturer}</div>
                <div>{this.state.productData.cost}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
