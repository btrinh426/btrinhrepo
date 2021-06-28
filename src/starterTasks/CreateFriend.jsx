import React from "react";
import "react-bootstrap";
import friendService from "../services/friendService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class FriendCreation extends React.Component {
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
  createFriendButton = (e) => {
    e.preventDefault();
    friendService
      .add(this.state.friendData)
      .then(this.onActionSuccess)
      .catch(this.onActionFailure);
  };

  onActionSuccess = (response) => {
    // console.log("Success");
    toast.success("Friend Created!", "Success");
    this.props.history.push("/friends");
  };
  onActionFailure = (errResponse) => {
    console.log("Failed");
    toast.error("Too Bad!", "Failure");
  };
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let friendData = { ...this.state.friendData };

      friendData[inputName] = newValue;

      return { friendData };
    });
  };

  render() {
    return (
      <form className="row g-3 p-5">
        <div className="col-md-6">
          <label htmlFor="inputTitle" className="form-label">
            First and Last Name
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={this.state.title}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputHeadline" className="form-label">
            Headline
          </label>
          <input
            type="text"
            className="form-control"
            name="headline"
            value={this.state.headline}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputBio" className="form-label">
            Bio
          </label>
          <textarea
            className="form-control"
            aria-label="With textarea"
            name="bio"
            value={this.state.bio}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputSummary" className="form-label">
            Summary
          </label>
          <textarea
            className="form-control"
            aria-label="With textarea"
            name="summary"
            value={this.state.summary}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputImage" className="form-label">
            Image Url
          </label>
          <input
            type="url"
            placeholder="https://"
            className="form-control"
            name="primaryImage"
            value={this.state.primaryImage}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="inputSlug" className="form-label">
            User Name
          </label>
          <input
            type="text"
            placeholder="One Word"
            className="form-control"
            name="slug"
            value={this.state.slug}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="inputStatusId" className="form-label">
            Status
          </label>
          <input
            type="text"
            placeholder="Active / NotSet"
            className="form-control"
            name="statusId"
            value={this.state.statusId}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-12"></div>
        <div className="col-12">
          <button
            onClick={this.createFriendButton}
            type="submit"
            className="btn btn-primary"
          >
            Create Friend
          </button>
        </div>
      </form>
    );
  }
}

export default FriendCreation;
