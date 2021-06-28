import React, { Component } from "react";
import * as entityService from "../services/entityService";
import { toast } from "react-toastify";

class ProuctForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productFormData: {
        productName: "",
        manufacturer: "",
        description: "",
        cost: "",
      },
    };
  }

  onSubmitClick = (e) => {
    e.preventDefault();
    console.log("Submit Button clicked");
    console.log(this.state.productFormData);

    // let testData = {
    //   productName: "palmer",
    //   manufacturer: "b",
    //   description: "c",
    //   cost: "1",
    // };
    entityService
      .submitData(this.state.productFormData)
      .then(this.onSubmitDataSuccess) //use .then not .this - i mistyped it and this is what caused my error
      .catch(this.onSubmitDataError);
  };

  onSubmitDataSuccess = (response) => {
    console.log({ submitDataGood: response });
    toast.success("Submition was successful!");
  };

  onSubmitDataError = (response) => {
    console.log({ submitDataError: response });
    toast.error(
      "Submission failed, please check your connection and try again."
    );
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    console.log(currentTarget);
    let newValue = currentTarget.value;
    console.log(newValue);
    let fieldName = currentTarget.name;
    console.log(fieldName);

    this.setState(() => {
      let productFormData = { ...this.state.productFormData };
      productFormData[fieldName] = newValue;
      return { productFormData };
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1>Enter Product Information Below</h1>
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <form>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="productName"
                    placeholder="Name"
                    value={this.state.productFormData.productName}
                    onChange={this.onFormFieldChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Manufacturer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="manufacturer"
                    name="manufacturer"
                    placeholder="Manufacturer"
                    value={this.state.productFormData.manufacturer}
                    onChange={this.onFormFieldChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={this.state.productFormData.description}
                    onChange={this.onFormFieldChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Cost</label>
                  <input
                    type="number"
                    className="form-control"
                    id="cost"
                    name="cost"
                    placeholder="Cost"
                    value={this.state.productFormData.cost}
                    onChange={this.onFormFieldChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-lg"
                  onClick={this.onSubmitClick}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProuctForm;
