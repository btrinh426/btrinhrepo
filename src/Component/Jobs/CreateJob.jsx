import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as jobService from "../../services/FriendService";

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

  componentDidMount() {
    if (this.props.history.location.state) {
      this.setState({
        formData: {
          ...this.props.history.location.state,
          images: this.props.history.location.state.images?.imageUrl,
        },
      });
    }
  }

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };

  handleSubmit = (e) => {
    console.log("clicked the button");

    jobService
      .addFriend(this.state.formData)
      .then(this.onAddJobSuccess)
      .catch(this.onAddJobError);
  };

  onAddJobSuccess = () => {
    toast.success("successfully added job");
  };

  onAddJobError = () => {
    toast.error("error");
  };

  render() {
    return (
      <form style={{ margin: "100px " }}>
        <ToastContainer />

        <div>
          <label>
            <h1 style={{ color: "lightblue" }}>Jobs Form</h1>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChange}
            id="name"
            name="name"
            placeholder="First and Last"
            value={this.state.formData.name}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="profile">Profile</label>
          <input
            type="text"
            className="form-control"
            onChange={this.onFormFieldChange}
            id="profile"
            name="profile"
            placeholder="Add info here to create a short personal bio"
            value={this.state.formData.profile}
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
            value={this.state.formData.summary}
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
            id="contactInformation"
            name="contactInformation"
            placeholder="Address"
            value={this.state.formData.contactInformation}
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
            placeholder="Add unique slug here"
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
