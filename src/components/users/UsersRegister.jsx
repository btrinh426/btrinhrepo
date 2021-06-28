import React from "react";
import * as usersService from "../../services/usersService.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, ErrorMessage, yupToFormErrors } from "formik";
import { Form, FormGroup, Label, Button } from "reactstrap";
import * as Yup from "yup";

class UsersRegister extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
    },
  };

  // onFormFieldChanged = (e) => {
  //   let currentTarget = e.currentTarget;
  //   let newValue = currentTarget.value;
  //   let inputName = currentTarget.name;

  //   this.setState(() => {
  //     let newState = { ...this.state.newUser };

  //     newState[inputName] = newValue;

  //     return { newUser: newState };
  //   });
  // };

  onRegisterClicked = (values, { resetForm }) => {
    console.log("onRegistrationClicked is firing", values);

    usersService
      .register(values)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);

    resetForm(this.state.formData);
  };

  onRegisterError = (response) => {
    console.log("onRegisterError is firing", response);

    let notify = () =>
      toast.error("Unable to perform registration", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    notify();
  };

  onRegisterSuccess = (response) => {
    console.log("Success is firing", response);

    let notify = () =>
      toast.success("You have completed registration", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    notify();

    this.props.history.push("./");

    //Could add code to home that displayes the ID and First Name of User just registered
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().matches(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/,
              "Password does not meet complexity requirements"
            ),
            passwordConfirm: Yup.string().matches(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/,
              "Password does not meet complexity requirements"
            ),
            avatarUrl: Yup.string().url(),
          })}
          initialValues={this.state.formData}
          onSubmit={this.onRegisterClicked}
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
              <div className="container">
                <div className="row">
                  <div className="col-6 p-1">
                    <h1 className="p-2">Register User</h1>
                    <Form onSubmit={handleSubmit} className={"p-2"}>
                      <FormGroup>
                        <Label>First Name</Label>
                        <Field
                          name="firstName"
                          type="text" // could be changed to email???
                          values={values.firstName}
                          placeholder="First Name"
                          autoComplete="off"
                          className={
                            errors.firstName && touched.firstName
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.firstName && touched.firstName && (
                          <span className="input-feedback">
                            <b>{errors.firstName}</b>
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Last Name</Label>
                        <Field
                          name="lastName"
                          type="text" // could be changed to email???
                          values={values.lastName}
                          placeholder="Last Name"
                          autoComplete="off"
                          className={
                            errors.lastName && touched.lastName
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.lastName && touched.lastName && (
                          <span className="input-feedback">
                            <b>{errors.lastName}</b>
                          </span>
                        )}
                      </FormGroup>
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
                          <span className="input-feedback">
                            {errors.password}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Password Confirm</Label>
                        <Field
                          name="passwordConfirm"
                          type="text" //could do password???
                          values={values.passwordConfirm}
                          placeholder="Password Confirm" //remove later
                          autoComplete="off"
                          className={
                            errors.passwordConfirm && touched.passwordConfirm
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.passwordConfirm && touched.passwordConfirm && (
                          <span className="input-feedback">
                            {errors.passwordConfirm}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Avatar Url</Label>
                        <Field
                          name="avatarUrl"
                          type="text" // could be changed to email???
                          values={values.avatarUrl}
                          placeholder="Avatar Url"
                          autoComplete="off"
                          className={
                            errors.avatarUrl && touched.avatarUrl
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.avatarUrl && touched.avatarUrl && (
                          <span className="input-feedback">
                            {/* <b>{errors.avatarUrl}</b> */}
                            <b>Must be a valid URL</b>
                          </span>
                        )}
                      </FormGroup>
                      <Button type="submit" disabled={!isValid || isSubmitting}>
                        Submit
                      </Button>
                    </Form>
                  </div>
                </div>

                <hr />
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

export default UsersRegister;
