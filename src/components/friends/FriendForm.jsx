import React from "react";
import { add, getById, update } from "../../services/friendService.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, ErrorMessage, yupToFormErrors } from "formik";
import { Form, FormGroup, Label, Button } from "reactstrap";
import * as Yup from "yup";

class FriendForm extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: 1,
      primaryImage: { imageUrl: "" },
    },
  };

  componentDidMount() {
    console.log("componentDidMount is firing from FriendForm");

    if (this.props.match.params.friendId) {
      console.log("Params check: ", this.props.match.params);

      let friendId = this.props.match.params.friendId;

      console.log("friendId", { friendId });

      // getById(friendId).then(this.onGetByIdSuccess).catch(this.onGetByIdError);
    }
  }

  onGetByIdSuccess = (response) => {
    console.log("onGetByIdSuccess is firing from FriendForm", response.data);

    let tempFriend = response.data.item;

    console.log("tempFriend ", tempFriend);

    this.setState(
      (prevState) => ({
        ...prevState,
        friend: response.data.item,
      }),
      () => console.log("This is the new state: ", this.state)
    );
  };
  onGetByIdError = (err) => {
    console.log("onGetByIdError is firing from FriendForm", err);
  };

  //same for add or edit
  onFormFieldChanged = (e) => {
    console.log("onFormFieldChanged is firing from FriendForm");
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state.formData };

      newState[inputName] = newValue;

      return { friend: newState };
    });
  };

  //submitting data
  onFriendFormClicked = (e) => {
    e.preventDefault();
    console.log("onFriendFormClicked is firing with state of: ", this.state);

    if (this.props.match.params.friendId) {
      let data = {
        id: this.state.formData.id,
        title: this.state.formData.title,
        bio: this.state.formData.bio,
        summary: this.state.formData.summary,
        headline: this.state.formData.headline,
        slug: this.state.formData.slug,
        statusId: 1,
        primaryImage: this.state.formData.primaryImage.imageUrl,
      };

      console.log("If is firing from onFriendFormClicked");
      console.log("This is the form data to be submitted: ", data);

      update(data.id, data)
        .then(this.onFriendFormSuccess)
        .catch(this.onFriendFormError);
    } else {
      let data = { ...this.state.formData };

      console.log("Else is firing from onFriendFormClicked");
      console.log("This is the form data to be submitted: ", data);

      add(data).then(this.onFriendFormSuccess).catch(this.onFriendFormError);
    }
  };
  onFriendFormError = (err) => {
    console.log("onFriendFormError is firing", err);

    let notify = () =>
      toast.error("Unable to update friend", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    notify();
  };
  onFriendFormSuccess = (response) => {
    console.log("onFriendFormSuccess is firing", response);

    if (this.state.formData.id) {
      let notify = () =>
        toast.success(
          `You have updated ${this.state.formData.title}'s contact information.`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      notify();
    } else {
      let notify = () =>
        toast.success(
          `You have updated ${this.state.formData.title}'s contact information.`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );

      notify();
    }

    this.props.history.push("../friends");
  };

  onCancelEditFriend = (e) => {
    console.log("onCancelEditFriend is firing");

    // this.props.history.push("./friends");
    this.props.history.push("../friends");
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
            statusId: Yup.number().required("Required"),
            primaryImage: Yup.string().url(),
          })}
          initialValues={this.state.formData}
          onSubmit={this.onRegisterClicked}
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
              <div className="container">
                <div className="row">
                  <div className="col-6 p-1">
                    <h1 className="p-2">Friend Information</h1>

                    <Form onSubmit={handleSubmit} className={"p-2"}>
                      <FormGroup>
                        <Label>Title</Label>
                        <Field
                          name="title"
                          type="text" // could be changed to email???
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
                          <span className="input-feedback">
                            <b>{errors.title}</b>
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Bio</Label>
                        <Field
                          name="bio"
                          type="text" // could be changed to email???
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
                          <span className="input-feedback">
                            <b>{errors.bio}</b>
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Summary</Label>
                        <Field
                          name="summary"
                          type="text" // could be changed to email???
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
                          <span className="input-feedback">
                            <b>{errors.summary}</b>
                          </span>
                        )}
                      </FormGroup>
                      <Button type="submit" disabled={!isValid || isSubmitting}>
                        Submit
                      </Button>

                      {/*                   
                  <div className="form-group">
                    <label htmlFor="headline">Headline</label>
                    <input
                      type="text"
                      className="form-control"
                      id="headline"
                      name="headline"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.headline}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="slug">Slug</label>
                    <input
                      type="text"
                      className="form-control"
                      id="slug"
                      name="slug"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.slug}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="primaryImage">Avatar URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="primaryImage"
                      name="primaryImage"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.primaryImage.imageUrl}
                    />
                  </div>
                  <div className="p-1 d-inline">
                    <button
                      type="button"
                      className="btn btn-primary"
                      id="addFriend"
                      name="addFriend"
                      onClick={this.onFriendFormClicked}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="p-1 d-inline">
                    <button
                      type="reset"
                      className="btn btn-primary"
                      id="addFriend"
                      name="addFriend"
                      onClick={this.onCancelEditFriend}
                    >
                      Cancel
                    </button>
                  </div> */}
                    </Form>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

export default FriendForm;
