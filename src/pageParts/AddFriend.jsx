import React from "react";
import * as userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";

class AddFriend extends React.Component {
  state = {
    formData: {
      title: "name",
      bio: "bio",
      slug: "unique slug",
      summary: "summary",
      headline: "snazzy headline",
      primaryImage: "image url",
      statusId: "Active",
    },
    isAnEdit: false,
    //friend: this.props.location.state,
  };

  componentDidMount() {
    //let friend = this.props.match.params.friend;
    if (this.props.location.state) {
      console.log("yes friend state");
      console.log(this.props.location.state);
      let friendData = this.props.location.state;
      friendData.primaryImage = this.props.location.state.primaryImage.imageUrl;

      this.setState(() => {
        let newState = { ...this.state.formData };
        newState = friendData;

        return { formData: newState, isAnEdit: true };
      });
    } else {
      console.log("no friend state");
    }

    //console.log(this.state.friend);
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state.formData };
      newState[inputName] = newValue;

      return { formData: newState };
    });
  };

  onButtonClicked = (e) => {
    e.preventDefault();
    console.log("I was clicked");
    console.log(this.state.formData);
    console.log(this.state.formData.primaryImage.imageUrl);

    if (this.state.isAnEdit === true) {
      console.log("im and edit, call the updater");

      let id = this.state.formData.id;
      let friend = this.state.formData;
      console.log(friend.primaryImage);
      let payload = {
        title: friend.title,
        bio: friend.bio,
        summary: friend.summary,
        headline: friend.headline,
        primaryImage: friend.primaryImage,
        statusId: friend.statusId,
        slug: friend.slug,
      };

      userService
        .updateFriend(id, payload)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendError);
    } else {
      console.log("im a new add call add friend");
      userService
        .addFriend(this.state.formData)
        .then(this.onAddSuccess)
        .catch(this.onAddError);
    }
  };

  onUpdateFriendError = (response) => {
    console.log("update error wah");
  };

  onUpdateFriendSuccess = (response) => {
    console.log("friend updated, do something");
    this.props.history.push("/friends");
  };

  onAddSuccess = (response) => {
    toast("🦄 Yay New Friend!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.history.push("/friends");
  };

  onAddError = (errResponse) => {
    toast("Nope, that is NOT your friend", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <div className="bg-text3" /*style={{display: 'none'}*/>
          {this.state.isAnEdit ? <h1>Edit Friend</h1> : <h1>Add New Friend</h1>}
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-wrapper">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.title}
                  />
                </div>
                <div className="form-wrapper">
                  <label>Bio</label>
                  <input
                    type="text"
                    name="bio"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.bio}
                  />
                </div>
                <div className="form-wrapper">
                  <label>Summary</label>
                  <input
                    type="text"
                    name="summary"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.summary}
                  />
                </div>
                <div className="form-wrapper">
                  <label>Headline</label>
                  <input
                    type="text"
                    name="headline"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.headline}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-wrapper">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.slug}
                  />
                </div>
                <div className="form-wrapper">
                  <label>StatusId</label>
                  <input
                    type="text"
                    name="statusId"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.statusId}
                  />
                </div>
                <div className="form-wrapper">
                  <label>image</label>
                  <input
                    type="text"
                    name="primaryImage"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.primaryImage}
                  />
                </div>
              </div>
            </div>
            {this.state.isAnEdit ? (
              <button
                type="submit"
                id="newFriendBtn"
                className="btn btn-primary"
                onClick={this.onButtonClicked}
              >
                Edit Friend
              </button>
            ) : (
              <button
                type="submit"
                id="newFriendBtn"
                className="btn btn-primary"
                onClick={this.onButtonClicked}
              >
                Add Friend
              </button>
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default AddFriend;
