import React, { Component } from "react";
import { productService } from "../services/productService";
import { toast } from "react-toastify";

class ProductForm extends Component {
  state = {
    formData: {
      completeName: "",
      manufacturer: "",
      description: "",
      cost: Number(),
      tenantId: "U01UAJY7BR7",
    },
  };
  onInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let name = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[name] = newValue;
      return { formData };
    });
  };
  handleClick = (e) => {
    e.preventDefault();
    productService(this.state.formData)
      .then(this.onProductServiceSuccess)
      .catch(this.onProductServiceError);
  };

  onProductServiceSuccess = (Response) => {
    console.log({ product: Response.data.item });
    toast.success(`Great job, ${Response.data.item} was created`);
  };

  onProductServiceError = (Response) => {
    toast.error("Please fill out form completely");
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            onChange={this.onInputChange}
            name="completeName"
            value={this.state.formData.completeName}
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label>Manufacturer</label>
          <input
            onChange={this.onInputChange}
            name="manufacturer"
            value={this.state.formData.manufacturer}
            className="form-control"
            id="exampleInputManufacturer"
            placeholder="Manufacturer"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            onChange={this.onInputChange}
            name="description"
            value={this.state.formData.description}
            className="form-control"
            id="exampleInputDescription"
            aria-describedby="description"
            placeholder="description"
          />
        </div>
        <div className="form-group">
          <label>Cost</label>
          <input
            onChange={this.onInputChange}
            name="cost"
            value={this.state.formData.cost}
            className="form-control"
            type="cost"
            id="exampleInputCost"
            placeholder="Cost"
          />
        </div>
        <button
          onClick={this.handleClick}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default ProductForm;
