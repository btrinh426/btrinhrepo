import React from "react";
// import { Route } from "react-router-dom";
// import Friends from "./Friends";
import * as friendService from "../services/friendsService";
import { toast } from "react-toastify";

class FriendAdd extends React.Component {
  state = {
    friendData: {
      title: "X",
      bio: "This is a biography. It is very long.",
      summary: "This is a summary.",
      headline: "Name",
      slug: "slug@url.com",
      statusId: "1",
      primaryImage: "image.jpg",
      friendId: "TrelloFriend",
    },
  };

  componentDidMount() {
    let id = this.props.match.params.friendId;
    console.log(" FriendAdd componentDidMount", { id });
    if (id) {
      friendService
        .getById(id)
        .then(this.onEditByIdSuccess)
        .catch(this.onEditByIdError);
    }
    console.log("Got Friend", { id });
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
        friendId: "TrelloFriend",
      };
      console.log({ friendData: newState });
      return { friendData: newState };
    });
  };
  onEditByIdError = (err) => {
    console.error(err);
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.id;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = { ...this.state.friendData };
      newState[inputData] = newValue;
      //   console.log({ friendData: newState });
      return { friendData: newState };
    });
  };

  onUpdateClicked = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state.friendData);
    const data = this.state.friendData;
    let id = this.props.match.params.friendId;

    if (id) {
      friendService
        .editById(data, id)
        .then(this.onEditFriendSuccess)
        .catch(this.onEditFriendError);
    } else {
      friendService
        .add(data)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };

  onAddFriendSuccess = (response) => {
    console.log({ update: response.data });
    this.props.history.push("/friends/");
    toast["success"]("You Added A New Friend", "New Friend");
  };
  onAddFriendError = (err) => {
    console.error(err);
    toast["error"]("You Haven't Added A New Friend", "New Friend");
  };

  onEditFriendSuccess = (response) => {
    console.log({ update: response.data });
    this.props.history.push("/friends/");
    toast["success"]("You Updated Your Friend", "Update Friend");
  };
  onAddFriendError = (err) => {
    console.error(err);
    toast["error"]("You Haven't Updated Your Friend", "Update Friend");
  };

  render() {
    return (
      <React.Fragment>
        <div className="card-friend">
          <h5 className="card-header">Friend Profile</h5>
          <div className="card-body">
            <form ref={(form) => (this.form = form)}>
              <div className="form-group row">
                <label htmlFor="inputTitle" className="col-sm-1 col-form-label">
                  Title
                </label>
                <div className="col-sm-11">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="titleHelp"
                    placeholder="Enter Title"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.title}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputBio" className="col-sm-1 col-form-label">
                  Bio
                </label>
                <div className="col-sm-11">
                  <textarea
                    type="text"
                    className="form-control"
                    id="bio"
                    placeholder="Add Bio"
                    rows="3"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.bio}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputSummary"
                  className="col-sm-1 col-form-label"
                >
                  Summary
                </label>
                <div className="col-sm-11">
                  <input
                    type="text"
                    className="form-control"
                    id="summary"
                    aria-describedby="summaryHelp"
                    placeholder="Enter Summary of Bio"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.summary}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputHeadline"
                  className="col-sm-1 col-form-label"
                >
                  Headline
                </label>
                <div className="col-sm-11">
                  <input
                    type="text"
                    className="form-control"
                    id="headline"
                    aria-describedby="headlineHelp"
                    placeholder="Enter Headline"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.headline}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputSlug" className="col-sm-1 col-form-label">
                  Slug
                </label>
                <div className="col-sm-11">
                  <input
                    type="url"
                    className="form-control"
                    id="slug"
                    aria-describedby="slugHelp"
                    placeholder="Enter Slug URL"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.slug}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputStatus"
                  className="col-sm-1 col-form-label"
                >
                  Status
                </label>
                <div className="col-sm-11">
                  <input
                    type="text"
                    className="form-control"
                    id="statusId"
                    aria-describedby="stausHelp"
                    placeholder="Active[1] or Deactive"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.statusId}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="inputPrimaryImage"
                  className="col-sm-1 col-form-label"
                >
                  Primary Image
                </label>
                <div className="col-sm-11">
                  <input
                    type="url"
                    className="form-control"
                    id="primaryImage"
                    aria-describedby="primaryImageHelp"
                    placeholder="Enter Primary Image URL"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.primaryImage}
                  />
                </div>
              </div>
              <div className="form-group row">
                <input
                  id="friendId"
                  type="hidden"
                  value={this.state.friendData.friendId}
                ></input>
              </div>
            </form>
            <button
              type="submit"
              className="btn btn-secondary btn-lg btn-block"
              onClick={this.onUpdateClicked}
            >
              Update
            </button>
            {/* <Route path="/friends/" component={Friends}></Route> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FriendAdd;
