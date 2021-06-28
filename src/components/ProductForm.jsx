import React, { Component } from "react";
import { postProduct } from "../services/productForm";
import { toast } from "react-toastify";

class ProductForm extends Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    },
  };
  //changing type= "number" restricts to inputing only numbers
  //parseInt()--doesnt work

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      console.log(formData);
      return { formData };
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    postProduct(this.state.formData)
      .then(this.onPostProductSuccess)
      .catch(this.onPostProductError);
    console.log(this.state.formData);
  };

  onPostProductSuccess = (response) => {
    toast.success(`Product ${response.data.item} was created successfully`);
    console.log(response.data.item);
  };
  onPostProductError = (response) => {
    toast.error("Product was not created, Please fill out form correctly");
    console.error(response);
  };

  render() {
    return (
      <React.Fragment>
        <form id="formOne" />
        <div className="mb-3" />
        <label htmlFor="exampleInputEmail1" className="form-label">
          Create a new product
        </label>
        <input
          type="text"
          className="form-control"
          id="Name"
          name="name"
          placeholder="Name"
          value={this.state.formData.name}
          onChange={this.onFormFieldChanged}
        />

        <div className="mb-3" />

        <input
          type="text"
          className="form-control"
          placeholder="Manufacturer"
          name="manufacturer"
          value={this.state.formData.manufacturer}
          onChange={this.onFormFieldChanged}
        />

        <div className="mb-3" />

        <input
          type="text"
          className="form-control"
          name="description"
          placeholder="Description"
          value={this.state.formData.description}
          onChange={this.onFormFieldChanged}
        />

        <div className="mb-3" />

        <input
          type="text"
          className="form-control"
          name="cost"
          placeholder="Cost"
          value={this.state.formData.cost}
          onChange={this.onFormFieldChanged}
        />

        <button
          id="create"
          type="submit"
          className="btn btn-primary"
          onClick={this.handleClick}
        >
          Create
        </button>
      </React.Fragment>
    );
  }
}

export default ProductForm;
