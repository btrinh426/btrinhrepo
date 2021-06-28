import React from "react";
import { toast } from "react-toastify";
import * as friendService from "../services/friendService";

class FriendsForm extends React.Component {
  state = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "",
    primaryImage: "",
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log(e);

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      return newState;
    });
  };

  handleCreate = (e) => {
    e.preventDefault();

    let newFriend = { ...this.state };

    friendService
      .create(newFriend)
      .then(this.onCreateSuccess)
      .catch(this.onCreateError);
  };
  onCreateSuccess = (response) => {
    console.log(response.data);
    toast("Friend Added");
  };
  onCreateError = (response) => {
    console.warn({ error: response });
    toast("Friend not Added");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 -md-4 p-5">
            <form>
              <label htmlFor="text">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={this.onFormFieldChanged}
                value={this.state.title}
              ></input>
              <label htmlFor="text">Bio</label>
              <input
                type="text"
                className="form-control"
                name="bio"
                onChange={this.onFormFieldChanged}
                value={this.state.bio}
              ></input>
              <label htmlFor="text">Summary</label>
              <input
                type="text"
                className="form-control"
                name="summary"
                onChange={this.onFormFieldChanged}
                value={this.state.summary}
              ></input>
              <label htmlFor="text">Headline</label>
              <input
                type="text"
                className="form-control"
                name="headline"
                onChange={this.onFormFieldChanged}
                value={this.state.headline}
              ></input>
              <label htmlFor="text">Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                onChange={this.onFormFieldChanged}
                value={this.state.slug}
              ></input>
              <label htmlFor="text">Status</label>
              <input
                type="text"
                className="form-control"
                name="statusId"
                onChange={this.onFormFieldChanged}
                value={this.state.statusId}
              ></input>
              <label htmlFor="text">Primary Image</label>
              <input
                type="text"
                className="form-control"
                name="primaryImage"
                onChange={this.onFormFieldChanged}
                value={this.state.primaryImage}
              ></input>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleCreate}
              >
                Add Friend
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsForm;
