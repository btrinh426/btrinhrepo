import React from "react";
import * as jobService from "../services/jobService";

class JobForm extends React.Component {
  state = {
    jobFormData: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: 1,
      // hard coded tech company id for now
      techCompanyId: 18915,
      skills: [],
    },
    jobId: null,
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      const { jobFormData } = this.props.location.state;
      // another if statement to check if there's an id
      // but no state
      // do a get call with that id
      //
      let skillsTextAreaForm = "";

      jobFormData.skills.forEach((skill) => {
        skillsTextAreaForm += skill.name + ", ";
      });
      if (jobFormData) {
        this.setState({
          jobFormData: {
            ...jobFormData,
            statusId: 1,
            skills: skillsTextAreaForm,
          },
          jobId: jobFormData.id,
        });
      } else {
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // axios call with this.state

    // if (inputName === "skills") {
    //     // take in the value into a variable
    //     // split the value by comma
    //     var skillsValueArray = newValue.split(",");
    //     skillsValueArray.forEach((skill) => {
    //       skill.trim();
    //       // take the array and assign it to jobformdata state

    //     });
    //   }

    let copyJobFormData = { ...this.state.jobFormData };

    copyJobFormData.skills = copyJobFormData.skills.split(",");

    copyJobFormData.skills.forEach((skill) => {
      skill.trim();
    });

    copyJobFormData.techCompanyId = copyJobFormData.techCompany.id;

    // this.setState((prevState) => {
    //   return {
    //     ...prevState,
    //     jobFormData: {
    //       skills: prevState.jobFormData.skills.split(","),
    //     },
    //   };
    // });

    if (this.state.jobId) {
      jobService
        .edit(this.state.jobId, copyJobFormData)
        .then(this.onEditSuccess)
        .catch(this.onEditError);
    } else {
      jobService
        .add(copyJobFormData)
        .then(this.onAddSuccess)
        .catch(this.onAddError);
    }
  };

  onAddSuccess = (response) => {
    console.log({ job: response });
    this.setState({
      jobFormData: {
        title: "",
        description: "",
        summary: "",
        pay: "",
        slug: "",
        skills: [],
      },
      jobId: null,
    });
  };

  onAddError = (errResponse) => {
    console.warn({ error: errResponse.config });
  };

  onEditSuccess = (response) => {
    console.log({ job: response });
    this.setState({
      jobFormData: {
        title: "",
        description: "",
        summary: "",
        pay: "",
        slug: "",
        skills: [""],
      },
    });
  };

  onEditError = (errResponse) => {
    console.warn({ error: errResponse.config });
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let jobFormData = { ...this.state.jobFormData };

      jobFormData[inputName] = newValue;

      return { jobFormData };
    });
  };

  //   title: "",
  //   description: "",
  //   summary: "",
  //   pay: "",
  //   slug: "",
  //   statusId: 1,
  //   // hard coded tech company id for now
  //   techCompanyId: 18915,
  //   skills: [],

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="titleField"
              placeholder="Enter title"
              name="title"
              onChange={this.onFormFieldChanged}
              value={this.state.jobFormData.title}
            />
            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="descriptionField"
              placeholder="Enter bio"
              name="description"
              onChange={this.onFormFieldChanged}
              value={this.state.jobFormData.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              className="form-control"
              id="summaryField"
              placeholder="Enter summary"
              name="summary"
              onChange={this.onFormFieldChanged}
              value={this.state.jobFormData.summary}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pay">Pay</label>
            <input
              type="text"
              className="form-control"
              id="payField"
              placeholder="Enter pay"
              name="pay"
              onChange={this.onFormFieldChanged}
              value={this.state.jobFormData.pay}
            />
          </div>
          <div className="form-group">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              className="form-control"
              id="slugField"
              placeholder="Enter slug"
              name="slug"
              onChange={this.onFormFieldChanged}
              value={this.state.jobFormData.slug}
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills</label>
            <input
              type="textarea"
              className="form-control"
              id="skillsField"
              placeholder="Enter skills separated by a comma"
              name="skills"
              onChange={this.onFormFieldChanged}
              value={this.state.jobFormData.skills}
            />
          </div>
          {/* <button type="submit" className="btn btn-primary" id="submitFriend">Submit</button>
            <button type="submit" disabled className="btn btn-primary" id="editFriend">Edit</button> */}
          <input
            type="submit"
            className="btn btn-primary"
            value="Submit"
            id="submitJob"
          />
          {/* <input
            type="submit"
            className="btn btn-primary"
            value="Edit"
            id="editFriend"
            /> */}
        </form>
      </React.Fragment>
    );
  }
}

export default JobForm;
