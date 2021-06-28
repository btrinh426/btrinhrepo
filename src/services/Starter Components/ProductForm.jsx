import React from "react";
import ProductService from "../ProductService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductForm extends React.Component {
  state = {
    productData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    },
  };

  onProductCreated = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let productData = { ...this.state.productData };

      productData[inputName] = newValue;

      return { productData };
    });
  };

  onButtonClick = (e) => {
    e.preventDefault();
    ProductService.product({ ...this.state.productData })
      .then(this.onProductCreationSuccess)
      .catch(this.onProductCreationError);
  };

  onProductCreationSuccess = () => {
    console.log({ ...this.state.productData });
    toast.success("Product Created");
  };

  onProductCreationError = () => {
    console.log("error");
    toast.error("Something went wrong. Try again.");
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-content">
          <div className="col-4">
            <div className="col-mx-auto-md-6">
              <div className="form-group col-mx-auto-md-6"></div>
              <div className="form-group">
                <h6>NAME</h6>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={this.onProductCreated}
                  value={this.state.productData.name}
                />
              </div>

              <h6>MANUFACTURER</h6>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="manufacturer"
                  onChange={this.onProductCreated}
                  value={this.state.productData.manufacturer}
                />
              </div>

              <h6>DESCRIPTION</h6>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  onChange={this.onProductCreated}
                  value={this.state.productData.description}
                />
              </div>

              <h6>COST</h6>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="$0.00"
                  name="cost"
                  onChange={this.onProductCreated}
                  value={this.state.productData.cost}
                />
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.onButtonClick}
              >
                ORDER PRODUCT
              </button>
              <div className="App"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductForm;
