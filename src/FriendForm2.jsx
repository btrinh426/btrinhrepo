import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import * as friendService from "./services/friendService";

class FriendFormNew extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
    formTitle: "New Friend",
  };

  componentDidMount() {
    if (this.props.location.state) {
      let locState = this.props.location.state;
      locState.payload.primaryImage = locState.payload.primaryImage.imageUrl;
      if (locState.type === "PERSON_DATA") {
        let formData = locState.payload;
        this.setState(() => {
          return { formData, formTitle: "Edit Friend" };
        });
      }
    }
  }

  FriendSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too long!")
      .required("Required"),
    bio: Yup.string()
      .min(2, "Too short!")
      .max(500, "Too long!")
      .required("Required"),
    summary: Yup.string()
      .min(2, "Too short!")
      .max(250, "Too long!")
      .required("Required"),
    headline: Yup.string()
      .min(2, "Too short!")
      .max(100, "Too long!")
      .required("Required"),
    slug: Yup.string().url("Invalid url").required("Required"),
    statusId: Yup.string().required("Required"),
    primaryImage: Yup.string().url("Invalid url").required("Required"),
  });

  submitForm = (values) => {
    if (this.state.formTitle === "Edit Friend") {
      friendService
        .update(this.state.formData.id, values)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendError);
    } else {
      friendService
        .add(values)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };
  onAddFriendSuccess = (response) => {
    console.log(response);
    toast.success(
      "Nice! You're not completely alone in this cold, dark world."
    );
  };
  onAddFriendError = (error) => {
    console.log(error);
    toast.error("Please make sure you entered your data correctly.");
  };

  onUpdateFriendSuccess = (response) => {
    console.log(response);
    toast.success("Your friend was updated.", "Nice!");
  };
  onUpdateFriendError = (error) => {
    console.error(error);
    toast.error("Oops, please make sure you entered your data correctly.");
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container pt-5 pb-5">
          <div className="card">
            <div className="card-header text-center">
              {this.state.formTitle}
            </div>
            <Formik
              initialValues={{
                title: this.state.formData.title,
                bio: this.state.formData.bio,
                summary: this.state.formData.summary,
                headline: this.state.formData.headline,
                slug: this.state.formData.slug,
                statusId: this.state.formData.statusId,
                primaryImage: this.state.formData.primaryImage,
              }}
              enableReinitialize={true}
              validationSchema={this.FriendSchema}
              onSubmit={this.submitForm}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form>
                  <div className="form-group row m-3">
                    <label className="col-sm-2 col-form-label">Full Name</label>
                    <div className="col-sm-10">
                      <Field
                        type="text"
                        className="form-control"
                        name="title"
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.title && touched.title && errors.title}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label className="col-sm-2 col-form-label">Bio</label>
                    <div className="col-sm-10">
                      <Field type="text" className="form-control" name="bio" />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>{errors.bio && touched.bio && errors.bio}</small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label className="col-sm-2 col-form-label">Summary</label>
                    <div className="col-sm-10">
                      <Field
                        type="text"
                        className="form-control"
                        name="summary"
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.summary && touched.summary && errors.summary}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label className="col-sm-2 col-form-label">Headline</label>
                    <div className="col-sm-10">
                      <Field
                        type="text"
                        className="form-control"
                        name="headline"
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.headline &&
                            touched.headline &&
                            errors.headline}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label className="col-sm-2 col-form-label">Slug</label>
                    <div className="col-sm-10">
                      <Field type="text" className="form-control" name="slug" />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.slug && touched.slug && errors.slug}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label className="col-sm-2 col-form-label">Status</label>
                    <div className="col-sm-10">
                      <Field
                        type="text"
                        className="form-control"
                        name="statusId"
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.statusId &&
                            touched.statusId &&
                            errors.statusId}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label className="col-sm-2 col-form-label">Avatar</label>
                    <div className="col-sm-10">
                      <Field
                        type="text"
                        className="form-control"
                        name="primaryImage"
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.primaryImage &&
                            touched.primaryImage &&
                            errors.primaryImage}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row mx-auto">
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FriendFormNew;
