import React from "react";
import axios from "axios";
import * as userServices from "./services/userServices";
// import Swal from "sweetalert2";

class AddFriendForm extends React.Component {
  state = {
    newFriend: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      skills: "",
      primaryImage: "",
    },
  };

  componentDidMount() {
    if (this.props.history.location.state) {
      let newFriendProps = this.props.history.location.state.payload;
      this.setState(() => {
        let newFriend = {
          title: newFriendProps.title,
          bio: newFriendProps.bio,
          summary: newFriendProps.summary,
          headline: newFriendProps.headline,
          slug: newFriendProps.slug,
          statusId: newFriendProps.statusId,
          skills: newFriendProps.skills,
          primaryImage: newFriendProps.primaryImage.imageUrl,
        };
        // let newFriend = this.props.history.location.state.payload;
        // let newFriendImage = this.props.history.location.state.payload
        // .primaryImage.imageUrl;
        return { newFriend };
      });
    }
  }

  onFriendFormChange = (e) => {
    console.log(e.currentTarget);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newFriend = { ...this.state.newFriend };

      newFriend[inputName] = newValue;

      return { newFriend };
    });
  };

  addFriendClick = (e) => {
    e.preventDefault();
    if (this.props.history.location.state) {
      const data = { ...this.state.newFriend };
      data.id = this.props.match.params.id;
      userServices
        .updateFriend(data)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendError);
    } else {
      const data = { ...this.state.newFriend };
      userServices
        .addFriend(data)
        .then(this.onSubmitFriendSuccess)
        .catch(this.onSubmitFriendError);
    }
  };

  onSubmitFriendSuccess = (response) => {
    let newFriend = response.data.item;
    // Swal.fire("Good job!", "A New Friend Was Submitted", "success");

    this.props.history.push("/friends");
    console.log(newFriend);
  };
  // componentDidUpdate(prevProps) {
  //   let currentPath = this.props.location.pathname;
  //   let previousPath = prevProps.location.pathname;

  //   console.log({ currentPath, previousPath });
  // }

  onSubmitFriendError = () => {};

  onUpdateFriendSuccess = (response) => {
    console.log(response);
    this.props.history.push("/friends");
  };
  onUpdateFriendError = () => {};

  render() {
    return (
      <React.Fragment>
        <form
          style={{
            marginLeft: "100px",
            marginBottom: "100px",
            marginTop: "100px",
          }}
        >
          <div>
            <h2
              style={{
                marginLeft: "400px",
                marginBottom: "50px",
                marginTop: "200px",
              }}
            >
              User Profile
            </h2>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-5">
              <input
                name="title"
                type="title"
                className="form-control"
                onChange={this.onFriendFormChange}
                value={this.state.newFriend.title}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Bio</label>
            <div className="col-sm-5">
              <input
                name="bio"
                type="bio"
                className="form-control"
                onChange={this.onFriendFormChange}
                value={this.state.newFriend.bio}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Summary</label>
            <div className="col-sm-5">
              <input
                name="summary"
                type="summary"
                className="form-control"
                onChange={this.onFriendFormChange}
                value={this.state.newFriend.summary}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Headline</label>
            <div className="col-sm-5">
              <input
                name="headline"
                type="headline"
                className="form-control"
                onChange={this.onFriendFormChange}
                value={this.state.newFriend.headline}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Slug</label>
            <div className="col-sm-5">
              <input
                name="slug"
                type="slug"
                className="form-control"
                onChange={this.onFriendFormChange}
                value={this.state.newFriend.slug}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Status</label>
            <div className="col-sm-5">
              <input
                name="statusId"
                type="statusId"
                className="form-control"
                onChange={this.onFriendFormChange}
                value={this.state.newFriend.statusId}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Skills</label>
            <div className="col-sm-5">
              <input
                name="skills"
                type="skills"
                className="form-control"
                onChange={this.onFriendFormChange}
                value={this.state.newFriend.skills}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Primary Picture</label>
            <div className="col-sm-5">
              <input
                className="form-control"
                name="primaryImage"
                onChange={this.onFriendFormChange}
                value={this.state.newFriend.primaryImage}
              />
            </div>
          </div>
          <div>
            <button
              style={{ marginLeft: "250px" }}
              className="btn btn-primary btn-sm"
              name="submit"
              type="submit"
              onClick={this.addFriendClick}
            >
              Submit
            </button>

            {/* <button
              style={{ marginLeft: "400px" }}
              className="btn btn-primary btn-sm"
              name="update"
              type="submit"
              onClick={this.updateFriendClick}
            >
              Update
            </button> */}
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default AddFriendForm;
