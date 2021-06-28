import React from "react";
import { create } from "../services/usersService";
import { toast } from "react-toastify";

class Widget extends React.Component {
  state = {
    formData: {
      widgetName: "",
      manufacturer: "",
      description: "",
      cost: "",
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

  onCreateClick = () => {
    let payload = {
      widgetName: this.state.formData.widgetName,
      manufacturer: this.state.formData.manufacturer,
      description: this.state.formData.description,
      cost: this.state.formData.cost,
    };

    create(payload, "Widgets")
      .then(this.onCreateSuccess)
      .catch(this.onCreateError);
  };
  onCreateSuccess(response) {
    console.log("Create Successful");
    var entityId = response.data.item;
    toast.success("Successful! Entity ID: " + entityId);
    console.log(response, entityId);
  }
  onCreateError(response) {
    console.log("Create unsuccessful");
    toast.error("Create unsuccessful");
    console.error(response);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-8">
              <form>
                <center>Create a widget</center>
                <div className="mb-3 mt-3">
                  <input
                    type="text"
                    name="widgetName"
                    className="form-control"
                    placeholder="Name"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.widgetName}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="manufacturer"
                    className="form-control"
                    placeholder="Manufacturer"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.manufacturer}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.description}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    name="cost"
                    className="form-control"
                    placeholder="Cost"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.cost}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onCreateClick}
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Widget;
