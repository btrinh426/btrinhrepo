import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

import * as friendService from "../services/friendService";

class AddFriend extends React.Component {
  initialState = {
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
  state = this.initialState;

  componentDidMount() {
    const { state: locState } = this.props.location;

    if (locState && locState.type === "FRIEND_EDIT") {
      let formData = { ...this.props.location.state.payload };
      formData.primaryImage = formData.primaryImage.imageUrl;

      this.setState(() => {
        return { formData };
      });
    }
    console.log(this);
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

  submitClicked = (e) => {
    e.preventDefault();
    const data = this.state.formData;
    if (this.props.match.params.friendId) {
      friendService
        .updateFriend(data)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendError);
    } else {
      friendService
        .registerFriend(data)
        .then(this.onRegisterFriendSuccess)
        .catch(this.onRegisterFriendError);
    }
  };

  onUpdateFriendSuccess = (response) => {
    console.log(response);
    toast.success("Friend updated");
    this.props.history.push("/friendsIndex");
  };

  onUpdateFriendError = (err) => {
    console.log(err);
    toast.error("Could not update friend");
  };

  onRegisterFriendSuccess = (response) => {
    console.log(response);
    toast.success("Friend created");
    this.formReset();
  };

  onRegisterFriendError = (response) => {
    console.log(response);
    toast.error("Could not add friend");
  };

  formReset = () => {
    this.setState(() => this.initialState);
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            <form key={this.state.formData.id}>
              <div style={{ padding: 20 }}>
                <h1 className="text-center">Add a Friend</h1>
              </div>
              <div className="text-center">
                <NavLink to="/friends">
                  <button className="btn btn-primary" type="button">
                    Go Back
                  </button>
                </NavLink>
              </div>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="bio"
                  rows="3"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.bio}
                />
              </div>
              <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <input
                  type="text"
                  className="form-control"
                  name="summary"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.summary}
                />
              </div>
              <div className="form-group">
                <label htmlFor="headline">Headline</label>
                <input
                  type="text"
                  className="form-control"
                  name="headline"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.headline}
                />
              </div>
              <div className="form-group">
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  className="form-control"
                  name="slug"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.slug}
                />
              </div>
              <div className="form-group">
                <label htmlFor="statusId">Status ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="statusId"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.statusId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="primaryImage">Image Url</label>
                <input
                  type="text"
                  className="form-control"
                  name="primaryImage"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.primaryImage}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.submitClicked}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFriend;
