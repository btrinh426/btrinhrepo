import React from "react";

import { getTechCompanyNames } from "../services/techCompanyServices.js";

class JobForm extends React.Component {
  state = {
    techCompanyId: 0,
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "",
    skills: "", // array
  };

  componentDidMount = () => {
    this.getTechCompanyTitles();
  };

  //////////////////////////////// FIELD CONTROL
  onFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let inputValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      newState[inputName] = inputValue;
      return newState;
    });
  };

  ///////////////////////////// PAGE SETUP
  getTechCompanyTitles = () => {
    getTechCompanyNames();
  };

  ///////////////////////////// SUBMIT

  // send data to API
  // on success, clear form - by changing state to initial values
  // on error, Swal message
  onSubmit = (e) => {
    e.preventDefault();
  };

  ///////////////////////////// HELPER FUNCTIONS
  getHeader = () => {
    return "Add a Job";
  };

  // set tech company data
  //   <option value="0"></option>
  //   <option value="Active">Active</option>
  render = () => {
    return (
      <form id="jobForm">
        <div className="form-floating">
          <h1 className="h3 mb-3 fw-normal">{this.getHeader()}</h1>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Role</label>
            <input
              id="role"
              className="edit-control"
              type="text"
              name="title"
              onChange={this.onFieldChange}
              value={this.state.role}
            />
          </div>

          <label className="col-sm-2 col-form-label">Tech Co.</label>
          <select
            className="form-select"
            id="techCompany"
            name="techCompanyId"
            onChange={this.onFieldChange}
            value={this.state.techCompanyId}
          ></select>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Job Description</label>
            <input
              id="description"
              className="edit-control"
              type="text"
              name="description"
              onChange={this.onFieldChange}
              value={this.state.description}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Job Summary</label>
            <input
              id="summary"
              className="edit-control"
              type="text"
              name="summary"
              onChange={this.onFieldChange}
              value={this.state.summary}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Pay</label>
            <input
              id="pay"
              className="edit-control"
              type="text"
              name="pay"
              onChange={this.onFieldChange}
              value={this.state.pay}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Skills</label>
            <input
              id="skills"
              className="edit-control"
              type="text"
              name="skills"
              onChange={this.onFieldChange}
              value={this.state.skills}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Slug</label>
            <input
              id="slug"
              className="edit-control"
              type="text"
              name="slug"
              onChange={this.onFieldChange}
              value={this.state.slug}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Status</label>
            <input
              id="statusId"
              className="edit-control"
              type="text"
              name="statusId"
              onChange={this.onFieldChange}
              value={this.state.statusId}
            />
          </div>
        </div>
        <footer>
          <button
            type="button"
            className="btn btn-primary"
            id="Submit"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </footer>
      </form>
    );
  };
} // end JobForm

export default JobForm;
