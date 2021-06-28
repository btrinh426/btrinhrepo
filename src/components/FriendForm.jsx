import React from "react";
import * as friendsService from "../services/friendsService";

class FriendForm extends React.Component {
  constructor(props) {
    super(props);
    //console.log("constructor");
    console.log(this.props.location.state);
    this.state = { friendForm: this.propsToFormData(this.props) };
  }

  propsToFormData(props) {
    if (props.location.state && props.location.state.id) {
      return JSON.parse(JSON.stringify(props.location.state));
    } else {
      return {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: 1,
        primaryImage: "",
      };
    }
  }

  componentDidMount() {
    this.setState(() => {});
  }

  onInputChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let friendData = { ...this.state.friendForm };
      friendData[inputName] = newValue;
      return { friendForm: friendData };
    });
  };

  ///fix update/save functionality

  onSaveFriendClicked = (e) => {
    e.preventDefault();
    var dataFromForm = { ...this.state.friendForm };
    // console.log(dataFromForm);

    if (dataFromForm && dataFromForm.id) {
      friendsService
        .updateFriend(dataFromForm)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      friendsService
        .buildFriend(dataFromForm)
        .then(this.onBuildFriendSuccess)
        .catch(this.onBuildFriendError);
    }
  };
  onUpdateSuccess = (updatedFriend) => {
    this.onSaveRequested(updatedFriend);
    // this.props.history.push("/friends");
    // console.log("url change...");
  };
  onUpdateError = (err) => {
    console.log(err);
  };
  onSaveRequesteddd = (updatedFriend) => {
    let updatedFriendData = JSON.parse(updatedFriend.config.data);

    console.log(updatedFriendData.id);
    // this.setState((prevState) => {
    //   const existingPersonIndex = prevState.mappedFriends.findIndex((item) => {
    //     return item.id === updatedFriendData.id;
    //   });
    // need to turn the response into a jsx object i can use to index the array(id)
    // debugger;
    // let updatedPeople = null;

    // if (existingPersonIndex >= 0) {
    //   // An update to existing person
    //   updatedPeople = [...prevState.mappedFriends];
    //   updatedPeople[existingPersonIndex] = updatedFriendData;
    // }

    // return {
    //   people: updatedPeople,
    // };
    // });
  };
  onBuildFriendSuccess = (response) => {
    console.log(response);
    this.props.history.push("/friends");
    // UPDATE code here???
    this.onSaveRequested(response);
  };

  onBuildFriendError = (err) => {
    console.log(err);
  };
  //   onAddFriendSuccess = (response) => {
  //     //add user notification
  //     console.log(response);
  //   };
  //   onAddFriendError = (response) => {
  //     console.log(response);
  //   };

  render() {
    return (
      <form id="registerForm">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={this.state.friendForm.title}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <input
            type="text"
            className="form-control"
            name="bio"
            value={this.state.friendForm.bio}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Summary</label>
          <input
            type="text"
            className="form-control"
            name="summary"
            value={this.state.friendForm.summary}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Headline</label>
          <input
            type="text"
            className="form-control"
            name="headline"
            value={this.state.friendForm.headline}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>SLUG</label>
          <input
            type="text"
            className="form-control"
            name="slug"
            value={this.state.friendForm.slug}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Status Id</label>
          <input
            type="text"
            className="form-control"
            name="statusId"
            value={this.state.friendForm.statusId}
            onChange={this.onInputChanged}
          />
        </div>
        <div className="form-group">
          <label>Primary Image</label>
          <input
            type="text"
            className="form-control"
            name="primaryImage"
            value={this.state.friendForm.primaryImage}
            onChange={this.onInputChanged}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.onSaveRequested}
        >
          Save Friend
        </button>
        <div></div>
      </form>
    );
  }
}

export default FriendForm;
