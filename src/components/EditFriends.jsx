import React from "react";
import { toast } from "react-toastify";
import * as friendService from "../services/friendServices";

class EditFriends extends React.Component {
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
    let payload = this.props.location.state?.payload;

    if (payload) {
      this.setFormData(payload);
    }
  }

  setFormData = (payload) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...payload,
          primaryImage: payload.primaryImage.imageUrl,
        },
      };
    });
  };

  handleFriendForm = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };

  onFriendFormSubmit = (e) => {
    e.preventDefault();

    if (this.state.formData.id) {
      friendService
        .editFriend(this.state.formData)
        .then(this.onFriendEditSuccess)
        .catch(this.onFriendEditError);
    } else {
      friendService
        .addNewFriend(this.state.formData)
        .then(this.onFriendFormSuccess)
        .catch(this.onFriendFormError);
    }
  };

  onFriendEditSuccess = (response) => {
    toast.success(`${response.title} successfully updated!`, {
      autoClose: 1500,
    });
  };

  onFriendEditError = (response) => {
    toast.error(`Error! Friend could not be updated.`, {
      autoClose: 1500,
    });
    console.warn(response);
  };

  onFriendFormSuccess = (response) => {
    toast.success("Friend added successfully");
    console.log(response);
  };

  onFriendFormError = (response) => {
    toast.error(response);
    console.warn(response);
  };

  render() {
    return this.renderFriendForm();
  }

  renderFriendForm() {
    return (
      <div className="container m-3">
        <div className="row">
          <div className="col">
            <h2>
              Add or Edit Friends
              <span role="img" aria-label="friends">
                🧑🏽‍🤝‍🧑🏽
              </span>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="card col-8">
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label htmlFor="title" className="col-sm-2 col-form-label">
                    Title
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      onChange={this.handleFriendForm}
                      value={this.state.formData.title}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="bio" className="col-sm-2 col-form-label">
                    Bio
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="bio"
                      name="bio"
                      onChange={this.handleFriendForm}
                      value={this.state.formData.bio}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="summary" className="col-sm-2 col-form-label">
                    Summary
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="summary"
                      name="summary"
                      onChange={this.handleFriendForm}
                      value={this.state.formData.summary}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="headline" className="col-sm-2 col-form-label">
                    Headline
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="headline"
                      name="headline"
                      onChange={this.handleFriendForm}
                      value={this.state.formData.headline}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="slug" className="col-sm-2 col-form-label">
                    Slug
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="slug"
                      name="slug"
                      onChange={this.handleFriendForm}
                      value={this.state.formData.slug}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="statusId" className="col-sm-2 col-form-label">
                    Status
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="statusId"
                      name="statusId"
                      onChange={this.handleFriendForm}
                      value={this.state.formData.statusId}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="avatar" className="col-sm-2 col-form-label">
                    Avatar
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="avatar"
                      name="primaryImage"
                      onChange={this.handleFriendForm}
                      value={this.state.formData.primaryImage}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-info"
                  onClick={this.onFriendFormSubmit}
                >
                  {this.state.formData.id ? "Update" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditFriends;
