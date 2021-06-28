import React from "react";
import * as friendsService from "../services/friendsServices";

class FriendsForm extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "1",
      primaryImage: "",
    },
  };

  componentDidMount(props) {}
  onEditButtonClicked = (e) => {
    e.stopPropagation();
    const data = { ...this.props.formData };
    friendsService
      .updateFriend(data)
      .then(this.onEditFriendSuccess)
      .catch(this.onEditFriendError);
  };

  onEditFriendSuccess = (response) => {
    console.log({ person: response });
  };

  onEditFriendError = (response) => {
    console.log({ error: response });
  };

  onAddButtonClicked = (e) => {
    e.stopPropagation();

    const data = { ...this.state.formData };

    friendsService
      .addFriend(data)
      .then(this.onAddFriendSuccess)
      .catch(this.onAddFriendError);
  };

  onAddFriendSuccess = (response) => {
    console.log({ person: response });
  };

  onAddFriendError = (response) => {
    console.log({ error: response });
  };

  onFormFieldChanged = (e) => {
    const currentTarget = e.currentTarget;
    const newValue = currentTarget.value;
    const inputName = currentTarget.name;

    this.setState(() => {
      const formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  render() {
    return (
      <React.Fragment>
        <form className="col-md-10 p-5">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              onChange={this.onFormFieldChanged}
              value={this.state.title}
            ></input>
          </div>
          <div className="form-group">
            <label>Bio</label>
            <input
              type="text"
              className="form-control"
              placeholder="Bio"
              name="bio"
              onChange={this.onFormFieldChanged}
              value={this.state.bio}
            ></input>
          </div>
          <div className="form-group">
            <label>Summary</label>
            <input
              type="email"
              className="form-control"
              placeholder="Summary"
              name="summary"
              onChange={this.onFormFieldChanged}
              value={this.state.summary}
            ></input>
          </div>
          <div className="form-group">
            <label>Headline</label>
            <input
              type="text"
              className="form-control"
              placeholder="Headline"
              name="headline"
              onChange={this.onFormFieldChanged}
              value={this.state.headline}
            ></input>
          </div>
          <div className="form-group">
            <label>Slug</label>
            <input
              type="text"
              className="form-control"
              placeholder="Slug"
              name="slug"
              onChange={this.onFormFieldChanged}
              value={this.state.slug}
            ></input>
          </div>
          <div className="form-group">
            <label>Avatar URL</label>
            <input
              type="avatar"
              className="form-control"
              placeholder="Insert Avatar URL"
              name="primaryImage"
              onChange={this.onFormFieldChanged}
              value={this.state.primaryImage}
            ></input>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onAddButtonClicked}
          >
            Add
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onEditButtonClicked}
          >
            Edit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default FriendsForm;
