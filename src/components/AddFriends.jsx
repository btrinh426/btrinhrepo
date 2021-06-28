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
    let friendId = this.props.match.params.friendId;
    console.log("FriendAdd componentDidMount", { friendId });
    if (friendId) {
      FriendsService.getById(friendId)
        .then(this.onEditByIdSuccess)
        .catch(this.onEditByIdError);
    }
    console.log("Got Friend", { friendId });
  }

  componentDidUpdate(prevProps) {
    let friendId = this.props.match.params.friendId;
    console.log("Add Friends componentDidUpdate");
    if (friendId && prevProps.match.params.friendId !== friendId) {
      console.log("making an ajax call for input Id out of cDU;", { friendId });

      debugger;
    }
  }
  onEditByIdSuccess = (response) => {
    console.log({ ...response.data });

    this.setState(() => {
      let newState = { ...this.state.friendData };
      let cardData = { ...response.data.item };
      newState = {
        title: cardData.title,
        bio: cardData.bio,
        summary: cardData.summary,
        headline: cardData.headline,
        slug: cardData.slug,
        statusId: cardData.statusId,
        primaryImage: cardData.primaryImage.imageUrl,
        friendId: "Friend",
      };
      console.log({ friendData: newState });
      return { friendData: newState };
    });
  };
  onEditByIdError = (err) => {
    console.error(err);
  };

  onGetByIdSuccess = (res) => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState = res.data.item;
      newState.primaryImage = res.data.item.primaryImage.imageUrl;
      return newState;
    });
    console.log(this.state);
  };

  onGetByIdError = (res) => {
    console.error(res);
  };

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
  onEditClicked = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const data = this.state.friendData;
    let id = this.props.match.params.friendId;

    if (id) {
      FriendsService.update(data, id)
        .then(this.onEditFriendSuccess)
        .catch(this.onEditFriendError);
    } else {
      FriendsService.addFriend(data)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };

  onEditFriendSuccess = (response) => {
    toast.info("Edit Submitted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    this.props.history.push("/Friends/");
    console.log(response);
  };
  onEditFriendError = (errResponse) => {
    toast.warning("Edit not submitted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log(errResponse);
  };

  onAddFriendSuccess = (response) => {
    toast.success("Add friend successful", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log("Successfully added friend", response);
    this.props.history.push("/Friends/");
  };

  onAddFriendError = (err) => {
    toast.warning("Add friend unsuccessful", err, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.error(err);
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <h5>User Profile</h5>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="inputTitle">Title</label>
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
            <label htmlFor="inputPrimaryImage">Primary Image</label>
            <input
              type="url"
              className="form-control"
              id="primaryImage"
              name="primaryImage"
              value={this.state.friendData.primaryImage}
              onChange={this.onFormFieldChanged}
            />
            <div className="form-group row">
              <input
                id="friendId"
                type="hidden"
                value={this.state.friendData.friendId}
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-secondary btn-lg btn-block"
            onClick={this.onEditClicked}
          >
            Update
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AddFriends;
