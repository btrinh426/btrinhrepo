import React from "react";

import { toast } from "react-toastify";

import * as friendService from "./friendService";
import Swal from "sweetalert2";
import * as jobService from "./services/jobService";

class JobsAdd extends React.Component {
  state = {
    jobFormData: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "Active",
      techCompanyId: 0,
      skills: "",
    },
  };

  componentDidMount() {
    let jId = this.props.match.params.jobId;
    console.log(jId);

    if (jId) {
      friendService
        .getById(jId)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdFail);
    }
    console.log("Found a job", { jId });
  }

  onGetByIdSuccess = (response) => {
    console.log({ ...response.data });

    this.setState(() => {
      let newState = { ...this.state.jobFormData };
      let newData = { ...response.data.item };

      newState = {
        title: newData.title,
        description: newData.description,
        summary: newData.summary,
        pay: newData.pay,
        slug: newData.slug,
        statusId: newData.statusId,
        techCompanyId: newData.techCompanyId,
        skills: newData.skills,
        // friendId: ""form,
      };
      console.log({ jobFormData: newState });
      return { jobFormData: newState };
    });
  };

  onGetByIdFail = (err) => {
    console.error(err);
  };

  onJobFormChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = { ...this.state.jobFormData };
      newState[inputName] = newValue;

      return { jobFormData: newState };
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    console.log(this.state.jobFormData);
    let data = this.state.jobFormData;
    let id = this.props.match.params.jobId;

    console.log(data, id);
    if (id) {
      jobService.updateJobs(id).then(this.onEditSuccess).catch(this.onEditFail);
    } else {
      data.skills = data.skills.split(",");
      jobService
        .postJobs(this.state.jobFormData)
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitFail);
    }
  };

  onEditSuccess = (response) => {
    // this.props.history.push("/jobs");
    Swal.fire("Update Successful!", response);
  };

  onEditFail = (err) => {
    console.error(err);
    Swal.fire("Update Failed");
  };

  onSubmitSuccess = (response) => {
    toast.success("Submit Successful", response);
  };

  onSubmitFail = (err) => {
    console.error(err);
    toast.error("Submit Failed");
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="registerHeader">Jobs Form</h1>

        <form onSubmit={this.onSubmitClicked}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={this.onJobFormChanged}
              value={this.state.jobFormData.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={this.onJobFormChanged}
              value={this.state.jobFormData.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              className="form-control"
              id="summary"
              name="summary"
              onChange={this.onJobFormChanged}
              value={this.state.jobFormData.summary}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pay">Pay</label>
            <input
              type="number"
              className="form-control"
              id="pay"
              name="pay"
              onChange={this.onJobFormChanged}
              value={this.state.jobFormData.pay}
            />
          </div>
          <div className="form-group">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              className="form-control"
              id="slug"
              name="slug"
              onChange={this.onJobFormChanged}
              value={this.state.jobFormData.slug}
            />
          </div>
          <div className="form-group">
            <label htmlFor="statusId">Status ID</label>
            <input
              type="text"
              className="form-control"
              //   placeholder="NotSet"
              id="statusId "
              name="statusId"
              onChange={this.onJobFormChanged}
              value={this.state.jobFormData.statusId}
            />
          </div>
          <div className="form-group">
            <label htmlFor="techCompanyId">Tech Company ID</label>
            <input
              type="number"
              className="form-control"
              placeholder="Numbers Only"
              id="techCompanyId"
              name="techCompanyId"
              onChange={this.onJobFormChanged}
              value={this.state.jobFormData.techCompanyId}
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              className="form-control"
              id="skills"
              name="skills"
              onChange={this.onJobFormChanged}
              value={this.state.jobFormData.skills}
            />
          </div>
          <div className="form-group">
            <input
              id="jobId"
              type="hidden"
              value={this.state.jobFormData.jobId}
            ></input>
          </div>
          {/* <button type="submit" className="btn btn-primary" /> */}
          <button type="submit" className="submit">
            Submit
          </button>
          {/* <button type="submit" className="cancel" onClick={this.onCancel}>
            Cancel
          </button> */}
          {/* onClick={submitClicked} */}
        </form>
      </React.Fragment>
    );
  }
}

export default JobsAdd;
