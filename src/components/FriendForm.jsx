import React from "react";
import * as friendsService from "../services/friendsService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from "jquery";
import debug from "sabio-debug";

const _logger = debug.extend("FriendForm");

class FriendForm extends React.Component {
  constructor(props) {
    _logger("constructor");
    super(props);
    this.state = { friendForm: this.propsToFormData(this.props) };
  }

  //populate form
  propsToFormData(props) {
    if (props.location.state && props.location.state.id) {
      return JSON.parse(JSON.stringify(props.location.state));
    } else {
      return {
        title: undefined,
        bio: undefined,
        summary: undefined,
        headline: undefined,
        slug: undefined,
        statusId: undefined,
        imageTypeId: undefined,
        imageString: undefined,
        primaryImageId: undefined,
      };
    }
  }
  onInputChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      _logger("setState");
      let friendData = { ...this.state.friendForm };
      friendData[inputName] = newValue;
      return { friendForm: friendData };
    });
  };
  //update & register friend
  onSaveFriendClicked = (e) => {
    e.preventDefault();
    var dataFromForm = { ...this.state.friendForm };
    console.log(dataFromForm);
    if (dataFromForm && dataFromForm.id) {
      friendsService
        .updateFriend(dataFromForm)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      friendsService
        .buildFriend(dataFromForm)
        .then(this.onBuildFriendSuccess)
        .catch(this.onBuildFriendError);
    }
  };
  onUpdateSuccess = (updatedFriend) => {
    console.log(updatedFriend);
    let dataConvert = JSON.parse(updatedFriend.config.data);
    console.log("run update array method on:", dataConvert.id);
    this.props.history.push("/friends");
    toast["success"](`"Updated Friend (id:${dataConvert.id})"`);
  };
  onUpdateError = (err) => {
    console.log(err);
  };
  onBuildFriendSuccess = (response) => {
    console.log(response);
    this.props.history.push("/friends");
    //user notification
  };
  onBuildFriendError = (err) => {
    console.log(err);
  };

  render() {
    _logger("rendering");
    return (
      <form id="registerForm">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={this.state.friendForm.title}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <input
            type="text"
            className="form-control"
            name="bio"
            value={this.state.friendForm.bio}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Summary</label>
          <input
            type="text"
            className="form-control"
            name="summary"
            value={this.state.friendForm.summary}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Headline</label>
          <input
            type="text"
            className="form-control"
            name="headline"
            value={this.state.friendForm.headline}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>SLUG</label>
          <input
            type="text"
            className="form-control"
            name="slug"
            value={this.state.friendForm.slug}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Status Id</label>
          <input
            type="text"
            className="form-control"
            name="statusId"
            value={this.state.friendForm.statusId}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Image Type Id</label>
          <input
            type="text"
            className="form-control"
            name="statusId"
            value={this.state.friendForm.imageTypeId}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Image String</label>
          <input
            type="text"
            className="form-control"
            name="primaryImage"
            value={this.state.friendForm.imageString}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Primary Image Id</label>
          <input
            type="text"
            className="form-control"
            name="primaryImage"
            value={this.state.friendForm.primaryImageId}
            onChange={this.onInputChanged}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.onSaveFriendClicked}
        >
          Save Friend
        </button>
        <div></div>
      </form>
    );
  }
}

export default FriendForm;
