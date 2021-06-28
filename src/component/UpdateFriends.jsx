import React from "react";
import * as friendsService from "../services/friendsService";
class UpdateFriends extends React.Component {
  state = {
    id: 1,
    title: "",
    bio: "",
    summary: "",
    slug: "",
    headline: "",
    statusId: "Active",
    primaryImage: "",
  };
  componentDidMount() {
    let id = this.props.match.params.friendId;
    console.log(id);
    if (id) {
      friendsService
        .getById(id)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdError);
    }
  }
  componentDidUpdate(prevProps) {
    let id = this.props.match.params.friendId;
    console.log(id);
  }

  onGetByIdSuccess = (res) => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState = res.data.item;
      newState.primaryImage = res.data.item.primaryImage.imageUrl;
      return newState;
    });
    console.log(this.state);
  };

  onGetByIdError = (res) => {
    console.error(res);
  };

  onFormInput = (e) => {
    let newValue = e.currentTarget.value;
    let inputName = e.currentTarget.name;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState[inputName] = newValue;
      return newState;
    });
  };

  onUpdateClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let id = this.props.match.params.friendId;
    friendsService
      .update(id, this.state)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = (res) => {
    console.log(res, "Update Success!");
    this.props.history.push("/friends");
  };

  onUpdateError = (res) => {
    console.error(res);
  };
  render() {
    let borderStyle = {
      border: "1px solid black",
    };
    return (
      <div className="jumbotron">
        <div className="container" style={borderStyle}>
          <div className="w-75 container">
            <form>
              <div className="pt-3 d-flex justify-content-center">
                <h3>User Profile</h3>
              </div>
              <div className="form-group mb-4 pt-4">
                <label htmlFor="inputTitle">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  value={this.state.title}
                  name="title"
                  onChange={this.onFormInput}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="inputBio">Bio</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputBio"
                  value={this.state.bio}
                  name="bio"
                  onChange={this.onFormInput}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="inputSummary">Summary</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputSummary"
                  name="summary"
                  value={this.state.summary}
                  onChange={this.onFormInput}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="inputHeadline">Headline</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputHeadline"
                  value={this.state.headline}
                  name="headline"
                  onChange={this.onFormInput}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="inputSlug">Slug</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputSlug"
                  value={this.state.slug}
                  name="slug"
                  onChange={this.onFormInput}
                />
              </div>
              <div>Primary Image</div>
              <button
                id="updateFriend"
                className="btn btn-primary mb-5"
                onClick={this.onUpdateClick}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateFriends;
