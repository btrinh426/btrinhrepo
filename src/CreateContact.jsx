import React from "react";
import * as friendService from "./friendService";
import { toast, ToastContainer } from "react-toastify";

class CreateContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  componentDidMount() {
    if (this.props.history.location.state) {
      this.setState({
        formData: {
          title: this.props.history.location.state.title,
          bio: this.props.history.location.state.bio,
          summary: this.props.history.location.state.summary,
          headline: this.props.history.location.state.headline,
          slug: this.props.history.location.state.slug,
          statusId: this.props.history.location.state.entityTypeId,
          primaryImage: this.props.history.location.state.primaryImage.imageUrl,
        },
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

  submitForm = (e) => {
    e.preventDefault();
    let friendId = this.props.match.params.id;

    if (friendId) {
      friendService
        .editFriend(this.state.formData, friendId)
        .then(this.onEditFriendSuccess)
        .catch(this.onEditFriendError);
      console.log("componentDidMount", { friendId });
    } else {
      friendService
        .addFriend(this.state.formData)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };

  onEditFriendSuccess = () => {
    toast.success("succesfully edited this friend");
  };

  onEditFriendError = () => {
    toast.error("could not edit this friend");
  };

  onAddFriendSuccess = () => {
    toast.success("Contact successfully stored!");
  };

  onAddFriendError = () => {
    toast.error("Sorry, please try again!");
  };

  render() {
    return (
      <form style={{ margin: "100px " }}>
        <ToastContainer />

        <div>
          <label>
            <h1 style={{ margin: "30px " }}>
              We just need a few details to store a Contact
            </h1>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="title"
            name="title"
            placeholder="CEO"
            value={this.state.formData.title}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="bio"
            name="bio"
            placeholder="Add info here to create a short personal bio"
            value={this.state.formData.bio}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="summary"
            name="summary"
            placeholder="Here would be a good place to list a few of your accomplishments"
            value={this.state.formData.summary}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="headline">Headline</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="headline"
            name="headline"
            placeholder="Tell us your headline"
            value={this.state.formData.headline}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="slug"
            name="slug"
            placeholder="add your slug here"
            value={this.state.formData.slug}
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Create a unique ID to easily locate your Profile. (Please use
            numbers for a total of 4 characters)
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="statusId">Status</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="statusId"
            name="statusId"
            placeholder="ex: 12345"
            value={this.state.formData.statusId}
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Create a unique number you will remember (1)
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="primaryImage">Profile Photo</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChanged}
            id="primaryImage"
            name="primaryImage"
            placeholder="https://placeYourLinkHere.png"
            value={this.state.formData.primaryImage}
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Use a URL link to add a personal photo.
          </small>
        </div>
        <button
          type="button"
          style={{ marginTop: "30px " }}
          className="btn btn-primary"
          onClick={this.submitForm}
        >
          Store Contact
        </button>
      </form>
    );
  }
}

export default CreateContact;
