import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, Redirect } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import * as userService from "./services/userService";

class LoginNew extends React.Component {
  state = {
    redirect: false,
  };

  // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/

  LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}$)/,
        "Passwords must be 8 characters long and contain an uppercase, lowercase, number, and symbol."
      ),
  });

  onSubmit = (values) => {
    userService
      .logIn(values)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };

  loginUser = (data) => {
    userService.logIn(data).then(this.onLoginSuccess).catch(this.onLoginError);
  };

  onLoginSuccess = (response) => {
    console.log(response);
    toast.success("You're logged in.");
    this.setState({ redirect: true });
  };
  onLoginError = (response) => {
    console.warn({ error: response });
    toast.error("Please enter your email and password correctly.");
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/homepage" />;
    }
    return (
      <React.Fragment>
        <div className="container pt-5 pb-5">
          <ToastContainer />
          <div className="card">
            <div className="card-header text-center bg-dark text-white text-large">
              <h3>WELCOME</h3>
            </div>
            <div className="row text-muted card-body text-center mt-3">
              <h5 className="col-12 text-center">Sign in to continue.</h5>
            </div>
            <div className="row">
              <div className="col-12 mx-auto text-center container">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    tenantId: "U01HLGH2RKJ",
                  }}
                  enableReinitialize={true}
                  validationSchema={this.LoginSchema}
                  onSubmit={this.onSubmit}
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
                    <form
                      onSubmit={handleSubmit}
                      className="row text-center mx-auto"
                    >
                      <label className="col-2 col-form-label">Email</label>
                      <div className="form-group col-10">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
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
                      <label className="col-2 col-form-label">Password</label>
                      <div className="form-group col-10">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
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
                      <div className="form-group row mx-auto">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="form-group row text-muted mx-auto p-3">
              <h5 className="col-12 text-center">Need to Signup?</h5>
            </div>
            <div className="form-group row mx-auto pb-3">
              <button className="btn btn-light">
                <NavLink to="/register">Register Now</NavLink>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginNew;
