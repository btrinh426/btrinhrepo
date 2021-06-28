import React from "react";
import * as jobService from "../services/jobService";
import { toast } from "react-toastify";

class Job extends React.Component {
  state = {
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

  componentDidMount() {
    let jobFormId = this.props.match.params.jobId;

    console.log("Job Id", jobFormId);

    if (jobFormId) {
      jobService
        .getById(jobFormId)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdError);
    }
  }

  onGetByIdSuccess = (response) => {
    console.log(response);

    this.setState((prevState) => {
      let currentJob = { ...prevState.formData };

      let jobSkills = response.data.item.skills.map((skill) => skill["name"]);

      currentJob = {
        title: response.data.item.title,
        description: response.data.item.description,
        summary: response.data.item.summary,
        pay: response.data.item.pay,
        slug: response.data.item.slug,
        statusId: 1,
        techCompanyId:
          response.data.item.techCompany.contactInformation.entityId,
        skills: jobSkills,
      };

      return { formData: currentJob };
    });
  };
  onGetByIdError = (err) => {
    console.log(err);
  };

  onSubmitClicked = (e) => {
    e.preventDefault();

    this.setState(
      (prevState) => {
        let formData = { ...prevState.formData };
        let skillsAr = formData.skills.split(", ");
        formData.skills = skillsAr;
        console.log(formData.skills);
        return { formData };
      },
      function () {
        console.log("Updated state", this.state.formData);

        let jobFormId = this.props.match.params.jobId;

        if (jobFormId) {
          jobService
            .update(jobFormId, this.state.formData)
            .then(this.onUpdateSuccess)
            .catch(this.onUpdateError);
        } else {
          jobService
            .add(this.state.formData)
            .then(this.onAddSuccess)
            .catch(this.onAddError);
        }
      }
    );
  };

  onUpdateSuccess = (response) => {
    console.log("Update success", response);
  };
  onUpdateError = (err) => {
    console.error(err);
  };

  onAddSuccess = (response) => {
    console.log(response);
    toast.success("Job added successfully!");
  };
  onAddError = (err) => {
    console.error(err);
    toast.error("Error: could not add job");
  };

  onFormFieldChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;

    this.setState((prevState) => {
      let updatedFormData = { ...prevState.formData };

      updatedFormData[name] = value;

      return { formData: updatedFormData };
    });
  };

  render() {
    return (
      <main role="main">
        <div className="container">
          <div className="row">
            <div className="col-md-4 p-5">
              <div>
                <h2 className="text-muted">Jobs</h2>
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="form-control"
                    name="title"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    placeholder="Enter description"
                    className="form-control"
                    name="description"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.description}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="summary">Summary:</label>
                  <input
                    type="text"
                    placeholder="Enter summary"
                    className="form-control"
                    name="summary"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.summary}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pay">Pay:</label>
                  <input
                    type="text"
                    placeholder="Enter pay"
                    className="form-control"
                    name="pay"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.pay}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="slug">Slug:</label>
                  <input
                    type="text"
                    placeholder="Enter slug"
                    className="form-control"
                    name="slug"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.slug}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="statusId">Status:</label>
                  <input
                    type="text"
                    placeholder="Enter status"
                    className="form-control"
                    name="statusId"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.statusId}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="techCompanyId">Tech Company:</label>
                  <input
                    type="text"
                    placeholder="Enter tech company id"
                    className="form-control"
                    name="techCompanyId"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.techCompanyId}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="skills">Skills:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="skills"
                    onChange={this.onFormFieldChange}
                    placeholder="Enter skills"
                    value={this.state.formData.skills}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onSubmitClicked}
                >
                  Submit
                  {/* {this.props.match.params.friendId ? "Update" : "Add"} */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Job;
