import React, { Component } from "react";
import { postFriend, updateFriend } from "../services/friendsService";
import { currentUser } from "../services/appService";
// import debug from "sabio-debug";
// const _logger = debug.extend("Add/Edit");

class AddorEdit extends Component {
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
  };

  componentDidMount() {
    // currentUser()
    //   .then(this.onCurrentUserSuccess)
    //   .catch(this.onCurrentUserError);

    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "friend_Obj") {
        let newFriend = locState.payload.oneFriend;
        newFriend.primaryImage = newFriend.primaryImage.imageUrl;

        //console.log(friend);
        this.setState(() => {
          return { friend: newFriend };
        });
      }
    }
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.name;

    this.setState(() => {
      let friend = { ...this.state.friend };
      friend[inputData] = newValue;
      return { friend };
    });
  };

  handleClick = (e) => {
    e.preventDefault();

    if (this.props.location.state) {
      console.log(this.state.friend);
      updateFriend(this.state.friend)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendError);
    } else {
      postFriend(this.state.friend)
        .then(this.onPostUserSuccess)
        .catch(this.onPostUserError);
    }
  };

  onPostFriendSuccess = (response) => console.log(response);
  onPostFriendError = (response) => console.log(response);
  onCurrentUserSuccess = (response) => console.log(response);
  onCurrentUserError = (response) => console.log(response);
  onUpdateFriendSuccess = (response) => console.log(response);
  onUpdateFriendError = (response) => console.log(response);

  render() {
    return (
      <React.Fragment>
        <span className="navbar-brand mb-0 h1" id="nav1">
          Add or Edit Friend
        </span>
        <form className="form1" />
        <div className="container-fluid" />

        <div className="row mb-3" />
        <label htmlFor="title" className="col-sm-2 col-form-label">
          Title
        </label>
        <div className="col-sm-10" />
        <input
          type="text"
          className="form-control"
          name="title"
          value={this.state.friend.title}
          onChange={this.onFormFieldChanged}
        />

        <div className="row mb-3" />
        <label htmlFor="bio" className="col-sm-2 col-form-label">
          Bio
        </label>
        <div className="col-sm-10" />
        <input
          type="text"
          className="form-control"
          name="bio"
          value={this.state.friend.bio}
          onChange={this.onFormFieldChanged}
        />

        <div className="row mb-3" />
        <label htmlFor="summary" className="col-sm-2 col-form-label">
          Summary
        </label>
        <div className="col-sm-10" />
        <input
          type="text"
          className="form-control"
          name="summary"
          value={this.state.friend.summary}
          onChange={this.onFormFieldChanged}
        />

        <div className="row mb-3" />
        <label htmlFor="headline" className="col-sm-2 col-form-label">
          Headline
        </label>
        <div className="col-sm-10" />
        <input
          type="text"
          className="form-control"
          name="headline"
          value={this.state.friend.headline}
          onChange={this.onFormFieldChanged}
        />

        <div className="row mb-3" />
        <label htmlFor="slug" className="col-sm-2 col-form-label">
          Slug
        </label>
        <div className="col-sm-10" />
        <input
          type="text"
          className="form-control"
          name="slug"
          value={this.state.friend.slug}
          onChange={this.onFormFieldChanged}
        />

        <div className="row mb-3" />
        <label htmlFor="status" className="col-sm-2 col-form-label">
          Status
        </label>
        <div className="col-sm-10" />
        <input
          type="text"
          className="form-control"
          name="statusId"
          value={this.state.friend.statusId}
          onChange={this.onFormFieldChanged}
        />

        {/* <div className="row mb-3" />
        <label htmlFor="skills" className="col-sm-2 col-form-label">
          Skills
        </label>
        <div className="col-sm-10" />
        <input
          type="text"
          className="form-control"
          name="skills"
          value={this.state.friend.skills}
          onChange={this.onFormFieldChanged}
        /> */}

        <div className="row mb-3" />
        <label htmlFor="Primary Image" className="col-sm-2 col-form-label">
          Primary Image
        </label>
        <div className="col-sm-10" />
        <input
          type="text"
          className="form-control"
          name="primaryImage"
          value={this.state.friend.primaryImage}
          onChange={this.onFormFieldChanged}
        />

        <button
          type="submit"
          className="btn btn-primary submit"
          onClick={this.handleClick}
        >
          Submit
        </button>
      </React.Fragment>
    );
  }
}

export default AddorEdit;
