import React, { Component } from "react";
import { postFriends, updateFriends } from "../services/friendsService";
import { toast } from "react-toastify";
import { currentUser } from "../services/userService";

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

  handleClick = (e) => {
    e.preventDefault();
    console.log("postfriends");

    if (this.props.location.state) {
      postFriends(this.state.friend)
        .then(this.onPostFriendsSuccess)
        .catch(this.onPostFriendsError);
    }
    if (this.props.location.state) {
      updateFriends(this.state.friend)
        .then(this.onUpdateFriendsSuccess)
        .catch(this.onUpdateFriendsError);
    }
  };

  onPostFriendsSuccess = (res) => {
    console.log({ friend: res });
    toast.success(`You have successfully added a new friend!`);
    this.props.history.push("/friends");
  };

  onPostFriendsError = (res) => {
    console.log("error");

    toast.error(`Error`);
  };

  render() {
    return (
      <div>
        <div className="form-group">
          <div className="form-group">
            <label>Title</label>
            <input
              onChange={this.onInputChange}
              name="title"
              value={this.state.friend.title}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <input
              onChange={this.onInputChange}
              name="bio"
              value={this.state.friend.bio}
              className="form-control"
              id="inputBio"
              placeholder="Bio"
            />
          </div>
          <div className="form-group">
            <label>Summary</label>
            <input
              onChange={this.onInputChange}
              name="summary"
              value={this.state.friend.summary}
              className="form-control"
              id="inputSummary"
              aria-describedby="summary"
              placeholder="Enter Summary"
            />
          </div>
          <div className="form-group">
            <label>Headline</label>
            <input
              onChange={this.onInputChange}
              name="headline"
              value={this.state.friend.password}
              className="form-control"
              type="headline"
              id="inputHeadline"
              placeholder="Headline"
            />
          </div>
          <div className="form-group">
            <label>Skills</label>
            <input
              onChange={this.onInputChange}
              value={this.state.friend.passwordConfirm}
              name="skills"
              type="skills"
              className="form-control"
              id="skills"
              placeholder="skills"
            />
          </div>

          <div className="form-group"></div>
          <label> Slug</label>
          <input
            onChange={this.onInputChange}
            name="slug"
            type="slug"
            className="form"
            value={this.state.friend.slug}
            placeholder="slug"
          />

          <div className="form-group">
            <label> Status Id</label>
            <input
              onChange={this.onInputChange}
              name="statusId"
              value={this.state.friend.statusId}
              className="form-control"
              id="statusId"
              placeholder="Status Id"
            />
          </div>
          <div className="form-group">
            <label>Primary Image</label>
            <input
              onChange={this.onInputChange}
              name="primaryImage"
              value={this.state.friend.primaryImage}
              className="form-control"
              id="primaryImage"
              placeholder="Primary Image"
            />
          </div>
          <button onClick={this.handleClick}>Submit</button>
        </div>
      </div>
    );
  }
}
export default AddOrEditFriends;
