import React from "react";

// Red >> id for red >> 1
// Green >> id for green >> 2
// Blue >> id for blue >> 3

class Content extends React.Component {
  state = {
    formData: {
      firstName: "Gregorio",
      lastName: "Rojas",
      email: "user@google.com",
      color: 1,
    },
    isModalOpen: false,
    hasMadeAjax: false,
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
    // var consoleClick = () => console.log("just clicked");

    return (
      <div className="container pt-5">
        <div className="row">
          {/* <button className="btn btn-primary" onClick={consoleClick}>
            Console Log Button
          </button> */}
        </div>
        <div className="row">
          <div className="col-md-4">
            <form>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.lastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">
                  Example select
                </label>
                <select
                  className="form-control"
                  value={this.state.formData.color}
                  onChange={this.onFormFieldChanged}
                  name="color"
                >
                  <option value="">Select Color</option>
                  <option value="1">Red</option>
                  <option value="2">Green</option>
                  <option value="3">Blue</option>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
