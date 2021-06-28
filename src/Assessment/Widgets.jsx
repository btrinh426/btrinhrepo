import React from "react";
import { toast } from "react-toastify";
import * as widgetService from "./widgetService";

class Widget extends React.Component {
  //set state?
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        widgetName: "",
        manufacturer: "",
        description: "",
        cost: "",
      },
    };
  }

  //handle form
  handleWidgetForm = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let newValue = currentTarget.value;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  submitWidgetForm = (e) => {
    e.preventDefault();

    widgetService
      .addNewWidget(this.state.formData)
      .then(this.onWidgetFormSuccess)
      .catch(this.onWidgetFormError);
  };

  onWidgetFormSuccess = (response) => {
    toast.success("Successful! Widget added!");
  };

  onWidgetFormError = (response) => {
    console.log(response);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>Add Widget</h2>
        </div>
        <div className="row card col-8">
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label htmlFor="widgetName">Widget Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="widgetName"
                  name="widgetName"
                  onChange={this.handleWidgetForm}
                  value={this.state.formData.widgetName}
                />
              </div>
              <div className="row mb-3">
                <label htmlFor="manufacturer">Manufacturer</label>
                <input
                  type="text"
                  className="form-control"
                  id="manufacturer"
                  name="manufacturer"
                  onChange={this.handleWidgetForm}
                  value={this.state.formData.manufacturer}
                />
              </div>
              <div className="row mb-3">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={this.handleWidgetForm}
                  value={this.state.formData.description}
                />
              </div>
              <div className="row mb-3">
                <label htmlFor="cost">Cost</label>
                <input
                  type="text"
                  className="form-control"
                  id="cost"
                  name="cost"
                  onChange={this.handleWidgetForm}
                  value={this.state.formData.cost}
                  placeholder="ex. 24.99"
                />
              </div>

              <button
                type="button"
                className="btn btn-info btn-block"
                onClick={this.submitWidgetForm}
              >
                Add Widget
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Widget;
