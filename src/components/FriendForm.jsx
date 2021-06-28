import React from "react";
import { addFriend, updateFriend } from "../services/friendsService";
import { toast } from "react-toastify";

class FriendForm extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      skills: "",
      primaryImage: "",
    },
  };

  componentDidMount() {
    //getbyId   this.props.match.params.id
    //use  this.props.location.state to setState
    if (this.props.location.state) {
      this.setState((prevState) => {
        let formData = { ...prevState.formData };
        formData = this.props.location.state;
        formData.primaryImage = this.props.location.state.primaryImage.imageUrl;
        return { formData };
      });
    }
  }

  onSubmitClick = () => {
    let payload = {
      title: this.state.formData.title,
      bio: this.state.formData.bio,
      summary: this.state.formData.summary,
      headline: this.state.formData.headline,
      slug: this.state.formData.slug,
      statusId: this.state.formData.statusId,
      skills: this.state.formData.skills,
      primaryImage: this.state.formData.primaryImage,
    };

    if (this.props.location.state) {
      let id = this.props.location.state.id;
      updateFriend(payload, id)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendError);
    } else {
      addFriend(payload)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };
  onAddFriendSuccess = (response) => {
    toast.success("Add Friend Successful!");
    console.log(response);
  };
  onAddFriendError = (response) => {
    toast.error("Add Friend Unsuccessful");
    console.error(response);
  };
  onUpdateFriendSuccess = (response) => {
    toast.success("Update Friend Successful!");
    console.log(response);
  };
  onUpdateFriendError = (response) => {
    toast.error("Update Friend Unsuccessful");
    console.error(response);
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
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-info sabio">
          <h2 className="text-white">Add or Edit Friend</h2>
        </nav>
        <form className="ml-5 mt-4">
          <div className="form-group row">
            <label className="col-1 col-form-label">Title</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="John Smith"
                onChange={this.onFormFieldChange}
                value={this.state.formData.title}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Bio</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="bio"
                placeholder="This is a bio."
                onChange={this.onFormFieldChange}
                value={this.state.formData.bio}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Summary</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="summary"
                placeholder="This is a summary."
                onChange={this.onFormFieldChange}
                value={this.state.formData.summary}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Headline</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="headline"
                placeholder="This is a headline."
                onChange={this.onFormFieldChange}
                value={this.state.formData.headline}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Slug</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="slug"
                placeholder="www.slug.com"
                onChange={this.onFormFieldChange}
                value={this.state.formData.slug}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Status</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="statusId"
                placeholder="Active"
                onChange={this.onFormFieldChange}
                value={this.state.formData.statusId}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Skills</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="skills"
                placeholder="Here are the skills"
                onChange={this.onFormFieldChange}
                value={this.state.formData.skills}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-1 col-form-label">Primary Image</label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="primaryImage"
                placeholder="https://imageurl.com"
                onChange={this.onFormFieldChange}
                value={this.state.formData.primaryImage}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmitClick}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default FriendForm;
