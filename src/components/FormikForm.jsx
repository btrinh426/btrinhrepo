import React from "react";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";

class FormikForm extends React.Component {
  state = {
    formData: {
      name: "",
      description: "",
      statusId: "",
    },
  };

  handleSubmit = (values, { resetForm }) => {
    console.log(values);

    //if you want to reset form you can use Formik's own method but you need to pass the object to reset the form to
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
                    <span className="input-feedback">{errors.name}</span>
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
                    <span className="input-feedback">{errors.description}</span>
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
                    <span className="input-feedback">{errors.statusId}</span>
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

export default FormikForm;
