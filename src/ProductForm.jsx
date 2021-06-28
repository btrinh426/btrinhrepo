import React from "react";
import axios from "axios";
import * as userServices from "./services/userServices";
import Swal from "sweetalert2";

class ProductForm extends React.Component {
  state = {
    products: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 1,
    },
  };

  onProductFormChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let products = { ...this.state.products };
      products[inputName] = newValue;

      return { products };
    });
  };

  onSubmitClick = (e) => {
    e.preventDefault();
    const data = { ...this.state.products };

    userServices
      .newProduct(data)
      .then(this.onClickSuccess)
      .catch(this.onClickError);
  };

  //   componentDidUpdate = () => {
  //

  onClickSuccess = (response) => {
    console.log(response);
    Swal.fire("Good job!", "You have submitted a new Product!", "success");
    // userServices
    //   .getProducts()
    //   .then(this.getProductSuccess)
    //   .catch(this.getProductError);
  };

  // getProductSuccess = (response) => {
  //   console.log(response);
  //   let currentProduct = response.data.item.id;

  //   userServices
  //     .getProductsbyId(currentProduct)
  //     .then(this.onGetByIdSuccess)
  //     .catch(this.onGetByIdError);
  // };
  // getProductError = () => {};

  // onGetByIdSuccess = (response) => {
  //   console.log(response);
  //   let productId = response.data.item.id;
  //   this.setState({ products: productId });
  // };

  onClickError = () => {};

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="container" style={{ marginLeft: "500px" }}>
            <h2 className="display-3" style={{ marginbottom: "50px" }}>
              Product Form
            </h2>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Name</label>
                <input
                  type="name"
                  className="form-control"
                  name="name"
                  onChange={this.onProductFormChange}
                  value={this.state.products.name}
                />
              </div>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Manufacturer</label>
                <input
                  type="manufacturer"
                  className="form-control"
                  name="manufacturer"
                  onChange={this.onProductFormChange}
                  value={this.state.products.manufacturer}
                />
              </div>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Description</label>
                <input
                  type="description"
                  className="form-control"
                  name="description"
                  onChange={this.onProductFormChange}
                  value={this.state.products.description}
                />
              </div>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Cost</label>
                <input
                  type="cost"
                  className="form-control"
                  name="cost"
                  onChange={this.onProductFormChange}
                  value={this.state.products.cost}
                />
              </div>

              <button
                name="submit"
                type="submit"
                className="btn btn-primary btn-sm"
                onClick={this.onSubmitClick}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default ProductForm;
