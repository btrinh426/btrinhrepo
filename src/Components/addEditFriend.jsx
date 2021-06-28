import React from "react";
import { NavLink } from "react-router-dom";
import FriendsService from "../services/friendsService";
import Swal from "sweetalert2";

class addEditFriend extends React.Component {
  state = {
    isEditMode: false,
    friendId: this.props.match.params.friendId,
    friendRecord: {
      id: "",
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: 1,
      primaryImage: "",
    },
  };

  componentDidMount() {
    if (this.state.friendId) {
      FriendsService.getRecordById(this.state.friendId)
        .then(this.onGetRecordByIdSuccess)
        .catch(this.onGetRecordByIdFail);
    }
  }

  onGetRecordByIdSuccess = (response) => {
    let newState = { ...this.state };
    this.setState(() => {
      newState.friendRecord.id = response.data.item.id;
      newState.friendRecord.title = response.data.item.title;
      newState.friendRecord.bio = response.data.item.bio;
      newState.friendRecord.summary = response.data.item.summary;
      newState.friendRecord.headline = response.data.item.headline;
      newState.friendRecord.slug = response.data.item.slug;
      newState.friendRecord.primaryImage =
        response.data.item.primaryImage.imageUrl;
      newState.isEditMode = true;
      return newState;
    });
  };

  onGetRecordByIdFail = (error) => {
    console.log(error.response);
  };

  toggleFormTitle = () => {
    if (this.state.isEditMode) {
      return `Edit Friend: ${this.state.friendRecord.title} (${this.state.friendRecord.id})`;
    }
    return "Create New Friend";
  };

  toggleFormButton = () => {
    if (this.state.isEditMode) {
      return (
        <button
          className="btn btn-primary btn-lg"
          type="button"
          onClick={this.updateFriendRecord}
        >
          Edit
        </button>
      );
    }
    return (
      <button
        className="btn btn-primary btn-lg"
        type="button"
        onClick={this.addNewFriend}
      >
        Add
      </button>
    );
  };

  addNewFriend = () => {
    let payload = { ...this.state.friendRecord };
    FriendsService.addFriend(payload)
      .then(this.onAddFriendSuccess)
      .catch(this.onAddFriendFail);
  };

  onAddFriendSuccess = (response) => {
    let friendId = response.data.item;
    Swal.fire({
      icon: "success",
      title: "New Friend Created",
    }).then(() => {
      this.props.history.push(`/main/friends/edit/${friendId}`);
    });
  };

  onAddFriendFail = (error) => {
    console.log(error.response);
    Swal.fire({
      icon: "error",
      title: "There was a error...",
      text: error.response.data.errors,
    });
  };

  updateStateOnChange = (e) => {
    let propName = e.currentTarget.name;
    let newVal = e.currentTarget.value;
    let newState = { ...this.state };
    this.setState(() => {
      newState.friendRecord[propName] = newVal;
      return newState;
    });
  };

  updateFriendRecord = () => {
    FriendsService.editRecordById(
      this.state.friendRecord.id,
      this.state.friendRecord
    )
      .then(this.onUpdateRecordSuccess)
      .catch(this.onUpdateRecordFail);
  };

  onUpdateRecordSuccess = (response) => {
    Swal.fire({
      icon: "success",
      title: `${this.state.friendRecord.title} updated`,
    });
  };

  onUpdateRecordFail = (error) => {
    console.log(error.response);
    Swal.fire({
      icon: "error",
      title: `Error updating ${this.state.friendRecord.title}`,
    });
  };

  render() {
    //console.log(this.state);
    return (
      <div className="col-12 mt-3">
        <div className="col-xl-5 col-lg-7 col-md-7 col-sm-10 col-10 bg-white border p-0">
          <div className="bg-white m-auto pb-1 pt-1 pl-3 border-bottom">
            <h6 className="text-muted mt-2 mb-2" id="friendTitle">
              {this.toggleFormTitle()}
            </h6>
          </div>

          <form className="p-3">
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="title"
                  value={this.state.friendRecord.title}
                  onChange={this.updateStateOnChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Headline
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="headline"
                  value={this.state.friendRecord.headline}
                  onChange={this.updateStateOnChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Summary
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="summary"
                  value={this.state.friendRecord.summary}
                  onChange={this.updateStateOnChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Bio
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="bio"
                  value={this.state.friendRecord.bio}
                  onChange={this.updateStateOnChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Website
              </label>
              <div className="col-sm-10">
                <input
                  type="url"
                  className="form-control form-control-sm"
                  name="slug"
                  value={this.state.friendRecord.slug}
                  onChange={this.updateStateOnChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Avatar Image URL
              </label>
              <div className="col-sm-10">
                <input
                  type="url"
                  className="form-control form-control-sm"
                  name="primaryImage"
                  value={this.state.friendRecord.primaryImage}
                  onChange={this.updateStateOnChange}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="row justify-content-between d-flex">
                <div>
                  <NavLink
                    to="/main/friends"
                    className="btn btn-outline-primary"
                  >
                    Back
                  </NavLink>
                </div>
                <div>{this.toggleFormButton()}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default addEditFriend;
