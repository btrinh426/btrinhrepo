import React, { Component } from "react";

import "./App.css";

import Footer from "./components/Footer";

import SiteNav from "./components/SiteNav";

import Jumbo from "./components/Jumbo";

import FirstThreeCircles from "./components/Circles1-3";

import NextThreeCircles from "./components/Circles4-6";

import LastThreeCircles from "./components/Circles7-9";

import Login from "./components/Login";

import Register from "./components/Register";

import Friends from "./components/Friends";

import AddFriends from "./components/AddFriends";

import { withRouter } from "react-router-dom";

import { BrowserRouter, Route } from "react-router-dom";

import ProductsService from "./services/ProductsService";

import { toast } from "react-toastify";

class App extends Component {
  state = {
    product: {
      Name: [""],
      Manufacturer: [""],
      Description: [""],
      Cost: [0],
      id: "",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue =
      currentTarget.type === "number"
        ? currentTarget.valueAsNumber
        : currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let product = { ...this.state.product };

      product[inputName] = newValue;

      return { product };
    });
  };

  onAddProductClicked = (e) => {
    e.preventDefault();
    const data = this.state.product;
    ProductsService.addProduct(data)
      .then(this.onAddProductSuccess)
      .catch(this.onAddProductError);
    console.log("Add Product was clicked");
  };

  onAddProductSuccess = (response) => {
    console.log(response.data.item);
    toast.success("Product Id : " + response.data.item + " was created.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onAddProductError = (err) => {
    toast.warning("Add Product was unsuccessful");
  };

  render() {
    console.log("rendering app");
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav></SiteNav>
          <div className="container pt-5">
            <form>
              <div className="form-group">
                <label htmlFor="inputName">Name of Product</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  name="Name"
                  value={this.state.product.Name}
                  onChange={this.onFormFieldChanged}
                ></input>
                <div className="form-group">
                  <label htmlFor="inputManufacturer">Manufacturer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Manufacturer"
                    name="Manufacturer"
                    value={this.state.product.Manufacturer}
                    onChange={this.onFormFieldChanged}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="inputDescription">
                    Description of Product
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Description"
                    name="Description"
                    value={this.state.product.Description}
                    onChange={this.onFormFieldChanged}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="inputCost">Cost</label>
                  <input
                    type="number"
                    className="form-control"
                    id="Cost"
                    name="Cost"
                    value={this.state.product.Cost}
                    onChange={this.onFormFieldChanged}
                  ></input>
                </div>
                <button
                  type="submit"
                  className=" btn btn-outline-primary"
                  id="addProduct"
                  name="addProduct"
                  onClick={this.onAddProductClicked}
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>

          <footer className="container">
            <Footer></Footer>
            {/* <p>&copy; Sabio 2019-2020</p> */}
          </footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default withRouter(App);
