import React, { Component } from "react";
import * as jobServices from "../services/jobServices";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import "../App.css";

class AddEditJobs extends Component {
  state = {
    jobForm: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "Active",
      techCompanyId: 0,
      // skills: ["skill-1, skill-2, skill-3"], //** I changed it so that I can use split() */
      skills: "skill-1, skill-2, skill-3",
    },
    updateId: null,
  };

  componentDidMount() {
    let jobToEditId = this.props.match.params.id;
    if (jobToEditId) {
      console.log("From IF>>>>> form should be populated already!!!");

      jobServices
        .getById(jobToEditId)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdError);
    }
  }

  onGetByIdSuccess = (response) => {
    let currentInfoToBeEditted = response.data.item;
    let currentIdToBeEditted = response.data.item.id;

    console.log(
      "From GetByIdSuccsses: job obj in need of edit is: ",
      { currentIdToBeEditted },
      { currentInfoToBeEditted }
    );
    let currentSkillsObjArr = currentInfoToBeEditted.skills;
    let currentSkillsArr = [];

    for (let i = 0; i < currentSkillsObjArr.length; i++) {
      currentSkillsArr.push(currentSkillsObjArr[i].name);
    }
    //*** here we have to change back skills from to a sting!

    currentInfoToBeEditted.skills = currentSkillsArr.toString();
    currentInfoToBeEditted.techCompanyId =
      currentInfoToBeEditted.techCompany.id;

    this.setState(() => {
      let jobFormDataToBeEditted = { ...this.state.jobForm };

      jobFormDataToBeEditted = currentInfoToBeEditted;

      return {
        jobForm: jobFormDataToBeEditted,
        updateId: currentIdToBeEditted,
      };
    });
  };

  onGetByIdError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong [onGetById]!");
  };

  onFromFieldChanged = (e) => {
    let fieldTochange = e.currentTarget;
    let fieldValue = fieldTochange.value;
    let fieldName = fieldTochange.name;

    this.setState(() => {
      let newJobForm = { ...this.state.jobForm };
      newJobForm[fieldName] = fieldValue;
      newJobForm.techCompanyId = parseInt(newJobForm.techCompanyId);
      console.log("FromonFromFieldChanged: ", { newJobForm });

      return { jobForm: newJobForm };
    });
  };

  onSubmitClicked = () => {
    let jobData = { ...this.state.jobForm };
    jobData.skills = jobData.skills.split(",");
    //*** here we alter the skills from a sting to an arr, but in the state they're still saved as a string, not an arr!!!

    console.log("From onSubmitClicked,job obj to be submitted is: ", jobData);

    if (!this.state.updateId) {
      this.addANewJob(jobData);
    } else {
      this.updateJob(this.state.updateId, jobData);
    }
    this.setState(() => {
      return { updateId: null };
    });
  };

  addANewJob = (newJobData) => {
    jobServices
      .addJob(newJobData)
      .then(this.onAddJobSuccess)
      .catch(this.onAddJobError);
  };

  onAddJobSuccess = (response) => {
    Swal.fire("Job successfully added!");
    let addedJobId = response.data.item;

    this.setState(() => {
      return { updateId: addedJobId };
    });
  };

  onAddJobError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong [addJob]!");
  };

  updateJob = (jobId, payload) => {
    jobServices
      .updateJob(jobId, payload)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = (jobId) => {
    Swal.fire(`Job successfully updated for: ${jobId}`);

    this.props.history.push("/add-editjobs");
    this.refreshPage();
  };

  onUpdateError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong [updateJob]!");
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="form-group row">
            <h5>Add a Job</h5>
          </div>
          <form>
            <div className="form-group row">
              <label htmlFor="forJobTitle" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forJobTitle"
                  placeholder="Job title -Role"
                  name="title"
                  value={this.state.jobForm.title}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="techCompanySelect"
                className="col-sm-2 col-form-label"
              >
                Tech Compony
              </label>
              <div className="col-sm-10">
                <select
                  onChange={this.onFromFieldChanged}
                  value={this.state.jobForm.techCompanyId}
                  className="form-control"
                  name="techCompanyId"
                  id="techCompanySelect"
                >
                  <option value="">Select</option>
                  <option value="24410">Apple</option>
                  <option value="24411">Google</option>
                  <option value="24412">Twitter</option>
                  <option value="24416">Instagram</option>
                  <option value="24417">Uber </option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="forJobDescription"
                className="col-sm-2 col-form-label"
              >
                Job Description
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forJobDescription"
                  placeholder="Job Description"
                  name="description"
                  value={this.state.jobForm.description}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="forJobSummary"
                className="col-sm-2 col-form-label"
              >
                Job Summary
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forJobSummary"
                  placeholder="Job Summary"
                  name="summary"
                  value={this.state.jobForm.summary}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="forJobPay" className="col-sm-2 col-form-label">
                Pay
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forJobPay"
                  placeholder="Pay"
                  name="pay"
                  value={this.state.jobForm.pay}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="forJobSkills" className="col-sm-2 col-form-label">
                Skills
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forJobSkills"
                  placeholder="Skills"
                  name="skills"
                  value={this.state.jobForm.skills}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="forJobSlug" className="col-sm-2 col-form-label">
                Slug
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forJobSlug"
                  placeholder="Slug"
                  name="slug"
                  value={this.state.jobForm.slug}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="forJobStatus" className="col-sm-2 col-form-label">
                Status
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forJobStatus"
                  placeholder="Status"
                  name="statusId"
                  value={this.state.jobForm.statusId}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onSubmitClicked}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddEditJobs;
