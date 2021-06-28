import React from "react";
import { toast } from "react-toastify";
import { createFriend } from "../services/friendService";
import "react-toastify/dist/ReactToastify.css";

class FriendsForm extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       friendId: "",
  //     };
  //   }

  state = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    status: "",
    skills: "",
    primaryImage: "",
  };

  onButtonClick = () => {
    console.log("Friend create button clicked.");

    createFriend(this.state).then(this.onSuccess).catch(this.onError);
  };

  onSuccess = (response) => {
    toast("Friend creation succcess.", {
      className: "Success-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  onError = (error) => {
    toast("Friend creation failed.", {
      className: "error-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  onTextInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};

      newState[inputName] = newValue;

      return newState;
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="title"
            className="form-control"
            id="title"
            placeholder="Title"
            name="title"
            onChange={this.onTextInputChange}
            value={this.state.title}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <input
            type="bio"
            className="form-control"
            id="bio"
            placeholder="Bio"
            name="bio"
            onChange={this.onTextInputChange}
            value={this.state.bio}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <input
            type="summary"
            className="form-control"
            id="summary"
            placeholder="Summary"
            name="summary"
            onChange={this.onTextInputChange}
            value={this.state.summary}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="headline">Headline</label>
          <input
            type="headline"
            className="form-control"
            id="headline"
            placeholder="Headline"
            name="headline"
            onChange={this.onTextInputChange}
            value={this.state.headline}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input
            type="slug"
            className="form-control"
            id="slug"
            placeholder="Slug"
            name="slug"
            onChange={this.onTextInputChange}
            value={this.state.slug}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="status"
            className="status"
            id="status"
            placeholder="Status"
            name="status"
            onChange={this.onTextInputChange}
            value={this.state.status}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <input
            type="skills"
            className="skills"
            id="skills"
            placeholder="Skills"
            name="skills"
            onChange={this.onTextInputChange}
            value={this.state.skills}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="primaryImage">Primary Image</label>
          <input
            type="primaryImage"
            className="primaryImage"
            id="primaryImage"
            placeholder="Primary Image"
            name="primaryImage"
            onChange={this.onTextInputChange}
            value={this.state.primaryImage}
          ></input>
        </div>

        <div>
          <button
            type="submitFriend"
            className="btn btn-primary"
            onClick={this.onButtonClick}
          >
            Submit Friend
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default FriendsForm;
