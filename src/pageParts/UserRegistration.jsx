import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const userSchema = Yup.object().shape({
  fName: Yup.string().min(2).required("Is Required"),
  lName: Yup.string().min(2).required("Is Required"),
  email: Yup.string().min(2).required("Is Required"),
  password: Yup.string().min(2).required("Is Required"),
  avatar: Yup.string().min(2).required("Is Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required"),
});

class UserRegistration extends React.Component {
  state = {
    formData: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      passwordConfirm: "",

      avatar: "",
      tenantId: "U01LG539DPD",
    },
  };

  handleSubmit = (values) => {
    console.log(values);
    delete values.passwordConfirm;
    console.log(values);
    this.props.onSubmit(values);
  };

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={this.state.formData}
        onSubmit={this.handleSubmit}
        validationSchema={userSchema}
      >
        <div className=" bg-text container col-md-6">
          <Form>
            <h3>Registration Form</h3>
            <div className="form-group">
              <div className="form-wrapper">
                <label htmlFor="title">First Name</label>
                <Field type="text" name="fName" />
                <ErrorMessage name="fName" component="div" />
              </div>
              <div className="form-wrapper">
                <label htmlFor="lName">Last Name</label>
                <Field type="text" name="lName" />
                <ErrorMessage name="lName" component="div" />
              </div>
              <div className="form-wrapper">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="form-wrapper">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div className="form-wrapper">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <Field type="password" name="passwordConfirm" />
                <ErrorMessage name="passwordConfirm" component="div" />
              </div>
              <div className="form-wrapper">
                <label htmlFor="avatar">Profile Pic</label>
                <Field type="text" name="avatar" />
                <ErrorMessage name="avatar" component="div" />
              </div>
              <button type="submit" className="btn btn-secondary">
                Register Now
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    );
  }
}

export default UserRegistration;
