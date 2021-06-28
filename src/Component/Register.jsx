import React from "react";
import * as userService from "../services/userServices";
import { toast } from "react-toastify";
import {
  Form,
  FormGroup,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import debug from "sabio-debug";

const _logger = debug.extend("Register"); //sabio:Register

const _loggerPage = debug.extend("SPA"); //Sabio:App:SPA

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "U01G6AS2WER",
    },
    message: null,
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  handleSubmit = (values, { resetForm }) => {
    _loggerPage("Say loggerPage", values);
    var message = `Just submitted the form with these values and will be flearning form. ${JSON.stringify(
      values,
      null,
      2
    )}`;
    this.setState({ message });

    userService
      .register(values)
      .then(this.onRegisterSuccess)
      .then(() => resetForm(this.state.formData))
      .catch(this.onRegisterError);

    resetForm(this.state.formData);
  };

  onRegisterClicked = (e) => {
    e.preventDefault();
    _logger("Say logger", this.state.formData);

    this.props.history.push("/register");
  };

  onRegisterSuccess = (response) => {
    _logger({ response: response.data });
  };

  onRegisterError = (error) => {
    toast.error("Sorry, failed to login");
  };

  changeName = (e) => {
    e.preventDefault();

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          name: "you changed the name..",
        };
      },
      () => _logger("after we setState", this.state.name)
    );
  };

  render() {
    _logger("rendering");
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
            passwordConfirm: Yup.string().required("Required"),
            avatarUrl: Yup.string().required("Required"),
          })}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
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
              <Container>
                <Row>
                  <Col>
                    <Form onSubmit={handleSubmit} className={"col-md-6 pt-4"}>
                      <FormGroup>
                        <Label>First Name</Label>
                        <Field
                          name="firstName"
                          type="text"
                          values={values.firstName}
                          placeholder="first name"
                          autoComplete="off"
                          className={
                            errors.firstName && touched.firstName
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.firstName && touched.firstName && (
                          <span className="input-feedback text-danger">
                            {errors.firstName}
                          </span>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Last Name</Label>
                        <Field
                          name="lastName"
                          type="text"
                          values={values.lastName}
                          placeholder="last name"
                          autoComplete="off"
                          className={
                            errors.lastName && touched.lastName
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.lastName && touched.lastName && (
                          <span className="input-feedback text-danger">
                            {errors.lastName}
                          </span>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Email</Label>
                        <Field
                          name="email"
                          type="email"
                          values={values.email}
                          placeholder="email"
                          autoComplete="off"
                          className={
                            errors.email && touched.email
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.email && touched.email && (
                          <span className="input-feedback text-danger">
                            {errors.email}
                          </span>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Password</Label>
                        <Field
                          name="password"
                          type="password"
                          values={values.password}
                          placeholder="first name"
                          autoComplete="off"
                          className={
                            errors.password && touched.password
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.password && touched.password && (
                          <span className="input-feedback text-danger">
                            {errors.password}
                          </span>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Confirm Password</Label>
                        <Field
                          name="passwordConfirm"
                          type="password"
                          values={values.passwordConfirm}
                          placeholder="first name"
                          autoComplete="off"
                          className={
                            errors.passwordConfirm && touched.passwordConfirm
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.passwordConfirm && touched.passwordConfirm && (
                          <span className="input-feedback text-danger">
                            {errors.passwordConfirm}
                          </span>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Avatar Url</Label>
                        <Field
                          name="avatarUrl"
                          type="html"
                          values={values.avatarUrl}
                          placeholder="URL"
                          autoComplete="off"
                          className={
                            errors.avatarUrl && touched.avatarUrl
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.avatarUrl && touched.avatarUrl && (
                          <span className="input-feedback text-danger">
                            {errors.avatarUrl}
                          </span>
                        )}
                      </FormGroup>

                      <Button type="submit" disabled={!isValid || isSubmitting}>
                        Register
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

export default Register;
