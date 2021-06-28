import React from "react";
import entityService from "../services/entityService";

class Product extends React.Component {
  state = {
    form: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0,
    },
  };

  getProductBtn = (e) => {
    e.preventDefault();
    entityService
      .entityByName("NewComputers")
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log(response);
    if (response?.data?.items?.length > 0) {
      this.populateForm(response.data.items[0]);
    }
  };
  onActionError = () => {
    console.log("err");
  };

  populateForm = (product) => {
    if (product) {
      this.setState((prevState) => {
        return {
          ...prevState,
          form: {
            name: product.name,
            manufacturer: product.manufacturer,
            description: product.description,
            cost: product.cost,
          },
        };
      });
    }
  };

  onFormFieldChange = (e) => {
    console.log(e);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let formData = { ...prevState.form };

      formData[inputName] = newValue;
    });
  };

  render() {
    return (
      <form className="row g-3 p-5">
        <div className="col-md-6">
          <label htmlFor="nameInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={this.state.form.name}
            onChange={this.onFormFieldChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="manufacturerInput" className="form-label">
            Manufacturer
          </label>
          <input
            type="text"
            className="form-control"
            id="manufacturerInput"
            name="manufacturer"
            value={this.state.form.manufacturer}
            onChange={this.onFormFieldChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="descriptionInput" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="descriptionInput"
            name="description"
            value={this.state.form.description}
            onChange={this.onFormFieldChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="costInput" className="form-label">
            Cost
          </label>
          <input
            type="text"
            className="form-control"
            id="costInput"
            name="cost"
            value={this.state.form.cost}
            onChange={this.onFormFieldChange}
          />
        </div>

        <div className="col-12" />
        <div className="col-12">
          <button
            onClick={this.getProductBtn}
            type="submit"
            className="btn btn-primary"
            id="userRegister"
          >
            Get Product
          </button>
        </div>
      </form>
    );
  }
}

export default Product;
