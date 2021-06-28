import React, { Component } from "react";
import * as friendService from "../services/friendService";
import { toast } from "react-toastify";

class FriendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        primaryImage: "",
      },
      friendId: "",
    };
  }

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let friendData = { ...this.state.friendData };
      friendData[inputName] = newValue;
      return { friendData };
    });
  };

  onSubmitClick = (e) => {
    e.preventDefault();
    console.log("onSubmit was Clicked");
    friendService
      .addFriend(this.state.friendData)
      .then(this.onAddSuccess)
      .catch(this.onAddError);
  };

  onAddSuccess = (response) => {
    console.log({ good: response });
    toast.success("Friend added!");
  };

  onAddError = (response) => {
    console.log({ error: response });
    toast.error(
      "Something went wrong. Please check your inputs and try again."
    );
  };

  onCancelClick = (e) => {
    e.preventDefault();
    console.log("onCancel clicked");
    this.props.history.push("/Friends");
    // this.setState(()=>{
    //   return{formData: null}

    // })
  };

  onDeleteClick = (e) => {
    e.preventDefault();
    console.log("onDelete clicked");
    friendService
      .deleteRecordWithId(this.state.friendData.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (response) => {
    console.log({ deleteGood: response });
    this.props.history.push("/Friends");
    toast.success("Friend Deleted Successfully.");
  };

  onDeleteError = (response) => {
    console.log({ deleteError: response });
    toast.error("Something went wrong. Please try again.");
  };

  onUpdateClick = (e) => {
    e.preventDefault();
    console.log("onUpdate clicked");
    let dataCopy = { ...this.state.friendData };
    let newValue = this.state.friendData.primaryImage.imageUrl;
    dataCopy.primaryImage = newValue;
    console.log(dataCopy);
    friendService
      .updateFriendWithId(dataCopy, dataCopy.id)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = (response) => {
    console.log({ updateGood: response });
    this.props.history.push("/Friends");
    toast.success("Friend successfully Updated");
  };

  onUpdateError = (response) => {
    console.log({ updateError: response });
    toast.error(
      "Oops. Something went wrong. Please check your data and try again."
    );
  };

  getRecord = (id) => {
    friendService
      .getRecordWithId(id)
      .then(this.onRecordSuccess)
      .catch(this.onRecordError);
  };

  onRecordSuccess = (response) => {
    console.log({ good: response });
    this.setState(() => {
      let friendData = response.data.item;
      let friendId = response.data.item.id;
      return { friendData, friendId };
    });
  };

  onRecordError = (response) => {
    console.log({ bad: response });
  };

  componentDidMount() {
    let routeId = this.props.match.params.friendId;

    routeId && this.getRecord(routeId);
  }

  // componentDidUpdate(preProps) {
  //   let routeId = this.props.match.params.friendId;

  //   routeId && console.log("making ajax call from update", routeId);

  //   if (routeId && preProps.match.params.friendId !== routeId) {
  //     console.log("making call from update", routeId);
  //   }
  // }

  render() {
    return (
      <div>
        <h1>Add/Edit Friend</h1>
        <div className="row">
          <div className="col-sm-2">
            <img
              src={
                this.state.friendData.primaryImage.imageUrl
                  ? this.state.friendData.primaryImage.imageUrl
                  : "https://image.shutterstock.com/image-vector/universal-blank-profile-picture-avatar-600w-1654275940.jpg"
              }
              className="rounded img-thumbnail"
              alt="user avatar"
            />
          </div>
        </div>
        <form>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <label htmlFor="validationDefault01">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Name"
                value={this.state.friendData.title}
                onChange={this.onFormFieldChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="validationDefault02">Headline</label>
              <input
                type="text"
                className="form-control"
                name="headline"
                placeholder="Headline"
                value={this.state.friendData.headline}
                onChange={this.onFormFieldChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="validationDefaultUsername">Username</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="slug"
                  placeholder="Username"
                  value={this.state.friendData.slug}
                  onChange={this.onFormFieldChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault03">Image</label>
              <input
                type="text"
                className="form-control"
                name="primaryImage"
                placeholder="Image Url"
                value={
                  this.state.friendData.primaryImage.imageUrl
                    ? this.state.friendData.primaryImage.imageUrl
                    : this.state.friendData.primaryImage
                }
                onChange={this.onFormFieldChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="exampleFormControlSelect1">Status</label>
              <select
                className="form-control"
                name="statusId"
                value={this.state.friendData.statusId}
                onChange={this.onFormFieldChange}
              >
                <option value="">select status</option>
                <option value="Active">Active</option>
                <option value="Deleted">Deleted</option>
                <option value="Flagged">Flagged</option>
                <option value="NotSet">NotSet</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationDefault03">ID #</label>
              <input
                type="text"
                className="form-control"
                name="id"
                placeholder="#"
                value={this.state.friendId}
                disabled
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="exampleFormControlTextarea1">Bio</label>
              <textarea
                type="text"
                className="form-control"
                name="bio"
                rows="3"
                placeholder="max 700 characters"
                value={this.state.friendData.bio}
                onChange={this.onFormFieldChange}
              ></textarea>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="exampleFormControlTextarea2">Summary</label>
              <textarea
                type="text"
                className="form-control"
                name="summary"
                rows="3"
                placeholder="max 255 characters"
                value={this.state.friendData.summary}
                onChange={this.onFormFieldChange}
              ></textarea>
            </div>
          </div>
          <div className="form-group"></div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={
              this.state.friendId ? this.onUpdateClick : this.onSubmitClick
            }
          >
            {this.state.friendId ? "Update" : "Submit Form"}
          </button>

          <button onClick={this.onCancelClick} className="btn btn-default">
            Cancel
          </button>
          <button onClick={this.onDeleteClick} className="btn btn-danger">
            Delete
          </button>
        </form>
        <div></div>
      </div>
    );
  }
}

export default FriendForm;
