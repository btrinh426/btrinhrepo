import React from "react";

import * as friendService from "../services/friendService";

class FriendsForm extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };
  onSubmitClicked = (e, id) => {
    e.preventDefault();

    console.log(e);
    // console.log("I was clicked.", new Date());
    // console.log("state", this.state.formData);
    if (id) {
      friendService
        .updateFriend(id, this.state.formData)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendError);
    } else {
      friendService
        .createFriend(this.state.formData)
        .then(this.onCreateFriendSuccess)
        .catch(this.onCreateFriendError);
    }
  };

  onUpdateFriendSuccess = (response) => {
    console.log(response);
  };

  onUpdateFriendError = (err) => {
    console.error(err);
  };

  onCreateFriendSuccess = (response) => {
    console.log(response);
    this.props.history.push("/friends/");
  };

  onCreateFriendError = (errResponse) => {
    console.log(errResponse);
  };

  componentDidMount() {
    let id = this.props.match.params.friendId;

    if (id) {
      friendService
        .getFriendById(id)
        .then(this.onGetFriendByIdSuccess)
        .catch(this.onGetFriendByIdError);
    } else {
    }
  }

  onGetFriendByIdSuccess = (response) => {
    console.log(response);

    // var updater = (prevState, props) => {
    //   var formData = { ...prevState.formData };
    //   formData.title = response.data.item.title;
    //   return { formData };
    // };

    this.setState((prevState) => {
      let formData = { ...prevState.formData };
      formData.title = response.data.item.title;
      formData.bio = response.data.item.bio;
      formData.summary = response.data.item.summary;
      formData.headline = response.data.item.headline;
      formData.slug = response.data.item.slug;
      formData.statusId = response.data.item.statusId;
      formData.primaryImage = response.data.item.primaryImage.imageUrl;
      return { formData };
    });
  };

  onGetFriendByIdError = (err) => {
    console.error(err);
  };
  render() {
    return (
      <React.Fragment>
        <form style={{ position: "relative", top: "100px" }}>
          <p align="center">Add or Edit Friend!</p>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={this.state.formData.title}
              onChange={this.onFormFieldChanged}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="bio"
              value={this.state.formData.bio}
              onChange={this.onFormFieldChanged}
              placeholder="Bio"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="summary"
              value={this.state.formData.summary}
              onChange={this.onFormFieldChanged}
              placeholder="Summary"
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="headline"
              value={this.state.formData.headline}
              onChange={this.onFormFieldChanged}
              placeholder="Headline"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="slug"
              value={this.state.formData.slug}
              onChange={this.onFormFieldChanged}
              placeholder="Slug"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="statusId"
              value={this.state.formData.statusId}
              onChange={this.onFormFieldChanged}
              placeholder="Status"
            />
          </div>
          <div className="form-group">
            <input
              type="url"
              className="form-control"
              name="primaryImage"
              value={this.state.formData.primaryImage}
              onChange={this.onFormFieldChanged}
              placeholder="Primary Image"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSubmitClicked}
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default FriendsForm;
