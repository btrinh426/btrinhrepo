import React from "react";
import * as userService from "../services/userServices";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tenantId: "U012YNYNGAW" };
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      let inputName = currentTarget.name;
      newState[inputName] = newValue;
      console.log("newState", newState.firstName);
      return newState;
    });
  };

  mapPerson = (person) => {
    let result = {};
    result.firstName = person.firstName;
    result.lastName = person.lastName;
    result.email = person.email;
  };

  render() {
    return (
      <form>
        <div className="form-group p-5 col-4">
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            onChange={this.onFormFieldChanged}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            onChange={this.onFormFieldChanged}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={this.onFormFieldChanged}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={this.onFormFieldChanged}
          />
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirm"
            name="passwordConfirm"
            onChange={this.onFormFieldChanged}
          />
          <label htmlFor="avatar">Picture Upload</label>
          <input
            type="text"
            className="form-control"
            id="avatarUrl"
            name="avatarUrl"
            onChange={this.onFormFieldChanged}
          />

          <button
            type="submit"
            className="btn btn-primary mt-2"
            onClick={(e) => {
              e.preventDefault();
              var payload = this.state;
              userService.register(payload);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default RegisterForm;
