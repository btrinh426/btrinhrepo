import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

import * as friendService from "../services/appService";

class RegisterFriend extends React.Component {
  initialState = {
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
  state = this.initialState;

  onComponentDidUpdate() {}

  handleFormReset = () => {
    this.setState(() => this.initialState);
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  createFriend = (e) => {
    e.preventDefault();
    console.log(this);
    const data = this.state.formData;

    friendService
      .registerFriend(data)
      .then(this.onRegisterFriendSuccess)
      .catch(this.onRegisterFriendError);
  };

  onRegisterFriendSuccess = (response) => {
    console.log(response);
    toast.success("Friend created");
    this.handleFormReset();
  };

  onRegisterFriendError = (response) => {
    console.log(response);
    toast.error("Could not add friend");
  };

  searchFriend = () => {
    console.log(this.history.location.search);
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            <form key={this.state.formData.id} friendData={this.state.formData}>
              <div style={{ padding: 20 }}>
                <h1 className="text-center">Register a Friend</h1>
              </div>
              <div className="text-center">
                <NavLink to="/friends">
                  <button className="btn btn-primary">Go Back</button>
                </NavLink>
              </div>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="bio"
                  rows="3"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.bio}
                />
              </div>
              <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <input
                  type="text"
                  className="form-control"
                  name="summary"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.summary}
                />
              </div>
              <div className="form-group">
                <label htmlFor="headline">Headline</label>
                <input
                  type="text"
                  className="form-control"
                  name="headline"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.headline}
                />
              </div>
              <div className="form-group">
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  className="form-control"
                  name="slug"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.slug}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusId">Status ID</label>
                <input
                  type="number"
                  className="form-control"
                  name="statusId"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.statusId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="primaryImage">Image Url</label>
                <input
                  type="text"
                  className="form-control"
                  name="primaryImage"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.primaryImage}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.createFriend}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterFriend;
