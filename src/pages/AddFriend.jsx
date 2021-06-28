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
    isEdit: false,
    id: null,
  };

  componentDidMount() {
    if (this.props.match.params.friendId) {
      this.setState({ id: this.props.match.params.friendId });
      peopleService
        .get(this.props.match.params.friendId)
        .then(this.onFetchIdSuccess)
        .catch(this.onActionErr);
    }
  }

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

    if (this.state.isEdit) {
      peopleService
        .update(this.state.id, data)
        .then(this.onActionSuccess)
        .catch(this.onActionErr);
    } else {
      peopleService
        .add(data)
        .then(this.onActionSuccess)
        .catch(this.onActionErr);
    }
  };

  onActionSuccess = (res) => {
    toast.success("Welcome friend!");
    this.props.history.push("/friends");
  };

  onFetchIdSuccess = (res) => {
    let OldFriend = res.data.item;

    this.setState({
      friend: {
        title: OldFriend.title,
        bio: OldFriend.bio,
        summary: OldFriend.summary,
        headline: OldFriend.headline,
        slug: OldFriend.slug,
        statusId: OldFriend.statusId,
        primaryImage: OldFriend.primaryImage.imageUrl,
      },
      isEdit: true,
    });
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
