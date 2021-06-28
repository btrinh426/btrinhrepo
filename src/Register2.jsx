import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import * as userService from "./services/userService";

class RegisterNew extends React.Component {
  submitForm = (data) => {
    userService
      .register(data)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = (response) => {
    console.log(response);
    toast.success("Success!");
    //userService.email().then(this.onEmailSuccess).catch(this.onEmailError);
  };
  onRegisterError = (response) => {
    console.log(response);
    toast.error("Please enter your data correctly.");
  };
  //onEmailSuccess = (response) => console.log(response);
  //onEmailError = (err) => console.log(err);

  RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too short!")
      .max(25, "Too long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too short!")
      .max(25, "Too long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}$)/,
        "Passwords must be 8 characters long and contain an uppercase, lowercase, number, and symbol."
      ),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    avatarUrl: Yup.string().url("Invalid url").required("Required"),
  });

  render() {
    return (
      <React.Fragment>
        <div className="container pt-5 pb-5">
          <ToastContainer />
          <div className="card">
            <div className="card-header text-center">Register</div>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordConfirm: "",
                avatarUrl: "",
                tenantId: "U01HLGH2RKJ",
              }}
              validationSchema={this.RegisterSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
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
                <form onSubmit={handleSubmit}>
                  <div className="form-group row m-3">
                    <label
                      htmlFor="firstName"
                      className="col-sm-2 col-form-label"
                    >
                      First Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.firstName &&
                            touched.firstName &&
                            errors.firstName}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label
                      htmlFor="lastName"
                      className="col-sm-2 col-form-label"
                    >
                      Last Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.lastName &&
                            touched.lastName &&
                            errors.lastName}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.email && touched.email && errors.email}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label
                      htmlFor="confirmPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Confirm Password
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        className="form-control"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passwordConfirm}
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.passwordConfirm &&
                            touched.passwordConfirm &&
                            errors.passwordConfirm}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row m-3">
                    <label
                      htmlFor="avatarUrl"
                      className="col-sm-2 col-form-label"
                    >
                      Avatar Url
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="avatarUrl"
                        name="avatarUrl"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.avatarUrl}
                      />
                      <p
                        className="text-left text-small"
                        style={{ color: "red" }}
                      >
                        <small>
                          {errors.avatarUrl &&
                            touched.avatarUrl &&
                            errors.avatarUrl}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row mx-auto">
                    <div className="col-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => this.submitForm(values)}
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterNew;
