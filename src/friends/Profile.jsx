import React from "react";
import * as friendsService from "../services/friendsService";
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

class Profile extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImageUrl: "",
      skill: "",
    },
    message: null,
  };

  handleSubmit = (values, { resetForm }) => {
    if (this.props.location.state === undefined) {
      friendsService
        .add(values)
        .then(this.onAddFriendsSuccess)
        .catch(this.onAddFriendsError);
    }

    if (this.props.location.state !== undefined) {
      friendsService
        .updateFriend(this.state, this.state.id)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onupdateFriendError);
    }
    console.log(values);
    var message = `Just Submitted the form with these values and will be clearing form.
     ${JSON.stringify(values, null, 2)} `;
    //if you want to reset form you can use Formik's own method but you need to pass the object to reset the form to
    this.setState({ message });
    resetForm(this.state.formData);
  };

  componentDidMount() {
    if (this.props.location.state) {
      let locState = this.props.location.state;
      let newFriend = { ...locState.payload };

      console.log(newFriend);

      this.setState((prevState) => {
        //how to bring data from frined list and render on the profile page?
        return {
          ...prevState,
          title: newFriend.title,
          bio: newFriend.bio,
          summary: newFriend.summary,
          headline: newFriend.headline,
          slug: newFriend.slug,
          primaryImageUrl: newFriend.primaryImageUrl,
          skill: newFriend.skill,
          id: newFriend.id,
        };
      });
    }
  }

  fieldChange = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};

      newState[inputName] = newValue;

      return newState;
    });
  };

  addProfile = (e) => {
    e.preventDefault();
    if (this.props.location.state === undefined) {
      friendsService
        .add(this.state)
        .then(this.onAddFriendsSuccess)
        .catch(this.onAddFriendsError);
    }

    if (this.props.location.state !== undefined) {
      friendsService
        .updateFriend(this.state, this.state.id)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onupdateFriendError);
    }
  };

  onUpdateFriendSuccess = (response) => {
    console.log({ update: response.data });
    toast("Update Success");
  };

  onupdateFriendError = (response) => {
    console.log({ error: response });
    toast("Update Fail");
  };

  onAddFriendsSuccess = (response) => {
    console.log({ response: response.data });
    toast("Update Success");
  };

  onAddFriendsError = (response) => {
    console.log({ error: response });
    toast("Update Fail");
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Required"),
            bio: Yup.string().required("Required"),
            summary: Yup.string().required("Required"),
            headline: Yup.string().required("Required"),
            slug: Yup.string().required("Required"),
            statusId: Yup.string().required("Required"),
            primaryImageUrl: Yup.string().required("Required"),
            skill: Yup.string().required("Required"),
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
                        <Label>Title</Label>
                        <Field
                          name="title"
                          type="text"
                          values={values.title}
                          placeholder="Title"
                          autoComplete="off"
                          className={
                            errors.title && touched.title
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.title && touched.title && (
                          <span className="input-feedback text-danger">
                            {errors.title}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Bio</Label>
                        <Field
                          name="bio"
                          type="text"
                          values={values.bio}
                          placeholder="Bio"
                          autoComplete="off"
                          className={
                            errors.bio && touched.bio
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.bio && touched.bio && (
                          <span className="input-feedback text-danger">
                            {errors.bio}
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
                      <FormGroup>
                        <Label>PrimaryImageUrl</Label>
                        <Field
                          name="primaryImageUrl"
                          type="text"
                          values={values.primaryImageUrl}
                          placeholder="PrimaryImageUrl"
                          autoComplete="off"
                          className={
                            errors.primaryImageUrl && touched.primaryImageUrl
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.primaryImageUrl && touched.primaryImageUrl && (
                          <span className="input-feedback text-danger">
                            {errors.primaryImageUrl}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Skill</Label>
                        <Field
                          name="skill"
                          type="text"
                          values={values.skill}
                          placeholder="Skill"
                          autoComplete="off"
                          className={
                            errors.skill && touched.skill
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.skill && touched.skill && (
                          <span className="input-feedback text-danger">
                            {errors.skill}
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

export default withRouter(Profile);
