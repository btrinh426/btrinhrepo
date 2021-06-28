import React from "react";
import { Link } from "react-router-dom";
import { addFriend, getFriend, editFriend } from "../../services/UserService";
import { toast } from "react-toastify";

class Friends extends React.Component {
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
    var id = this.props.match.params.friendId;
    if (!id) {
      return;
    } else if (id && this.props.location.state) {
      this.setState(() => {
        let formData = { ...this.state.formData };
        formData = this.props.location.state.payload;
        formData.primaryImage = this.props.location.state.payload.primaryImage.imageUrl;
        return { formData };
      });
    } else {
      getFriend(id).then(this.onGetFriendSuccess).catch(this.onGetFriendError);
    }
  }

  /*  componentDidUpdate(preProps) {
   let id = this.props.match.params.friendId;
    if (id && preProps.match.params.friendId !== id) {
      getFriend(id).then(this.onGetFriendSuccess).catch(this.onGetFriendError);


    }
  }
*/
  onGetFriendSuccess = (response) => {
    console.log(response);
    this.setState(() => {
      let formData = { ...this.state.formData };
      formData = response.data.item;
      formData.primaryImage = response.data.item.primaryImage.imageUrl;
      return { formData };
    });
  };
  onGetFriendError = (errResponse) => {
    console.log(errResponse);
  };

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
  onEditBtnClicked = (e) => {
    e.preventDefault();
    if (this.state.formData.id) {
      var id = this.state.formData.id;
      var payload = this.state.formData;
      editFriend(id, payload)
        .then(this.onEditFriendSuccess)
        .catch(this.onEditFriendError);
    } else {
      addFriend(this.state.formData)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };

  onEditFriendSuccess = (response) => {
    toast.info("Edit Submitted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    this.props.history.push("/Friends/View");
    console.log(response);
  };
  onEditFriendError = (errResponse) => {
    toast.warning("Edits not submitted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log(errResponse);
  };
  onAddFriendSuccess = (response) => {
    toast.info("Friend Added", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log(response);
  };
  onAddFriendError = (errResponse) => {
    toast.warning("Error - No Friend Added", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log(errResponse);
  };

  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <div style={{ marginLeft: "8rem", padding: "8rem" }}>
            <h1>Friends</h1>

            <div className="container">
              <div style={{ marginTop: "2rem" }}>
                <h5>Add Your Friends Info Here:</h5>
              </div>
              <div style={{ marginTop: "2rem" }}>
                <form id="formRegister">
                  <div className="form-group">
                    <label htmlFor="title">Name</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      placeholder="enter your name"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.title}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio">Short Bio</label>
                    <input
                      type="text"
                      id="bio"
                      name="bio"
                      className="form-control"
                      placeholder="your bio"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.bio}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <input
                      id="summary"
                      name="summary"
                      type="text"
                      className="form-control"
                      placeholder="enter a summary"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.summary}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="headline">Headline</label>
                    <input
                      type="text"
                      id="headline"
                      name="headline"
                      className="form-control"
                      placeholder="your headline"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.headline}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="slug">Slug</label>
                    <input
                      id="slug"
                      name="slug"
                      type="text"
                      className="form-control"
                      placeholder="enter a slug"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.slug}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="statusId">Status</label>
                    <select
                      id="statusId"
                      name="statusId"
                      className="form-control"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.statusId}
                    >
                      <option value="">Please Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="primaryImage">Image</label>
                    <input
                      id="primaryImage"
                      name="primaryImage"
                      type="url"
                      className="form-control"
                      placeholder="enter a valid image url"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.primaryImage}
                    />
                  </div>
                  <div style={{ marginTop: "2rem" }}>
                    <button
                      id="addRecord"
                      type="submit"
                      className="btn btn-primary mx-6"
                      onClick={this.onEditBtnClicked}
                    >
                      {this.state.formData.id ? "Update" : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
              <div style={{ marginTop: "3rem" }}>
                <Link to="/Friends/view">
                  <button className="btn btn-secondary">
                    See My Friends &raquo;
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Friends;
