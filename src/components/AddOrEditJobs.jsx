import React, { Component } from "react";
import { postJobs, updateJobs } from "../services/jobsService";
import { toast } from "react-toastify";
import { currentUser } from "../services/userService";
import { getTechCompanies } from "../services/techCompaniesService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const formValidationSchema = Yup.object().shape({
  title: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  description: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  summary: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  pay: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  slug: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  statusId: Yup.string().required("Required"),
  techCompanyId: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  skills: Yup.string().min(2, "min 2 char").max(50).required("Required"),
});

class AddOrEditJobs extends Component {
  state = {
    job: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "",
      techCompanyId: 0,
      skills: [""],
    },
    techCompanies: [],

    message: null,
  };

  componentDidMount() {
    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "job_Obj") {
        let newJob = locState.payload.oneJob;
        newJob.skills = newJob.skills.map((skill) => {
          return skill.name;
        });
        newJob.skills = newJob.skills.join(", ");
        this.setState({ job: newJob });
      }
    }
    getTechCompanies()
      .then((response) => {
        console.log(response);
        const techCompanies = response.data.item.pagedItems;
        this.setState({
          techCompanies,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.name;

    this.setState(() => {
      let job = { ...this.state.job };
      job[inputData] = newValue;
      return { job };
    });
  };

  handleClickAdd = (values) => {
    console.log(values);
    console.log("postjobs", this.props.location.state);
    let payload = {
      ...this.state.job,
      skills: this.state.job.skills.split(" "),
    };
    delete payload.techCompany;
    console.log("payload", payload);

    if (this.props.location.state) {
      console.log("update");

      updateJobs(payload)
        .then(this.onUpdateJobsSuccess)
        .catch(this.onUpdateJobsError);
    } else {
      console.log("post");
      postJobs(payload)
        .then(this.onPostJobsSuccess)
        .catch(this.onPostJobsError);
    }
    //resetForm(this.state.job);
  };

  onPostJobsSuccess = (res) => {
    console.log({ jobs: res });
    toast.success(`You have successfully created a job!`);
    this.props.history.push("/jobs");
  };

  onPostJobsError = (res) => {
    console.log("errorPost");

    toast.error(`ErrorPost`);
  };

  onUpdateJobsSuccess = (res) => {
    console.log({ jobs: res });
    toast.success(`You have successfully updated a job!`);
    this.props.history.push("/jobs");
  };

  onUpdateJobsError = (res) => {
    console.log("errorUpdate");

    toast.error(`ErrorUpdate`);
  };

  getAllTechCompanies = () => {
    getTechCompanies()
      .then(this.getTechCompaniesSuccess)
      .catch(this.getTechCompaniesError);
  };

  // getTechCompaniesSuccess = (response) => {
  //   let titles = [];
  //   if (this.state.mappedTitles.length === 0) {
  //     let emptyCompany = { id: "0", name: "" };
  //     titles = [emptyCompany];
  //     titles = titles.concat(response.data.pagedItems);
  //   } else {
  //     titles = response.data.item.pagedItems;
  //   }
  //   let newMappedTitles = titles.map(this.mapToSelect);

  //   let allMappedTitles = this.state.mappedTitles.concat(newMappedTitles);

  //   this.setState((prevState) => {
  //     return {
  //       mappedTitles: allMappedTitles,
  //       pageIndex: prevState.pageIndex + 1,
  //     };
  //   });
  // };
  // getCompanyStatusId = () => {
  //   return this.state.techCompanyStatusId;
  // };

  render() {
    console.log(this.state);
    return (
      <div>
        <Formik
          enableReinitialize={true}
          validationSchema={formValidationSchema}
          initialValues={this.state.job}
          onSubmit={this.handleClickAdd}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              isValid,
              isSubmitting,
            } = props;
            return (
              <Form>
                <div className="container">
                  <div className="form-group">
                    <label htmlFor="title" className="col-sm-2 col-form-label">
                      Title
                    </label>
                    <div className="col-sm-10">
                      <Field
                        type="text"
                        onChange={this.onInputChange}
                        name="title"
                        value={values.title}
                        className="form-control"
                        id="title"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="has-error"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="description"
                        className="col-sm-2 col-form-label"
                      >
                        Description
                      </label>
                      <Field
                        type="text"
                        onChange={this.onInputChange}
                        name="description"
                        value={values.description}
                        className="form-control"
                        id="description"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="has-error"
                      />
                    </div>
                    <div className="form-group" />
                    <label
                      htmlFor="summary"
                      className="col-sm-2 col-form-label"
                    >
                      Summary
                    </label>
                    <div className="col-sm-10">
                      <Field
                        type="text"
                        onChange={this.onInputChange}
                        name="summary"
                        value={values.summary}
                        className="form-control"
                        id="summary"
                      />
                      <ErrorMessage
                        name="summary"
                        component="div"
                        className="has-error"
                      />
                    </div>

                    <div className="form-group" />
                    <label htmlFor="pay" className="col-sm-2 col-form-label">
                      Pay
                    </label>
                    <div className="col-sm-10">
                      <Field
                        type="text"
                        onChange={this.onInputChange}
                        name="pay"
                        value={values.pay}
                        className="form-control"
                        id="pay"
                      />
                      <ErrorMessage
                        name="pay"
                        component="div"
                        className="has-error"
                      />
                    </div>
                    <div className="form-group" />
                    <label htmlFor="slug" className="col-sm-2 col-form-label">
                      Slug
                    </label>
                    <div className="col-sm-10">
                      <Field
                        type="text"
                        onChange={this.onInputChange}
                        name="slug"
                        value={values.slug}
                        className="form-control"
                        id="slug"
                      />
                      <ErrorMessage
                        name="slug"
                        component="div"
                        className="has-error"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="statusId"
                        className="col-sm-2 col-form-label"
                      >
                        Status Id
                      </label>
                      <div className="col-sm-10">
                        <Field
                          type="text"
                          onChange={this.onInputChange}
                          name="statusId"
                          value={values.statusId}
                          className="form-control"
                          id="statusId"
                        />
                        <ErrorMessage
                          name="statusId"
                          component="div"
                          className="has-error"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="techCompanyId"
                        className="col-sm-2 col-form-label"
                      >
                        TechCompanyId
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-control"
                          onChange={this.onInputChange}
                          name="techCompanyId"
                        >
                          <option value={null}>Please Select</option>
                          {this.state.techCompanies.map((oneCompany, index) => {
                            return (
                              <option value={oneCompany.id} key={index}>
                                {oneCompany.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="skills"
                        className="col-sm-2 col-form-label"
                      >
                        Skills
                      </label>
                      <div className="col-sm-10">
                        <Field
                          type="text"
                          onChange={this.onInputChange}
                          name="skills"
                          value={this.state.job.skills}
                          className="form-control"
                          id="skills"
                        />
                        <ErrorMessage
                          name="skills"
                          component="div"
                          className="has-error"
                        />
                      </div>
                    </div>
                  </div>
                  <button>Submit</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}
export default AddOrEditJobs;
//similar to mapping friends i need to create a function to map for the dropdown. on compon. did mount, make a call t o the databast to get tech co. on success of that it fills dropdown
//get select dropdown into it's own function- step 1.
