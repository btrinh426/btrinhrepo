import React from "react";
import * as jobsService from "../services/jobsService";
import { toast } from "react-toastify";

class JobsCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobData: {
        title: "",
        description: "",
        summary: "",
        pay: "",
        slug: "", // must be unique for ea. job posting
        statusId: "NotSet",
        techCompanyId: "", // must be the a valid co. id
        skills: ["string"],
      },
    };
  }

  onFormFieldChanged = (e) => {
    //console.log("data entered", e.currentTarget);

    let currentTarget = e.currentTarget;
    //console.log(currentTarget);
    let newValue = currentTarget.value; //  capt prop val
    let inputName = currentTarget.name; // assn prop name of input val (e.g. eMail)
    //console.log(newValue, currentTarget);

    this.setState((prevState) => {
      //current most recent state object
      let jobData = { ...prevState.jobData }; // copy all props of cur state
      jobData[inputName] = newValue; // bind state to ea field
      // as char entered
      return { jobData };
    });
  };

  onAddClick = (e) => {
    e.preventDefault();
    //console.log("clicked on add", e.currentTarget);
    const data = { ...this.state.jobData };
    //console.log("...this.state.jobData:", data);
    if (data) {
      jobsService.add(data).then(this.onAddJobSuccess).then(this.onAddJobError);
    }
  };

  onAddJobSuccess = () => {
    console.log("job added: ");
    toast["success"]("You Added A Job");
    this.props.history.push("/jobs");
  };

  onAddJobError = () => {
    console.error("job add error");     // getting a job add error @ chunk  36549    return r.apply(this, arguments);
  };

  

  render() {
    return (
      <React.Fragment>
        <div className="container main flex-column bkground">
          <div className="container parent-container d-flex">
            <div className="container left">
              <div className="row">
                <div className="col">
                  <form>
                    <div className="title" text="html">
                      <h3>Add Job</h3>
                    </div>

                    <label htmlFor="inputTitle" className="title">
                      Title
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="title"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.title}
                    />

                    <label htmlFor="inputDescription" className="description">
                      Description
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="description"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.description}
                    />

                    <label htmlFor="inputSummary" className="summary">
                      Summary
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="summary"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.summary}
                    />

                    <label htmlFor="inputPay" className="pay">
                      Pay
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="pay"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.pay}
                    />

                    <label htmlFor="inputSlug" className="slug">
                      Slug - Please enter a unique Slug
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="slug"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.slug}
                    />

                    <label htmlFor="inputStatusId" className="statusId">
                      StatusId - Please enter 1 for active
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="statusId"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.statusId}
                    />

                    <label
                      htmlFor="inputtechCompanyId"
                      className="techCompanyId"
                    >
                      TechCompanyId - Please enter a valid company Id
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="techCompanyId"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.techCompanyId || ""}
                    />

                    <label htmlFor="inputSkills" className="skills">
                      Skills
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="skills"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.skills[0] || ""}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="container middle">
              <div className="row">
                <div className="col-md-12">
                  <button
                    id="putAPI"
                    type="submit"
                    className="btn btn-success ml-3 mb-5"
                    onClick={this.onAddClick}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default JobsCreate;
