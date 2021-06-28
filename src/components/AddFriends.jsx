import React, { Component } from "react";
import * as friendService from "../services/friendService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

class AddFriends extends Component {
  state = {
    firendsFormData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "Active",
      skills: "", //**is it ok to pass more data than required by the call- We have moved on from i=t for now!!!/
      primaryImage: "",
    },

    editId: null,
  };

  componentDidMount() {
    let friendToEditId = this.props.match.params.id;
    if (friendToEditId) {
      console.log("From IF>>>>> form should be populated already!!!");

      friendService
        .getById(friendToEditId)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdError);
    }
  }

  onGetByIdSuccess = (response) => {
    let currentInfoToBeEditted = response.data.item;
    let currentIdToBeEditted = response.data.item.id;
    console.log(
      "friend in need of edit is: ",
      { currentIdToBeEditted },
      { currentInfoToBeEditted }
    );

    this.setState(() => {
      let firendsFormDataToBeEditted = { ...this.state.firendsFormData };
      currentInfoToBeEditted.skills = firendsFormDataToBeEditted.skills;
      // *** no matter how I re-write this, I can NOT get the skills back from the getBYId call caused by Edit btn !!!!!!!???????????
      // *** (skills ALWAYS comes back "" afret "edit" is clicked, because it never gets saved in the database ???)
      // *** I even tried fixing the state afte the "onAddFriendSuccess", but didn't work
      currentInfoToBeEditted.primaryImage =
        currentInfoToBeEditted.primaryImage.imageUrl;
      firendsFormDataToBeEditted = currentInfoToBeEditted;

      return {
        firendsFormData: firendsFormDataToBeEditted,
        editId: currentIdToBeEditted,
      };
    });
  };

  onGetByIdError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  onFromFieldChanged = (e) => {
    let fieldTochange = e.currentTarget;
    let fieldValue = fieldTochange.value;
    let fieldName = fieldTochange.name;

    this.setState(() => {
      let newfirendsFormData = { ...this.state.firendsFormData };
      newfirendsFormData[fieldName] = fieldValue;
      // console.log({ newfirendsFormData });
      return { firendsFormData: newfirendsFormData };
    });
  };

  addFriendRequested = () => {
    let friendData = this.state.firendsFormData;

    friendService
      .addFriend(friendData)
      .then(this.onAddFriendSuccess)
      .catch(this.onAddFriendError);
  };

  onAddFriendSuccess = (response) => {
    Swal.fire("Friend successfully added!");

    this.setState(() => {
      //*** Why??? */
      let addedFriendInfo = { ...this.state.firendsFormData };
      addedFriendInfo.skills = this.state.firendsFormData.skills;

      return { firendsFormData: addedFriendInfo };
    });
  };

  onAddFriendError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  editFriendRequested = () => {
    let friendToEditId = this.state.editId;
    let friendToEditData = this.state.firendsFormData;
    friendService
      .editFriend(friendToEditId, friendToEditData)
      .then(this.onEditFriendSuccess)
      .catch(this.onEditFriendError);
  };

  onEditFriendSuccess = (response) => {
    Swal.fire("Friend successfully editted!");
    this.props.history.push("/add-friends"); //*** so that we can add a new friend!
  };

  onEditFriendError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  render() {
    // console.log("Friends is Rendering ...");
    return (
      <React.Fragment>
        <div className="container">
          <div className="form-group row">
            <h5>Add or Edit Friend</h5>
          </div>
          <form>
            <div className="form-group row">
              <label
                htmlFor="forFriendTitle"
                className="col-sm-2 col-form-label"
              >
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forFriendTitle"
                  placeholder="Your Friend's Name"
                  name="title"
                  value={this.state.firendsFormData.title}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="forFriendBio" className="col-sm-2 col-form-label">
                Bio
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forFriendBio"
                  placeholder="Biography of person describing who is the person"
                  name="bio"
                  value={this.state.firendsFormData.bio}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="forFriendSummary"
                className="col-sm-2 col-form-label"
              >
                Summary
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forFriendSummary"
                  placeholder="Summarizes the bio of person for sharing"
                  name="summary"
                  value={this.state.firendsFormData.summary}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="forFriendHeadline"
                className="col-sm-2 col-form-label"
              >
                Headline
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forFriendHeadline"
                  placeholder="The headline title for Person, used for sharing post"
                  name="headline"
                  value={this.state.firendsFormData.headline}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="forFriendSlug"
                className="col-sm-2 col-form-label"
              >
                Slug
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forFriendSlug"
                  placeholder="a unique string to create a unique url based on the title of headline"
                  name="slug"
                  value={this.state.firendsFormData.slug}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="forFriendStatuse"
                className="col-sm-2 col-form-label"
              >
                Status
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forFriendStatus"
                  placeholder="[ NotSet, Active, Deleted, Flagged ]"
                  name="statusId"
                  value={this.state.firendsFormData.statusId}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="forFriendSkills"
                className="col-sm-2 col-form-label"
              >
                Skills
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forFriendSkills"
                  placeholder="Your friend's skills"
                  name="skills"
                  value={this.state.firendsFormData.skills}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="forFriendPrimaryImage"
                className="col-sm-2 col-form-label"
              >
                Primary Image
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="forFriendPrimaryImage"
                  placeholder="Your friend's image"
                  name="primaryImage"
                  value={this.state.firendsFormData.primaryImage}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    this.state.editId
                      ? this.editFriendRequested
                      : this.addFriendRequested
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddFriends;
