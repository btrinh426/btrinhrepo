import React from "react";
import * as entitiesProduct from "../services/entitiesProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductForm extends React.Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0,
    },
  };

  notify = () => {
    toast("Product was submitted");
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onSubmit = (e) => {
    e.stopPropagation();

    const data = { ...this.state.formData };

    entitiesProduct
      .newProduct(data)
      .then(this.onNewProductSuccess)
      .catch(this.onNewProductError);
  };

  onNewProductSuccess = (response) => {
    console.log({ product: response });
    toast("New Product Submited!");
  };

  onNewProductError = (response) => {
    console.warn({ error: response });
    toast("Product was not submitted");
  };

  render() {
    return (
      <React.Fragment>
        <h1>New Baseball Products</h1>
        <form className="col-md-10 p-5">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              name="name"
              onChange={this.onFormFieldChanged}
              value={this.state.name}
            ></input>
          </div>
          <div className="form-group">
            <label>Manufacturer</label>
            <input
              type="text"
              className="form-control"
              placeholder="manufacturer"
              name="manufacturer"
              onChange={this.onFormFieldChanged}
              value={this.state.manufacturer}
            ></input>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="email"
              className="form-control"
              placeholder="description"
              name="description"
              onChange={this.onFormFieldChanged}
              value={this.state.description}
            ></input>
          </div>
          <div className="form-group">
            <label>Cost</label>
            <input
              type="text"
              className="form-control"
              placeholder="cost"
              name="cost"
              onChange={this.onFormFieldChanged}
              value={this.state.cost}
            ></input>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ProductForm;
