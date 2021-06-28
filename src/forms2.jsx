import React, { Component } from "react";
import "./App.css";

class Forms2 extends Component {
  state = {
    formData: { firstName: "Won", lastName: "Ma", email: "" },
    isModalOpen: false,
    hasMadeAjax: true,
    arrayOfComp: [],
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log({ newValue, currentTarget });

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      //   newState.firstName = newValue;
      //   console.log("newState", newState.firstName, { newState });
      return { formData };
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
              value={this.state.formData.firstName}
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
              value={this.state.formData.lastName}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail3">Email</label>
            <input
              type="email"
              className="form-control"
              //no id needed
              name="Email"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.email}
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

export default Forms2;
