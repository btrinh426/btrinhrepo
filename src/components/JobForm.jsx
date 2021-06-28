import React from "react";
import { addJob } from "../services/jobsService";
import { updateJob } from "../services/jobsService";
import { toast } from "react-toastify";

class JobForm extends React.Component {
  state = {
    formData: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "",
      techCompanyId: "",
      skills: [""],
    },
    jobId: "",
  };
  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };
  onSubmitClick = () => {
    let payload = {
      title: this.state.formData.title,
      description: this.state.formData.description,
      summary: this.state.formData.summary,
      pay: this.state.formData.pay,
      slug: this.state.formData.slug,
      statusId: this.state.formData.statusId,
      techCompanyId: this.state.formData.techCompanyId,
      skills: [this.state.formData.skills],
    };
    var id = this.state.jobId;
    if (id) {
      payload.id = id;
      updateJob(payload, id)
        .then(this.updateJobSuccess)
        .catch(this.updateJobError);
    } else {
      addJob(payload).then(this.addJobSuccess).catch(this.addJobError);
    }
  };
  addJobSuccess = (response) => {
    toast.success("Add Job Successful!");
    console.log(response);
    this.setState((prevState) => {
      let jobId = { ...prevState.jobId };

      jobId = response.data.item;

      return { jobId };
    });
  };
  addJobError = (response) => {
    toast.error("Add Job Unsuccessful");
    console.error(response);
  };
  updateJobSuccess = (response) => {
    toast.success("Update Job Successful!");
    console.log(response);
  };
  updateJobError = (response) => {
    toast.error("Update Job Unsuccessful");
    console.error(response);
  };
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-info sabio">
          <h2 className="text-white">Add or Edit Job</h2>
        </nav>
        <form className="ml-5 mt-4">
          <div className="form-group row">
            <label className="col-1 col-form-label">Title</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="e.g. Senior Tech Lead"
                onChange={this.onFormFieldChange}
                value={this.state.formData.title}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Description</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="This is a Description"
                onChange={this.onFormFieldChange}
                value={this.state.formData.description}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Summary</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="summary"
                placeholder="This is a summary"
                onChange={this.onFormFieldChange}
                value={this.state.formData.summary}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Pay</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="pay"
                placeholder="This is pay"
                onChange={this.onFormFieldChange}
                value={this.state.formData.pay}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Slug</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="slug"
                placeholder="e.g. www.slug.com"
                onChange={this.onFormFieldChange}
                value={this.state.formData.slug}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Status</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="statusId"
                placeholder="Active"
                onChange={this.onFormFieldChange}
                value={this.state.formData.statusId}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Tech Company</label>
            <div className="col-4">
              <select
                name="techCompanyId"
                className="form-control"
                onChange={this.onFormFieldChange}
                value={this.state.formData.techCompanyId}
              >
                <option>Choose...</option>
                <option value="25135">Microsoft</option>
                <option value="25131">Apple</option>
                <option value="25134">Amazon</option>
                <option value="25133">Facebook</option>
                <option value="25132">Google</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Skills</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="skills"
                placeholder="Here are the skills"
                onChange={this.onFormFieldChange}
                value={this.state.formData.skills}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmitClick}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default JobForm;
