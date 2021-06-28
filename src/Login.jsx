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

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "",
    },
    message: null,
  };

  handleSubmit = (values, { resetForm }) => {
    userService
      .login(values)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
    console.log(values);
    var message = `Just Submitted the form with these values and will be clearing form.
     ${JSON.stringify(values, null, 2)} `;
    //if you want to reset form you can use Formik's own method but you need to pass the object to reset the form to
    this.setState({ message });
    resetForm(this.state.formData);
  };

  onLoginSuccess = (response) => {
    console.log({ response: response.data });
    toast("Success");
  };

  onLoginError = (response) => {
    console.log({ error: response });
    toast("error");
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
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

export default withRouter(Login);
