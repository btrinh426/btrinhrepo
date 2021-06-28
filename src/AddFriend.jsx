import React from "react";
import { addFriend, updateFriend } from "./components/apiCalls.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { withRouter } from "react-router-dom";

class AddFriend extends React.Component {
  constructor(props) {
    super(props);

    this.isEdit = false; // assume we are adding

    if (
      this.props.location.state &&
      this.props.location.state.type === "EDIT_FRIEND"
    ) {
      this.isEdit = true; // set editing

      this.state = { ...this.props.location.state.friend };
    } else {
      this.state = {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "Active",
        primaryImage: "",
      };
    }
  } // end constructor

  onFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let inputValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      newState[inputName] = inputValue;
      return newState;
    });
  };

  // I don't know how I added a friend with an empty URL,
  //  but I'm not doing that again!
  isValidForm(friend) {
    if (friend.title.length === 0) {
      Swal.fire("Please enter a title");
      return false;
    }
    if (friend.bio.length === 0) {
      Swal.fire("Please enter a biography");
      return false;
    }
    if (friend.summary.length === 0) {
      Swal.fire("Please enter a summary");
      return false;
    }
    if (friend.headline.length === 0) {
      Swal.fire("Please enter a headline");
      return false;
    }
    if (friend.slug.length === 0) {
      Swal.fire("Please enter a slug");
      return false;
    }
    if (friend.statusId.length === 0) {
      Swal.fire("Please enter a statusId");
      return false;
    }
    if (friend.primaryImage.length === 0) {
      Swal.fire("Please enter a primaryImage");
      return false;
    }

    return true;
  }

  onAdd = (e) => {
    e.preventDefault();

    let friend = { ...this.state };

    // validation - no fields should be blank
    if (!this.isValidForm(friend)) {
      return;
    }

    if (this.isEdit) {
      updateFriend(friend).then(this.onUpdateSuccess).catch(this.onUpdateError);
    } else {
      addFriend(friend).then(this.onAddSuccess).catch(this.onAddError);
    }
  };

  // same function as getIdOfDeleted in Friends
  getIdFromConfigUrl = (url) => {
    let urlElements = url.split("/");
    return urlElements[urlElements.length - 1];
  };

  // result.data.config.url
  onUpdateSuccess = (result) => {
    console.log(result.config);
    let id = this.getIdFromConfigUrl(result.config.url);
    // this.props.history.push(`/people/${id}`);
    this.props.history.push(`/people/${id}`, {
      type: "EDITED_FRIEND",
      id: id,
    });
  };

  onUpdateError = (result) => {
    Swal.fire("Error updating a friend. Check form values and try again.");
  };

  onAddSuccess = (result) => {
    // Swal.fire("Friend added.");
    this.clearForm();
  };

  clearForm = () => {};

  onAddError = (result) => {
    Swal.fire("Error adding a friend. Check form values and try again.");
  };

  getHeader() {
    if (this.isEdit) {
      return "Edit Friend / Contact";
    } else {
      return "Add Friend / Contact";
    }
  }

  getButtonTitle() {
    if (this.isEdit) {
      return "Edit";
    } else {
      return "Add";
    }
  }

  render() {
    return (
      <form id="addFriendForm">
        <div className="form-floating">
          <h1 className="h3 mb-3 fw-normal">{this.getHeader()}</h1>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Title</label>
            <input
              id="title"
              className="edit-control"
              type="text"
              name="title"
              onChange={this.onFieldChange}
              value={this.state.title}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Bio</label>
            <input
              id="bio"
              className="edit-control"
              type="text"
              name="bio"
              onChange={this.onFieldChange}
              value={this.state.bio}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Summary</label>
            <input
              id="summary"
              className="edit-control"
              type="text"
              name="summary"
              onChange={this.onFieldChange}
              value={this.state.summary}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Headline</label>
            <input
              id="headline"
              className="edit-control"
              type="text"
              name="headline"
              onChange={this.onFieldChange}
              value={this.state.headline}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Slug</label>
            <input
              id="slug"
              className="edit-control"
              type="url"
              name="slug"
              onChange={this.onFieldChange}
              value={this.state.slug}
            />
          </div>

          <label className="col-sm-1 col-form-label">Status Id</label>
          <select
            className="form-select"
            // aria-label="Status Id"
            id="statusId"
            name="statusId"
            onChange={this.onFieldChange}
            value={this.state.statusId}
          >
            <option value="0"></option>
            <option value="Active">Active</option>
          </select>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Image</label>
            <input
              id="primaryImage"
              className="edit-control"
              type="img"
              name="primaryImage"
              onChange={this.onFieldChange}
              value={this.state.primaryImage}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          id="btn-add"
          onClick={this.onAdd}
        >
          {this.getButtonTitle()}
        </button>
      </form>
    );
  }
}

export default withRouter(AddFriend);
