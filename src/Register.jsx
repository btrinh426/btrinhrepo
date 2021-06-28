import React from "react";
import * as userService from "./services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { withRouter } from "react-router-dom";
import debug from "sabio-debug";

const _logger = debug.extend("SabioRegister");

class Register extends React.Component {
  componentDidMount() {
    _logger("ComponentDidMount");
  }
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "",
    },
    message: null,
  };

  onRegister = () => {
    userService
      .register(this.state)
      .then(this.onUserRegisterSuccess)
      .catch(this.onUserRegisterError);
  };

  onUserRegisterSuccess(response) {
    console.log({ register: response.data });
    toast("Success");
  }

  onUserRegisterError(response) {
    console.log({ error: response });
    toast("error");
  }

  handleSubmit = (values, { resetForm }) => {
    userService
      .register(values)
      .then(this.onUserRegisterSuccess)
      .catch(this.onUserRegisterError);

    console.log(values);
    var message = `Just Submitted the form with these values and will be clearing form.
     ${JSON.stringify(values, null, 2)} `;
    //if you want to reset form you can use Formik's own method but you need to pass the object to reset the form to
    this.setState({ message });
    resetForm(this.state.formData);
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
            tenantId: Yup.string().required("Required"),
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
                        <Label>FirstName</Label>
                        <Field
                          name="firstName"
                          type="text"
                          values={values.FirstName}
                          placeholder="FirstName"
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
                        <Label>LastName</Label>
                        <Field
                          name="lastName"
                          type="text"
                          values={values.lastName}
                          placeholder="LastName"
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
                          placeholder="Email"
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
                          placeholder="Password"
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
                        <Label>PasswordConfirm</Label>
                        <Field
                          name="passwordConfirm"
                          type="text"
                          values={values.passwordConfirm}
                          placeholder="PasswordConfirm"
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
                        <Label>AvatarUrl</Label>
                        <Field
                          name="avatarUrl"
                          type="text"
                          values={values.avatarUrl}
                          placeholder="AvatarUrl"
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
                      <FormGroup>
                        <Label>TenantId</Label>
                        <Field
                          name="tenantId"
                          type="text"
                          values={values.tenantId}
                          placeholder="TenantId"
                          autoComplete="off"
                          className={
                            errors.tenantId && touched.tenantId
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.tenantId && touched.tenantId && (
                          <span className="input-feedback text-danger">
                            {errors.tenantId}
                          </span>
                        )}
                      </FormGroup>

                      <Button type="submit" disabled={!isValid || isSubmitting}>
                        Submit
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

export default withRouter(Register);
