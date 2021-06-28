import React from "react";
import * as friendsService from "../../services/friendsService.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class FriendsAdd extends React.Component {
  state = {
    friend: {
      title: "Test Name",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: 1,
      primaryImage: "",
    },
  };

  onFormFieldChanged = (e) => {
    console.log("onFormFieldChanged is firing from FriendsAdd");
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state.friend };

      newState[inputName] = newValue;

      return { friend: newState };
    });
  };

  onAddFriendClicked = (e) => {
    e.preventDefault();
    console.log("onAddFriendClicked is firing");

    let data = { ...this.state };

    console.log("This is the form data to be submitted: ", data);

    friendsService.add(data).then(this.onAddSuccess).catch(this.onAddError);
  };

  onAddError = (err) => {
    console.log("onAddError is firing", err);

    let notify = () =>
      toast.error("Unable to add friend", {
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
  onAddSuccess = (response) => {
    console.log("onAddSuccess is firing", response);
    let notify = () =>
      toast.success(
        `You have add ${this.state.title} to your list of Friends`,
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
  };

  onCancelFriendClicked = (e) => {
    console.log("onCancelClicked is firing");

    this.props.history.push("./friends");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-6 p-1">
              <h1 className="p-2">Add Friend</h1>
              <form className="p-2">
                <div className="form-group">
                  <label htmlFor="title">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={this.onFormFieldChanged}
                    // placeholder="Friend's Name"
                    value={this.state.title}
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
                    placeholder="bio"
                    value={this.state.bio}
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
                    placeholder="summary"
                    value={this.state.summary}
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
                    placeholder="headline"
                    value={this.state.headline}
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
                    placeholder="slug"
                    value={this.state.slug}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="primaryImage">PrimaryImage URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="primaryImage"
                    name="primaryImage"
                    onChange={this.onFormFieldChanged}
                    placeholder="Must be a valid URL"
                    value={this.state.primaryImage}
                  />
                </div>
                <div className="p-1 d-inline">
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="addFriend"
                    name="addFriend"
                    onClick={this.onAddFriendClicked}
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
                    onClick={this.onCancelFriendClicked}
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

export default FriendsAdd;
