import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, withRouter } from "react-router-dom";
import "./App.css";
import FooterComponent from "./FooterComponent";
import SiteNavComponent from "./SiteNavComponent";
import JumboComponent from "./JumboComponent";
import ContentComponent from "./ContentComponent";
import * as userService from "./services/userService";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import { cssTransition } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as friendService from "./friendService";

class FriendsAdd extends React.Component {
  state = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: 0,
    primaryImage: "",
  };

  onFriendFormChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      return newState;
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    friendService
      .onRegister(this.state)
      .then(this.onSubmitSuccess)
      .catch(this.onSubmitFail);
  };

  onSubmitSuccess = (response) => {
    toast("Submit Successful", response);
  };

  onSubmitFail = (err) => {
    console.error(err);
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="registerHeader">Register Friend</h1>

        <form onSubmit={this.onSubmitClicked}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={this.onFriendFormChanged}
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
              onChange={this.onFriendFormChanged}
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
              onChange={this.onFriendFormChanged}
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
              onChange={this.onFriendFormChanged}
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
              onChange={this.onFriendFormChanged}
              value={this.state.slug}
            />
          </div>
          <div className="form-group">
            <label htmlFor="statusId">Status ID</label>
            <input
              type="text"
              className="form-control"
              //   placeholder="NotSet"
              id="statusId "
              name="statusId"
              onChange={this.onFriendFormChanged}
              value={this.state.statusId}
            />
          </div>
          <div className="form-group">
            <label htmlFor="primaryImage">Picture URL</label>
            <input
              type="text"
              className="form-control"
              id="primaryImage"
              name="primaryImage"
              onChange={this.onFriendFormChanged}
              value={this.state.primaryImage}
            />
          </div>
          {/* <button type="submit" className="btn btn-primary" /> */}
          <button type="submit" className="submit">
            Submit
          </button>
          {/* onClick={submitClicked} */}
        </form>
      </React.Fragment>
    );
  }
}

export default FriendsAdd;
