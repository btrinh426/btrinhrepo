import React, { Component } from "react";
import Swal from "sweetalert2";
import * as jobService from "../services/jobService";
//postman

// skills
class TechCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        name: "",
        profile: "",
        summary: "",
        headline: "",
        slug: "",
        contactInformation: "",
        techCompanies: "",
        statusId: "",
      },
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let val = e.target.value;

    this.setState((prevState) => {
      let company = { ...prevState.company };
      company[name] = val;
      return { company };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let data = this.state.company;

    console.log("data: ", this.state.company);

    jobService.add(data).then(this.onActionSuccess).catch(this.onActionErr);
  };

  onActionSuccess = (res) => {
    Swal.fire("Good job!", "You clicked the button!", "success");
    this.props.history.push("/");
  };

  onActionErr = (errResponse) => {
    console.log(errResponse);
    Swal.fire(
      "Sorry! Invalid Credentials.",
      "Please check your info and try agian.",
      "error"
    );
  };

  render() {
    return (
      <main className="container">
        <h1 className="center">Hi! Where so glad to have you.</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={this.state.company.name || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="profile">Profile</label>
            <input
              type="text"
              name="profile"
              className="form-control"
              id="profile"
              value={this.state.company.profile || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              name="summary"
              value={this.state.company.summary || ""}
              className="form-control"
              id="summary"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="headline">Headline</label>
            <input
              type="text"
              className="form-control"
              id="heafline"
              name="headline"
              value={this.state.company.headline || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              className="form-control"
              id="slug"
              name="slug"
              value={this.state.company.slug || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactInformation">Contact Info</label>
            <input
              type="text"
              className="form-control"
              id="contactInformation"
              name="contactInformation"
              value={this.state.company.contactInformation || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="statusId">Status ID</label>
            <input
              type="text"
              className="form-control"
              id="statusId"
              name="statusId"
              value={this.state.company.statusId || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryImage">Profile Image</label>
            <input
              type="primaryImage"
              className="form-control"
              id="primaryImage"
              name="primaryImage"
              value={this.state.company.primaryImage || ""}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </main>
    );
  }
}

export default TechCompanies;
