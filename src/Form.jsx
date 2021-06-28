import React, { Component } from "react";

class Form extends Component {
  state = {
    firstName: "Virginia",
    lastName: "Woolf",
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let newValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  };

  render() {
    return (
      <div className="col-md-4 p-5">
        <form>
          <div className="form-group row">
            <label className="pr-2">First Name</label>
            <div>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                onChange={this.onFormFieldChanged}
                value={this.state.firstName}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="pr-2">Last Name</label>
            <div>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                onChange={this.onFormFieldChanged}
                value={this.state.lastName}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
