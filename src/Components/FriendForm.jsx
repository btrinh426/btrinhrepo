import React, { Component } from "react";
import * as friendService from "../services/friendService";
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

class FriendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        primaryImage: "",
        skills: "",
      },
      friendId: "",
    };
  }

  handleSubmit = (values, { resetForm }) => {
    console.log("handleSubmit is firing");
    friendService
      .addFriend(values)
      .then(this.onAddSuccess)
      .catch(this.onAddError);
  };

  onAddSuccess = (response) => {
    console.log({ good: response });
    toast.success("Friend added!");
  };

  onAddError = (response) => {
    console.log({ error: response });
    toast.error(
      "Something went wrong. Please check your inputs and try again."
    );
  };

  onCancelClick = (e) => {
    e.preventDefault();
    console.log("onCancel clicked");
    this.props.history.push("/friends");
  };

  onDeleteClick = (e) => {
    e.preventDefault();
    console.log("onDelete clicked");
    friendService
      .deleteRecordWithId(this.state.friendData.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (response) => {
    console.log({ deleteGood: response });
    this.props.history.push("/friends");
    toast.success("Friend Deleted Successfully.");
  };

  onDeleteError = (response) => {
    console.log({ deleteError: response });
    toast.error("Something went wrong. Please try again.");
  };

  onUpdateClick = (e) => {
    e.preventDefault();
    console.log("onUpdate clicked");
    let dataCopy = { ...this.state.friendData };
    let newValue = this.state.friendData.primaryImage.imageUrl;
    dataCopy.primaryImage = newValue;
    console.log(dataCopy);
    friendService
      .updateFriendWithId(dataCopy, dataCopy.id)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = (response) => {
    console.log({ updateGood: response });
    this.props.history.push("/friends");
    toast.success("Friend successfully Updated");
  };

  onUpdateError = (response) => {
    console.log({ updateError: response });
    toast.error(
      "Oops. Something went wrong. Please check your data and try again."
    );
  };

  getRecord = (id) => {
    friendService
      .getRecordWithId(id)
      .then(this.onRecordSuccess)
      .catch(this.onRecordError);
  };

  onRecordSuccess = (response) => {
    console.log({ good: response });
    this.setState(() => {
      let friendData = response.item;
      let friendId = response.item.id;
      return { friendData, friendId };
    });
  };

  onRecordError = (response) => {
    console.log({ bad: response });
  };

  componentDidMount() {
    let routeId = this.props.match.params.friendId;

    routeId && this.getRecord(routeId);
  }

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Required"),
            bio: Yup.string().nullable(),
            summary: Yup.string().nullable(),
            headline: Yup.string().required("Required"),
            slug: Yup.string().required("Required"),
            statusId: Yup.string().required("Required"),
            primaryImage: Yup.object({
              id: Yup.number(),
              imageUrl: Yup.string(),
              imageTypeId: Yup.string(),
            }).required("Required"),
          })}
          initialValues={this.state.friendData}
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
                  <h1>Add/Edit Friend</h1>
                  <Row>
                    <div className="col-sm-2">
                      <img
                        src={
                          this.state.friendData.primaryImage.imageUrl
                            ? this.state.friendData.primaryImage.imageUrl
                            : "https://image.shutterstock.com/image-vector/universal-blank-profile-picture-avatar-600w-1654275940.jpg"
                        }
                        className="rounded img-thumbnail"
                        alt="user avatar"
                      />
                    </div>
                  </Row>
                </Row>
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit} className={"col-md-6 pt-4"}>
                      <FormGroup>
                        <Label>Name</Label>
                        <Field
                          name="title"
                          type="text"
                          values={values.title}
                          placeholder="Name"
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
                        <Label>bio</Label>
                        <Field
                          name="bio"
                          type="text"
                          values={values.bio}
                          placeholder="bio"
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
                          placeholder="summary"
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
                          placeholder="headline"
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
                          placeholder="slug"
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
                        <Label>Image url</Label>
                        <Field
                          name="primaryImage.imageUrl"
                          type="text"
                          values={values.primaryImage.imageUrl}
                          placeholder="Image url"
                          autoComplete="off"
                          className={
                            errors.primaryImage && touched.primaryImage
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.primaryImage && touched.primaryImage && (
                          <span className="input-feedback text-danger">
                            {errors.primaryImage}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Image type</Label>
                        <Field
                          name="primaryImage.imageTypeId"
                          type="text"
                          values={values.primaryImage}
                          placeholder="imageType"
                          autoComplete="off"
                          className={
                            errors.primaryImage && touched.primaryImage
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.primaryImage && touched.primaryImage && (
                          <span className="input-feedback text-danger">
                            {errors.primaryImage}
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
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Pending">Pending</option>
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
                </Row>
                <Row>
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

export default FriendForm;
