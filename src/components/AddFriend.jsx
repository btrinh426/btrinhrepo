import React from "react";
import * as friendsService from "../services/friendsService";
import { toast } from "react-toastify";

class AddFriend extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "Active",
      primaryImage: "",
    },
  };

  onSubmitClicked = (e) => {
    e.preventDefault();

    friendsService
      .addFriend(this.state.formData)
      .then(this.onSuccess)
      .catch(this.onFailure);
  };

  onSuccess = (response) => {
    let widget = response;
    toast.success("Friend added successfully" + widget);
    this.props.history.push("/homepage");
  };

  onFailure = (response) => {
    toast.error("Friend not added" + response);
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

  render() {
    return (
      <div className="container">
        <h1>Add/Edit Friend</h1>
        <form>
          <label>Title</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            name="title"
            value={this.state.formData.title}
            type="text"
            placeholder="Title"
          />
          <label>Bio</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            name="bio"
            value={this.state.formData.bio}
            type="text"
            placeholder="Bio"
          />

          <label>Summary</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            name="summary"
            value={this.state.formData.summary}
            type="text"
            placeholder="Enter summary"
          />

          <label>Headline</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.headline}
            name="headline"
            type="text"
            placeholder="Something catchy"
          />
          <label>Slug</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.slug}
            name="slug"
            type="text"
            placeholder="Something slimy"
          />
          <label>Status</label>
          <input
            className="form-control"
            value={this.state.formData.statusId}
            name="statusId"
            type="text"
          />
          <label>Primary Image</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.primaryImage}
            name="primaryImage"
            type="text"
          />

          <button
            onClick={this.onSubmitClicked}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddFriend;
