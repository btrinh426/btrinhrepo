import React from "react";
import * as techCompany from "../services/techCompany";
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

class Create extends React.Component {
  //it gives me success but there is no data on api server.
  state = {
    formData: {
      name: "",
      profile: "",
      summary: "",
      headline: "",
      contactInformation: "",
      slug: "",
      statusId: "",
    },
    message: null,
  };

  componentDidMount() {
    if (this.props.location.state) {
      let locState = this.props.location.state;
      let newFriend = { ...locState.payload };

      console.log(newFriend);

      this.setState((prevState) => {
        return {
          ...prevState,
          name: newFriend.name,
          profile: newFriend.profile,
          summary: newFriend.summary,
          headline: newFriend.headline,
          contactInformation: newFriend.contactInformation,
          slug: newFriend.slug,
          statusId: newFriend.statusId,
          id: newFriend.id,
        };
      });
    }
  }

  handleSubmit = (values, { resetForm }) => {
    techCompany.create(values).then(this.onAddSuccess).catch(this.onAddError);
    console.log(values);
    var message = `Just Submitted the form with these values and will be clearing form.
     ${JSON.stringify(values, null, 2)} `;
    //if you want to reset form you can use Formik's own method but you need to pass the object to reset the form to
    this.setState({ message });
    resetForm(this.state.formData);
  };

  onUpdateSuccess = (response) => {
    console.log({ update: response.data });
  };

  onUpdateError = (response) => {
    console.log({ error: response.data });
  };

  onAddSuccess = (response) => {
    console.log({ add: response.config.data });

    toast("Success");
  };
  onAddError = (response) => {
    console.log({ error: response.data });
    toast("Error");
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Required"),
            profile: Yup.string().required("Required"),
            summary: Yup.string().required("Required"),
            headline: Yup.string().required("Required"),
            contactInformation: Yup.string().required("Required"),
            slug: Yup.string().required("Required"),
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
                        <Label>Profile</Label>
                        <Field
                          name="profile"
                          type="text"
                          values={values.profile}
                          placeholder="Profile"
                          autoComplete="off"
                          className={
                            errors.profile && touched.profile
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.profile && touched.profile && (
                          <span className="input-feedback text-danger">
                            {errors.profile}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Summary</Label>
                        <Field
                          name="summary"
                          type="text"
                          values={values.summary}
                          placeholder="Summary"
                          autoComplete="off"
                          className={
                            errors.summary && touched.summary
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.summary && touched.summary && (
                          <span className="input-feedback text-danger">
                            {errors.summary}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Headline</Label>
                        <Field
                          name="headline"
                          type="text"
                          values={values.headline}
                          placeholder="Headline"
                          autoComplete="off"
                          className={
                            errors.headline && touched.headline
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.headline && touched.headline && (
                          <span className="input-feedback text-danger">
                            {errors.headline}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>ContactInformation</Label>
                        <Field
                          name="contactInformation"
                          type="text"
                          values={values.contactInformation}
                          placeholder="ContactInformation"
                          autoComplete="off"
                          className={
                            errors.contactInformation &&
                            touched.contactInformation
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.contactInformation &&
                          touched.contactInformation && (
                            <span className="input-feedback text-danger">
                              {errors.contactInformation}
                            </span>
                          )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Slug</Label>
                        <Field
                          name="slug"
                          type="text"
                          values={values.slug}
                          placeholder="Slug"
                          autoComplete="off"
                          className={
                            errors.slug && touched.slug
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.slug && touched.slug && (
                          <span className="input-feedback text-danger">
                            {errors.slug}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>StatusId</Label>
                        <Field
                          name="statusId"
                          type="text"
                          values={values.statusId}
                          placeholder="StatusId"
                          autoComplete="off"
                          className={
                            errors.statusId && touched.statusId
                              ? "form-control error"
                              : "form-control"
                          }
                        />
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
                </Row>
              </Container>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

export default withRouter(Create);
