import React from "react";
import { toast, ToastContainer } from "react-toastify";

class CreateJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        profile: "",
        summary: "",
        headline: "",
        contactInformation: "",
        slug: "",
        statusId: "",
        images: [
          {
            imageTypeId: "",
            imageUrl: "",
          },
        ],
        tags: ["string"],
        friendIds: [0],
      },
    };
  }

  render() {
    return (
      <form style={{ margin: "100px " }}>
        <ToastContainer />

        <div>
          <label>
            <h1 style={{ margin: "30px" }}>Jobs Form</h1>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChange}
            id="title"
            name="title"
            placeholder="ie. Web Developer"
            value={this.state.formData.title}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="profile">Profile</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChange}
            id="bio"
            name="bio"
            placeholder="Add info here to create a short personal bio"
            value={this.state.formData.bio}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChange}
            id="summary"
            name="summary"
            placeholder="Here would be a good place to list a few of your accomplishments"
            value={this.state.formData.sumary}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="headline">Headline</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChange}
            id="headline"
            name="headline"
            placeholder="Tell us your headline"
            value={this.state.formData.headline}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="contactInformation">Contact Information</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChange}
            id="headline"
            name="headline"
            placeholder="Tell us your headline"
            value={this.state.formData.headline}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChange}
            id="slug"
            name="slug"
            placeholder="Add your slug here"
            value={this.state.formData.slug}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="statusId">Status</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChange}
            id="statusId"
            name="statusId"
            placeholder="ex: 12345"
            value={this.state.formData.status}
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Create a unique number you will remember (1)
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="images">Image</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChange}
            id="primaryImage"
            name="primaryImage"
            value={this.state.formData.primaryImage}
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Use a URL link to add a photo.
          </small>
        </div>

        <button
          type="button"
          style={{ marginTop: "30px" }}
          className="btn btn-primary"
          onClick={this.handleSubmit}
        >
          Submit Job
        </button>
      </form>
    );
  }
}

export default CreateJob;
