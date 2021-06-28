import React from "react";
import { Container } from "reactstrap";
import * as jobService from "../services/jobService";
import { toast } from "react-toastify";

class AddJob extends React.Component {
  state = {
    jobData: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "1",
      techCompanyId: "",
      skills: [],
    },
  };
  componentDidMount() {
    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "jobData") {
        let jobData = { ...locState.payload };

        this.setState(() => {
          jobData.statusId = "1";
          jobData.dateCreated = "";
          jobData.dateModified = "";
          jobData.techCompanyId = jobData.techCompany.id;
          jobData.techCompany = "";
          jobData.entityTypeId = "";
          jobData.skills = [jobData.skills[0].name];

          console.log(jobData);

          return { jobData };
        });
      }
    } else if (!this.props.location.state) {
      let jobId = this.props.match.params.jobId;
      jobService.getJob(jobId).then(this.onGetJobSuccess);
    }
  }

  onGetJobSuccess = (response) => {
    console.log(response.data.item);
    let jobData = response.data.item;

    this.setState(() => {
      jobData.statusId = "1";
      jobData.dateCreated = "";
      jobData.dateModified = "";
      jobData.techCompanyId = jobData.techCompany.id;
      jobData.techCompany = "";
      jobData.entityTypeId = "";
      jobData.skills = [jobData.skills[0].name];

      console.log(jobData);

      return { jobData };
    });
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let jobData = { ...prevState.jobData };
      // jobData[inputName] = newValue;
      if (inputName === "skills") {
        jobData[inputName] = [newValue];
      } else {
        jobData[inputName] = newValue;
      }
      console.log("newState", jobData);
      return { jobData };
    });
  };

  onUpdateButtonClicked = (e) => {
    e.preventDefault();

    if (this.state.jobData.id) {
      jobService
        .updateJobs(this.state.jobData, this.state.jobData.id)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      jobService
        .addJob(this.state.jobData)
        .then(this.onActionSuccess)
        .catch(this.onActionError);
    }
  };

  onActionSuccess = (response) => {
    console.log(response);
    toast.success("Job is successfully Added");
    this.setState(() => {
      return { id: response.data.item };
    });
  };
  onActionError = (errResponse) => {
    toast.error("Something is Wrong");

    console.error(errResponse.errors);
  };

  onUpdateSuccess = (res) => {
    console.log(res);
    toast.success("Job is successfully Updated");
  };
  onUpdateError = (errResponse) => {
    toast.error("Something is Wrong");

    console.error(errResponse);
  };

  render() {
    return (
      <React.Fragment>
        <Container className="themed-container" fluid="sm">
          <form className="form-addfriend center">
            <h1 className="mt-4">Add a Job</h1>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Title
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.jobData.title || ""}
                  type="text"
                  className="form-control-lg"
                  id="inputTitle"
                  name="title"
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Description
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.jobData.description}
                  type="text"
                  className="form-control-lg"
                  id="inputDescription"
                  name="description"
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Summary
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.jobData.summary}
                  type="text"
                  className="form-control-lg"
                  id="inputSummary"
                  name="summary"
                  placeholder="Summary"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Pay
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.jobData.pay}
                  type="text"
                  className="form-control-lg"
                  id="inputHeadline"
                  name="pay"
                  placeholder="Pay"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Slug
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.jobData.slug}
                  type="Url"
                  className="form-control-lg"
                  id="inputSlug"
                  name="slug"
                  placeholder="Slug Url"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Status Id
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.jobData.statusId}
                  type="text"
                  className="form-control-lg"
                  id="inputStatusId"
                  name="statusId"
                  placeholder="Status"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Company Id
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.jobData.techCompanyId}
                  type="text"
                  className="form-control-lg"
                  id="inputTechCompanyId"
                  name="techCompanyId"
                  placeholder="Tech Company Id"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Skills
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.jobData.skills}
                  type="text"
                  className="form-control-lg"
                  id="inputskills"
                  name="skills"
                  placeholder="Skills"
                />
              </div>
            </div>
            <div className="button">
              <button
                onClick={this.onUpdateButtonClicked}
                type="button"
                id="update"
                className="btn btn-primary mr-5"
              >
                Update
              </button>
            </div>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

export default AddJob;
