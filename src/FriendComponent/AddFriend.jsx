import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import peopleService from "/SF.Code/C#98Cohort/Starter.react-componentize/src/services/peopleService";
import { toast } from "react-toastify";

const basicSchema = Yup.object().shape({
  title: Yup.string().min(2).max(128).required("Required"),
  bio: Yup.string().min(2).max(128).required("Required"),
  summary: Yup.string().min(2).max(128).required("Required"),
  headline: Yup.string().min(2).max(128).required("Required"),
  slug: Yup.string().min(2).max(128).required("Required"),
  statusId: Yup.number().required("Required"),
  primaryImage: Yup.string().min(2).max(128).required("Required"),
  skills: Yup.string().max(128).required("Required"),
});

class AddFriend extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
      skills: "",
    },
  };

  handleSumbit = (data) => {
    data.skills = data.skills.split(",");
    data.statusId = parseInt(data.statusId);
    console.log(data);
    peopleService
      .addFriend(data)
      .then(this.addingFriendSuccess)
      .catch(this.addingFriendError);
  };

  addingFriendSuccess = (response) => {
    this.props.history.push("/listpeople");

    toast.success("Add Friend Successful, directing to List Page");
  };
  addingFriendError = (errResponse) => {
    console.log(errResponse);
    toast.error(
      "Register fail, Please Check your input requirement or user already exists"
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Formik
              enableReinitialize={true}
              initialValues={this.state.formData}
              onSubmit={this.handleSumbit}
              validationSchema={basicSchema}
            >
              <Form>
                <div className="form-group row">
                  <label htmlFor="title" className="col-sm-3 col-form-label">
                    Title
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="title" />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="bio" className="col-sm-3 col-form-label">
                    Bio
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="bio" />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="summary" className="col-sm-3 col-form-label">
                    Summary
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="summary" />
                    <ErrorMessage
                      name="summary"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="headline" className="col-sm-3 col-form-label">
                    Headline
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="headline" />
                    <ErrorMessage
                      name="headline"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="slug" className="col-sm-3 col-form-label">
                    Slug
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="slug" />
                    <ErrorMessage
                      name="slug"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="statusId" className="col-sm-3 col-form-label">
                    StatusId
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="statusId" />
                    <ErrorMessage
                      name="statusId"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="primaryImage"
                    className="col-sm-3 col-form-label"
                  >
                    Primary Image
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="primaryImage" />
                    <ErrorMessage
                      name="primaryImage"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="skills" className="col-sm-3 col-form-label">
                    Skills
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="skills" />
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={this.onClickHandler}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFriend;
