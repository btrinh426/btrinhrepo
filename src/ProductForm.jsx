import React from "react";
import { addProduct } from "./components/apiCalls";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    };
  }

  onAdd = (e) => {
    e.preventDefault();

    let payload = {
      name: [this.state.name],
      manufacturer: [this.state.manufacturer],
      description: [this.state.description],
      cost: [+this.state.cost],
    };

    addProduct(payload)
      .then(this.onAddProductSuccess)
      .catch(this.onAddProductError);
  };

  onAddProductSuccess(response) {
    Swal.fire(`Product created with id: ${response.data.item}`);
  }

  onAddProductError(response) {
    Swal.fire(
      "Error",
      "Product information not saved. Review field format.",
      "error"
    );
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let newValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  };

  render = () => {
    return (
      <form>
        <div className="form-floating">
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <h1 className="h3 mb-3 fw-normal">Add Product Information</h1>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input
                id="name"
                className="edit-control"
                type="text"
                name="name"
                onChange={this.onFormFieldChanged}
                value={this.state.name}
              ></input>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Manufacturer</label>
            <div className="col-sm-10">
              <input
                id="manufacturer"
                className="edit-control"
                type="text"
                name="manufacturer"
                onChange={this.onFormFieldChanged}
                value={this.state.manufacturer}
              ></input>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <textarea
                id="description"
                className="edit-control"
                type="text"
                name="description"
                onChange={this.onFormFieldChanged}
                value={this.state.description}
              ></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Cost (in US $)</label>
            <div className="col-sm-10">
              <input
                id="cost"
                className="edit-control"
                type="number"
                name="cost"
                onChange={this.onFormFieldChanged}
                value={this.state.cost}
              ></input>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onAdd}
          id="add"
        >
          Save
        </button>
      </form>
    );
  };
} // end ProductForm

export default ProductForm;
