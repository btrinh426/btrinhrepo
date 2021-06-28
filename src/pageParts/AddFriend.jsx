import React from "react";
import Basic from "../pageParts/Basic";
import * as friendService from "../services/friendService";
import { ToastContainer, toast } from "react-toastify";
import { withRouter, Route /*, NavLink*/ } from "react-router-dom";
class AddFriend extends React.Component {
  state = {
    formData: {
      title: "name",
      bio: "bio",
      slug: "unique slug",
      summary: "summary",
      headline: "snazzy headline",
      imageUrl: "image url",
      statusId: "Active",
      skills: "",
      entityId: 2,
      entityTypeId: 1,
    },
    isAnEdit: false,
  };

  componentDidMount() {
    //let friend = this.props.match.params.friend;
    if (this.props.location.state) {
      console.log("yes friend state");
      console.log(this.props.location.state);
      let friendData = this.props.location.state;
      friendData.imageUrl = this.props.location.state.primaryImage.imageUrl;

      this.setState(() => {
        let newState = { ...this.state.formData };
        newState = friendData;
        return { formData: newState, isAnEdit: true };
      });
    } else {
      console.log("no friend state");
    }
  }

  onAddFriend = (friendData) => {
    console.log("in on add friend");
    console.log(friendData);

    friendService
      .addFriend(friendData)
      .then(this.onAddSuccess)
      .catch(this.onAddError);
  };

  onEditFriend = (friendData) => {
    console.log("in Edit friend");
    console.log(friendData);
    let payload = {
      title: friendData.title,
      summary: friendData.summary,
      headline: "snazzy headline",
      slug: "unique slug",
      statusId: "Active",
      bio: friendData.bio,
      imageUrl: friendData.imageUrl,
    };
    friendService
      .updateFriend(friendData.id, payload)
      .then(this.onUpdateFriendSuccess)
      .catch(this.onUpdateFriendError);
  };

  // onButtonClicked = (e) => {
  //   e.preventDefault();
  //   console.log("I was clicked");
  //   console.log(this.state.formData);
  //   // console.log(this.state.formData.primaryImage.imageUrl);

  //   if (this.state.isAnEdit === true) {
  //     console.log("im and edit, call the updater");

  //     let id = this.state.formData.id;
  //     let friend = this.state.formData;
  //     // console.log(friend.primaryImage);
  //     let payload = {
  //       title: friend.title,
  //       bio: friend.bio,
  //       summary: friend.summary,
  //       headline: friend.headline,
  //       slug: friend.slug,
  //       statusId: friend.statusId,
  //       iamgeUrl: friend.imageUrl,
  //     };

  //     friendService
  //       .updateFriend(id, payload)
  //       .then(this.onUpdateFriendSuccess)
  //       .catch(this.onUpdateFriendError);
  //   } else {
  //     console.log("im a new add call add friend");
  //     console.log(this.state.formData);
  //     let newskills = this.state.formData.skills;
  //     newskills = newskills.split(",");
  //     console.log(newskills);
  //     console.log(newskills.length);
  //     for (let i = 0; newskills.length > i; i++) {
  //       let skill = newskills[i];
  //       newskills[i] = { SkillName: skill };
  //     }
  //     console.log(newskills);

  //     let payload = this.state.formData;
  //     payload.skills = newskills;
  //     console.log(payload);
  //     friendService
  //       .addFriend(payload)
  //       .then(this.onAddSuccess)
  //       .catch(this.onAddError);
  //   }
  // };

  onUpdateFriendError = (response) => {
    console.log("update error wah");
  };

  onUpdateFriendSuccess = (response) => {
    console.log("friend updated, do something");
    this.props.history.push("/friends");
  };

  onAddSuccess = (response) => {
    toast("🦄 Yay New Friend!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    this.props.history.push("/friends");
  };

  onAddError = (errResponse) => {
    toast("Nope, that is NOT your friend", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <div className="bg-text3" /*style={{display: 'none'}*/>
          {this.state.isAnEdit ? <h1>Edit Friend</h1> : <h1>Add New Friend</h1>}
          <Route
            path="/friends/add"
            render={(props) => (
              <Basic
                {...props}
                addFriend={this.onAddFriend}
                editFriend={this.onEditFriend}
                isAnEdit={this.state.isAnEdit}
              ></Basic>
            )}
          />
          <Route
            path="/friends/edit"
            render={(props) => (
              <Basic
                {...props}
                addFriend={this.onAddFriend}
                editFriend={this.onEditFriend}
                isAnEdit={true}
                friendData={this.props.location.state}
              ></Basic>
            )}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default AddFriend;
