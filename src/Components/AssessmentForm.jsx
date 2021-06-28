import React from "react";
import * as carService from "./services/entityService";
import { toast } from "react-toastify";

class Entity extends React.Component {
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.id;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = { ...this.state.carData };
      newState[inputData] = newValue;
      //   console.log({ carData: newState });
      return { carData: newState };
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state.carData);
    const data = this.state.carData;
    carService.add(data).then(this.onAddCarSucess).catch(this.onAddCarError);
  };

  onAddCarSucess = (response) => {
    console.log({ submitted: response.data });
    toast["success"](
      ` The Product was created ${response.data.item}`,
      "New Car"
    );
  };
  onAddCarError = (err) => {
    console.error(err);
    toast["error"]("The Product wasn't created", "New Car");
  };
  render() {
    console.log("App is rendering");
    return (
      <React.Fragment>
        <main role="main">
          <h5 className="assessment"> Cars Assessment</h5>
          <form className="form-assessment">
            <div className="form-group">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Enter Name"
                onChange={this.onFormFieldChanged}
                value={this.state.carData.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputManufacturer">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                id="manufacturer"
                placeholder="Enter Manufacturer"
                onChange={this.onFormFieldChanged}
                value={this.state.carData.manufacturer}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputDescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter Description"
                onChange={this.onFormFieldChanged}
                value={this.state.carData.description}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputCost">Cost</label>
              <input
                type="integer"
                className="form-control"
                id="cost"
                placeholder="Enter Cost"
                onChange={this.onFormFieldChanged}
                value={this.state.carData.cost}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onSubmitClicked}
            >
              Submit
            </button>
          </form>
        </main>
      </React.Fragment>
    );
  }
}

export default Entity;
