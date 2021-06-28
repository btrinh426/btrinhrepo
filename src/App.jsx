import React, { Component } from "react";
import * as productService from "./services/productService";
import { toast } from "react-toastify";
import SiteNav from "./components/SiteNav.jsx";
import Footer from "./components/Footer.jsx";

class App extends Component {
  state = { currentUser: {} };

  constructor(props) {
    super(props);

    this.state = {
      products: {
        name: [""],
        manufacturer: [""],
        description: [""],
        cost: [""],
        productId: "",
      },
    };
  }

  //-----PRODUCT PAYLOAD-----
  // {
  //   "additionalProp1": [
  //     null
  //   ],
  //   "additionalProp2": [
  //     null
  //   ],
  //   "additionalProp3": [
  //     null
  //   ]
  // }

  //-----First Call-----
  componentDidMount() {
    productService
      .getAll()
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  }

  onGetAllSuccess = (res) => {
    console.log("get products success:", res);
  };

  onGetAllError = (res) => {
    console.error("get products error:", res);
  };

  onFormFieldChanged = (e) => {
    //console.log("data entered", e.currentTarget);
    let currentTarget = e.currentTarget;
    //console.log(currentTarget);
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    //console.log(newValue, currentTarget);

    this.setState((prevState) => {
      //console.log("this is prevState:", prevState);
      let products = { ...prevState.products };
      products[inputName] = newValue;
      return { products };
    });
  };

  onAddClick = (e) => {
    e.preventDefault();
    //console.log("clicked on add", e.currentTarget);
    const data = { ...this.state.products };
    //console.log("...this.state.products", data);
    if (data) {
      productService
        .add(data)
        .then(this.onAddProductSuccess)
        .then(this.onAddProductError);
    }
  };

  onAddProductSuccess = (res) => {
    console.log("product created:", res.data.item);
    toast.success("The Product " + res.data.item + " was created.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onAddProductError = (res) => {
    console.error("job add error", res);
  };

  render() {
    return (
      <React.Fragment>
        <SiteNav />

        <div className="container main flex-column bkground">
          <div className="container parent-container d-flex">
            <div className="container left">
              <div className="row">
                <div className="col">
                  <form>
                    <div className="title" text="html">
                      <h3>Add Product </h3>
                      <strong>
                        Product ID {this.state.products.productId}
                      </strong>
                    </div>

                    <label htmlFor="inputName" className="name">
                      Name
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="name"
                      onChange={this.onFormFieldChanged}
                      value={this.state.products.name}
                    />

                    <label htmlFor="inputManufacturer" className="manufacturer">
                      Manufacturer
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="manufacturer"
                      onChange={this.onFormFieldChanged}
                      value={this.state.products.manufacturer}
                    />

                    <label htmlFor="inputDescription" className="description">
                      Description
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="description"
                      onChange={this.onFormFieldChanged}
                      value={this.state.products.description}
                    />

                    <label htmlFor="inputCost" className="cost">
                      Cost
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="cost"
                      onChange={this.onFormFieldChanged}
                      value={this.state.products.cost}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="container middle">
              <div className="row">
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="btn btn-success ml-3 mb-5"
                    onClick={this.onAddClick}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
