import React from "react";

class AddJob extends React.Component {
  state = {
    formData: {
      jobTitle: "Job title",
      description: "tell us about the job",
      jobSummary: "summary",
      jobPay: "pay",
      jobSlug: "slug",
      jobStatId: "Active",
      jobSkills: "skills",
      jobTechCoId: "Tech Company ID",
    },
    isAnEdit: false,
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

  render() {
    return (
      <React.Fragment>
        <div className="bg-text3" /*style={{display: 'none'}*/>
          {/* {this.state.isAnEdit ? <h1>Edit Friend</h1> : <h1>Add New Friend</h1>} */}
          <form className="row g-3">
            <div className="col-md-6">
              <div className="form-wrapper">
                <label>Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.jobTitle}
                />
              </div>
              <div className="form-wrapper col-md-6">
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
                  name="jobSummary"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.jobSummary}
                />
              </div>
            </div>
            <div className="form-wrapper">
              <label>Pay</label>
              <input
                type="text"
                name="jobPay"
                className="form-control"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.jobPay}
              />
            </div>

            <div className="col-md-6">
              <div className="form-wrapper">
                <label>Slug</label>
                <input
                  type="text"
                  name="jobSlug"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.jobSlug}
                />
              </div>
              <div className="form-wrapper">
                <label>StatusId</label>
                <input
                  type="text"
                  name="jobStatId"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.jobStatId}
                />
              </div>
              <div className="form-wrapper">
                <label>Skills</label>
                <input
                  type="text"
                  name="jobSkills"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.jobSkills}
                />
              </div>
              <div className="form-wrapper">
                <label>TechCompany ID </label>
                <input
                  type="text"
                  name="jobTechCoId"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.jobTechCoId}
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
                Edit Friend
              </button>
            ) : (
              <button
                type="submit"
                id="newFriendBtn"
                className="btn btn-primary"
                onClick={this.onButtonClicked}
              >
                Add Friend
              </button>
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddJob;
