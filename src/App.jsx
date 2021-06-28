import React, { Component } from "react";
import SiteNav from "./SiteNav";
import "./App.css";
import Jumbo from "./Jumbo";
import Content from "./Content";
import Footer from "./Footer";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "rc-pagination/assets/index.css";
import productService from "./services/productService";
import { toast } from "react-toastify";

class App extends Component {
  state = {
    formData: { name: "", manufacturer: "", description: "", cost: "" },
  };
  onChangeInput = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  onClickHandler = (e) => {
    e.preventDefault();

    const payload = { ...this.state.formData };

    productService
      .addOneProduct(payload)
      .then(this.onAddProductSuccess)
      .catch(this.onAddProductError);
  };

  onAddProductSuccess = (response) => {
    let id = response.data.item;
    toast.success("The Product was created. Product Id is " + id);
    console.log(response);
    this.setState(() => {
      let newState = {};
      newState.formData = {
        name: "",
        manufacturer: "",
        description: "",
        cost: "",
      };
      return newState;
    });
  };

  onAddProductError = (response) => {
    console.log(response);
    toast.error("No way to unsuccess");
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav />
          <div className="p-5">
            <form>
              <div className="mb-3 p-2">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.formData.name}
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="mb-3 p-2">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Manufacturer
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="manufacturer"
                  value={this.state.formData.manufacturer}
                  aria-describedby="emailHelp"
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="mb-3 p-2">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={this.state.formData.description}
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="mb-3 p-2">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Cost
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="cost"
                  value={this.state.formData.cost}
                  onChange={this.onChangeInput}
                />
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
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
