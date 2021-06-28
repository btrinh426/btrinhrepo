import React from "react";
import * as friendService from "../services/friendService";

class Friend extends React.Component {
  // constructor(props) {
  //     super(props);

  //     this.state = {
  //         friend: this.propsToFormData(this.props)
  //     };
  // }
  state = {
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

  componentDidMount() {
    let friendFormId = this.props.match.params.friendId;

    console.log("componentDidMount", { friendFormId });

    if (friendFormId) {
      friendService
        .getById(friendFormId)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdError);
    }
  }

  onGetByIdSuccess = (response) => {
    console.log(response.data);

    this.setState((prevState) => {
      let currentFriend = { ...prevState.formData };

      currentFriend = {
        title: response.data.item.title,
        bio: response.data.item.bio,
        summary: response.data.item.summary,
        headline: response.data.item.headline,
        slug: response.data.item.slug,
        statusId: 1,
        primaryImage: response.data.item.primaryImage.imageUrl,
      };

      return { formData: currentFriend };
    });
  };
  onGetByIdError = (errResponse) => {
    console.error(errResponse.data);
  };

  onUpdateClicked = (e) => {
    e.preventDefault();

    //parseInt(this.state.formData.statusId);

    let friendFormId = this.props.match.params.friendId;

    if (friendFormId) {
      friendService
        .update(friendFormId, this.state.formData)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      friendService
        .add(this.state.formData)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };

  onUpdateSuccess = (response) => {
    console.log("Updated", response);

    this.props.history.push(`/friendlist`);
  };
  onUpdateError = (err) => {
    console.error(err);
  };
  // onSaveRequested = updateFriend => {
  //     this.setState(prevState => {
  //         const existingFriendIndex = prevState.friend.findIndex(item => {
  //             return item.id === updateFriend.id;
  //         })
  //         let updatedFriends = null;

  //         if (existingFriendIndex >= 0) {
  //             updatedFriends = [...prevState.friend];
  //             updatedFriends[existingFriendIndex] = updateFriend;
  //         }

  //         return {
  //             friend: updatedFriends,
  //         };
  //     });
  // }

  // Helper function maps props.friendData to state.friendData
  // propsToFormData(props) {
  //     if (props.friendData && props.friendData.id) {

  //         return JSON.parse(JSON.stringify(props.friendData));
  //     } else {
  //         return {
  //             title: "",
  //             bio: "",
  //             summary: "",
  //             headline: "",
  //             slug: "",
  //             statusId: "",
  //             primaryImage: ""
  //         };
  //     }
  // }

  onAddFriendSuccess = (response) => {
    console.log("Add", response.data);

    this.setState((prevState) => {
      let clearForm = { ...prevState.formData };

      clearForm.title = "";
      clearForm.bio = "";
      clearForm.summary = "";
      clearForm.headline = "";
      clearForm.slug = "";
      clearForm.statusId = "";
      clearForm.primaryImage = "";

      return { formData: clearForm };
    });
  };
  onAddFriendError = (errResponse) => {
    console.error(errResponse.data);
  };

  onFormFieldChange = (e) => {
    let target = e.target;
    let newValue = target.value;
    let inputName = target.name;

    this.setState((prevState) => {
      let updatedFormData = { ...prevState.formData };

      updatedFormData[inputName] = newValue;

      return { formData: updatedFormData };
    });
  };

  render() {
    return (
      <main role="main">
        <div className="container">
          <div className="row">
            <div className="col-md-4 p-5">
              <div>
                <h2 className="text-muted">User Profile</h2>
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="form-control"
                    name="title"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Bio:</label>
                  <input
                    type="text"
                    placeholder="Enter bio"
                    className="form-control"
                    name="bio"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.bio}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="summary">Summary:</label>
                  <input
                    type="text"
                    placeholder="Enter summary"
                    className="form-control"
                    name="summary"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.summary}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="headline">Headline:</label>
                  <input
                    type="text"
                    placeholder="Enter headline"
                    className="form-control"
                    name="headline"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.headline}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="slug">Slug:</label>
                  <input
                    type="text"
                    placeholder="Enter slug"
                    className="form-control"
                    name="slug"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.slug}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="statusId">Status:</label>
                  <input
                    type="text"
                    placeholder="Enter status"
                    className="form-control"
                    name="statusId"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.statusId}
                  />
                </div>
                {/* <div className="form-group">
                                        <label htmlFor="skills">Skills:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="skills" 
                                            onChange={this.onFormFieldChange} 
                                            placeholder="Enter status" 
                                            value={this.state.formData.skills}
                                        />
                                    </div> */}
                <div className="form-group">
                  <label htmlFor="primaryImage">Avatar:</label>
                  <input
                    type="text"
                    placeholder="Enter avatar url"
                    className="form-control"
                    name="primaryImage"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.primaryImage}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onUpdateClicked}
                >
                  {this.props.match.params.friendId ? "Update" : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Friend;
