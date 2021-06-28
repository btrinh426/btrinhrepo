import React, { Component } from "react";
import NavBar from "./NavBar";
import friendsService from "../services/friendsService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";



class FriendForm extends Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      skills: "",
      primaryImage: ""
    }
  }

  onFormFieldChange = (e) => {
    console.log(e.currentTarget.name, e.currentTarget.value);
    const currentTarget = e.currentTarget;
    const newValue =
      currentTarget.type === "checkbox"
        ? currentTarget.checked
        : currentTarget.value;
    const inputName = currentTarget.name;

    this.setState(() => {
      const formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  onSubmitFormButtonClicked = (e) => {
    e.preventDefault();
    console.log("you clicked submit");
    console.log("current State: ", this.state.formData);
    if (this.state.formData.title === "" ||
      this.state.formData.bio === "" ||
      this.state.formData.summary === "" ||
      this.state.formData.headline === "" ||
      this.state.formData.slug === "" ||
      this.state.formData.statusId === "" ||
      this.state.formData.skills === "" ||
      this.state.formData.primaryImage === ""
    ) {
      toast.error("All fields must be filled")
    } else {
      friendsService.newFriend(this.state.formData)
        .then(this.onNewFriendSuccess)
        .catch(this.onNewFriendError);
    }
  };

  onNewFriendSuccess = (response) => {
    toast.success(`Congratulations you added ${this.state.formData.title}`);
    console.log({ newFriendAdded: response });
    // i can create and call a function here that sets state to an empty form
    this.props.history.push("/welcome")
  };
  onNewFriendError = (response) => {
    toast.error("Your new friend was not added. Please try again");
    console.warn({ errorAddingFriend: response })

  }


  render() {
    return (
      <React.Fragment>

        <NavBar />
        <div
          className="jumbotron jumbotron-fluid"
          style={{ backgroundColor: "#b4aee8" }}
          id="friendsJumbo"
        >
          <div className="container">
            <h1
              className="display-3"
              style={{ color: "white" }}
            ><strong>Friends Form</strong></h1>
            <p
              className="lead"
              style={{ color: "white" }}
            >
              <strong id="FormFriendsHeader">Here you can Add your new Friend <NavLink to="/friendsList">Click Here to view a list of your Friends </NavLink></strong>
            </p>
          </div>
        </div>


        <div className="container">
          <h1>Add or Edit a Friend</h1>
          <div className="row">
            <div className="col form-group">
              <form id="FriendsForm">

                <div className="form-group row">
                  <label htmlFor="title">Title:</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="title"
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="bio">Bio:</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="bio"
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="summary">Summary:</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="summary"
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="headline">Headline:</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="headline"
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="slug">Slug:</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="slug"
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="status">Status:</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="statusId"
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="skills">Skills:</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="skills"
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="primaryImage">Primary Image:</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="primaryImage"
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                </div>



                <button
                  type="submit"
                  className="btn btn-warning"
                  style={{ backgroundColor: "#b4aee8" }}
                  onClick={this.onSubmitFormButtonClicked}
                >
                  Submit
                </button>

              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FriendForm;
