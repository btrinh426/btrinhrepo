import React, { Component } from "react";
import { postFriends } from "../services/friendsService";
import { toast } from "react-toastify";

class AddOrEditFriends1 extends Component {
  state = {
    friend: {
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
    if (this.props.location.state) {
      let locState = this.props.location.state;
      let newFriend = locState.payload.oneFriend;
      newFriend.primaryImage = newFriend.primaryImage.imageUrl;

      this.setState(() => {
        return { friend: newFriend };
      });
    }
  }

  onInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.name;

    this.setState(() => {
      let friend = { ...this.state.friend };
      friend[inputData] = newValue;
      return { friend };
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log("postfriends");

    postFriends(this.state.friend)
      .then(this.onPostFriendsSuccess)
      .catch(this.onPostFriendsError);
  };
  onPostFriendsSuccess = (res) => {
    console.log({ friend: res });
    toast.success(`You have successfully added a new friend!`);
    this.props.history.push("/friends");
  };
  onPostFriendsError = (res) => {
    console.log("error");

    toast.error(`Error`);
  };

  render() {
    return (
      <form>
        <div>
          <div className="row mb-3"></div>
          <label htmlFor>Title</label>
          <input
            onChange={this.onInputChange}
            name="title"
            className="form"
            value={this.state.friend.title}
            placeholder="Title"
          >
            /
          </input>

          <div className="row mb-3"></div>
          <label htmlFor>Bio</label>
          <input
            onChange={this.onInputChange}
            name="Bio"
            className="form"
            id="inputBio"
            value={this.state.friend.bio}
            placeholder="Bio"
          >
            /
          </input>

          <div className="row mb-3"></div>
          <label htmlFor>Summary</label>
          <input
            onChange={this.onInputChange}
            name="summary"
            className="form"
            id="inputSummary"
            aria-describedby="summary"
            value={this.state.friend.summary}
            placeholder="Summary"
          ></input>

          <div className="row mb-3"></div>
          <label htmlFor>Headline</label>
          <input
            onChange={this.onInputChange}
            name="headline"
            className="form"
            type="headline"
            id="inputHeadline"
            value={this.state.friend.headline}
            placeholder="Headline"
          >
            /
          </input>

          <div className="row mb-3"></div>
          <label htmlFor>Slug</label>
          <input
            onChange={this.onInputChange}
            name="slug"
            className="form"
            value={this.state.friend.slug}
            placeholder="slug"
          >
            /
          </input>

          <div className="row mb-3"></div>
          <label htmlFor>Status</label>
          <input
            onChange={this.onInputChange}
            name="status"
            type="text"
            value={this.state.friend.status}
            className="form"
            id="statusId"
          >
            /
          </input>

          <div className="row mb-3"></div>
          <label htmlFor>Skills</label>
          <input
            onChange={this.onInputChange}
            name="skills"
            className="form"
            id="skills"
            type="skills"
            value={this.state.friend.skills}
            placeholder="skills"
          >
            /
          </input>

          <div className="row mb-3"></div>
          <label htmlFor>Primary Image</label>
          <input
            onChange={this.onInputChange}
            name="primaryImage"
            className="form"
            id="primaryImage"
            value={this.state.friend.primaryImage}
            placeholder="Primary Image"
          >
            /
          </input>
          <button>Submit</button>
        </div>
      </form>
    );
  }
}
export default AddOrEditFriends1;
