import React from "react";
import { NavLink } from "react-router-dom";
import JobsService from "../services/JobsService";
import TechCompanyService from "../services/TechCompanyService";
import Swal from "sweetalert2";

class AddJob extends React.Component {
  state = {
    techCompanyArr: [],
    companyName: "",
    isAddJob: true,
    jobFormData: {
      id: "",
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
    this.getTechCompanies();

    if (this.props.location.state) {
      let newState = { ...this.state };
      this.setState(() => {
        newState.jobFormData = this.props.location.state.editInfo;
        newState.companyName = this.props.location.state.miscInfo.companyName;
        newState.isAddJob = false;
        return newState;
      });
      return;
    }
  };

  getTechCompanies = () => {
    TechCompanyService.getTechCompanies()
      .then(this.displayTechCompanies)
      .catch(this.getTechCompanyError);
  };

  ShowAddJobButton = () => {
    if (this.state.isAddJob) {
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
    }
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
  };

  toggleFormTitle = () => {
    if (this.state.isAddJob) {
      return "Create New Job";
    }
    return `Edit Job: ${this.state.companyName} - ${this.state.jobFormData.title} (${this.state.jobFormData.id})`;
  };

  toggleCompanyDropDown = () => {
    if (this.state.isAddJob) {
      return <option id="jobCompany">Select Company</option>;
    }
    return (
      <option id={this.state.jobFormData.techCompanyId}>
        {this.state.companyName}
      </option>
    );
  };

  editExisitingJob = () => {
    let payload = { ...this.state.jobFormData };
    JobsService.editJobListing(payload.id, payload)
      .then(this.onJobEditSuccess)
      .catch(this.onJobEditFail);
  };

  onJobEditSuccess = (response) => {
    Swal.fire({
      icon: "success",
      title: "Job listing updated",
    });
  };

  onJobEditFail = (error) => {
    console.log(error.response);
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

  updateStateFromForm = (e) => {
    let propName = e.currentTarget.name;
    let newVal = e.currentTarget.value;
    let newState = { ...this.state };

    if (propName !== "techCompanyId") {
      this.setState(() => {
        newState.jobFormData[propName] = newVal;
        return newState;
      });
      return;
    } else {
      let companyName =
        e.currentTarget.options[e.currentTarget.selectedIndex].text;
      this.setState(() => {
        newState.jobFormData[propName] = newVal;
        newState.companyName = companyName;
        return newState;
      });
    }
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
      let newState = { ...this.state };
      this.setState(() => {
        newState.isAddJob = false;
        newState.jobFormData.id = response.data.item;
        return newState;
      });
      this.props.history.push("/main/jobs/edit");
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
    return (
      <div className="col-12 mt-3">
        <div className="col-xl-5 col-lg-7 col-md-7 col-sm-10 col-10 bg-white border p-0">
          <div className="bg-white m-auto pb-1 pt-1 pl-3 border-bottom">
            <h6 className="text-muted mt-2 mb-2" id="editJobTitle">
              {this.toggleFormTitle()}
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
                  onChange={this.updateStateFromForm}
                  name="techCompanyId"
                >
                  {this.toggleCompanyDropDown()}
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
                  onChange={this.updateStateFromForm}
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
                  onChange={this.updateStateFromForm}
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
                  onChange={this.updateStateFromForm}
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
                  onChange={this.updateStateFromForm}
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
                  onChange={this.updateStateFromForm}
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
                  onChange={this.updateStateFromForm}
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
                <div>{this.ShowAddJobButton()}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddJob;
