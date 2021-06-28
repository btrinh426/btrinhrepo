import React from "react";
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

import "./App.css";

class App extends React.Component {
  state = {
    formData: {
      name: "",
      description: "",
      statusId: "",
    },
    message: null,
  };

  handleSubmit = (values, { resetForm }) => {
    console.log(values);
    var message = `Just Submitted the form with these values and will be clearing form.
    ${JSON.stringify(values, null, 2)} `;
    //if you want to reset form you can use Formik's own method but you need to pass the object to reset the form to
    this.setState({ message });
    resetForm(this.state.formData);
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            statusId: Yup.string().required("Required"),
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
                        <Label>Name</Label>

                        <Field
                          name="name"
                          type="text"
                          values={values.name}
                          placeholder="Name"
                          autoComplete="off"
                          className={
                            errors.name && touched.name
                              ? "form-control error"
                              : "form-control"
                          }
                        />

                        {errors.name && touched.name && (
                          <span className="input-feedback text-danger">
                            {errors.name}
                          </span>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Description</Label>

                        <Field
                          name="description"
                          type="text"
                          values={values.description}
                          placeholder="Description"
                          autoComplete="off"
                          className={
                            errors.description && touched.description
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.description && touched.description && (
                          <span className="input-feedback text-danger">
                            {errors.description}
                          </span>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Status</Label>

                        <Field
                          name="statusId"
                          component="select"
                          values={values.statusId}
                          label="Status"
                          className={
                            errors.statusId && touched.statusId
                              ? "form-control error"
                              : "form-control"
                          }
                          as="select"
                        >
                          <option value="">Select Status</option>
                          <option value="1">Active</option>
                          <option value="2">Inactive</option>
                          <option value="3">Pending</option>
                        </Field>

                        {errors.statusId && touched.statusId && (
                          <span className="input-feedback text-danger">
                            {errors.statusId}
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

export default App;
