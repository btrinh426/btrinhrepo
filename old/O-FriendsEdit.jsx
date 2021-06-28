import React from "react";
import * as friendsService from "../../services/friendsService.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class FriendsEdit extends React.Component {
  state = {
    friend: {
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
    console.log("componentDidMount is firing from FriendsEdit");
    let friendId = this.props.match.params.friendId;

    console.log("friendId", { friendId });

    friendsService
      .getById(friendId)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);
  }

  onGetByIdSuccess = (response) => {
    console.log("onGetByIdSuccess is firing from FriendsEdit", response.data);

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
    console.log("onGetByIdError is firing from FriendsEdit", err);
  };
  onFormFieldChanged = (e) => {
    console.log("onFormFieldChanged is firing from FriendsEdit");
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state.friend };

      newState[inputName] = newValue;

      return { friend: newState };
    });
  };

  onUpdateFriendClicked = (e) => {
    e.preventDefault();
    console.log("onUpdateFriendClicked is firing");

    // let data = { ...this.state.friend };
    console.log("onUpdateFriendClicked", this.state);

    let data = {
      id: this.state.friend.id,
      title: this.state.friend.title,
      bio: this.state.friend.bio,
      summary: this.state.friend.summary,
      headline: this.state.friend.headline,
      slug: this.state.friend.slug,
      statusId: 1,
      primaryImage: this.state.friend.primaryImage,
    };

    console.log("This is the form data to be submitted: ", data);

    friendsService
      .udpateFriend(data.id, data)
      .then(this.onUpdateFriendSuccess)
      .catch(this.onUpdateFriendError);
  };
  onUpdateFriendError = (err) => {
    console.log("onUpdateFriendError is firing", err);

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
  onUpdateFriendSuccess = (response) => {
    console.log("onUpdateFriendSuccess is firing", response);
    let notify = () =>
      toast.success(
        `You have updated ${this.state.friend.title}'s contact information.`,
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
        <div className="container">
          <div className="row">
            <div className="col-6 p-1">
              <h1 className="p-2">Edit Friend</h1>
              <form className="p-2">
                <div className="form-group">
                  <label htmlFor="title">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friend.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bio"
                    name="bio"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friend.bio}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="summary">Summary</label>
                  <input
                    type="text"
                    className="form-control"
                    id="summary"
                    name="summary"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friend.summary}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="headline">Headline</label>
                  <input
                    type="text"
                    className="form-control"
                    id="headline"
                    name="headline"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friend.headline}
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
                    value={this.state.friend.slug}
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
                    value={this.state.friend.primaryImage.imageUrl}
                  />
                </div>
                <div className="p-1 d-inline">
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="addFriend"
                    name="addFriend"
                    onClick={this.onUpdateFriendClicked}
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FriendsEdit;
