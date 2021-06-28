import React, { Component } from "react";
import { toast } from "react-toastify";
import * as peopleService from "../services/peopleService";

class AddFriend extends Component {
  state = {
    friend: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
  };

  handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;

    this.setState((prevState) => {
      let friend = { ...prevState.friend };
      friend[name] = val;
      return { friend };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let data = this.state.friend;
    peopleService.add(data).then(this.onActionSuccess).catch(this.onActionErr);
  };

  onActionSuccess = (res) => {
    console.log("res ", res);
    toast.success("Welcome friend!");
    this.props.history.push("/friends");
  };

  onActionErr = (err) => {
    console.log("err ", err);
    toast.error(
      "Add friend fail. Please check your information and try agian."
    );
  };

  render() {
    return (
      <main className="container">
        <h1 className="center">Add a friend...</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              value={this.state.friend.title || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <input
              type="textArea"
              name="bio"
              className="form-control"
              id="bio"
              value={this.state.friend.bio || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="summary">Summary address</label>
            <input
              type="summary"
              name="summary"
              value={this.state.friend.summary || ""}
              className="form-control"
              id="summary"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="headline">Headline</label>
            <input
              type="headline"
              className="form-control"
              id="headline"
              name="headline"
              value={this.state.friend.headline || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="statusId">StatusId</label>
            <input
              type="statusId"
              className="form-control"
              id="statusId"
              name="statusId"
              value={this.state.friend.statusId || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug">Slug</label>
            <input
              type="slug"
              className="form-control"
              id="slug"
              name="slug"
              value={this.state.friend.slug || ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryImage">Profile Image</label>
            <input
              type="primaryImage"
              className="form-control"
              id="primaryImage"
              name="primaryImage"
              value={this.state.friend.primaryImage || ""}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </main>
    );
  }
}

export default AddFriend;
