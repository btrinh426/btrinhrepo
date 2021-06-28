import React, { Component } from "react";
import "./App.css";

class Forms extends Component {
  state = { firstName: "Won", lastName: "Ma" };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      //   newState.firstName = newValue;
      //   console.log("newState", newState.firstName, { newState });
      return newState;
    });
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              onChange={this.onFormFieldChanged}
              value={this.state.firstName}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail2">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              onChange={this.onFormFieldChanged}
              value={this.state.lastName}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Forms;
