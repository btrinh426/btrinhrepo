import React, { Component } from "react";
import { toast } from "react-toastify";
import { usersService } from "../services/userService";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormGroup,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

class Registration extends Component {
  state = {
    registerFormData: {
      firstName: "",
      miName: "",
      lastName: "",
      email: "",
      password: "",
    },
    message: null,
  };

  handleSubmit = (values, { resetForm }) => {
    console.log("handleSubmit clicked");
    usersService
      .register(values)
      .then(this.onSubmitSuccess)
      .catch(this.onSubmitError);
    resetForm(this.state.formData);
  };

  onSubmitSuccess = (response) => {
    console.log({ good: response });
    toast.success("Success! You are now registered.");
  };

  onSubmitError = (response) => {
    console.warn({ error: response });
    toast.error(
      "Something went wrong. Please check your inputs and try again."
    );
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("Required"),
            miName: Yup.string(),
            lastName: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
          })}
          initialValues={this.state.registerFormData}
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
                          placeholder="First Name"
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
                        <Label>Middlde Name</Label>
                        <Field
                          name="miName"
                          type="text"
                          values={values.miName}
                          placeholder="Middle Name"
                          autoComplete="off"
                          className={
                            errors.miName && touched.miName
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.miName && touched.miName && (
                          <span className="input-feedback text-danger">
                            {errors.miName}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Last Name</Label>
                        <Field
                          name="lastName"
                          type="text"
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
                          <span className="input-feedback text-danger">
                            {errors.lastName}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Email</Label>
                        <Field
                          name="email"
                          type="text"
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
                          type="text"
                          values={values.password}
                          placeholder="password"
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
                      <Button type="submit" disabled={!isValid || isSubmitting}>
                        Submit
                      </Button>
                    </Form>
                  </Col>
                  <Col className="mt-5">
                    <div>
                      <h2>Current Values in Formik</h2>
                      <pre>{JSON.stringify(values, null, 2)}</pre>
                    </div>
                    <div>
                      <pre>{this.state.message}</pre>
                    </div>
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
export default Registration;
