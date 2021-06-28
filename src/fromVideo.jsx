import React, { Component } from "react";
import "./App.css";

// Red >> id for red >> 1
// Green >> id for green >> 2
// Blue >> id for blue >> 3

class App extends Component {
  state = {
    formData: {
      firstName: "beck",
      lastName: "kim",
      email: "",
      color: 0,
      agree: true,
    },
    isModalOpen: false,
    hasMadeAjax: true,
    arrayOfComp: [],
  };

  onFormFieldChanged = (e) => {
    console.log(e.currentTarget.name);
    let currentTarget = e.currentTarget;
    let newValue =
      currentTarget.type === "checkbox"
        ? currentTarget.checked
        : currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">First Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="firstName"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.firstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Last Name</label>
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
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Fav Color</label>
            <select
              onChange={this.onFormFieldChanged}
              className="form-control"
              name="color"
              value={this.state.formData.color}
            >
              <option value={0}>Select Color</option>
              <option value={1}>Red</option>
              <option value={2}>Green</option>
              <option value={3}>Blue</option>
            </select>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="agree"
              checked={this.state.formData.agree}
              onChange={this.onFormFieldChanged}
              value="898"
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              Agree to terms?
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default App;
