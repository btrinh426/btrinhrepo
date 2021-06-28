import React from "react";
import * as entitiesService from "../services/entitiesService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Entities extends React.Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0,
      id: 0,
    },
  };

  onFormChange = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    this.setState((prevState) => {
      let formData = { ...prevState.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  onAddEntitySuccess = (res) => {
    console.log(res.data);
    this.setState((prevState) => {
      let formData = { ...prevState.formData };
      formData.id = res.data.item;
      return { formData };
    });
    toast(`Your widget has been created. Its id is ${this.state.formData.id}!`); // note Toastify does not work for me. Hector spent an hour with me troubleshooting without success.
    this.props.history.push("/");
  };
  onAddEntityError = (res) => {
    console.warn({ error: res });
    toast("Something went wrong");
  };

  onAddEntity = (e) => {
    e.preventDefault();
    let entity = this.state.formData;
    entitiesService
      .addEntity(entity)
      .then(this.onAddEntitySuccess)
      .catch(this.onAddEntityError);
  };
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <form>
            <fieldset className="border p-2">
              <h5>Add an Entity</h5>
              <fieldset className="border p-2">
                <div className="form-group row">
                  <label
                    htmlFor="name"
                    className="col-form-label col-form-label-sm col-2"
                  >
                    Name
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={this.state.formData.name}
                      onChange={this.onFormChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="manufacturer"
                    className="col-form-label col-form-label-sm col-2"
                  >
                    Manufacturer
                  </label>
                  <div className="col-8">
                    <input
                      className="form-control form-control-sm"
                      id="manufacturer"
                      name="manufacturer"
                      placeholder="manufacturer"
                      value={this.state.formData.manufacturer}
                      onChange={this.onFormChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="description"
                    className="col-form-label col-form-label-sm col-2"
                  >
                    Description
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="description"
                      name="description"
                      placeholder="description"
                      value={this.state.formData.description}
                      onChange={this.onFormChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="cost"
                    className="col-form-label col-form-label-sm col-2"
                  >
                    Cost
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="cost"
                      name="cost"
                      placeholder="cost"
                      value={this.state.formData.cost}
                      onChange={this.onFormChange}
                    />
                  </div>
                </div>
                <button type="submit" id="submitBtn" onClick={this.onAddEntity}>
                  Submit
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Entities;
