import React from "react";
import buildFriend from "../services/friendsService";

class Friends extends React.Component {
  state = {
    friendForm: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
  };

  // componentDidMount() {
  //   let editFriendData = { ...this.props.location.state };
  //   console.log(editFriendData);
  //   if (editFriendData) {
  //     this.setState(() => {
  //       //fix primary image results
  //       return { friendForm: editFriendData };
  //     });
  //   }
  // }
  onInputChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let friendData = { ...this.state.friendForm };
      friendData[inputName] = newValue;
      return { friendForm: friendData };
    });
  };

  // add a friend
  onAddFriendClicked = (e) => {
    e.preventDefault();
    buildFriend(this.state.friendForm)
      .then(this.onAddFriendSuccess)
      .catch(this.onAddFriendError);
    console.log("adding friend....");
  };
  onAddFriendSuccess = (response) => {
    //add user notification
    console.log(response);
  };
  onAddFriendError = (response) => {
    console.log(response);
  };

  //render friends

  onShowFriendsClicked = (e) => {
    e.preventDefault();
    this.props.history.push("/list");
    console.log(e.currentTarget);
  };
  onShowFriendsSuccess = (response) => {};

  onShowFriendsError = (err) => {
    console.log(err);
  };

  render() {
    return (
      <React.Fragment>
        <div className=" friends main">
          <h3>Add a Friend</h3>
          <form id="registerForm">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={this.state.friendForm.title}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <input
                type="text"
                className="form-control"
                name="bio"
                value={this.state.friendForm.bio}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Summary</label>
              <input
                type="text"
                className="form-control"
                name="summary"
                value={this.state.friendForm.summary}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Headline</label>
              <input
                type="text"
                className="form-control"
                name="headline"
                value={this.state.friendForm.headline}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>SLUG</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                value={this.state.friendForm.slug}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Status Id</label>
              <input
                type="text"
                className="form-control"
                name="statusId"
                value={this.state.friendForm.statusId}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Primary Image</label>
              <input
                type="text"
                className="form-control"
                name="primaryImage"
                value={this.state.friendForm.primaryImage}
                onChange={this.onInputChanged}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onAddFriendClicked}
            >
              Add Friend
            </button>
            <div>
              <button
                type="submit"
                className="btn btn-success"
                onClick={this.onShowFriendsClicked}
              >
                Show Friends
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
