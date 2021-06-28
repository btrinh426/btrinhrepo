import React from "react";
import * as friendService from "../services/friendService";
// import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class AddFriend extends React.Component {
  state = {
    friendData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "1",
      primaryImage: "",
    },
  };

  componentDidMount() {
    let id = this.props.match.params.friendId;
    console.log("componentDidMount", { id });
    if (id) {
      friendService
        .getFriendById(id)
        .then(this.onEditFriendSuccess)
        .catch(this.onEditFriendError);
    }
  }

  onEditFriendSuccess = (response) => {
    console.log({ ...response.data }, "Hi");

    this.setState(() => {
      let newState = { ...this.state.friendData };
      let cardData = { ...response.data.item };
      newState = {
        title: cardData.title,
        bio: cardData.bio,
        summary: cardData.summary,
        headline: cardData.headline,
        slug: cardData.slug,
        statusId: cardData.statusId,
        primaryImage: cardData.primaryImage.imageUrl,
        friendId: "AaronFriend",
      };
      console.log({ friendData: newState });
      return { friendData: newState };
    });
  };

  onEditFriendError = (err) => {
    console.error(err);
  };

  onFriendFormChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name; //firstName or lastName

    this.setState(() => {
      let friendData = { ...this.state.friendData };
      friendData[inputName] = newValue;

      return { friendData };
    });
  };

  onUpdateClicked = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state.friendData);
    const data = this.state.friendData;
    let id = this.props.match.params.friendId;

    if (id) {
      friendService
        .editFriend(data, id)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendError);
    } else {
      friendService
        .addFriend(data)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };

  onUpdateFriendSuccess = (response) => {
    console.log({ update: response.data });
    this.props.history.push("/Friends/");
    toast["success"]("You Updated Your Friend");
  };
  onUpdateFriendError = (err) => {
    console.error(err);
    toast["error"]("You couldn't update Your Friend");
  };

  onClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    friendService
      .addFriend(this.state.friendData)
      .then(this.onAddFriendSuccess)
      .catch(this.onAddFriendError);

    console.log(this.state.friendData);
  };

  onAddFriendSuccess = (response) => {
    this.props.history.push("/Friends/");
    toast.success("You have registered a new friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onAddFriendError = (errResponse) => {
    toast.error("You could not register a new friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    onChange={this.onFriendFormChanged}
                    value={this.state.friendData.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">
                    Biography
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="bio"
                    onChange={this.onFriendFormChanged}
                    value={this.state.friendData.bio}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="summary" className="form-label">
                    Summary
                  </label>
                  <textarea
                    rows="3"
                    type="summary"
                    className="form-control"
                    name="summary"
                    onChange={this.onFriendFormChanged}
                    value={this.state.friendData.summary}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="headline" className="form-label">
                    Headline
                  </label>
                  <input
                    type="headline"
                    className="form-control"
                    name="headline"
                    onChange={this.onFriendFormChanged}
                    value={this.state.friendData.headline}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">
                    Slug
                  </label>
                  <input
                    type="slug"
                    className="form-control"
                    name="slug"
                    onChange={this.onFriendFormChanged}
                    value={this.state.friendData.slug}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="primaryImage" className="form-label">
                    Avatar
                  </label>
                  <input
                    className="form-control"
                    name="primaryImage"
                    onChange={this.onFriendFormChanged}
                    value={this.state.friendData.primaryImage}
                  />
                </div>
                <div id="nameHelp" className="form-text">
                  We'll never share your friend's information with anyone else.
                </div>
                <p></p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onClickHandler}
                >
                  Submit
                </button>
                <p></p>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={this.onUpdateClicked}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default AddFriend;
