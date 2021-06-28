import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as friendService from "./friendService";

class EditContact extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formData: {
  //       title: "",
  //       bio: "",
  //       summary: "",
  //       headline: "",
  //       slug: "",
  //       statusId: "",
  //       primaryImage: "",
  //     },
  //   };
  // }

  componentDidMount() {
    friendService
      .currentFriendWithId(this.id)
      .then(this.onCurrentFriendWithIdSuccess)
      .catch(this.onCurrentFriendWithIdError);
  }

  onCurrentFriendWithIdSuccess = () => {};

  onCurrentFriendWithIdError = () => {};

  render() {
    return (
      <form style={{ margin: "100px " }}>
        {/* <ToastContainer /> */}

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
            // aria-describedby="emailHelp"
          ></input>
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
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
          Create Contact
        </button>
      </form>
    );
  }
}

export default EditContact;
