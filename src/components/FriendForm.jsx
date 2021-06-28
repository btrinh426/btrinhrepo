import React from "react";
import * as userService from "../services/userService";

class FriendForm extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: 1,
      primaryImage: "",
    },
  };

  componentDidMount() {
    console.log(this.props.location.state.payload);
    if (
      this.props.location.state &&
      this.props.location.state.type == "EDIT_Friend"
    ) {
      this.setState(() => {
        return {
          title: this.props.location.state.payload.title,
          bio: this.props.location.state.payload.bio,
          summary: this.props.location.state.payload.summmary,
          headline: this.props.location.state.payload.headline,
          slug: this.props.location.state.payload.slug,
          status: this.props.location.state.payload.status,
          skills: this.props.location.state.payload.skills,
          primaryImage: this.props.location.state.payload.primaryImage.imageUrl,
        };
      });
    }
  }

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

  onUpdate = () => {
    console.log("update button is firing");

    const user = this.state.formData;
    userService
      .updateFriend(user)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = (response) => {
    console.log(response.data);
  };

  onUpdateError = (errResponse) => {
    console.log(errResponse);
  };

  render() {
    return (
      <form className="p-4">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.title}
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <input
            type="text"
            className="form-control"
            name="bio"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.bio}
          />
        </div>
        <div className="form-group">
          <label>Summary</label>
          <input
            type="text"
            className="form-control"
            name="summary"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.summary}
          />
        </div>
        <div className="form-group">
          <label>Headline</label>
          <input
            type="text"
            className="form-control"
            name="headline"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.headline}
          />
        </div>
        <div className="form-group">
          <label>Slug</label>
          <input
            type="text"
            className="form-control"
            name="slug"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.slug}
          />
        </div>
        <div className="form-group">
          <label>StatusId</label>
          <input
            type="text"
            className="form-control"
            name="statusId"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.statusId}
          />
        </div>
        <div className="form-group">
          <label>Primary Image</label>
          <input
            type="text"
            className="form-control"
            name="primaryImage"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.primaryImage}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onUpdate}
        >
          Update
        </button>
      </form>
    );
  }
}

export default FriendForm;
