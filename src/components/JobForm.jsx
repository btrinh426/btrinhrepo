import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { toast } from "react-toastify";

import * as jobService from "../services/jobService";

class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobForm: {
        title: "",
        description: "",
        summary: "",
        pay: "",
        slug: "",
        statusId: "",
        techCompanyId: "",
        skills: "",
      },
    };
  }

  componentDidMount = () => {
    // console.log("JobForm did mount...");
    if (this.props.location.pathname !== "/jobs/new") {
      this.setState(() => {
        const newState = {
          jobForm: {
            id: this.props.location.state.jobInfo.id,
            title: this.props.location.state.jobInfo.title,
            description: this.props.location.state.jobInfo.description,
            summary: this.props.location.state.jobInfo.summary,
            pay: this.props.location.state.jobInfo.pay,
            slug: this.props.location.state.jobInfo.slug,
            statusId: this.props.location.state.jobInfo.statusId,
            techCompanyId: this.props.location.state.jobInfo.techCompany.id,
            skills: this.props.location.state.jobInfo.skills.map((skill) => skill.name).join(", "),
          },
        };
        return newState;
      });
    }
  };


  clickJobSubmitButton = (e) => {
    e.preventDefault();
    const jobData = this.getNewJobData();
    if (!this.state.jobForm.hasOwnProperty("id")) {
      // Add new job
      jobService.addJob(jobData).then(this.onAddJobSuccess).catch(this.onAddJobError);
    } else {
      // Update old job
      jobData.id = this.state.jobForm.id;
      jobService.updateJob(jobData).then(this.onUpdateJobSuccess).catch(this.onUpdateJobError);
    }
  };

  getNewJobData = () => {
    const newJob = {
      title: this.state.jobForm.title,
      description: this.state.jobForm.description,
      summary: this.state.jobForm.summary,
      pay: this.state.jobForm.pay,
      slug: this.state.jobForm.slug,
      statusId: this.state.jobForm.statusId,
      techCompanyId: this.state.jobForm.techCompanyId,
    };

    let skillText = this.state.jobForm.skills;
    if (skillText.indexOf(",") !== -1) {
      skillText = skillText.split(",");
    } else {
      skillText = skillText.split(" ");
    }
    newJob.skills = [...skillText];

    return newJob;
  };

  onAddJobSuccess = (response) => {
    toast.success(`Added new job, ID: ${response.data.item}`);
    this.setState(() => {
      const newState = { ...this.state };
      newState.jobForm.id = response.data.item;
      return newState;
    });
    const jobInfo = this.getNewJobData();
    jobInfo.id = response.data.item;
    this.props.history.push(`/jobs/${response.data.item}/edit`, { jobInfo });
  };

  onAddJobError = (error) => {
    debugger;
    console.error("Error adding new job.");
    const errorText = error.response.data.errors;
    const ErrorDiv = () => (
      <div>
        <p>Registration failed:</p>
        <p>{errorText.join("\n")}</p>
      </div>
    );
    toast.error(<ErrorDiv />, { autoClose: 10000 });
  };

  onUpdateJobSuccess = () => {
    toast.success(`Job updated.`);
  };

  onUpdateJobError = (error) => {
    debugger;
    console.error("Error updating job.", error);
  };

  clickJobClearButton = (e) => {
    this.setState(() => {
      const newState = { ...this.state };
      newState.jobForm.title = "";
      newState.jobForm.description = "";
      newState.jobForm.summary = "";
      newState.jobForm.pay = "";
      newState.jobForm.slug = "";
      newState.jobForm.statusId = "";
      newState.jobForm.techCompanyId = "";
      newState.jobForm.skills = "";
      return newState;
    });
  };

  clickJobCancelButton = (e) => {
    e.preventDefault();
    this.props.history.push("/jobs");
  };

  render() {
    console.log("Rendering jobForm");
    return (
      <div className="col pl-3 mr-3" style={{ zIndex: "10" }}>
        <div className="row m-0 pl-0 pt-2 pb-2 pr-2">
          <h3 className="col pl-0" id="mainTitle">
            Jobs
          </h3>
        </div>

        <div className="row pl-3">
          <div className="col nav-item pl-0 pr-3" style={{ marginBottom: "1rem" }}>
            <div className="row pl-3 pr-3 pb-3 pt-0">
              <div
                className=" container row border border-secondary rounded mb-0 mr-3 ml-0 p-3"
                id="jobAddUpdateFormBorder"
                style={{ backgroundColor: "rgb(210, 217, 235)", width: "fit-content" }}
              >
                <div className="col pl-3 pt-0 pb-0 m-0">
                  <div className="row">
                    <Form
                      className="jobLogForm col m-0 pl-0 pr-0"
                      style={{ marginBottom: "1rem", minWidth: "500px", height: "fit-content" }}
                    >
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="jobTitleInput" className="form-label my-label col-3">
                              Title
                            </Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              id="jobTitleInput"
                              name="title"
                              value={this.state.jobForm.title}
                              onChange={this.onJobsFormChange}
                              aria-describedby="jobTitleHelp"
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="jobDescInput" className="form-label my-label col-3">
                              Description
                            </Label>
                            <textarea
                              className="form-control my-input-control col"
                              id="jobDescInput"
                              rows="4"
                              maxLength="2147483647"
                              style={{ resize: "none" }}
                              name="description"
                              value={this.state.jobForm.description}
                              onChange={this.onJobsFormChange}
                            ></textarea>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="jobSummaryInput" className="form-label my-label col-3">
                              Summary
                            </Label>
                            <textarea
                              className="form-control my-input-control col"
                              id="jobSummaryInput"
                              rows="4"
                              maxLength="255"
                              name="summary"
                              value={this.state.jobForm.summary}
                              onChange={this.onJobsFormChange}
                              style={{ resize: "none" }}
                            ></textarea>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="jobPayInput" className="form-label my-label col-3">
                              Pay
                            </Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              id="jobPayInput"
                              aria-describedby="jobPayHelp"
                              name="pay"
                              value={this.state.jobForm.pay}
                              onChange={this.onJobsFormChange}
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="jobSlugInput" className="form-label my-label col-3">
                              Slug
                            </Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              id="jobSlugInput"
                              aria-describedby="jobSlugHelp"
                              name="slug"
                              value={this.state.jobForm.slug}
                              onChange={this.onJobsFormChange}
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="jobStatusInput" className="form-label my-label col-3">
                              Status
                            </Label>
                            <select
                              className="custom-select form-control my-input-control col"
                              id="jobStatusInput"
                              name="statusId"
                              value={this.state.jobForm.statusId}
                              onChange={this.onJobsFormChange}
                            >
                              <option value="">Select Status...</option>
                              <option value="Active">Active</option>
                              <option value="NotSet">Not Set</option>
                              <option value="Deleted">Deleted</option>
                              <option value="Flagged">Flagged</option>
                            </select>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="jobTechCoIdInput" className="form-label my-label col-3">
                              Tech Co ID
                            </Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              id="jobTechCoIdInput"
                              aria-describedby="jobTechCoIdHelp"
                              name="techCompanyId"
                              value={this.state.jobForm.techCompanyId}
                              onChange={this.onJobsFormChange}
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className="row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="jobSkillsInput" className="form-label my-label col-3">
                              Skills
                            </Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              id="jobSkillsInput"
                              aria-describedby="jobSkillsHelp"
                              name="skills"
                              value={this.state.jobForm.skills}
                              onChange={this.onJobsFormChange}
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <div
                        className="row mr-1 pt-3 ml-0"
                        style={{ justifyContent: "center", borderTop: "2px #8e9194 solid" }}
                      >
                        <Button
                          type="submit"
                          color="success"
                          className="m-1"
                          id="jobFormSubmitButton"
                          onClick={this.clickJobSubmitButton}
                        >
                          {this.state.jobForm.hasOwnProperty("id") ? "Update" : "Submit"}
                        </Button>
                        <Button
                          type="reset"
                          color="warning"
                          className=" m-1"
                          id="jobFormClearButton"
                          onClick={this.clickJobClearButton}
                        >
                          Clear Form
                        </Button>
                        <Button
                          type="reset"
                          color="secondary"
                          className=" m-1"
                          id="friendFormCancelButton"
                          onClick={this.clickJobCancelButton}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div id="jobUpdateId" className="d-none"></div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(JobForm);
