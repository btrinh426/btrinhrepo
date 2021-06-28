import React from "react";
import * as userService from "../services/userService";
import { toast, ToastContainer } from "react-toastify";

class Friends extends React.Component {
  state = {
    formData: {
      id: "",
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

    this.setState((prevState) => {
      let formData = { ...prevState.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  componentDidMount() {
    let superHeroFriendId = this.props.match.params.friendId;

    console.log("componentDidMount", { superHeroFriendId });

    userService
      .retrieveFriendById(this.props.match.params.friendId)
      .then(this.onRetrieveFriendByIdSuccess)
      .catch(this.onRetrieveFriendByIdError);
  }

  onRetrieveFriendByIdSuccess = (response) => {
    let newValue = {
      id: response.data.item.id,
      title: response.data.item.title,
      bio: response.data.item.bio,
      summary: response.data.item.summary,
      headline: response.data.item.headline,
      slug: response.data.item.slug,
      primaryImage: response.data.item.primaryImage.imageUrl,
      statusId: 1,
    };

    this.setState(
      (prevState) => {
        let formData = { ...prevState.formData };

        formData = { formData: newValue };

        return formData;
      },
      () => console.log(this.state)
    );
  };

  onRetrieveFriendByIdError = (response) => {
    console.warn({ error: response });
  };

  addButtonClicked = (e) => {
    e.preventDefault();

    userService
      .addFriend(this.state.formData)
      .then(this.onAddButtonClickedSuccess)
      .catch(this.onAddButtonClickedError);
  };

  onAddButtonClickedSuccess = (response) => {
    console.log(response.data);
    toast.success("You're Friends Have been Added!");
    this.props.history.push("/friends.view");
  };

  onAddButtonClickedError = (response) => {
    console.warn({ error: response });
    toast.error("Oh No! Please Try Again!");
  };

  onEditButtonClicked = (e) => {
    e.preventDefault();

    console.log("Edit Button is Working!");
    userService
      .editFriend(this.state.formData, this.props.match.params.friendId)
      .then(this.onEditFriendSuccess)
      .catch(this.onEditFriendError);
  };

  onEditFriendSuccess = (response) => {
    console.log(response.data);
    toast.success("You're Friends Have been Edited and Updated!");
    this.props.history.push("/friends.view");
  };

  onEditFriendError = (response) => {
    console.warn({ error: response });
    toast.error("Oh No! Please Try Again!");
  };

  render() {
    let styles = {
      marginRight: "520px",
      marginLeft: "480px",
    };

    let titleStyles = {
      marginRight: "500px",
      marginLeft: "520px",
      marginTop: "10px",
    };

    return (
      <React.Fragment>
        <ToastContainer />
        <h1 style={titleStyles}>Add or Edit Your Friends!</h1>);
        <form style={styles}>
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingInput">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              style={{ marginBottom: 10 }}
              onChange={this.onFormFieldChange}
              value={this.state.formData.title}
              name="title"
              id="title"
            />

            <label className="visually-hidden" htmlFor="autoSizingInput">
              Bio
            </label>
            <input
              type="text"
              className="form-control"
              style={{ marginBottom: 10 }}
              onChange={this.onFormFieldChange}
              value={this.state.formData.bio}
              name="bio"
              id="bio"
            />

            <label className="visually-hidden" htmlFor="autoSizingInput">
              Summary
            </label>
            <input
              type="text"
              className="form-control"
              style={{ marginBottom: 10 }}
              onChange={this.onFormFieldChange}
              value={this.state.formData.summary}
              name="summary"
              id="summary"
            />

            <label className="visually-hidden" htmlFor="autoSizingInput">
              Headline
            </label>
            <input
              type="text"
              className="form-control"
              style={{ marginBottom: 10 }}
              onChange={this.onFormFieldChange}
              value={this.state.formData.headline}
              name="headline"
              id="headline"
            />

            <label className="visually-hidden" htmlFor="autoSizingInput">
              Slug
            </label>
            <input
              type="text"
              className="form-control"
              style={{ marginBottom: 10 }}
              onChange={this.onFormFieldChange}
              value={this.state.formData.slug}
              name="slug"
              id="slug"
            />

            <label className="visually-hidden" htmlFor="autoSizingInput">
              Primary Image
            </label>
            <input
              type="text"
              className="form-control"
              style={{ marginBottom: 10 }}
              onChange={this.onFormFieldChange}
              value={this.state.formData.primaryImage}
              name="primaryImage"
              id="primaryImage"
            />

            <button
              type="submit"
              className="btn btn-success btn-lg"
              style={{ marginTop: 5, marginRight: 10 }}
              onClick={this.addButtonClicked}
            >
              Add!
            </button>
            <button
              type="submit"
              className="btn btn-info btn-lg"
              style={{ marginTop: 5, marginRight: 10 }}
              onClick={this.onEditButtonClicked}
            >
              Edit!
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Friends;
