import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageService from "../../services/ImageService.jsx";
import { Formik, Field, ErrorMessage, yupToFormErrors } from "formik";
import { Form, FormGroup, Label, Button } from "reactstrap";
import * as Yup from "yup";
import * as usersService from "../../services/usersService";

class UsersLogin extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
    },
  };

  // handleSubmit = (values, { resetForm }) => {
  //   console.log(values);

  //   resetForm(this.state.formData);
  // };

  onLoginClicked = (values, { resetForm }) => {
    console.log("onLoginClicked is firing", values);

    //AJAX call
    usersService
      .login(values)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);

    resetForm(this.state.formData);
  };

  onLoginError = (err) => {
    console.log("onLoginError", err);
    // let errors = response.response.data.errors;
    // let errorString = "";
    // for (let i = 0; i < errors.length; i++) {
    //   errorString += errors[i];
    // }
    // if (errorString.toLowerCase().includes("invalid email")) {
    //   errorString = "User not found";
    // } else if (errorString.toLowerCase().includes("invalid credentials")) {
    //   errorString = "Password Incorrect";
    // }

    // console.log("errors", errors);
    // let notify = () =>
    //   toast.error(`Unable to perform login: ${errorString}`, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });

    // notify();
  };
  onLoginSuccess = (response) => {
    let notify = () =>
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    notify();

    console.log("onLoginSuccess", response);

    this.props.history.push("./");

    // get currentUser was here
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            email: Yup.string().email("Invalid email").required("Required"),
            // password: Yup.string(),
            password: Yup.string().matches(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/,
              "Password does not meet complexity requirements"
            ),
          })}
          initialValues={this.state.formData}
          onSubmit={this.onLoginClicked}
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
              <Form onSubmit={handleSubmit} className={"col-md-6 pt-4"}>
                <FormGroup>
                  <Label>Email</Label>
                  <Field
                    name="email"
                    type="text" // could be changed to email???
                    values={values.email}
                    placeholder="Email@email.com"
                    autoComplete="off"
                    className={
                      errors.email && touched.email
                        ? "form-control error"
                        : "form-control"
                    }
                  />

                  {errors.email && touched.email && (
                    <span className="input-feedback">
                      <b>{errors.email}</b>
                    </span>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Field
                    name="password"
                    type="text" //could do password???
                    values={values.password}
                    placeholder="Password" //remove later
                    autoComplete="off"
                    className={
                      errors.password && touched.password
                        ? "form-control error"
                        : "form-control"
                    }
                  />
                  {errors.password && touched.password && (
                    <span className="input-feedback">{errors.password}</span>
                  )}
                </FormGroup>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

export default UsersLogin;
