import React from "react";
import * as faqService from "./services/faqService";
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

class Hola extends React.Component {
  state = {
    formData: {
      name: "",
    },
    message: null,
  };

  onAddFaqSuccess(response) {
    console.log({ register: response.data });
    toast("Success");
  }

  onAddFaqError(response) {
    console.log({ error: response });
    toast("error");
  }

  handleSubmit = (values, { resetForm }) => {
    faqService.add(values).then(this.onAddFaqSuccess).catch(this.onAddFaqError);

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
                          values={values.FirstName}
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

export default Hola;
