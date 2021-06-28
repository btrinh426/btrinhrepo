import { postFriends, updateFriends } from "../services/friendsService";
import { toast } from "react-toastify";
import { currentUser } from "../services/userService";
import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const formValidationSchema = Yup.object().shape({
  title: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  bio: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  summary: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  headline: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  slug: Yup.string().min(2, "min 2 char").max(50).required("Required"),
  statusId: Yup.string().required("Required"),
  //primaryImage: Yup.string().required("Required"),
});

class AddOrEditFriends extends Component {
  state = {
    friend: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
    message: null,
  };

  componentDidMount() {
    currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "friend_Obj") {
        let newFriend = locState.payload.oneFriend;
        newFriend.primaryImage = newFriend.primaryImage.imageUrl;

        this.setState(() => {
          return { friend: newFriend };
        });
      }
    }
  }
  onInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.name;

    this.setState(() => {
      let friend = { ...this.state.friend };
      friend[inputData] = newValue;
      return { friend };
    });
  };

  handleClickAdd = (values, { resetForm }) => {
    console.log(values);
    if (this.props.location.state) {
      updateFriends(this.state.friend)
        .then(this.onUpdateFriendsSuccess)
        .catch(this.onUpdateFriendsError);
    } else {
      postFriends(this.state.friend)
        .then(this.onPostFriendsSuccess)
        .catch(this.onPostFriendsError);
    }

    resetForm(this.state.friend);
  };

  onPostFriendsSuccess = (res) => {
    console.log({ friend: res });
    toast.success(`You have successfully added a new friend!`);
    this.props.history.push("/friends");
  };

  onPostFriendsError = (res) => {
    console.log("errorPost");

    toast.error(`ErrorPost`);
  };

  onUpdateFriendsSuccess = (res) => {
    console.log({ friend: res });
    toast.success(`You have successfully updated a new friend!`);
    this.props.history.push("/friends");
  };

  onUpdateFriendsError = (res) => {
    console.log("errorUpdate");

    toast.error(`ErrorUpdate`);
  };

  render() {
    return (
      <div>
        <Formik
          enableReinitialize={true}
          validationSchema={formValidationSchema}
          initialValues={this.state.friend}
          onSubmit={this.handleClickAdd}
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
              <Form>
                <div className="form-group">
                  <div className="form-group">
                    <label>Title</label>
                    <Field
                      type="text"
                      onChange={this.onInputChange}
                      name="title"
                      id="title"
                      placeholder="Title"
                      value={values.title}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="has-error"
                    />
                    {/* //   className={
            //     errors.description && touched.description
            //       ? "form-control error"
            //       : "form-control"
            //   }
            // />
            // {errors.description && touched.description && (
            //   <span className="input-feedback text-danger">
            //     {errors.description}
            //   </span>
            
            // )} */}
                  </div>

                  <div className="form-group">
                    <label>Bio</label>
                    <Field
                      type="text"
                      onChange={this.onInputChange}
                      name="bio"
                      id="inputBio"
                      placeholder="Bio"
                      value={values.bio}
                      className="has-error"
                    />
                    {/* //   className={
              //     errors.description && touched.description
              //       ? "form-control error"
              //       : "form-control"
              //   }
              // />
              // {errors.description && touched.description && (
              //   <span className="input-feedback text-danger">
              //     {errors.description}
              //   </span>
              
              // )} */}
                  </div>
                  <div className="form-group">
                    <label>Summary</label>
                    <Field
                      type="text"
                      onChange={this.onInputChange}
                      name="summary"
                      id="inputSummary"
                      aria-describedby="summary"
                      placeholder="Enter Summary"
                      value={values.summary}
                    />
                    <ErrorMessage
                      name="summary"
                      component="div"
                      className="has-error"
                    />
                    {/* //   className={
            //     errors.description && touched.description
            //       ? "form-control error"
            //       : "form-control"
            //   }
            // />
            // {errors.description && touched.description && (
            //   <span className="input-feedback text-danger">
            //     {errors.description}
            //   </span>
            
            // )} */}
                  </div>

                  <div className="form-group">
                    <label>Headline</label>
                    <Field
                      type="text"
                      onChange={this.onInputChange}
                      name="headline"
                      id="inputHeadline"
                      placeholder="Headline"
                      value={values.headline}
                    />
                    <ErrorMessage
                      name="headline"
                      component="div"
                      className="has-error"
                    />{" "}
                    {/* //   className={
              //     errors.description && touched.description
              //       ? "form-control error"
              //       : "form-control"
              //   }
              // />
              // {errors.description && touched.description && (
              //   <span className="input-feedback text-danger">
              //     {errors.description}
              //   </span>
              
              // )} */}
                  </div>
                  <div className="form-group">
                    <label>Skills</label>
                    <Field
                      type="text"
                      onChange={this.onInputChange}
                      value={values.skills}
                      name="skills"
                      id="skills"
                      placeholder="skills"
                      className="has-error"
                    />
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="has-error"
                    />
                    {/* //   className={
              //     errors.description && touched.description
              //       ? "form-control error"
              //       : "form-control"
              //   }
              // />
              // {errors.description && touched.description && (
              //   <span className="input-feedback text-danger">
              //     {errors.description}
              //   </span>
              
              // )} */}
                  </div>

                  <div className="form-group">
                    <label> Slug</label>
                    <Field
                      type="text"
                      onChange={this.onInputChange}
                      name="slug"
                      value={values.slug}
                      placeholder="slug"
                      className="has-error"
                    />
                    <ErrorMessage
                      name="slug"
                      component="div"
                      className="has-error"
                    />
                    {/* //   className={
            //     errors.description && touched.description
            //       ? "form-control error"
            //       : "form-control"
            //   }
            // />
            // {errors.description && touched.description && (
            //   <span className="input-feedback text-danger">
            //     {errors.description}
            //   </span>
            
            // )} */}
                  </div>

                  <div className="form-group">
                    <label> Status Id</label>
                    <Field
                      type="text"
                      onChange={this.onInputChange}
                      name="statusId"
                      id="statusId"
                      placeholder="Status Id"
                      value={values.statusId}
                      className="has-error"
                    />
                    <ErrorMessage
                      name="statusId"
                      component="div"
                      className="has-error"
                    />
                    {/* //   className={
              //     errors.description && touched.description
              //       ? "form-control error"
              //       : "form-control"
              //   }
              // />
              // {errors.description && touched.description && (
              //   <span className="input-feedback text-danger">
              //     {errors.description}
              //   </span>
              
              // )} */}
                  </div>

                  <div className="form-group">
                    <label>Primary Image</label>
                    <Field
                      onChange={this.onInputChange}
                      name="primaryImage"
                      id="primaryImage"
                      placeholder="Primary Image"
                      value={values.primaryImage}
                      className="has-error"
                    />
                    <ErrorMessage
                      name="primaryImage"
                      component="div"
                      className="has-error"
                    />
                    {/* //   className={
              //     errors.description && touched.description
              //       ? "form-control error"
              //       : "form-control"
              //   }
              // />
              // {errors.description && touched.description && (
              //   <span className="input-feedback text-danger">
              //     {errors.description}
              //   </span>
              
              // )} */}
                  </div>

                  <button type="submit">Submit</button>
                  {/* <button onClick={this.handleClickEdit}>Edit</button> */}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}
export default AddOrEditFriends;
