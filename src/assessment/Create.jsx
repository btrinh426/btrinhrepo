import React from "react";
import * as serviceEntity from "../services/serviceEntity";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Create extends React.Component {
  state = {
    name: "",
    manufacturer: "",
    description: "",
    cost: "",
  };

  onFormChangeCost = () => {
    const onlyNumber = /^[0-9\b]+$/;
  };

  onFormChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};

      newState[inputName] = newValue;

      return newState;
    });
  };

  onCreate = () => {
    serviceEntity
      .create(this.state)
      .then(this.onCreateSuccess)
      .catch(this.onCreateError);
  };

  onCreateSuccess = (response) => {
    console.log({ amazon: response.data });

    console.log(response.data.item);
    toast("Entity was Created" + " " + response.data.item);
  };

  onCreateError = (response) => {
    console.log({ error: response.data });
    toast("error");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-8 col-xl-6">
              <div className="row">
                <div className="col text-center">
                  <h1>Register</h1>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col mt-4">
                  <input
                    name="name"
                    type="text"
                    className="form-control name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onFormChange}
                  />
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col">
                  <input
                    name="manufacturer"
                    type="text"
                    className="form-control manufacturer"
                    placeholder="Manufacturer"
                    value={this.state.manufacturer}
                    onChange={this.onFormChange}
                  />
                </div>
              </div>

              <div className="row justify-content-start mt-1">
                <div className="col">
                  <div className="row align-items-center">
                    <div className="col mt-4">
                      <input
                        name="description"
                        type="text"
                        className="form-control description"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.onFormChange}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-start mt-1">
                    <div className="col">
                      <div className="row align-items-center">
                        <div className="col mt-4">
                          <input
                            name="cost"
                            type="text"
                            className="form-control cost"
                            placeholder="Cost"
                            value={this.state.cost}
                            onChange={this.onFormChange}
                          />
                        </div>
                      </div>
                      <button
                        onClick={this.onCreate}
                        id="register"
                        className="btn btn-primary mt-4"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Create;
