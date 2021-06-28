import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as userService from "../services/userService";
import { NavLink } from "react-router-dom";

const loginSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(50).required("Required"),
  lastName: Yup.string().min(2).max(50).required("Required"),
  email: Yup.string().email("invalid input").required("Required"),
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        password: "",
        tenantId: "123456",
      },
    };
  }
  onActionSuccess = (response) => {
    console.log("success!" + response);
  };
  onActionError = (response) => {
    console.log("failed!" + response);
  };
  componentDidMount() {
    userService.logIn(this.handleSubmit);
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <div className="row">
          <div className="col-4">
            <Formik
              enableReinitialize={true}
              initialValues={this.state.formData}
              onSubmit={this.handleSubmit}
              validationSchema={loginSchema}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="text" name="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="has-error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="has-error"
                  />
                </div>
                <NavLink to="/">
                  <button
                    type="submit"
                    name="submit"
                    onClick={userService.logIn(this.handleSubmit)}
                    className="btn btn-warning"
                  >
                    Login
                  </button>
                </NavLink>
                <NavLink to="/Register">
                  <button
                    type="register"
                    name="register"
                    className="btn btn-primary"
                  >
                    Register
                  </button>
                </NavLink>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
