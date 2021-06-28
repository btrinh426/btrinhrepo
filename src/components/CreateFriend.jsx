import React from "react";
import { addFriend, editFriend } from "../services/friendsService";
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

  componentDidMount(props) {
    _logger("component mount, props:", this.props.location.state);
    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "FRIEND_TO_UPDATE") {
        let friendToUpdate = { ...locState.payload };

        _logger("friendToUpdate", friendToUpdate);

        this.setState((prevState) => {
          let newState = { ...this.state };

          newState.formData.title = friendToUpdate.title;
          newState.formData.bio = friendToUpdate.bio;
          newState.formData.summary = friendToUpdate.summary;
          newState.formData.headline = friendToUpdate.headline;
          newState.formData.slug = friendToUpdate.slug;
          newState.formData.primaryImage = friendToUpdate.primaryImage.imageUrl;
          return newState;
        });
      }
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
    e.preventDefault();
    if (this.props.location.state && this.props.match.params.id) {
      const idToUpdate = this.props.location.state.payload.id;
      editFriend(idToUpdate, this.state.formData)
        .then(this.onEditSuccess)
        .catch(this.onEditError);
    } else {
      addFriend(this.state.formData)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };
  onAddFriendSuccess = (response) => {
    _logger("Add friend Success", response);
    toast["success"]("You added a friend!", "Congratulations!");
  };
  onAddFriendError = (response) => {
    _logger("Add friend Error", response);
    toast["error"]("Oops, something didn't work properly", "oops!");
  };

  onEditSuccess = (response) => {
    _logger("Edit Success", response);
    toast["success"]("You updated a friend!", "Congratulations!");
  };
  onEditError = (response) => {
    _logger("Edit Error", response);
    toast["error"]("Oops, something didn't work properly", "oops!");
  };

  cancelFriendForm = (e) => {
    e.preventDefault();
    this.props.history.push("/friends");
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
                className="btn btn-primary mr-1"
              >
                Submit
              </button>
              <button
                type="submit"
                onClick={this.cancelFriendForm}
                className="btn btn-primary mr-1"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateFriend;
