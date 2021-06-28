import React from "react";
import * as friendService from "../services/friendService";
import { toast } from "react-toastify";

class AddFriends extends React.Component {
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
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let friendData = { ...prevState.friendData };

      friendData[inputName] = newValue;
      //console.log("regData", regData.firstName, { regData });

      return { friendData };
    });
  };

  onAddFriendButton = (e) => {
    e.preventDefault();
    friendService
      .addFriend(this.state.friendData)
      .then(this.onAddFriendSuccess)
      .catch(this.onAddFriendError);
  };

  onAddFriendSuccess = (response) => {
    console.log(response);
    toast.success("friend added.");
  };

  onAddFriendError = (response) => {
    console.warn(response);
    toast.error("friend did not add.");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-7">
            <form>
              <div className="form-group row">
                <label htmlFor="title" className="col-sm-2 col-form-label">
                  title
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.title}
                    placeholder="full name"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="bio" className="col-sm-2 col-form-label">
                  bio
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="bio"
                    name="bio"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.bio}
                    placeholder="this is a bio."
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="summary" className="col-sm-2 col-form-label">
                  summary
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="summary"
                    name="summary"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.summary}
                    placeholder="summary"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="headline" className="col-sm-2 col-form-label">
                  headline
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="headline"
                    name="headline"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.headline}
                    placeholder="this is a headline."
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="slug" className="col-sm-2 col-form-label">
                  slug
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="slug"
                    name="slug"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.slug}
                    placeholder="www.slug.com"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="statusId" className="col-sm-2 col-form-label">
                  status
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="statusId"
                    name="statusId"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.statusId}
                    placeholder="active"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="skills" className="col-sm-2 col-form-label">
                  skills
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="skills"
                    name="skills"
                    // onChange={this.onFormFieldChanged}
                    // value={this.state.friendData.skills}
                    placeholder="skills"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="primaryImage"
                  className="col-sm-2 col-form-label"
                >
                  image url
                </label>
                <div className="col-sm-10">
                  <input
                    type="url"
                    className="form-control"
                    id="primaryImage"
                    name="primaryImage"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.primaryImage}
                    placeholder="https"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-outline-dark"
                onClick={this.onAddFriendButton}
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFriends;
