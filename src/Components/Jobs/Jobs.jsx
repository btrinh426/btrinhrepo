import React from "react";
import { Link } from "react-router-dom";
import { addJob, editJob, getJobById } from "../../services/UserService";
import { toast } from "react-toastify";

class Jobs extends React.Component {
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
    jobId: "",
  };

  componentDidMount() {
    var id = this.props.match.params.jobId;
    if (!id) {
      return;
    } else if (id && this.props.location.state) {
      this.setState(() => {
        let formData = { ...this.state.formData };
        formData = this.props.location.state.payload;
        formData.techCompanyId = formData.techCompany.id;
        //   formData.skills = JSON.stringify(formData.skills);
        //function mapSkills(item) {
        //        var newSkills = {
        //        skills: item.skills.name,
        //    };
        //  return newSkills;
        // }
        // formData = formData.map(mapSkills);
        console.log(formData.skills.name);
        return { formData };
      });
    } else {
      getJobById(id).then(this.onGetFriendSuccess).catch(this.onGetFriendError);
    }
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

  onSubmit = (e) => {
    e.preventDefault();
    e.returnValue = false;
    var entries = this.state.formData;
    entries.skills = entries.skills.split(", ");
    if (
      !entries.title ||
      !entries.description ||
      !entries.summary ||
      !entries.pay ||
      !entries.slug ||
      !entries.statusId ||
      !entries.techCompanyId ||
      !entries.skills
    ) {
      toast.warning("Please Enter All Information", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    } else if (this.state.jobId) {
      editJob(this.state.jobId, entries)
        .then(this.onEditJobSuccess)
        .catch(this.onEditJobError);
    } else {
      addJob(entries).then(this.onAddJobSuccess).catch(this.onAddJobError);
    }
  };
  onAddJobSuccess = (response) => {
    console.log(response);
    toast.info("Job Entered Successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    var jobId = response.data.item;
    this.setState({ jobId: jobId });
  };
  onAddJobError = (errResponse) => {
    console.log(errResponse);
    toast.warning("Please Try Again", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  onEditJobSuccess = (response) => {
    console.log(response);
    toast.info("Job Edits Submitted Successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  onEditJobError = (errResponse) => {
    console.log(errResponse);
    toast.warning("Something Went Wrong - Please Try Again", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <div style={{ marginLeft: "8rem", padding: "8rem" }}>
            <div className="container">
              <h1>Jobs</h1>
              <h3>Create a Job:</h3>
            </div>
          </div>
        </div>

        <div style={{ marginLeft: "8rem", padding: "8rem" }}>
          <div className="container">
            <form>
              <div className="form-row">
                <label htmlFor="inputPay">Pay rate</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  className="form-control"
                  id="inputPay"
                  name="pay"
                  placeholder="pay"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.pay}
                />
              </div>

              <div className="form-row">
                <label htmlFor="title">Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="job title"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.title}
                />
              </div>

              <div className="form-row">
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  className="form-control"
                  id="slug"
                  name="slug"
                  placeholder="slug"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.slug}
                />
              </div>

              <div className="form-row">
                <label htmlFor="summary">Summary</label>
                <input
                  type="text"
                  className="form-control"
                  id="summary"
                  name="summary"
                  placeholder="job summary"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.summary}
                />
              </div>

              <div className="form-row">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="short job description"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.description}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusId">Status</label>
                <select
                  id="statusId"
                  name="statusId"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.statusId}
                >
                  <option value="">Please Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-row">
                <label htmlFor="techCompanyId">Company ID</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  className="form-control"
                  id="techCompanyId"
                  name="techCompanyId"
                  placeholder="Company Id"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.techCompanyId}
                />
              </div>

              <div className="form-row">
                <label htmlFor="skills">Skills</label>
                <input
                  type="text"
                  className="form-control"
                  id="skills"
                  name="skills"
                  placeholder="skills"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.skills}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3rem",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onSubmit}
                >
                  {this.state.jobId ? "Update" : "Submit"}
                </button>
                <Link to="/Home">
                  <button className="btn btn-secondary">Home</button>
                </Link>
              </div>
            </form>

            <div style={{ marginTop: "3rem" }}>
              <Link to="/jobs/view">
                <button className="btn btn-secondary">View Jobs</button>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Jobs;
