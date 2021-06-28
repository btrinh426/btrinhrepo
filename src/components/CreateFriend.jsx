import React from "react";
import { addFriend } from "../services/friendsService";
import { toast } from "react-toastify";
import debug from "sabio-debug";
const _logger = debug.extend("App");

class CreateFriend extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: 1,
      primaryImage: "",
    },
  };

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
    e.preventDefault();
    const payload = { ...this.state.formData };
    addFriend(payload)
      .then(this.onAddFriendSuccess)
      .catch(this.onAddFriendError);
  };
  onAddFriendSuccess = (response) => {
    _logger("Add friend Success", response);
    toast["success"]("You added a friend!", "Congratulations!");
  };
  onAddFriendError = (response) => {
    _logger("Add friend Error", response);
    toast["error"]("Oops, something didn't work properly", "oops!");
  };

  render() {
    return (
      <div className="container">
        <h1>Add a Friend</h1>
        <div className="row">
          <div className="col-md-6 p-5">
            <form>
              <div className="form-group">
                <label htmlFor="title">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Enter Name"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio:</label>
                <input
                  type="text"
                  className="form-control"
                  id="bio"
                  name="bio"
                  placeholder="Enter Bio"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.bio}
                />
              </div>
              <div className="form-group">
                <label htmlFor="summary">Summary:</label>
                <input
                  type="text"
                  className="form-control"
                  id="sumamry"
                  name="summary"
                  placeholder="Enter Summary"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.summary}
                />
              </div>
              <div className="form-group">
                <label htmlFor="headline">Headline:</label>
                <input
                  type="text"
                  className="form-control"
                  id="headline"
                  name="headline"
                  placeholder="Enter Headline"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.headline}
                />
              </div>
              <div className="form-group">
                <label htmlFor="slug">slug:</label>
                <input
                  type="text"
                  className="form-control"
                  id="slug"
                  name="slug"
                  placeholder="Enter slug"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.slug}
                />
              </div>
              <div className="form-group">
                <label htmlFor="primaryImage">Image:</label>
                <input
                  type="url"
                  className="form-control"
                  id="primaryImage"
                  name="primaryImage"
                  placeholder="Image URL"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.primaryImage}
                />
              </div>
              <button
                type="submit"
                onClick={this.handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateFriend;
