import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as jobService from "./services/jobService";

class JobForm extends React.Component {
  state = {
    formData: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "",
      techCompanyId: 0,
      skills: [],
    },
    formTitle: "Create Job Listing",
  };

  componentDidMount() {
    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "JOB_DATA") {
        let formData = locState.payload;
        formData.techCompanyId = formData.techCompany.id;
        this.setState(() => {
          return { formData, formTitle: "Edit Job" };
        });
      }
    }
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let formData = { ...prevState.formData };
      formData[inputName] = newValue;
      return { prevState, formData };
    });
  };

  submitForm = () => {
    if (this.state.formTitle === "Edit Job") {
      this.setState(
        (prevState) => {
          let formData = { ...prevState.formData };
          formData.skills = formData.skills.split(", ");
          console.log(formData.skills);
          return { ...prevState, formData };
        },
        () => {
          jobService
            .update(this.state.formData.id, this.state.formData)
            .then(this.onUpdateSuccess)
            .catch(this.onUpdateError);
        }
      );
    } else {
      this.setState(
        (prevState) => {
          let formData = { ...prevState.formData };
          formData.skills = formData.skills.split(", ");
          console.log(formData.skills);
          return { ...prevState, formData };
        },
        () => {
          jobService
            .add(this.state.formData)
            .then(this.onAddSuccess)
            .catch(this.onAddError);
        }
      );
    }
  };

  onAddSuccess = (response) => {
    console.log(response);
    toast.success("Job listing was posted!");
    this.setState((prevState) => {
      return {
        ...prevState,
        formTitle: "Edit Job",
        formData: { ...prevState.formData, id: response.data.item },
      };
    });
  };
  onAddError = (err) => {
    console.warn(err);
    toast.error("Please make sure you entered your data correctly.");
  };
  onUpdateSuccess = (response) => {
    console.log(response);
  };
  onUpdateError = (err) => {
    console.warn(err);
  };

  render() {
    return (
      <div className="container pt-5 pb-5">
        <ToastContainer></ToastContainer>
        <form className="card">
          <div className="card-header text-center">{this.state.formTitle}</div>
          <div className="form-group row m-3">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.title}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.description}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="summary" className="col-sm-2 col-form-label">
              Summary
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="summary"
                name="summary"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.summary}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="pay" className="col-sm-2 col-form-label">
              Pay
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="pay"
                name="pay"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.pay}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="slug" className="col-sm-2 col-form-label">
              Slug
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="slug"
                name="slug"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.slug}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="statusId" className="col-sm-2 col-form-label">
              Status
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="statusId"
                name="statusId"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.statusId}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="techCompanyId" className="col-sm-2 col-form-label">
              Tech Company Id
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="techCompanyId"
                name="techCompanyId"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.techCompanyId}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="skills" className="col-sm-2 col-form-label">
              Skills
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="skills"
                name="skills"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.skills}
              />
            </div>
          </div>
          <div className="form-group row mx-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.submitForm}
              id={this.state.formData.id}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default JobForm;
