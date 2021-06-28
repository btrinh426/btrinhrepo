import React from "react";
import * as friendsService from "../services/friendsService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddUpdateFriends extends React.Component {
  state = {
    friendData: {
      bio: "",
      headline: "",
      id: null,
      primaryImage: "",
      skills: null,
      slug: "",
      statusId: "",
      summary: "",
      title: "",
    },
  };
  componentDidMount() {
    const { state: locState } = this.props.location;
    if (locState && locState.type === "FriendData") {
      let newFriendData = { ...locState.payload };
      newFriendData.primaryImage = newFriendData.primaryImage.imageUrl;
      this.setState(() => {
        return { friendData: newFriendData };
      });
    } else if (!locState) {
      let id = this.props.match.params.friendId;
      friendsService
        .getById(id)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdError);
    }
  }
  onGetByIdSuccess = (res) => {
    console.log(res.data.item);
    this.setState(() => {
      let newFriendData = res.data.item;
      newFriendData.primaryImage = newFriendData.primaryImage.imageUrl;
      return { friendData: newFriendData };
    });
  };
  onGetByIdError = () => {};
  componentDidUpdate(prevProps) {
    let id = prevProps.match.params.friendId;
    console.log("DidUpdate", id);
  }

  onFormInput = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    this.setState((prevState) => {
      let newFriendData = { ...prevState.friendData };
      newFriendData[inputName] = newValue;
      return { friendData: newFriendData };
    });
    console.log(this.state.friendData);
  };

  onSubmitClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let id = this.props.match.params.friendId;
    let stateId = JSON.stringify(this.state.friendData.id);
    console.log(id, stateId);

    if (id && id === stateId) {
      friendsService
        .update(id, this.state.friendData)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else if (id !== stateId) {
      return;
    } else {
      friendsService
        .add(this.state.friendData)
        .then(this.onAddSuccess)
        .catch(this.onAddError);
    }
  };

  addSuccessNotify = () => toast("Your Friend is added to your list!");
  UpdateSuccessNotify = () => toast("Update Completed!");
  addErrorNotify = () => toast("Check your Input again!");

  onUpdateSuccess = (res) => {
    console.log(res, "Update Success!");
    this.UpdateSuccessNotify();
    this.props.history.push("/friends");
  };

  onUpdateError = (res) => {
    console.error(res);
  };
  onAddSuccess = (res) => {
    console.log(res);
    this.addSuccessNotify();
    this.props.history.push("/friends");
  };

  onAddError = (res) => {
    console.warn(res);
    this.addErrorNotify();
  };
  showMessage = () => {
    let id = this.props.match.params.friendId;
    if (id) {
      return "Update Friend";
    } else {
      return "Register Friend";
    }
  };
  render() {
    let registgerFriendStyle = {
      margin: "0 auto",
      fontSize: "x-large",
    };
    console.log("rendered");
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="container-fluid">
            <div className="row bg-white p-3">
              <p className="font-weight-bolder" style={registgerFriendStyle}>
                {this.showMessage()}
              </p>
            </div>
          </div>
          <div className="bg-light container-fluid">
            <div className="w-75 container">
              <form>
                <div className="form-group mb-4 pt-4">
                  <label htmlFor="inputTitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Title"
                    value={this.state.friendData.title}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="inputBio">Bio</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bio"
                    placeholder="Bio"
                    value={this.state.friendData.bio}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="inputSummary">Summary</label>
                  <input
                    type="text"
                    className="form-control"
                    name="summary"
                    placeholder="Summary"
                    value={this.state.friendData.summary}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="inputHeadline">Headline</label>
                  <input
                    type="text"
                    className="form-control"
                    name="headline"
                    placeholder="Headline"
                    value={this.state.friendData.headline}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="inputSlug">Slug</label>
                  <input
                    type="text"
                    className="form-control"
                    name="slug"
                    placeholder="Slug"
                    value={this.state.friendData.slug}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="inputStatus">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="statusId"
                    placeholder=""
                    value={this.state.friendData.statusId}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="inputImage">ImageUrl</label>
                  <input
                    type="text"
                    className="form-control"
                    name="primaryImage"
                    placeholder="image"
                    value={this.state.friendData.primaryImage}
                    onChange={this.onFormInput}
                  />
                </div>
                <button
                  id="postFriend"
                  className="btn btn-primary mb-5"
                  onClick={this.onSubmitClick}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddUpdateFriends;
