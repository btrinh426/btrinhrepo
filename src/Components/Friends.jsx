import React, { Component } from "react";
import * as friendService from "../services/firendService";
import { toast } from "react-toastify";
import ViewFriends from "./ViewFriends";

class Friends extends Component {
  state = {
    friendData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
    selectedIndividual: "",
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let friendData = { ...this.state.friendData };
      friendData[inputName] = newValue;
      return { friendData };
    });
  };

  onSubmitClick = (e) => {
    e.preventDefault();
    console.log("onSubmit was Clicked");
    friendService
      .addFriend(this.state.friendData)
      .then(this.onAddSuccess)
      .catch(this.onAddError);
  };

  onAddSuccess = (response) => {
    console.log({ good: response });
    toast.success("Friend added!");
  };

  onAddError = (response) => {
    console.log({ error: response });
    toast.error(
      "Something went wrong. Please check your inputs and try again."
    );
  };

  render() {
    return (
      <div>
        <h1>Add A Friend</h1>
        <form>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <label htmlFor="validationDefault01">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Name"
                value={this.state.friendData.title}
                onChange={this.onFormFieldChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="validationDefault02">Headline</label>
              <input
                type="text"
                className="form-control"
                name="headline"
                placeholder="Headline"
                value={this.state.friendData.headline}
                onChange={this.onFormFieldChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="validationDefaultUsername">Username</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="slug"
                  placeholder="Username"
                  value={this.state.friendData.slug}
                  onChange={this.onFormFieldChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault03">Image</label>
              <input
                type="text"
                className="form-control"
                name="primaryImage"
                placeholder="Image Url"
                value={this.state.friendData.primaryImage}
                onChange={this.onFormFieldChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="exampleFormControlSelect1">Status</label>
              <select
                className="form-control"
                name="statusId"
                value={this.state.friendData.statusId}
                onChange={this.onFormFieldChange}
              >
                <option value="">select status</option>
                <option value="Active">Active</option>
                <option value="Deleted">Deleted</option>
                <option value="Flagged">Flagged</option>
                <option value="NotSet">NotSet</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationDefault03">ID #</label>
              <input
                type="text"
                className="form-control"
                name="id"
                placeholder="#"
                // value={this.state.friendData.id}
                disabled
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="exampleFormControlTextarea1">Bio</label>
              <textarea
                type="text"
                className="form-control"
                name="bio"
                rows="3"
                placeholder="max 700 characters"
                value={this.state.friendData.bio}
                onChange={this.onFormFieldChange}
              ></textarea>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="exampleFormControlTextarea2">Summary</label>
              <textarea
                type="text"
                className="form-control"
                name="summary"
                rows="3"
                placeholder="max 255 characters"
                value={this.state.friendData.summary}
                onChange={this.onFormFieldChange}
              ></textarea>
            </div>
          </div>
          <div className="form-group"></div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={this.onSubmitClick}
          >
            {this.state.selectedIndividual.id ? "Update" : "Submit Form"}
          </button>

          <button onClick={this.onCancel} className="btn btn-default btn-sm">
            Cancel
          </button>
          <button onClick={this.onCancel} className="btn btn-danger btn-sm">
            Delete
          </button>
        </form>
        <div>
          Implement view friends here
          <ViewFriends></ViewFriends>
        </div>
      </div>
    );
  }
}

export default Friends;
