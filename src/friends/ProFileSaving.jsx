import React from "react";
import * as friendsService from "../services/friendsService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Profile extends React.Component {
  state = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "Active",
    primaryImageUrl: "",
    skill: "",
  };

  componentDidMount() {
    if (this.props.location.state) {
      let locState = this.props.location.state;
      let newFriend = { ...locState.payload };

      console.log(newFriend);

      this.setState((prevState) => {
        return {
          ...prevState,
          title: newFriend.title,
          bio: newFriend.bio,
          summary: newFriend.summary,
          headline: newFriend.headline,
          slug: newFriend.slug,
          primaryImageUrl: newFriend.primaryImageUrl,
          skill: newFriend.skill,
          id: newFriend.id,
        };
      });
    }
  }

  fieldChange = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};

      newState[inputName] = newValue;

      return newState;
    });
  };

  addProfile = (e) => {
    e.preventDefault();
    if (this.props.location.state === undefined) {
      friendsService
        .add(this.state)
        .then(this.onAddFriendsSuccess)
        .catch(this.onAddFriendsError);
    }

    if (this.props.location.state !== undefined) {
      friendsService
        .updateFriend(this.state, this.state.id)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onupdateFriendError);
    }
  };

  onUpdateFriendSuccess = (response) => {
    console.log({ update: response.data });
    toast("Update Success");
  };

  onupdateFriendError = (response) => {
    console.log({ error: response });
    toast("Update Fail");
  };

  onAddFriendsSuccess = (response) => {
    console.log({ response: response.data });
    toast("Update Success");
  };

  onAddFriendsError = (response) => {
    console.log({ error: response });
    toast("Update Fail");
  };

  render() {
    // const { payload: friendsUpdate } = this.props.location.state;
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Title</label>
            <input
              name="title"
              type="title"
              className="form-control"
              placeholder="Title"
              value={this.state.title}
              onChange={this.fieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Bio</label>
            <input
              name="bio"
              type="bio"
              className="form-control"
              placeholder="Bio"
              value={this.state.bio}
              onChange={this.fieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Summary</label>
            <input
              name="summary"
              type="summary"
              className="form-control"
              placeholder="Summary"
              value={this.state.summary}
              onChange={this.fieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">headline</label>
            <input
              name="headline"
              type="headline"
              className="form-control"
              placeholder="headline"
              value={this.state.headline}
              onChange={this.fieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Slug</label>
            <input
              name="slug"
              type="slug"
              className="form-control"
              placeholder="Slug"
              value={this.state.slug}
              onChange={this.fieldChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Image Url</label>

            <input
              name="primaryImageUrl"
              type="primaryImageUrl"
              className="form-control"
              placeholder="Image Url"
              value={this.state.primaryImageUrl}
              onChange={this.fieldChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Skill </label>

            <input
              name="skill"
              type="skill"
              className="form-control"
              placeholder="Skill"
              value={this.state.skill}
              onChange={this.fieldChange}
            />
          </div>

          <button onClick={this.addProfile}> Update </button>
        </form>
        ;
      </React.Fragment>
    );
  }
}

export default Profile;
