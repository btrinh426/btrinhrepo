import React from "react";
import { addProduct } from "../services/productsService";
import { toast } from "react-toastify";

class ProductForm extends React.Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0,
    },
  };

  onFormFieldChange = (e) => {
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
    e.preventDefault();
    const payload = { ...this.state.formData };
    console.log("payload is: ", payload);
    addProduct(payload)
      .then(this.onAddProductSuccess)
      .catch(this.onAddProductError);
  };
  onAddProductSuccess = (response) => {
    toast["success"](
      `You added the product! It now has the id: ${response.data.item}`,
      "Congratulations"
    );
  };
  onAddProductError = (error) => {
    toast["error"]("Oops, the Product couldn't be created", "Oops");
  };

  render() {
    return (
      <div>
        <h1>Create Product</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="product name"
              onChange={this.onFormFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="manufacturer">Manufacturer:</label>
            <input
              type="text"
              className="form-control"
              id="manufacturer"
              name="manufacturer"
              placeholder="Manufacturer"
              onChange={this.onFormFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="manufacturer">Description:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={this.onFormFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cost">Cost:</label>
            <input
              type="number"
              className="form-control"
              id="cost"
              name="cost"
              placeholder="5"
              onChange={this.onFormFieldChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
