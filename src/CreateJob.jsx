import React from "react";
import * as jobService from "./jobService";
import { toast, ToastContainer } from "react-toastify";

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
        statusId: "",
        techCompanyId: "",
        skills: [],
      },
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      // map skills array to turn objects into strings separated by commas
      console.log(this.props.location.state);

      let skillsArray = this.props.location.state.skills;
      let skills = skillsArray.map((aSkill) => aSkill).join(",");

      this.setState({
        formData: {
          ...this.props.location.state,
          skills,
        },
      });
    }
    // if (Array.isArray(this.props.location.state.skills)) {
    //   let skillsArray = this.props.location.state.skills;
    //   let skills = skillsArray.map((aSkill) => aSkill.name).join(",");

    //   this.setState({
    //     formData: {
    //       ...this.props.location.state,
    //       skills,
    //     },
    //   });
    // }
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    console.log(this.state.formData);

    let formData = { ...this.state.formData };

    formData.techCompanyId = Number(formData.techCompanyId);

    let id = this.props.match.params.id;
    formData.skills = formData.skills.split(",");

    if (id) {
      jobService
        .editJob(formData, id)
        .then(this.onEditJobSuccess)
        .catch(this.onEditJobError);
    } else {
      // let formData = { ...this.state.formData };

      jobService
        .addJob(formData)
        .then(this.onAddJobSuccess)
        .catch(this.onAddJobError);
    }
  };

  onAddJobSuccess = (response) => {
    toast.success("Success in adding job");
    let id = response.data.item;
    console.log(id);

    let formData = { ...this.state.formData };
    formData.skills = formData.skills.split(",");
    let newData = { ...formData, id };

    this.props.history.push("/jobs/" + id + "/edit", newData);
  };

  onAddJobError = () => {
    toast.error("Sorry, failed to add job.");
  };

  onEditJobSuccess = () => {
    toast.success("Success in editing job!");
  };

  onEditJobError = () => {
    toast.error("Sorry, could not edit job");
  };

  render() {
    return (
      <form style={{ margin: "100px " }}>
        <ToastContainer />

        <div>
          <label>
            <h1 style={{ margin: "30px " }}>Here you can store a Job</h1>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="title"
            name="title"
            placeholder="Add a job title"
            value={this.state.formData.title}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="description"
            name="description"
            placeholder="Add a short description job field"
            value={this.state.formData.description}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="summary"
            name="summary"
            placeholder="Here would be a good place to summarize the main details of the job"
            value={this.state.formData.summary}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="pay">Pay</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="pay"
            name="pay"
            placeholder="Tell us the job's pay. Ex: 70000"
            value={this.state.formData.pay}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="slug"
            name="slug"
            placeholder="Ex: 7531"
            value={this.state.formData.slug}
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Create a unique ID to easily locate your job. (Please use numbers
            for a total of 4 characters)
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="statusId">Status</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="statusId"
            name="statusId"
            placeholder="Ex: 1"
            value={this.state.formData.statusId}
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Create a unique number you will remember. (1)
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="techCompanyId">Tech Company Id</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="techCompanyId"
            name="techCompanyId"
            placeholder="Ex: 20499"
            value={this.state.formData.techCompanyId}
          ></input>
          <small id="techCompanyId" className="form-text text-muted">
            Here you will enter in your tech company's Id.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="skills"
            name="skills"
            placeholder="ex: Data Integration, React, Javascript"
            value={this.state.formData.skills}
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Add a desirable skill that matches the job. When editing an existing
            job, please remove any quotation marks.
          </small>
        </div>
        <button
          type="button"
          style={{ marginTop: "30px " }}
          className="btn btn-primary"
          onClick={this.submitForm}
        >
          Store Job
        </button>
      </form>
    );
  }
}

export default CreateJob;
