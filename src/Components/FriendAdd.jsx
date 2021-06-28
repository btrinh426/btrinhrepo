import React from "react";
// import { Route } from "react-router-dom";
// import Friends from "./Friends";
import * as friendService from "../services/friendsService";
import { toast } from "react-toastify";
import * as fileService from "../services/fileService";

class FriendAdd extends React.Component {
  state = {
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
  // ----- On Component Did Mount -----
  componentDidMount() {
    let id = this.props.match.params.friendId;
    console.log(" FriendAdd componentDidMount", { id });
    if (
      id &&
      this.props.location.state &&
      this.props.location.state.type === "EDIT"
    ) {
      this.setState(() => {
        let newState = undefined;
        // { ...this.state.friendData };
        let cardData = { ...this.props.location.state.payload };
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
    } else if (id) {
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
    toast["error"]("You Have No Friend with This Id", "Edit Friend");
  };

  // ----- Changing the form fields -----
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

  // ----- On Upload Image Change -----
  // handleUploadChangeSingle = (e) => {
  //   console.log(e.target.files[0]);
  //   let selectedFile = e.target.files[0];
  //   this.setState((prevState) => {
  //     let newState = { ...prevState };
  //     newState.selectedFile = selectedFile;
  //     return newState;
  //   });
  // };

  handleUploadChange = (e) => {
    console.log(e.target.files);
    let selectedFile = e.target.files[0];
    console.log(selectedFile);

    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.selectedFile = selectedFile;
      return newState;
    });
  };

  // ----- Clicking the Update Button -----
  onUpdateClicked = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state.friendData);
    const data = new FormData();
    data.append("file", this.state.selectedFile);

    console.log(this.state.selectedFile);

    fileService
      .picture(data)
      .then(this.onPicUploadSuccess)
      .catch(this.onPicUploadError);
  };

  onPicUploadSuccess = (response) => {
    console.log({ upload: response });
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.friendData.primaryImage = response.data.items[0];
      console.log(newState);
      return newState;
    });

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

  onPicUploadError = (err) => {
    console.error(err);
  };

  onAddFriendSuccess = (response) => {
    console.log({ update: response.data });
    this.props.history.push("/friends/");
    toast["success"]("You Added A New Friend", "New Friend");
  };
  onAddFriendError = (err) => {
    console.error(err);
    if (err.response.data.errors) {
      toast["error"](`${err.response.data.errors}`, "New Friend");
    } else {
      toast["error"](`${err}`, "New Friend");
    }
  };

  onEditFriendSuccess = (response) => {
    console.log({ update: response.data });
    this.props.history.push("/friends/");
    toast["success"]("You Updated Your Friend", "Update Friend");
  };
  onEditFriendError = (err) => {
    console.error(err);
    toast["error"](`${err.response.data.errors}`, "Update Friend");
  };

  //----- Render -----
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
              <span className="Picture Url Form">
                {/* <div className="form-group row">
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
              </div> */}
              </span>
              <div className="form-group row">
                <label
                  htmlFor="formControlFile"
                  className="col-sm-1 col-form-label"
                >
                  Primary Image
                </label>
                <div className="col-sm-3">
                  <input
                    type="file"
                    className="form-control-file"
                    id="primaryImage"
                    multiple
                    onChange={this.handleUploadChange}
                    accept=""
                  />
                </div>
                {/* <div className="col-sm-3">
                  <img
                    className="img-friend"
                    src={this.state.friendData.primaryImage}
                    alt="Friend Avatar"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.primaryImage}
                  />
                </div> */}
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
