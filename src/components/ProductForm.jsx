import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Button, Form, Label, Input } from "reactstrap";
import * as entityService from "../services/entityService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductForm extends Component {
  state = {
    product: {},
  };

  componentDidMount = () => {
    console.log("Entity component mounted....");
  };

  onProductFormChange = (e) => {
    console.log("Product form changed: ", e.currentTarget);
    let currentTargetName = e.currentTarget.name;
    let currentTargetValue = e.currentTarget.value;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.product[currentTargetName] = currentTargetValue;
      return newState;
    });
  };

  clickSubmitButton = (e) => {
    e.preventDefault();
    console.log("Clicked Submit button.");
    const newProduct = { ...this.state.product };
    console.log("Product data is:", newProduct);
    entityService.addProduct(newProduct).then(this.onAddProductSuccess).catch(this.onAddProductError);
  };

  onAddProductSuccess = (response) => {
    console.log(`Product added! ID# ${response.data.item}`);
    toast.success(`Product added! ID# ${response.data.item}`);
  };

  onAddProductError = (error) => {
    console.error("Error adding product. Ensure you have logged in.");
    console.error(error);
    toast.error("Error adding product. Ensure you have logged in.");
  };

  render() {
    return (
      <div className="col pl-3">
        <div className="row m-0 pt-1">
          <h3>Product Form</h3>
        </div>
        <div
          className="container col-6 border border-secondary rounded mb-0 mr-3 ml-0 pl-0 pt-0 pr-0 pb-3"
          style={{ backgroundColor: "rgb(210, 217, 235)", minWidth: "406px" }}
        >
          <Form className="productForm pl-3 pr-3" style={{ marginTop: "1rem" }}>
            <div className="form-group row mr-1">
              <div className="col pr-0">
                <div className="row">
                  <Label className="form-label mr-3 col-4">
                    <strong>Name: </strong>
                  </Label>
                  <Input
                    type="text"
                    className="form-control my-input-control col-6"
                    id="productName"
                    name="name"
                    onChange={this.onProductFormChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group row mr-1">
              <div className="col pr-0">
                <div className="row">
                  <Label className="form-label mr-3 col-4">
                    <strong>Manufacturer: </strong>
                  </Label>
                  <Input
                    type="text"
                    className="form-control my-input-control col-6"
                    id="productManufacturer"
                    name="manufacturer"
                    onChange={this.onProductFormChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group row mr-1">
              <div className="col pr-0">
                <div className="row">
                  <Label className="form-label mr-3 col-4">
                    <strong>Description: </strong>
                  </Label>
                  <Input
                    type="text"
                    className="form-control my-input-control col-6"
                    id="productDescription"
                    name="description"
                    onChange={this.onProductFormChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group row mr-1">
              <div className="col pr-0">
                <div className="row">
                  <Label className="form-label mr-3 col-4">
                    <strong>Cost: </strong>
                  </Label>

                  <Input
                    type="number"
                    min="0.00"
                    className="form-control my-input-control col-6"
                    id="productCost"
                    name="cost"
                    onChange={this.onProductFormChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group row mb-0" style={{ justifyContent: "center" }}>
              <Button
                type="submit"
                color="primary"
                className="form-group mb-0"
                id="submitButton"
                style={{ width: "fit-content" }}
                onClick={this.clickSubmitButton}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductForm);
