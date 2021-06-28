import React from "react";
import { NavLink } from "react-router-dom";
import JobsService from "../services/JobsService";
import TechCompanyService from "../services/TechCompanyService";
import Swal from "sweetalert2";

class AddJob extends React.Component {
  state = {
    techCompanyArr: [],
    jobId: "",
    companyName: "",
    isAddJob: true,
    jobFormData: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: 1,
      techCompanyId: "",
      skills: "",
    },
  };

  componentDidMount = () => {
    TechCompanyService.getTechCompanies()
      .then(this.displayTechCompanies)
      .catch(this.getTechCompanyError);

    if (this.props.match.params.jobId) {
      let jobId = this.props.match.params.jobId;
      JobsService.getJobListingById(jobId)
        .then(this.onGetJobByIdSuccess)
        .catch(this.onGetJobByIdFail);
    } else {
      this.buttonChoice = false;
    }
  };

  ShowAddJobButton = (bool) => {
    if (bool) {
      return (
        <React.Fragment>
          <button
            className="btn btn-primary btn-lg"
            type="button"
            onClick={this.createNewJob}
            id="jobSubmitBtn"
          >
            Submit
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <button
            className="btn btn-primary btn-lg"
            type="button"
            onClick={this.editExisitingJob}
            id="editSubmitBtn"
          >
            Edit
          </button>
        </React.Fragment>
      );
    }
  };

  toggleFormTitle = (bool) => {
    if (bool) {
      return "Create New Job";
    }
    return `Edit Job: ${this.state.companyName} - ${this.state.jobFormData.title} (${this.state.jobId})`;
  };

  toggleCompanyDropDown = (bool) => {
    if (bool) {
      return <option id="jobCompany">Select Company</option>;
    } else {
      return (
        <option id={this.state.jobFormData.techCompanyId}>
          {this.state.companyName}
        </option>
      );
    }
  };

  editExisitingJob = () => {
    let payload = { ...this.state.jobFormData };
    payload.id = this.state.jobId;
    payload.skills = [payload.skills];
    JobsService.editJobListing(payload.id, payload)
      .then(this.onJobEditSuccess)
      .catch(this.onJobEditFail);
  };

  onJobEditSuccess = (response) => {
    Swal.fire({
      icon: "success",
      title: "Job listing updated",
    }).then(() => {
      this.componentDidMount();
    });
  };

  onJobEditFail = (error) => {
    console.log(error.response);
  };

  onGetJobByIdSuccess = (response) => {
    let newState = { ...this.state };
    this.setState(() => {
      newState.jobFormData.title = response.data.item.title;
      newState.jobFormData.description = response.data.item.description;
      newState.jobFormData.summary = response.data.item.summary;
      newState.jobFormData.pay = response.data.item.pay;
      newState.jobFormData.slug = response.data.item.slug;
      newState.jobFormData.techCompanyId = response.data.item.techCompany.id;
      newState.jobFormData.skills = response.data.item.skills[0].name;
      newState.jobId = response.data.item.id;
      newState.companyName = response.data.item.techCompany.name;
      newState.isAddJob = false;
      return newState;
    });
  };

  onGetJobByIdFail = (error) => {
    console.log(error.response);
    Swal.fire({
      icon: "error",
    });
  };

  displayTechCompanies = (response) => {
    let newState = { ...this.state };
    this.setState(() => {
      newState.techCompanyArr = response.data.item.pagedItems.map(
        this.mapCompanies
      );
      return newState;
    });
  };

  mapCompanies = (companyObj) => {
    return (
      <React.Fragment>
        <option value={companyObj.id}>{companyObj.name}</option>
      </React.Fragment>
    );
  };

  getTechCompanyError = (error) => {
    console.log(error.response);
  };

  updateState = (e) => {
    let propName = e.currentTarget.name;
    let newVal = e.currentTarget.value;
    let newState = { ...this.state };
    this.setState(() => {
      newState.jobFormData[propName] = newVal;
      return newState;
    });
  };

  createNewJob = () => {
    let payload = { ...this.state.jobFormData };
    payload.skills = [payload.skills];
    JobsService.submitNewJob(payload)
      .then(this.onCreateJobSuccess)
      .catch(this.onCreateJobFail);
  };

  onCreateJobSuccess = (response) => {
    console.log(response);
    Swal.fire({
      icon: "success",
      title: "New Job Created",
    }).then(() => {
      this.props.history.push(`/main/jobs/edit/${response.data.item}`);
    });
  };

  onCreateJobFail = (error) => {
    console.log(error.response);
    Swal.fire({
      icon: "error",
      title: "Error creating job...",
      text: `${error.response.data.errors}`,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="col-12 mt-3">
        <div className="col-xl-5 col-lg-7 col-md-7 col-sm-10 col-10 bg-white border p-0">
          <div className="bg-white m-auto pb-1 pt-1 pl-3 border-bottom">
            <h6 className="text-muted mt-2 mb-2" id="editJobTitle">
              {this.toggleFormTitle(this.state.isAddJob)}
            </h6>
          </div>

          <form className="p-3">
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Company
              </label>
              <div className="col-sm-10">
                <select
                  type="text"
                  className="form-control form-control-sm"
                  onChange={this.updateState}
                  name="techCompanyId"
                >
                  {this.toggleCompanyDropDown(this.isAddJob)}
                  {this.state.techCompanyArr}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="title"
                  value={this.state.jobFormData.title}
                  onChange={this.updateState}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Summary
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="summary"
                  value={this.state.jobFormData.summary}
                  onChange={this.updateState}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Description
              </label>
              <div className="col-sm-10">
                <textarea
                  type="text"
                  className="form-control form-control-sm"
                  rows="3"
                  name="description"
                  value={this.state.jobFormData.description}
                  onChange={this.updateState}
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Skills
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="skills"
                  value={this.state.jobFormData.skills}
                  onChange={this.updateState}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Pay
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="pay"
                  value={this.state.jobFormData.pay}
                  onChange={this.updateState}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Website
              </label>
              <div className="col-sm-10">
                <input
                  type="url"
                  className="form-control form-control-sm"
                  name="slug"
                  value={this.state.jobFormData.slug}
                  onChange={this.updateState}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="row justify-content-between d-flex">
                <div>
                  <NavLink to="/main/jobs" className="btn btn-outline-primary">
                    Back
                  </NavLink>
                </div>
                <div>{this.ShowAddJobButton(this.state.isAddJob)}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddJob;
