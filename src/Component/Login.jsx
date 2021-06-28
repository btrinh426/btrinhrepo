import React from "react";
import * as userService from "../services/userServices";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
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

class Login extends React.Component {
  state = {
    logInData: {
      email: "",
      password: "",
      tenantId: "U01G6AS2WER",
    },
    message: null,
  };

  onFormFieldChange = (e) => {
    console.log(e);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let logInData = { ...this.state.logInData };

      logInData[inputName] = newValue;

      return {
        logInData,
      };
    });
  };

  handleSubmit = (values, { resetForm }) => {
    console.log(values);
    var message = `Just submitted the form with these values and will be flearning form. ${JSON.stringify(
      values,
      null,
      2
    )}`;
    this.setState({ message });

    userService
      .logIn(values)
      .then(this.onLogInSuccess)
      .then(() => resetForm(this.state.logInData))
      .catch(this.onLogInError);

    resetForm(this.state.logInData);
  };

  onLogInSuccess = (response) => {
    console.log({ response: response.data });
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "You logged in!",
    });
  };

  onLogInError = (error) => {
    toast.error("Sorry, failed to login");
  };

  handleLoginClick = (e) => {
    e.preventDefault();
    console.log("The login button was clicked");

    this.props.history.push("/register");
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
          })}
          initialValues={this.state.logInData}
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

export default Login;
