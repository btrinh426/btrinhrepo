import React from "react";
import { ToastContainer, toast } from "react-toastify";
import * as jobService from "../services/jobService";

class AddJob extends React.Component {
  state = {
    formData: {
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

  mapForm = (form) => {
    let newSkills = form.skills.split(", ");
    if (this.state.id) {
      const updateForm = {
        id: this.state.id,
        title: form.title,
        description: form.description,
        summary: form.summary,
        pay: form.pay,
        slug: form.slug,
        statusId: form.statusId,
        techCompanyId: Number(form.techCompanyId),
        skills: newSkills,
      };
      return updateForm;
    } else {
      const newForm = {
        title: form.title,
        description: form.description,
        summary: form.summary,
        pay: form.pay,
        slug: form.slug,
        statusId: form.statusId,
        techCompanyId: Number(form.techCompanyId),
        skills: newSkills,
      };

      return newForm;
    }
  };

  mapUpdateForm = (updateForm) => {
    let jobId = this.state.id;

    let updatedForm = {
      id: jobId,
      title: updateForm.title,
      description: updateForm.description,
      summary: updateForm.summary,
      pay: updateForm.pay,
      slug: updateForm.slug,
      statusId: updateForm.statusId,
      techCompanyId: Number(updateForm.techCompanyId),
      skills: updateForm.skills,
    };

    return updatedForm;
  };

  submitClicked = (e) => {
    e.preventDefault();
    let form = { ...this.state.formData };
    const data = this.mapForm(form);
    if (this.state.id) {
      jobService
        .updateJob(data)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateErr);
    } else {
      jobService
        .addJob(data)
        .then(this.onAddJobSuccess)
        .catch(this.onAddJobErr);
    }
  };

  onAddJobSuccess = (response) => {
    console.log("success", response);
    toast.success("Job added");
    this.setState((prevState) => {
      return {
        ...prevState,
        id: response.data.item,
      };
    });
  };

  onAddJobErr = (err) => {
    console.log(err);
    toast.error("Could not add job");
  };

  onUpdateSuccess = (response) => {
    console.log("success", response);
    toast.success("Job updated");
  };

  onUpdateErr = (err) => {
    console.log(err);
    toast.error("Could not update job");
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            <form>
              <div style={{ padding: 20 }}>
                <h1 className="text-center">Add a Job</h1>
              </div>
              <div className="form-group">
                <label htmlFor="title">Role</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.description}
                />
              </div>
              <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="summary"
                  rows="3"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.summary}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pay">Pay</label>
                <input
                  type="text"
                  className="form-control"
                  name="pay"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.pay}
                />
              </div>
              <div className="form-group">
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  className="form-control"
                  name="slug"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.slug}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusId">Status</label>
                <input
                  type="text"
                  className="form-control"
                  name="statusId"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.statusId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="techCompanyId">Company ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="techCompanyId"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.techCompanyId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="skills">Skills (seperate with a comma)</label>
                <input
                  type="text"
                  className="form-control"
                  name="skills"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.skills}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.submitClicked}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddJob;
