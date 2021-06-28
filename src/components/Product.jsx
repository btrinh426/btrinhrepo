import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import * as userService from "./userService";
import { toast } from "react-toastify";

class Product extends React.Component {
  state = {
    productName: "",
    manufacturer: "",
    description: "",
    cost: "",
  };

  submitProduct = () => {
    userService
      .makeAProduct(this.state)
      .then(this.onGetSuccess)

      .catch(this.onGetError);
  };

  onGetSuccess = (response) => {
    toast.success(` $ {USERID} successfully created! `);
    //myProduct
    console.log(response);
  };

  onGetError = (response) => {
    console.log(response);
  };

  createProduct = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState(() => {
      let newState = {};

      newState[name] = value;
      console.log({ newState });
      return newState;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Form>
          <FormGroup>
            <Label for="exampleProductName">
              <strong>Product Name</strong>
            </Label>
            <Input
              type="productName"
              name="productName"
              placeholder="with a placeholder"
              value={this.state.productName}
              onChange={this.createProduct}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleManufacturer">
              <strong>Manufacturer</strong>
            </Label>
            <Input
              type="manufacturer"
              name="manufacturer"
              placeholder="with a placeholder"
              value={this.state.manufacturer}
              onChange={this.createProduct}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleDescription">
              <strong>Description</strong>
            </Label>
            <Input
              type="description"
              name="description"
              placeholder="with a placeholder"
              value={this.state.description}
              onChange={this.createProduct}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleNumber">
              <strong>Cost</strong>
            </Label>
            <Input
              type="number"
              name="cost"
              placeholder="with a placeholder"
              value={this.state.cost}
              onChange={this.createProduct}
            />
          </FormGroup>
          <Button color="info" onClick={this.submitProduct}>
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Product;
