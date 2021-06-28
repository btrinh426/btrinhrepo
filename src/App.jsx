import React, { Component } from "react";
// import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Footer from "./Components/Footer";
import SiteNav from "./Components/SiteNav";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as entitiesService from "./services/entitiesService";

class App extends Component {
  state = {
    productData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    },
  };

  onProductFormChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue =
      currentTarget.type === "number"
        ? currentTarget.valueAsNumber
        : currentTarget.value;
    let inputName = currentTarget.name; //firstName or lastName

    this.setState(() => {
      let productData = { ...this.state.productData };
      productData[inputName] = newValue;

      return { productData };
    });
  };

  onClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    entitiesService
      .addProduct(this.state.productData)
      .then(this.onAddProductSuccess)
      .catch(this.onAddProductError);

    console.log(this.state.productData);
  };

  onAddProductSuccess = (response) => {
    console.log(response.data.item);
    toast.success("The Product " + response.data.item + " was created.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onAddProductError = (errResponse) => {
    toast.error("You could not create a new product.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  render() {
    return (
      <React.Fragment>
        <SiteNav></SiteNav>
        <p></p>
        <div className="container">
          <div className="row">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={this.onProductFormChanged}
                  value={this.state.productData.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="manufacturer" className="form-label">
                  Manufacturer
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="manufacturer"
                  onChange={this.onProductFormChanged}
                  value={this.state.productData.manufacturer}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  rows="3"
                  type="summary"
                  className="form-control"
                  name="description"
                  onChange={this.onProductFormChanged}
                  value={this.state.productData.description}
                ></textarea>
              </div>
              <div className="input-group mb-3">
                <label htmlFor="cost" className="form-label">
                  Cost
                </label>
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  name="cost"
                  onChange={this.onProductFormChanged}
                  value={this.state.productData.cost}
                />
                <span className="input-group-text">.00</span>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.onClickHandler}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <center>
          <Footer></Footer>
        </center>
      </React.Fragment>
    );
  }
}

export default App;
