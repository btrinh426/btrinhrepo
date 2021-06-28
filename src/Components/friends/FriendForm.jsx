import React from "react";
import * as friendService from "../../services/friendsServices";
import * as userService from "../../services/userServices";
import { toast } from "react-toastify";

class FriendForm extends React.Component {
  state = {
    isEdit: false, //used by submitInfo to decide between GET and PUT call
    buttonName: "Add", //Label for submit button and form label.
    friendData: {
      //empty version of friendData so input defaultValues don't error on load

      statusId: 1,
      tenantId: userService.tenantId,
    },
  };
  componentDidMount = () => {
    this.setForm();
  };
  setForm = () => {
    if (this.props.match.params.id) {
      //check for passed param. If true, go to edit piepline. If not, user is adding, do nothing.
      if (this.props.location.state !== undefined) {
        //Check for passed information (i.e coming from Friends page or from a pasted link to edit)
        let friendPic = this.props.location.state.primaryImage.imageUrl;
        this.setState((prevState) => {
          //update state as part of edit pipeline
          let newState = { ...prevState };
          newState.friendData = this.props.location.state; //set data passed from Friend card to state. Inputs fill with new info.
          newState.friendData.primaryImage = friendPic; //set primaryImage(returned as an object) with the imageUrl as a string
          newState.isEdit = true;
          newState.buttonName = "Update";
          return newState;
        });
      } else {
        this.getUserData(); //if data not sent by previous page, call getByid
      }
    }
  };

  getUserData = () => {
    friendService
      .getById(this.props.match.params.id)
      .then(this.onSuccessFillForm)
      .catch(this.ongetByIdError);
  };
  onSuccessFillForm = (response) => {
    //Put info returned by getById into state
    const friendData = response.data.item;
    const friendPic = friendData.primaryImage.imageUrl;
    this.setState((prevState) => {
      const editState = {};
      editState.friendData = friendData;
      editState.friendData.primaryImage = friendPic;
      editState.isEdit = true; //change state.isEdit used by submitInfo function
      editState.buttonName = "Update"; //change button text and form label to reflect editing
      return editState; //input defaultValues pull new info from state to fill
    });
  };
  ongetByIdError = (err) => {
    console.error(err);
  };
  onFormFieldChanged = (e) => {
    //captures input values and sets them in state
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState((prevState) => {
      let newState = { ...prevState };
      let inputName = currentTarget.name;
      newState.friendData[inputName] = newValue;
      return newState;
    });
  };
  submitInfo = () => {
    var payload = { ...this.state.friendData };
    if (this.state.isEdit) {
      //if editing, make PUT call
      friendService
        .update(payload.id, payload)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      friendService.add(payload).then(this.onAddSuccess).catch(this.onAddError);
    }
  };
  onUpdateSuccess = () => {
    toast.success(`${this.state.friendData.title} updated!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      this.props.history.push("/friends");
    }, 1500);
  };
  onUpdateError = (err) => {
    console.error(err);
  };
  onAddSuccess = () => {
    toast.info("Friend added!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      this.props.history.push("/friends");
    }, 1500);
  };
  onAddError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div className="container col-9 mt-5 ">
        <div className="row">
          <div className="jumbotron pb-5">
            <h5>{this.state.buttonName} Friend</h5>
          </div>
          <form className="col-6" style={{ border: "2px solid aliceblue" }}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={this.onFormFieldChanged}
                Value={this.state.friendData.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                className="form-control"
                name="bio"
                onChange={this.onFormFieldChanged}
                Value={this.state.friendData.bio}
              />
            </div>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input
                type="text"
                className="form-control"
                name="summary"
                onChange={this.onFormFieldChanged}
                Value={this.state.friendData.summary}
              />
            </div>
            <div className="form-group">
              <label htmlFor="headline">Headline</label>
              <input
                type="text"
                className="form-control"
                name="headline"
                onChange={this.onFormFieldChanged}
                Value={this.state.friendData.headline}
              />
            </div>
            <div className="form-group">
              <label htmlFor="avatar">User Image</label>
              <input
                type="text"
                className="form-control"
                name="primaryImage"
                onChange={this.onFormFieldChanged}
                Value={this.state.friendData.primaryImage}
              />
            </div>
            <div className="form-group">
              <label htmlFor="avatar">User Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                onChange={this.onFormFieldChanged}
                Value={this.state.friendData.slug}
              />
            </div>
            <button
              type="button"
              onClick={this.submitInfo}
              className="btn btn-info"
            >
              {this.state.buttonName}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default FriendForm;
