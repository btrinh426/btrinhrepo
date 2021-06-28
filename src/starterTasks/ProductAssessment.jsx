import React from "react";
import entityService from "../services/entityService";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

class ProductAssessment extends React.Component {
  state = {
    frmData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0,
    },
  };

  regButton = (e) => {
    e.preventDefault();
    entityService
      .createEntity("Ducks", this.state.frmData)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log(response.data.item);
    toast.success("Success! Item Id: " + response.data.item);
  };

  onActionError = () => {
    console.log("Failure");
    toast.error("Too Bad!", "Failure");
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let frmData = { ...prevState.frmData };

      frmData[inputName] = newValue;

      return { frmData };
    });
  };

  render() {
    return (
      <form className="row g-3 p-5">
        <div className="col-md-6">
          <label htmlFor="nameInput" className="form-label"></label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            onChange={this.onFormFieldChange}
            value={this.state.frmData.name}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="manufacturerInput" className="form-label"></label>
          <input
            type="text"
            className="form-control"
            id="manufacturerInput"
            name="manufacturer"
            onChange={this.onFormFieldChange}
            value={this.state.frmData.manufacturer}
          />
        </div>
        <div className="col-12">
          <label htmlFor="descriptionInput" className="form-label"></label>
          <input
            type="text"
            className="form-control"
            id="descriptionInput"
            name="description"
            onChange={this.onFormFieldChange}
            value={this.state.frmData.description}
          />
        </div>
        <div className="col-12">
          <label htmlFor="costInput" className="form-label"></label>
          <input
            type="text"
            className="form-control"
            id="costInput"
            name="cost"
            onChange={this.onFormFieldChange}
            value={this.state.frmData.cost}
          />
        </div>
        <div className="col-12" />
        <div className="col-12">
          <button
            onClick={this.regButton}
            type="submit"
            className="btn btn-primary"
            id="userRegister"
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}

export default ProductAssessment;
