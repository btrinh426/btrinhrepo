import React from "react";

import FriendsService from "../services/FriendsService";

import { toast } from "react-toastify";

class AddFriends extends React.Component {
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
        friendId: "",
      },
    };
  }
  componentDidMount() {
    let id = this.props.match.params.friendId;
    console.log("FriendAdd componentDidMount", { id });
    if (id) {
      FriendsService.getById(id)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdError);
    }
  }
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let friendData = { ...this.state.friendData };

      friendData[inputName] = newValue;

      return { friendData };
    });
  };
  onAddFriendClicked = (e) => {
    e.preventDefault();
    const data = this.state.friendData;
    FriendsService.addFriend(data)
      .then(this.onAddFriendSuccess)
      .catch(this.onAddFriendError);
    console.log("addFriend was clicked");
  };

  onAddFriendSuccess = (response) => {
    toast.success("Add friend successful", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log("Successfully added friend", response);
    this.props.history.push("/Login/");
  };

  onAddFriendError = (err) => {
    toast.warning("Add friend unsuccessful", err, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.error(err);
  };
  onEditClicked = (e) => {
    e.preventDefault();
    if (this.state.friendData.id) {
      var id = e.currentTarget.id;
      FriendsService.getById(id)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdError);
    }

    //   var payload = this.state.friendData;
    //   FriendsService.update(id, payload)
    //     .then(this.onEditFriendSuccess)
    //     .catch(this.onEditFriendError);
    // } else {
    //   FriendsService.addFriend(this.state.friendData)
    //     .then(this.onAddFriendSuccess)
    //     .catch(this.onAddFriendError);
    // }
  };

  onGetByIdSuccess = (response) => {
    toast.info("Edit Submitted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    this.props.history.push("/Friends/View");
    console.log(response);
  };
  onEditFriendError = (errResponse) => {
    toast.warning("Edits not submitted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log(errResponse);
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <h5>User Profile</h5>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="inputTitle">Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={this.state.friendData.title}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputBio">Bio</label>
            <input
              type="text"
              className="form-control"
              id="bio"
              name="bio"
              value={this.state.friendData.bio}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSummary">Summary</label>
            <input
              type="text"
              className="form-control"
              id="summary"
              name="summary"
              value={this.state.friendData.summary}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSlug">Headline</label>
            <input
              type="text"
              className="form-control"
              id="headline"
              name="headline"
              value={this.state.friendData.headline}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSlug">Slug</label>
            <input
              type="text"
              className="form-control"
              id="slug"
              name="slug"
              value={this.state.friendData.slug}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSlug">Status Id</label>
            <input
              type="text"
              className="form-control"
              id="statusId"
              name="statusId"
              value={this.state.friendData.statusId}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSlug">Primary Image</label>
            <input
              type="text"
              className="form-control"
              id="primaryImage"
              name="primaryImage"
              value={this.state.friendData.primaryImage}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            id="addFriend"
            name="addFriend"
            onClick={this.onAddFriendClicked}
          >
            Add Friend
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AddFriends;
