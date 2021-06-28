import React from "react";
import { Field, Form, Formik } from "formik";
import * as userService from "../../services/userServices";
import * as Yup from "yup";

class LoginFormV2 extends React.Component {
  render() {
    const MyInput = ({ field, form, ...props }) => {
      return <input {...field} {...props} />;
    };

    const onLoginSuccess = (response) => {
      this.props.history.push("/home");
    };
    const onLoginError = (err) => {
      console.error(err);
    };
    const LoginSchema = Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
    });

    return (
      <div className="col-8 ml-5 mt-5">
        <h1>Please Log In...</h1>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{
            email: "",
            password: "",
            tenantId: userService.tenantId,
          }}
          onSubmit={(values) => {
            userService.logIn(values).then(onLoginSuccess).catch(onLoginError);
          }}
        >
          {() => (
            <Form>
              <Field
                className="form-control col-4 mb-4 "
                type="email"
                name="email"
                placeholder="Email"
              />

              <Field
                className="form-control col-4 mb-4"
                name="password"
                type="password"
                placeholder="Password"
                component={MyInput}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default LoginFormV2;
