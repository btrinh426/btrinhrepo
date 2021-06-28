import React from "react";
import * as jobServices from "../services/jobServices";
import { ToastContainer, toast } from "react-toastify";

class AddJob extends React.Component {
  state = {
    formData: {
      title: "Job title",
      description: "tell us about the job",
      summary: "summary",
      pay: "$$$",
      slug: "slug",
      statusId: "Active",
      skills: ["skill1", "skill2"],
      techCompanyId: 0,
    },
    isAnEdit: false,
  };

  componentDidMount() {
    if (this.props.location.state) {
      let jobData = { ...this.props.location.state };
      console.log(jobData);

      this.setState(() => {
        let newState = { ...this.state.formData };
        newState = jobData;
        let skills = jobData.skills.map(this.mapSkills);
        newState.skills = skills;
        newState.techCompanyId = jobData.techCompany.id;

        return { formData: newState, isAnEdit: true };
      });
    }
  }

  mapSkills = (skill) => {
    let result;
    result = skill.name;
    console.log("am i mapping?");

    return result;
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state.formData };
      newState[inputName] = newValue;

      return { formData: newState };
    });
  };

  onButtonClicked = (e) => {
    e.preventDefault();
    console.log("I was clicked");
    console.log(this.state.formData);

    this.setState(() => {
      // let skills = String(this.state.formData.skills);
      // console.log(skills);
      // let skillString = skills.split(",");
      // console.log(skillString);
      let newState = { ...this.state.formData };
      // newState.skills = skillString;
      // console.log(newState.skills);

      return { formData: newState };
    });

    if (this.isAnEdit) {
      console.log("im an edit");
      console.log(this.state.formData);
    } else {
      console.log("new job, not an edit");
      jobServices
        .addNewJob(this.state.formData)
        .then(this.onAddSuccess)
        .catch(this.onAddError);
    }
  };
  onAddSuccess = (job) => {
    console.log("in add success");
    toast("🦄 New Job Added!");
    console.log(job.id);
    //re-route to edit page
    //this.props.history.push("/jobs/edit" + job.id);

    this.setState({ isAnEdit: true });
  };

  onAddError = (response) => {
    console.log("bad news bears");
    //add toast error
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div
          className="bg-text container col-md-6" /*style={{display: 'none'}*/
        >
          {this.state.isAnEdit ? <h1>Edit Job</h1> : <h1>Add Job</h1>}
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-wrapper">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.title}
                  />
                </div>
              </div>
              <div className="row col-md-6">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.description}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-wrapper">
                <label>Summary</label>
                <input
                  type="text"
                  name="summary"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.summary}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-wrapper col-md-4">
                <label>Pay</label>
                <input
                  type="text"
                  name="pay"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.pay}
                />
              </div>

              <div className="form-wrapper col-md-4">
                <label>Slug</label>
                <input
                  type="text"
                  name="slug"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.slug}
                />
              </div>

              <div className="form-wrapper col-md-4">
                <label>StatusId</label>
                <input
                  type="text"
                  name="statusId"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.statusId}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-wrapper col-md-6">
                <label>Skills</label>
                <input
                  //type="text"
                  name="skills"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.skills}
                />
              </div>
              <div className="form-wrapper col-md-4">
                <label>TechCompany ID </label>
                <input
                  //type="number"
                  name="techCompanyId"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.techCompanyId}
                />
              </div>
            </div>

            {this.state.isAnEdit ? (
              <button
                type="submit"
                id="newFriendBtn"
                className="btn btn-primary"
                onClick={this.onButtonClicked}
              >
                Edit Job
              </button>
            ) : (
              <button
                type="submit"
                id="newFriendBtn"
                className="btn btn-primary"
                onClick={this.onButtonClicked}
              >
                Add Job
              </button>
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddJob;
