import React from "react";
import * as friendsService from "../services/friendsService";
import * as filesService from "../services/filesService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "../invalidinput.css";

class AddUpdateFriends extends React.Component {
  state = {
    friendData: {
      bio: "",
      headline: "",
      id: null,
      primaryImage: "",
      slug: "",
      statusId: "",
      summary: "",
      title: "",
    },
    file: {},
    form: {},
    borderStyle: "",
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
      if (id) {
        friendsService
          .getById(id)
          .then(this.onGetByIdSuccess)
          .catch(this.onGetByIdError);
      }
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
  onGetByIdError = (res) => {
    console.error(res);
  };
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
    if (this.state.form) {
      filesService
        .upload(this.state.form)
        .then(this.onUploadSuccess)
        .catch(this.onUploadError);
    } else if (id && id === stateId) {
      friendsService
        .update(id, this.state.friendData)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    }
    // } else {
    //   friendsService
    //     .add(this.state.friendData)
    //     .then(this.onAddSuccess)
    //     .catch(this.onAddError);
    // }
  };

  onUploadSuccess = (res) => {
    console.log(res);
    let imageUrl = res.data.items[0];
    this.setState((prevState) => {
      let newFriendData = { ...prevState.friendData };
      newFriendData.primaryImage = imageUrl;
      return { friendData: newFriendData };
    });
    friendsService
      .add(this.state.friendData)
      .then(this.onAddSuccess)
      .catch(this.onAddError);
  };

  onUploadError = (res) => {
    console.error(res);
    toast.error("Please upload image!", { position: "top-center" });
    if (!this.state.friendData.title) {
      this.setState(() => {
        return { borderStyle: "formBorderStyle" };
      });
    } else {
      this.setState(() => {
        return { borderStyle: "" };
      });
    }
  };

  addSuccessNotify = () =>
    toast.success("Your Friend is added to your list!", {
      position: "top-center",
    });
  UpdateSuccessNotify = () => toast("Update Completed!");
  addErrorNotify = () => {
    toast.error("Check your Input again!", { position: "top-center" });
  };

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
    Swal.fire({
      position: "center",
      icon: "success",
      title: "New Friend Added!",
      showConfirmButton: false,
      timer: 2500,
    });
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

  onFileInput = (e) => {
    let fileList = e.currentTarget.files;
    let imageFile = [...fileList][0];
    let form = new FormData();
    form.append("file", imageFile);
    let file = URL.createObjectURL(imageFile);
    this.setState(() => {
      return { file, form };
    });
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
                    className={`form-control ${this.state.borderStyle}`}
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
                    placeholder="Type Active"
                    value={this.state.friendData.statusId}
                    onChange={this.onFormInput}
                  />
                </div>
                {!this.props.location.state &&
                  this.props.location.pathname === "/addfriend" && (
                    <React.Fragment>
                      <div className="form-group mb-4">
                        <label>ImageUrl</label>
                        <input
                          type="file"
                          className="form-control"
                          name="file"
                          placeholder="image"
                          onChange={this.onFileInput}
                          style={this.state.formBorderStyle}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <img src={this.state.file} alt="preview"></img>
                      </div>
                    </React.Fragment>
                  )}
                {this.props.location.state && (
                  <div className="form-group mb-4">
                    <label>ImageUrl</label>
                    <input
                      type="text"
                      className="form-control"
                      name="primaryImage"
                      placeholder="image"
                      value={this.state.friendData.primaryImage}
                      onChange={this.onFormInput}
                    />
                  </div>
                )}

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