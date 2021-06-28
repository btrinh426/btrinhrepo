import React from "react";

class Example extends React.Component {
  state = {
    formData: { firstName: "Wei", lastName: "Zheng" },
  };
  onChangeInput = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
    console.log(e);
  };
  render() {
    return (
      <React.Fragment>
        <form>
          <div className="mb-3 p-5">
            <label htmlFor="exampleInputEmail1" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={this.state.formData.firstName}
              aria-describedby="emailHelp"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="mb-3 p-5">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={this.state.formData.lastName}
              aria-describedby="emailHelp"
              onChange={this.onChangeInput}
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

export default Example;
