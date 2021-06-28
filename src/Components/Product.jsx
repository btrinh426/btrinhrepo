import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productCreation } from "../services/productService";

class Product extends React.Component {
  state = {
    name: "",
    manufacturer: "",
    description: "",
    cost: null,
  };

  onProductButtonClick = () => {
    productCreation(this.state)
      .then(this.onProductSuccess)
      .catch(this.onProductError);

    console.log("Product creation button clicked.");
  };

  //   onProductButtonClick(e){
  //     console.log(this.state)
  //     productCreation({
  //         productName: this.state.productName,
  //         manufacturer: this.state.manufacturer,
  //         description: this.state.description,
  //         cost: parseInt(this.state.cost)
  //     }).then((response) => {
  //         toast("Product Created!" + " " + response.data.item, {
  //             className: "Success-toast",
  //             draggable: true,
  //             position: toast.POSITION.TOP_CENTER
  //         })}

  onProductSuccess = (response) => {
    toast("Product created. Product ID: " + response.data.item, {
      className: "Success-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  onProductError = (error) => {
    toast("Product creation failed. Please try again or contact admin.", {
      className: "error-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  onProductTextInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let newState = { ...prevState };

      newState[inputName] = newValue;

      return newState;
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Product Creation Form</h1>
        <h4>
          Please enter product data requested below to have your product entered
          into the database.
        </h4>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              className="form-control"
              id="name"
              placeholder="Product Name"
              name="name"
              onChange={this.onProductTextInputChange}
              value={this.state.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="manufacturer"
              className="form-control"
              id="manufacturer"
              placeholder="Manufacturer Name"
              name="manufacturer"
              onChange={this.onProductTextInputChange}
              value={this.state.manufacturer}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="manufacturer">Description</label>
            <input
              type="description"
              className="form-control"
              id="description"
              placeholder="Product Description"
              name="description"
              onChange={this.onProductTextInputChange}
              value={this.state.description}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="cost">Cost</label>
            <input
              type="cost"
              className="form-control"
              id="cost"
              placeholder="Product Cost"
              name="cost"
              onChange={this.onProductTextInputChange}
              value={this.state.cost}
            ></input>
          </div>

          <button
            type="submitProduct"
            className="btn btn-primary"
            onClick={this.onProductButtonClick}
          >
            Submit Product
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Product;
