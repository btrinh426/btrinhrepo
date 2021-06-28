import React, { Component } from "react";

import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as friendService from "./friendService";

class FriendsAdd extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "Active",
      primaryImage: "",
      // friendId: "",
    },
  };

  componentDidMount() {
    let friendId = this.props.match.params.id;
    console.log(friendId); //friendId or id?

    if (friendId) {
      friendService
        .onGetById(friendId)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdFail);
    }
    console.log("Found a friend", { friendId });
  }

  onGetByIdSuccess = (response) => {
    console.log({ ...response.data });

    this.setState(() => {
      let newState = { ...this.state.formData };
      let newData = { ...response.data.item };

      newState = {
        title: newData.title,
        bio: newData.bio,
        summary: newData.summary,
        headline: newData.headline,
        slug: newData.slug,
        statusId: newData.statusId,
        primaryImage: newData.primaryImage.imageUrl,
        // friendId: ""form,
      };
      console.log({ formData: newState });
      return { formData: newState };
    });
  };

  onGetByIdFail = (err) => {
    console.error(err);
  };

  onFriendFormChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = { ...this.state.formData };
      newState[inputName] = newValue;

      return { formData: newState };
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    let data = this.state.formData;
    let id = this.props.match.params.friendId;
    // let currentTarget = e.currentTarget;
    // let id = currentTarget.dataset.friendId;
    console.log(id);
    if (id) {
      friendService
        .onEdit(data, id)
        .then(this.onEditSuccess)
        .catch(this.onEditFail);
    } else {
      friendService
        .onRegister(this.state.formData)
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitFail);
    }
  };

  onEditSuccess = (response) => {
    this.props.history.push("/friends");
    toast.success("Update successful!", response);
  };

  onEditFail = (err) => {
    console.error(err);
    toast.error("Update Failed");
  };

  onSubmitSuccess = (response) => {
    toast.success("Submit Successful", response);
  };

  onSubmitFail = (err) => {
    console.error(err);
    toast.error("Submit Failed");
  };

  // onCancel = (e) => {
  //   e.preventDefault();
  //   this.setState(() => {
  //     return {
  //       formData: null,
  //     };
  //   }, this.stateChanged);
  // };

  render() {
    return (
      <React.Fragment>
        <h1 className="registerHeader">Friend Form</h1>

        <form onSubmit={this.onSubmitClicked}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={this.onFriendFormChanged}
              value={this.state.formData.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              className="form-control"
              id="bio"
              name="bio"
              onChange={this.onFriendFormChanged}
              value={this.state.formData.bio}
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              className="form-control"
              id="summary"
              name="summary"
              onChange={this.onFriendFormChanged}
              value={this.state.formData.summary}
            />
          </div>
          <div className="form-group">
            <label htmlFor="headline">Headline</label>
            <input
              type="text"
              className="form-control"
              id="headline"
              name="headline"
              onChange={this.onFriendFormChanged}
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
              onChange={this.onFriendFormChanged}
              value={this.state.formData.slug}
            />
          </div>
          <div className="form-group">
            <label htmlFor="statusId">Status ID</label>
            <input
              type="text"
              className="form-control"
              //   placeholder="NotSet"
              id="statusId "
              name="statusId"
              onChange={this.onFriendFormChanged}
              value={this.state.formData.statusId}
            />
          </div>
          <div className="form-group">
            <label htmlFor="primaryImage">Picture URL</label>
            <input
              type="url"
              className="form-control"
              id="primaryImage"
              name="primaryImage"
              onChange={this.onFriendFormChanged}
              value={this.state.formData.primaryImage}
            />
          </div>
          <div className="form-group">
            <input
              id="friendId"
              type="hidden"
              value={this.state.formData.friendId}
            ></input>
          </div>
          {/* <button type="submit" className="btn btn-primary" /> */}
          <button type="submit" className="submit">
            Submit
          </button>
          {/* <button type="submit" className="cancel" onClick={this.onCancel}>
            Cancel
          </button> */}
          {/* onClick={submitClicked} */}
        </form>
      </React.Fragment>
    );
  }
}

export default FriendsAdd;
