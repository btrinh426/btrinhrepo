import React from "react";
import * as jobService from "../services/jobService";
import * as techCoService from "../services/techCoService";
import { toast } from "react-toastify";

class JobAdd extends React.Component {
  state = {
    jobData: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "",
      techCompanyId: "",
      skills: "",
      jobId: "",
    },
  };
  // ----- Component Did Mount & Get Tech Co ID -----
  componentDidMount = () => {
    console.log("Component Did Mount");
    techCoService
      .get(0, 5)
      .then(this.onGetTechCoSuccess)
      .catch(this.onGetTechCoError);
  };

  onGetTechCoSuccess = (response) => {
    console.log("Get Tech Co", response.data);
  };
  onGetTechCoError = (err) => {
    console.log(err);
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.id;
    // console.log({ newValue, currentTarget, inputData });

    this.setState(() => {
      let newState = { ...this.state.jobData };
      if (newState[inputData] === newState.skills) {
        newState[inputData] = newValue.split(",");
      } else if (newState[inputData] === newState.techCompanyId) {
        newState[inputData] = parseInt(newValue);
      } else {
        newState[inputData] = newValue;
      }
      // newState[inputData] = newValue;
      // console.log({ jobData: newState[inputData] });
      return { jobData: newState };
    });
  };

  onUpdateClicked = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state.jobData);
    const data = this.state.jobData;
    let id = this.props.match.params.jobId;

    if (id) {
      jobService
        .editById(data, id)
        .then(this.onEditIdSuccess)
        .catch(this.onEditIdError);
    } else {
      jobService.add(data).then(this.onAddJobSuccess).catch(this.onAddJobError);
    }
  };

  onAddJobSuccess = (response) => {
    console.log({ add: response });
    toast["success"]("You Added A New Job", "New Job");
    this.props.history.push("/jobs/" + response.id + "/edit/");
  };
  onAddJobError = (err) => {
    console.error(err);
    toast["error"]("You Haven't Added A New Job", "New Job");
  };
  onEditIdSuccess = (response) => {
    console.log({ edit: response });
    toast["success"]("You Edited A Job", "Edit Job");
  };
  onEditIdError = (err) => {
    console.error(err);
    toast["error"]("You Haven't Edited A Job", "Edit Job");
  };

  render() {
    return (
      <React.Fragment>
        <div className="card-job">
          <h5 className="card-header">Job Listing</h5>
          <div className="card-body">
            <form ref={(form) => (this.form = form)}>
              <div className="form-group row">
                <label htmlFor="inputTitle" className="col-sm-1 col-form-label">
                  Title
                </label>
                <div className="col-sm-11">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="titleHelp"
                    placeholder="Enter Title"
                    onChange={this.onFormFieldChanged}
                    value={this.state.jobData.title}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputDescription"
                  className="col-sm-1 col-form-label"
                >
                  Description
                </label>
                <div className="col-sm-11">
                  <textarea
                    type="text"
                    className="form-control"
                    id="Description"
                    placeholder="Add Description"
                    rows="3"
                    onChange={this.onFormFieldChanged}
                    value={this.state.jobData.description}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputSummary"
                  className="col-sm-1 col-form-label"
                >
                  Summary
                </label>
                <div className="col-sm-11">
                  <input
                    type="text"
                    className="form-control"
                    id="summary"
                    aria-describedby="summaryHelp"
                    placeholder="Enter Summary of Description"
                    onChange={this.onFormFieldChanged}
                    value={this.state.jobData.summary}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPay" className="col-sm-1 col-form-label">
                  Pay
                </label>
                <div className="col-sm-11">
                  <input
                    type="text"
                    className="form-control"
                    id="pay"
                    aria-describedby="payHelp"
                    placeholder="Enter Pay"
                    onChange={this.onFormFieldChanged}
                    value={this.state.jobData.pay}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputSlug" className="col-sm-1 col-form-label">
                  Slug
                </label>
                <div className="col-sm-11">
                  <input
                    type="text"
                    className="form-control"
                    id="slug"
                    aria-describedby="slugHelp"
                    placeholder="Enter Slug URL"
                    onChange={this.onFormFieldChanged}
                    value={this.state.jobData.slug}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputStatus"
                  className="col-sm-1 col-form-label"
                >
                  Status
                </label>
                <div className="col-sm-11">
                  <input
                    type="text"
                    className="form-control"
                    id="statusId"
                    aria-describedby="stausHelp"
                    placeholder="Active[1] or Deactive"
                    onChange={this.onFormFieldChanged}
                    value={this.state.jobData.statusId}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputTechCompanyId"
                  className="col-sm-1 col-form-label"
                >
                  Tech Co. Id
                </label>
                <div className="col-sm-11">
                  <input
                    type="integer"
                    className="form-control"
                    id="techCompanyId"
                    aria-describedby="techCompanyIdHelp"
                    placeholder="Enter Tech Company Id"
                    onChange={this.onFormFieldChanged}
                    value={this.state.jobData.techCompanyId}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputSkills"
                  className="col-sm-1 col-form-label"
                >
                  Skills
                </label>
                <div className="col-sm-11">
                  <input
                    type="text"
                    className="form-control"
                    id="skills"
                    aria-describedby="skillsHelp"
                    placeholder="Enter List of Skills"
                    onChange={this.onFormFieldChanged}
                    value={this.state.jobData.skills}
                  />
                </div>
              </div>
              <div className="form-group row">
                <input
                  id="jobId"
                  type="hidden"
                  value={this.state.jobData.jobId}
                ></input>
              </div>
            </form>
            <button
              type="submit"
              className="btn btn-secondary btn-lg btn-block"
              onClick={this.onUpdateClicked}
            >
              Update
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default JobAdd;
