import React from "react";
import { addJob, editJob } from "../services/jobsService";
import { toast } from "react-toastify";
import debug from "sabio-debug";
const _logger = debug.extend("App");

class CreateJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        description: "",
        summary: "",
        pay: "",
        slug: "",
        statusId: "1",
        techCompanyId: "",
        skills: [],
      },
      jobId: null,
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      if (
        this.props.location.state.type === "JOB_TO_UPDATE" &&
        this.props.location.state.payload
      ) {
        let jobInfo = this.props.location.state.payload;
        this.setState((preState) => {
          let newState = { ...preState };

          newState.jobId = jobInfo.id;
          newState.formData.pay = jobInfo.pay;
          newState.formData.skills = [jobInfo.skills[0].name]; //trouble maker, needs to be []not ""
          newState.formData.slug = jobInfo.slug;
          newState.formData.summary = jobInfo.summary;
          newState.formData.techCompanyId = jobInfo.techCompany.id;
          newState.formData.title = jobInfo.title;
          newState.formData.description = jobInfo.description;
          return newState;
        }, _logger("componenet mounted jobId: ", this.state.jobId));
      }
    }
  }

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    if (inputName !== "skills") {
      this.setState((preState) => {
        let formData = { ...preState.formData };
        formData[inputName] = newValue;
        return { formData };
      });
    } else {
      this.setState((preState) => {
        let formData = { ...preState.formData };
        formData[inputName] = [newValue];
        return { formData };
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    _logger(`payload is: ${this.state.formData} with id:${this.state.jobId}`);
    if (!this.state.jobId) {
      addJob(this.state.formData)
        .then(this.onAddJobSuccess)
        .catch(this.onAddJobError);
    } else {
      editJob(this.state.jobId, this.state.formData)
        .then(this.onEditJobSuccess)
        .catch(this.onEditJobError);
    }
  };
  onAddJobSuccess = (response) => {
    _logger("add job success: ", response);
    toast["success"]("You created a job!", "Job created.");
    this.setState((preState) => {
      let newState = { ...this.state };
      newState.jobId = response.data.item;
      return newState;
    }, window.history.replaceState(window.history.state, "Components in React", `/jobs/${response.data.item}`));
  };
  onAddJobError = (response) => {
    _logger("add job Error: ", response);
    toast["error"]("500 - check slug for unique?", "failed.");
  };
  onEditJobSuccess = (response) => {
    _logger("edit job success", response);
    toast["success"]("You EDITED a job!", "Job updated.");
  };
  onEditJobError = (response) => {
    _logger("add job Error: ", response);
    toast["error"]("if 500 - check slug for unique?", "failed.");
  };

  render() {
    return (
      <div className="">
        <h1>{this.state.jobId ? `Edit Job` : `Create Job`}</h1>
        <hr></hr>
        <form>
          <label htmlFor="title">Title:</label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            placeholder="enter title"
            onChange={this.onFormFieldChange}
            value={this.state.formData.title}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            placeholder="enter description"
            onChange={this.onFormFieldChange}
            value={this.state.formData.description}
          />
          <label htmlFor="summary">Summary:</label>
          <input
            type="text"
            className="form-control"
            id="summary"
            name="summary"
            placeholder="once upon a time..."
            onChange={this.onFormFieldChange}
            value={this.state.formData.summary}
          />
          <label htmlFor="pay">Pay:</label>
          <input
            type="number"
            className="form-control"
            id="pay"
            name="pay"
            placeholder="99999"
            onChange={this.onFormFieldChange}
            value={this.state.formData.pay}
          />
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            className="form-control"
            id="slug"
            name="slug"
            placeholder="unique string"
            onChange={this.onFormFieldChange}
            value={this.state.formData.slug}
          />
          <label htmlFor="techcompanyid">Company ID:</label>
          <input
            type="number"
            className="form-control"
            id="techCompanyId"
            name="techCompanyId"
            placeholder="19763"
            onChange={this.onFormFieldChange}
            value={this.state.formData.techCompanyId}
          />
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            className="form-control"
            id="skills"
            name="skills"
            placeholder="reading"
            onChange={this.onFormFieldChange}
            value={this.state.formData.skills}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            {this.state.jobId ? `Update` : `Create`}
          </button>
        </form>
      </div>
    );
  }
}

export default CreateJob;
