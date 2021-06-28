import React, { Component } from "react";
import { FormGroup, Label, Button, CardImg } from "reactstrap";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import * as friendService from "../services/friendService";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title needs to be between 2 and 120 characters in length.")
    .max(120, "Title needs to be between 2 and 120 characters in length.")
    .required("Required"),
  bio: Yup.string()
    .min(2, "Bio should be between 2 and 700 characters in length.")
    .max(700, "Bio should be between 2 and 700 characters in length.")
    .required("Required"),
  summary: Yup.string()
    .min(2, "Summary needs to be between 2 and 120 characters in length.")
    .max(255, "Summary needs to be between 2 and 255 characters in length.")
    .required("Required"),
  headline: Yup.string()
    .min(2, "Headline needs to be between 2 and 80 characters in length.")
    .max(80, "Headline needs to be between 2 and 80 characters in length.")
    .required("Required"),
  slug: Yup.string()
    .min(2, "Slug needs to be between 2 and 100 characters in length.")
    .max(100, "Slug needs to be between 2 and 100 characters in length.")
    .required("Required"),
  primaryImageUrl: Yup.string()
    .url("Image URL must be a valid URL. For example, https://www.image.com")
    .required("Required"),
});

class FriendForm extends Component {
  constructor(props) {
    console.log("FriendForm constructor running.");
    super(props);
    this.state = {
      friendForm: {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        skills: "",
        primaryImageUrl: this.defaultFriendImage,
      },
    };
    console.log("FriendForm constructor complete.");
  }

  defaultFriendImage = "https://i.pinimg.com/originals/3e/04/6e/3e046ee4eccb7438bdb0d3a7a9e314bd.png";
  defaultFriendImage2 = "https://cdn3.iconfinder.com/data/icons/user-icon-3-1/100/user_3_Artboard_1-512.png";

  componentDidMount = () => {
    if (this.props.location.pathname !== "/friends/new") {
      // If the path has a friend id - upload the friend data into the form/state
      this.setState(() => {
        const friendForm = { ...this.props.location.state.friendInfo };
        // Check for a null or undefined image and assign a default image
        friendForm.primaryImageUrl = this.props.location.state.friendInfo.primaryImage.imageUrl
          ? this.props.location.state.friendInfo.primaryImage.imageUrl
          : this.defaultFriendImage;
        return { friendForm };
      });
    }
    console.log("Component did mount.");
  };

  componentDidUpdate() {
    console.log("Component did update....");
  }

  clickFriendSubmitButton = (formValues) => {
    // This function is called when the user clicks on the "Submit/Update" button on the FriendForm
    // Formik will send its hook.reducer.values to this function as "formValues"
    const friendData = this.getFriendData(formValues);
    if (!this.state.friendForm.hasOwnProperty("id")) {
      // Add new friend
      friendService.addFriend(friendData).then(this.onAddFriendSuccess).catch(this.onAddFriendError);
    } else {
      // Update old friend
      friendData.id = this.state.friendForm.id;
      friendService.updateFriend(friendData).then(this.onUpdateFriendSuccess).catch(this.onUpdateFriendError);
    }
  };

  getFriendData = (friendFormValues) => {
    // This function is called by the "clickFriendSubmitButton" function when the user clicks the "Add/Update" button on the FriendForm
    // This function is also called by the "onAddFriendSuccess" method to get the friend data prior to pushing to the "edit" page.
    // This function will return the form data in the correct format for a friend add/update call to the server.
    let newFriend;
    if (friendFormValues) {
      // If getFriendData is passed values from Formik, update state with those values, and return the formatted friend.
      newFriend = friendFormValues;
      if (friendFormValues.statusId === "") {
        newFriend.statusId = "NotSet";
      }
      // Null check on friend image URL...
      newFriend.primaryImageUrl = friendFormValues.primaryImageUrl
        ? friendFormValues.primaryImageUrl
        : this.defaultFriendImage;

      // Set state with new friend
      this.setState(() => {
        const friendForm = { ...newFriend };
        return { friendForm };
      });

      // Format the skills into an array
      let skillText = friendFormValues.skills;
      if (skillText.indexOf(",") !== -1) {
        skillText = skillText.split(",");
      } else {
        skillText = skillText.split(" ");
      }
      newFriend.skills = [...skillText].map((skill) => {
        return { name: skill.trim() };
      });
      return newFriend;
    } else {
      // If getFriendData is NOT passed values from Formik, then create the friend based off state data.
      newFriend = { ...this.state.friendForm };
      // Format the skills into an array
      let skillText = newFriend.skills;
      if (skillText.indexOf(",") !== -1) {
        skillText = skillText.split(",");
      } else {
        skillText = skillText.split(" ");
      }
      newFriend.skills = [...skillText].map((skill) => {
        return { name: skill.trim() };
      });
      return newFriend;
    }
  };

  onAddFriendSuccess = (response) => {
    // When a new friend is successfully added, add the new friend id to state, and update the path (enter "edit" mode)
    toast.success(`Added new friend, ID: ${response.data.item}`);
    this.setState(
      () => {
        const friendForm = { ...this.state.friendForm };
        friendForm.id = response.data.item;
        return { friendForm };
      },
      () => {
        const friendForm = { ...this.state.friendForm };
        const pagination = this.props.history.location.state.pagination
          ? { ...this.props.history.location.state.pagination }
          : {};
        pagination.totalFriends++;
        this.props.history.push(`/friends/${friendForm.id}/edit`, {
          friendForm,
          pagination: pagination,
        });
      }
    );
  };

  onAddFriendError = (error) => {
    debugger;
    console.error("Error adding new friend.");
    const errorText = error.response.data.errors;
    const ErrorDiv = () => (
      <div>
        <p>Registration failed:</p>
        <p>{errorText.join("\n")}</p>
      </div>
    );
    toast.error(<ErrorDiv />, { autoClose: 15000 });
  };

  onUpdateFriendSuccess = () => {
    toast.success(`Friend updated.`);
  };

  onUpdateFriendError = (error) => {
    debugger;
    console.error("Error updating friend.", error);
    const errorText = error.response.data.errors;
    const ErrorDiv = () => (
      <div>
        <p>Updating friend failed:</p>
        <p>{errorText.join("\n")}</p>
      </div>
    );
    toast.error(<ErrorDiv />, { autoClose: 15000 });
  };

  clickFriendDeleteButton = (e) => {
    // This function is called when the FriendForm "Delete" button is clicked
    e.preventDefault();
    if (this.state.friendForm.hasOwnProperty("id")) {
      Swal.fire({
        title: "Are you sure you want to delete your friend?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: `Delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          friendService
            .deleteFriend(this.state.friendForm.id)
            .then(this.onDeleteFriendSuccess)
            .catch(this.onDeleteFriendError);
        }
      });
    }
  };

  onDeleteFriendSuccess = (response) => {
    // After a friend is deleted, refresh the path back to "/friends"
    const friendId = this.searchTextFromAxiosResponse(response);
    toast.success(`Friend ID# ${friendId} deleted.`);
    const pagination = this.props.history.location.state.pagination
      ? { ...this.props.history.location.state.pagination }
      : {};
    pagination.totalFriends--;
    this.props.history.push("/friends", { pagination });
  };

  onDeleteFriendError = (error) => {
    debugger;
    toast.error("Could not delete friend.");
    console.error(error);
  };

  clickFriendCancelButton = (e) => {
    // When the user clicks the "Cancel" button on the FriendForm, return to the main friends display.
    e.preventDefault();
    const pagination = this.props.history.location.state.pagination
      ? { ...this.props.history.location.state.pagination }
      : {};
    this.props.history.push("/friends", { pagination });
  };

  imageFailsToLoad = (e) => {
    // If the friend image for the Add/Update form preview fails to load, this will change the image source to a default placeholder image.
    console.log("Image failed to load...setting default.");
    e.currentTarget.onError = null;
    e.currentTarget.src = "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png";
  };

  onImageDoubleClick = (e) => {
    // If the user clicks double clicks on the image, it will swap between two default images (woman/man)
    let newImage = null;
    if (this.state.friendForm.primaryImageUrl === this.defaultFriendImage) {
      newImage = this.defaultFriendImage2;
    } else {
      newImage = this.defaultFriendImage;
    }
    this.setState(() => {
      const friendForm = { ...this.state.friendForm };
      friendForm.primaryImageUrl = newImage;
      return { friendForm };
    });
  };

  searchTextFromAxiosResponse = (response) => {
    // This function is used by the "onDeleteFriendSuccess" function to get the friendId from the Axios response
    let url = response.config.url;
    if (url.indexOf("=") === -1) {
      url = url.split("/");
    } else {
      url = url.split("=");
    }
    return url[url.length - 1];
  };

  render() {
    return (
      <div className="col pl-3 mr-3" style={{ zIndex: "10" }}>
        <div className="row m-0 pl-0 pt-2 pb-2 pr-2">
          <h3 className="col pl-0" id="mainTitle">
            Friends
          </h3>
        </div>

        <div className="row pl-3">
          <div className="col nav-item pl-0 pr-3" style={{ marginBottom: "1rem" }}>
            <div className="row pl-3 pr-3 pb-3 pt-0">
              <div
                className=" container row border border-secondary rounded mb-0 mr-3 ml-0 p-3"
                id="friendAddUpdateFormBorder"
                style={{ backgroundColor: "rgb(210, 217, 235)", width: "fit-content" }}
              >
                <div className="col pl-3 pt-0 pb-0 m-0" style={{ width: "450px" }}>
                  <div className="row">
                    <Formik
                      enableReinitialize={true}
                      initialValues={this.state.friendForm}
                      onSubmit={this.clickFriendSubmitButton}
                      validationSchema={validationSchema}
                    >
                      {(props) => {
                        const { values, resetForm } = props;
                        return (
                          <Form
                            className="friendLogForm col-4 mr-3 pl-0 pr-0 mb-0"
                            style={{ marginBottom: "1rem", minWidth: "450px", height: "fit-content" }}
                          >
                            <FormGroup className=" row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label className="form-label my-friendForm-label col-3" style={{ minWidth: "68px" }}>
                                    Title
                                  </Label>
                                  <Field type="text" name="title" className="form-control my-input-control col" />
                                </div>
                                <div className="row">
                                  <div className="col-3"></div>
                                  <ErrorMessage name="title" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className=" row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label className="form-label my-friendForm-label col-3">Bio</Label>
                                  <Field
                                    component="textarea"
                                    name="bio"
                                    className="form-control my-Input-control col"
                                    rows="4"
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-3"></div>
                                  <ErrorMessage name="bio" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className=" row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label className="form-label my-friendForm-label col-3">Summary</Label>
                                  <Field type="text" name="summary" className="form-control my-input-control col" />
                                </div>
                                <div className="row">
                                  <div className="col-3"></div>
                                  <ErrorMessage name="summary" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className=" row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label className="form-label my-friendForm-label col-3">Headline</Label>
                                  <Field type="text" name="headline" className="form-control my-input-control col" />
                                </div>
                                <div className="row">
                                  <div className="col-3"></div>
                                  <ErrorMessage name="headline" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className=" row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label className="form-label my-friendForm-label col-3">Slug</Label>
                                  <Field type="text" name="slug" className="form-control my-input-control col" />
                                </div>
                                <div className="row">
                                  <div className="col-3"></div>
                                  <ErrorMessage name="slug" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className=" row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label className="form-label my-friendForm-label col-3">Status</Label>
                                  <Field
                                    component="select"
                                    name="statusId"
                                    className="custom-select form-control my-input-control col"
                                  >
                                    <option value="">Select Status...</option>
                                    <option value="Active">Active</option>
                                    <option value="NotSet">Not Set</option>
                                    <option value="Deleted">Deleted</option>
                                    <option value="Flagged">Flagged</option>
                                  </Field>
                                </div>
                                <div className="row">
                                  <div className="col-3"></div>
                                  <ErrorMessage name="statusId" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className=" row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label className="form-label my-friendForm-label col-3">Skills</Label>
                                  <Field type="text" className="form-control my-input-control col" name="skills" />
                                  <ErrorMessage name="skills" component="div" className="friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className=" row mr-1 mb-0 align-items-top">
                              <Label className="col-3 form-label my-friendForm-label" style={{ height: "10rem" }}>
                                Primary Image
                              </Label>
                              <div className="col pl-0 pr-0" style={{ minWidth: "100px" }}>
                                <CardImg
                                  className="row ml-0"
                                  style={{
                                    objectFit: "scale-down",
                                    objectPosition: "left top",
                                    marginBottom: "0.25rem",
                                    maxHeight: "150px",
                                    maxWidth: "100%",
                                  }}
                                  src={values.primaryImageUrl}
                                  onError={this.imageFailsToLoad}
                                  onDoubleClick={this.onImageDoubleClick}
                                />
                              </div>
                              <div className="col my-auto" style={{ fontSize: "smaller", fontStyle: "oblique" }}>
                                <span>
                                  <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                </span>{" "}
                                Double click image to cycle between default image options.
                              </div>
                            </FormGroup>
                            <FormGroup className=" row mr-1 align-items-top">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label className="form-label my-friendForm-label col-3">Image URL</Label>
                                  <Field name="primaryImageUrl" className="form-control col p-1 ml-0" />
                                </div>
                                <div className="row">
                                  <div className="col-3"></div>
                                  <ErrorMessage
                                    name="primaryImageUrl"
                                    component="div"
                                    className="col friendForm-errorMsg"
                                  />
                                </div>
                              </div>
                            </FormGroup>
                            <div
                              className="row mr-1 pt-3 ml-0"
                              style={{ justifyContent: "center", borderTop: "2px #8e9194 solid" }}
                            >
                              <Button type="submit" color="success" className="m-2">
                                {this.state.friendForm.hasOwnProperty("id") ? "Update" : "Submit"}
                              </Button>
                              <Button type="button" color="warning" className="m-2" onClick={resetForm}>
                                Reset Form
                              </Button>
                              {/* The "delete" button will only appear when updating a friend */}
                              {this.state.friendForm.hasOwnProperty("id") ? (
                                <Button
                                  type="button"
                                  color="danger"
                                  className="m-2"
                                  id="friendFormDeleteButton"
                                  onClick={this.clickFriendDeleteButton}
                                >
                                  Delete Friend
                                </Button>
                              ) : (
                                ""
                              )}
                              <Button
                                type="button"
                                color="secondary"
                                className="m-2"
                                onClick={this.clickFriendCancelButton}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FriendForm);
