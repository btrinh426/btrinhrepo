import React from "react";
import * as entityService from "../services/entityService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

class WidgetForm extends React.Component {
  state = {
    entityName: "widgets",
    widgetFormData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0.0,
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let widgetFormData = { ...this.state.widgetFormData };
      widgetFormData[inputName] = newValue;

      return { widgetFormData };
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    // console.log("... FriendForm > onSubmitClicked firing ...");
    let cost = this.state.widgetFormData.cost;
    if (typeof cost === "string") {
      console.log("string");
    } else if (typeof cost === "number") {
      console.log("number");
      cost = cost.toFixed(2);
    }
    console.log(cost);

    entityService
      .add(this.state.entityName, this.state.widgetFormData)
      .then(this.onAddWidgetSuccess)
      .catch(this.onAddWidgetFail);
  };

  onAddWidgetSuccess = (data) => {
    console.log("... FriendForm > onAddWidgetSuccess firing ...", data);
    const widgetId = data.item;
    toast.success(
      `Widget "${this.state.widgetFormData.name}" successfully created with ID: ` +
        widgetId
    );
    this.props.history.push("/home");
  };
  onAddWidgetFail = (err) => {
    console.log("... FriendForm > onAddWidgetFail firing ...", err);
    toast.error("Unable to submit widget!");
  };

  onCancelClicked = (e) => {
    e.preventDefault();
    // console.log("... FriendForm > onCancelClicked firing ...");

    Swal.fire({
      title: "Are you sure?",
      text: "Navigating away from page will not keep your changes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.value) {
        console.log(" >>>  dumping updates");
        this.props.history.push("/home");
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>{this.state.currentTitle}</h3>
          </div>
        </div>
        <div className="row">
          <div className="card mt-4 col-md-6" id="cardAddFriend">
            <div className="card-body">
              <div className="row">
                <div className="col-12" id="frndColExpand">
                  <form id="addFriendForm">
                    {/*  -------------------------- row */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name" className="px-3">
                          Widget Name:
                        </label>
                        <input
                          className="form-control"
                          name="name"
                          onChange={this.onFormFieldChanged}
                          value={this.state.widgetFormData.name}
                        ></input>
                      </div>
                    </div>

                    {/*  -------------------------- row */}
                    <div className="form-row"></div>
                    <div className="form-group ">
                      <label htmlFor="manufacturer" className="px-3">
                        Manufacturer:
                      </label>
                      <input
                        className="form-control"
                        name="manufacturer"
                        onChange={this.onFormFieldChanged}
                        value={this.state.widgetFormData.manufacturer}
                      ></input>
                    </div>

                    {/*  ----------------------------- row */}

                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="description" className="px-3">
                          Description:
                        </label>
                        <textarea
                          className="form-control"
                          name="description"
                          rows="3"
                          value={this.state.widgetFormData.description}
                          onChange={this.onFormFieldChanged}
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="cost" className="px-3">
                          Cost:
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          data-type="currency"
                          //   pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                          name="cost"
                          onChange={this.onFormFieldChanged}
                          value={this.state.widgetFormData.cost}
                        ></input>
                      </div>
                    </div>
                    <div className="form-row float-right">
                      <button
                        type="button"
                        className="btn btn-primary ml-5"
                        onClick={this.onSubmitClicked}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark ml-5"
                        onClick={this.onCancelClicked}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WidgetForm;
