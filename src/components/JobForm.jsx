import React, { Component } from "react";
import { postJob, updateJob } from "../services/jobs";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";

class JobForm extends Component {
  state = {
    formData: {
      title: "",
      location: "",
      summary: "",
      pay: "",
      statusId: "",
      techCompanyId: "",
      skills: "",
      description: "",
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

  // handleClick = (e) => {
  //   const payload = { ...this.state.formData };
  //   payload.skills = payload.skills.split(",");

  //   if (this.props.location.state || this.state.jobData.id) {
  //     let editJob = { ...this.state.formData };
  //     delete editJob.techCompany;
  //     editJob.skills = editJob.skills.split(",");
  //     editJob.techCompanyId = 23848;
  //     //ask instructors about if this is ok..i get undefined if i call this.state.techCompanyId
  //     editJob.id = this.state.jobData.id;
  //     console.log(this.state.techCompanyId);

  //     updateJob(editJob)
  //       .then(this.onUpdateJobSuccess)
  //       .catch(this.onUpdateJobError);
  //   } else {
  //     postJob(payload).then(this.onPostJobSuccess).catch(this.onPostJobError);
  //   }
  //   console.log(payload.id);
  // };

  handleClick = (values) => {
    const payload = { ...values };
    if (this.props.location.state) {
      updateJob(payload)
        .then(this.onUpdateJobSuccess)
        .catch(this.onUpdateJobError);
    } else {
      postJob(payload).then(this.onPostJobSuccess).catch(this.onPostJobError);
    }

    console.log(payload);
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
        <span className="navbar-brand mb-0 h1" id="nav2">
          Add Or Edit Job
        </span>
        <div className="container-fluid" />
        <Formik
          enableReinitialize={true}
          initialValues={this.state.formData}
          onSubmit={this.handleClick}
        >
          {({ values }) => (
            <Form>
              <div className="row mb-3" />
              <label htmlFor="role" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="title" className="form-control" />
              <ErrorMessage name="title" component="div" />

              <div className="row mb-3" />
              <label htmlFor="location" className="col-sm-2 col-form-label">
                Location
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="location" className="form-control" />
              <ErrorMessage name="location" component="div" />

              <div className="row mb-3" />
              <label htmlFor="summary" className="col-sm-2 col-form-label">
                Summary
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="summary" className="form-control" />
              <ErrorMessage name="summary" component="div" />
              <div className="row mb-3" />
              <label htmlFor="pay" className="col-sm-2 col-form-label">
                Pay
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="pay" className="form-control" />
              <ErrorMessage name="pay" component="div" />
              <div className="row mb-3" />
              <label htmlFor="StatusId" className="col-sm-2 col-form-label">
                StatusId
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="statusId" className="form-control" />
              <ErrorMessage name="statusId" component="div" />
              <div className="row mb-3" />
              <label
                htmlFor="techCompanyId"
                className="col-sm-2 col-form-label"
              >
                TechCompanyId
              </label>
              <div className="col-sm-10" />
              <Field
                type="text"
                name="techCompanyId"
                className="form-control"
              />
              <ErrorMessage name="techCompanyId" component="div" />
              <div className="row mb-3" />
              <label htmlFor="skills" className="col-sm-2 col-form-label">
                Skills
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="skills" className="form-control" />
              <ErrorMessage name="skills" component="div" />
              <div className="row mb-3" />
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <Field type="text" name="description" className="form-control" />
              <ErrorMessage name="description" component="div" />
              <button
                type="submit"
                className="btn btn-primary submit"
                onClick={this.handleClick}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}

export default JobForm;
