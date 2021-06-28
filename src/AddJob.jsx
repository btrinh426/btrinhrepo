import React from "react";
import { toast } from "react-toastify";
import jobService from "./services/jobService";

class AddJob extends React.Component {
  state = {
    title: "",
    description: "",
    pay: "",
    slug: "",
    statuId: "",
    techCompany: 0,
    skills: [],
  };
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  };

  onClickHandler = (e) => {
    e.preventDefault();
    const data = { ...this.state };
    console.log(data);
    jobService
      .addJob(data)
      .then(this.onAddJobSuccess)
      .catch(this.onAddJobError);
  };

  onAddJobSuccess(response) {
    toast.success("successful");
  }

  onAddJobError(response) {
    toast.error("error");
  }

  render() {
    return (
      <form>
        <div className="form-group row">
          <label
            htmlFor="exampleInputEmail1"
            className="col-sm-2 col-form-label"
          >
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="title"
              onChange={this.onFormFieldChanged}
              value={this.state.title}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Description
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              onChange={this.onFormFieldChanged}
              value={this.state.description}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Summary
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="summary"
              name="summary"
              onChange={this.onFormFieldChanged}
              value={this.state.summary}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Salary
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="headline"
              name="salary"
              onChange={this.onFormFieldChanged}
              value={this.state.salary}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Slug
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="slug"
              name="slug"
              onChange={this.onFormFieldChanged}
              value={this.state.slug}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            StatusId
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              id="statusId"
              name="statusId"
              onChange={this.onFormFieldChanged}
              value={this.state.statusId}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Tech Company Id
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="primaryImage"
              name="primaryImage"
              onChange={this.onFormFieldChanged}
              value={this.state.techCompanyId}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Skills
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="skills"
              name="skills"
              onChange={this.onFormFieldChanged}
              value={this.state.skills}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={this.onClickHandler}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default AddJob;
