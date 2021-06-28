import React, { Component } from "react";
import { postFriends, updateFriends } from "../services/friendsService";

class EditFriends extends Component {
  onSubmit(e) {
    const newFriend = {};
  }
  render() {
    return (
      <div>
        <div className="form-group">
          <div className="form-group">
            <label>Title</label>
            <input
              onChange={this.onInputChange}
              name="title"
              value={this.state.friend.title}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <input
              onChange={this.onInputChange}
              name="bio"
              value={this.state.friend.bio}
              className="form-control"
              id="inputBio"
              placeholder="Bio"
            />
          </div>
          <div className="form-group">
            <label>Summary</label>
            <input
              onChange={this.onInputChange}
              name="summary"
              value={this.state.friend.summary}
              className="form-control"
              id="inputSummary"
              aria-describedby="summary"
              placeholder="Enter Summary"
            />
          </div>
          <div className="form-group">
            <label>Headline</label>
            <input
              onChange={this.onInputChange}
              name="headline"
              value={this.state.friend.password}
              className="form-control"
              type="headline"
              id="inputHeadline"
              placeholder="Headline"
            />
          </div>
          <div className="form-group">
            <label>Skills</label>
            <input
              onChange={this.onInputChange}
              value={this.state.friend.passwordConfirm}
              name="skills"
              type="skills"
              className="form-control"
              id="skills"
              placeholder="skills"
            />
          </div>

          <div className="form-group"></div>
          <label htmlFor>Slug</label>
          <input
            onChange={this.onInputChange}
            name="slug"
            type="slug"
            className="form"
            value={this.state.friend.slug}
            placeholder="slug"
          />

          <div className="form-group">
            <label htmlFor>Status Id</label>
            <input
              onChange={this.onInputChange}
              name="statusId"
              value={this.state.friend.statusId}
              className="form-control"
              id="statusId"
              placeholder="Status Id"
            />
          </div>
          <div className="form-group">
            <label>Primary Image</label>
            <input
              onChange={this.onInputChange}
              name="primaryImage"
              value={this.state.friend.primaryImage}
              className="form-control"
              id="primaryImage"
              placeholder="Primary Image"
            />
          </div>
          <button onClick={this.handleClick}>Submit</button>
        </div>
      </div>
    );
  }
}

export default EditFriends;
