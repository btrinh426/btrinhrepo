import React from "react";
import {
  addFriend,
  getFriend,
  updateFriend,
} from "../services/friendServices.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { withRouter } from "react-router-dom";

class AddFriend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "Active",
      primaryImage: "",
      id: "",
      isEdit: false,
    };
  }

  componentDidMount() {
    if (this.props.match.path.endsWith("/edit")) {
      getFriend(this.props.match.params.id)
        .then(this.onGetFriendSuccess)
        .catch(this.onGetFriendError);
    }
  }

  onGetFriendSuccess = (response) => {
    this.setState(() => {
      return {
        id: response.data.item.id,
        title: response.data.item.title,
        bio: response.data.item.bio,
        summary: response.data.item.summary,
        headline: response.data.item.headline,
        slug: response.data.item.slug,
        statusId: "Active",
        primaryImage: response.data.item.primaryImage.imageUrl,
        isEdit: true,
      };
    });
  };

  onGetFriendError = (response) => {
    Swal.fire("Could not get friend data to edit");
  };

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
    if (this.state.title.length === 0) {
      Swal.fire("Please enter a title");
      return false;
    }
    if (this.state.bio.length === 0) {
      Swal.fire("Please enter a biography");
      return false;
    }
    if (this.state.summary.length === 0) {
      Swal.fire("Please enter a summary");
      return false;
    }
    if (this.state.headline.length === 0) {
      Swal.fire("Please enter a headline");
      return false;
    }
    if (this.state.slug.length === 0) {
      Swal.fire("Please enter a slug");
      return false;
    }
    if (this.state.statusId.length === 0) {
      Swal.fire("Please enter a statusId");
      return false;
    }
    if (this.state.primaryImage.length === 0) {
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

    if (this.state.isEdit) {
      updateFriend(friend).then(this.onUpdateSuccess).catch(this.onUpdateError);
    } else {
      addFriend(friend).then(this.onAddSuccess).catch(this.onAddError);
    }
  };

  // configuration URL from API call
  getIdFromConfigUrl = (url) => {
    let urlElements = url.split("/");
    return urlElements[urlElements.length - 1];
  };

  // result.data.config.url
  onUpdateSuccess = (result) => {
    // console.log(result.config);
    this.props.history.push(`/friends`, {
      type: "EDITED_FRIEND",
      id: this.getIdFromConfigUrl(result.config.url),
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
    if (this.state.isEdit) {
      return "Edit Friend / Contact";
    } else {
      return "Add Friend / Contact";
    }
  }

  getButtonTitle() {
    if (this.state.isEdit) {
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

///          /friends                   list
////         /friends/1234/edit            edit form
/////        /friends/new                  create form
/////        /friends/1234                 view details
