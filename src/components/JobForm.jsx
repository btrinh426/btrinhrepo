import React, { Component } from "react";
import { postJob, updateJob } from "../services/jobs";
import { toast } from "react-toastify";

class JobForm extends Component {
  state = {
    formData: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      skills: "",
      slug: "",
      statusId: "",
      techCompanyId: 23848,
    },
    jobData: { id: "" },
  };

  componentDidMount() {
    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "job_Obj") {
        let newJob = locState.payload.job;
        let id = locState.payload.job.id;
        console.log(newJob.skills);
        this.setState(() => {
          return { formData: newJob, jobData: { id } };
        });
      }
    }
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      //console.log(formData);
      return { formData };
    });
  };

  handleClick = (e) => {
    const payload = { ...this.state.formData };
    payload.skills = payload.skills.split(",");

    if (this.props.location.state || this.state.jobData.id) {
      let editJob = { ...this.state.formData };
      delete editJob.techCompany;
      editJob.skills = editJob.skills.split(",");
      editJob.techCompanyId = 23848;
      //ask instructors about if this is ok..i get undefined if i call this.state.techCompanyId
      editJob.id = this.state.jobData.id;
      console.log(this.state.techCompanyId);

      updateJob(editJob)
        .then(this.onUpdateJobSuccess)
        .catch(this.onUpdateJobError);
    }

    // if (this.state.jobData.id) {
    //   const payloadUpdate = { ...this.state.formData };
    //   payloadUpdate.id = this.state.jobData.id;
    //   payloadUpdate.skills = payloadUpdate.skills.split(",");
    //   updateJob(payloadUpdate)
    //     .then(this.onUpdateJobSuccess)
    //     .catch(this.onUpdateJobError);
    // }
    else {
      postJob(payload).then(this.onPostJobSuccess).catch(this.onPostJobError);
    }
    console.log(payload.id);
  };

  onPostJobSuccess = (response) => {
    let newId = response.data.item;
    this.setState(() => {
      let jobData = { ...this.state.jobData };
      jobData.id = newId;
      return { jobData };
    });
    toast.success(`The job has been posted successfully, id: ${newId}`);
  };
  onPostJobError = (response) => console.error(response);
  onUpdateJobSuccess = (response) => {
    console.log(response);
    toast.success(`Job has been updated successfully`);
  };
  onUpdateJobError = (response) => console.error(response);

  render() {
    return (
      <React.Fragment>
        <form id="form2" />
        <div className="row mb-3" />
        <label htmlFor="role" className="col-sm-2 col-form-label">
          Role
        </label>
        <div className="col-sm-10" />
        <input
          type="text"
          className="form-control"
          name="title"
          value={this.state.formData.title}
          onChange={this.onFormFieldChanged}
        />

        {/* <div className="row mb-3">
          <label htmlFor="summary" className="col-sm-2 col-form-label">
            Tech Company
          </label>
          <select className="col-sm-10" id="dropDown">
            <option selected={""}>select</option>
            <option value="1">one</option>
          </select>
        </div> */}

        <div className="row mb-3">
          <label htmlFor="summary" className="col-sm-2 col-form-label">
            Job Description
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="description"
              value={this.state.formData.description}
              onChange={this.onFormFieldChanged}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="headline" className="col-sm-2 col-form-label">
            Job Summary
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="summary"
              value={this.state.formData.summary}
              onChange={this.onFormFieldChanged}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="slug" className="col-sm-2 col-form-label">
            Pay
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="pay"
              value={this.state.formData.pay}
              onChange={this.onFormFieldChanged}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="status" className="col-sm-2 col-form-label">
            Skills
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="skills"
              value={this.state.formData.skills}
              onChange={this.onFormFieldChanged}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="skills" className="col-sm-2 col-form-label">
            Slug
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="slug"
              value={this.state.formData.slug}
              onChange={this.onFormFieldChanged}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="Primary Image" className="col-sm-2 col-form-label">
            Status
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="statusId"
              value={this.state.formData.statusId}
              onChange={this.onFormFieldChanged}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary submit"
          onClick={this.handleClick}
        >
          Submit
        </button>
      </React.Fragment>
    );
  }
}

export default JobForm;
