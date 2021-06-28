import React from "react";
import * as friendsService from "../../../services/friendsService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import JobSkill from "../jobs/JobSkill";

class FriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: this.editCheck(),
      submitButtonText: this.setButtonText(),
      currentTitle: "Add Friend",
      currentFriend: {},
      skillKeys: [],
      //mappedSkillsList
    };
    this.state.currentFriend = this.initializeFriendForm();
    console.log(this.props.location.state);
  }

  //  ---------------------- INITIALIZATION -------------------------

  editCheck = () => {
    let result = false;
    if (this.props.location.pathname.includes("edit")) {
      result = true;
    }
    return result;
  };

  setButtonText = () => {
    let result = "Add New";
    if (this.props.location.pathname.includes("edit")) {
      result = "Update";
    }
    return result;
  };

  generateSkillKeys = (origSkills) => {
    let result = [];
    if (this.props.location.pathname.includes("edit")) {
      if (origSkills && Array.isArray(origSkills)) {
        for (let index = 0; index < origSkills.length; index++) {
          const sglSkill = origSkills[index];
          if (sglSkill.id) {
            result.push(sglSkill.id);
          } else {
            result.push(this.generateASkillKey());
          }
        }
      }
    }

    return result;
  };

  initializeFriendForm = () => {
    let result = {};
    if (this.props.location.state) {
      console.log("loading edit form from location.state");

      result = this.props.location.state;
      result.origSkills = result.skills;
      result.skills = this.initCondenseSkills(result.skills);
      result.skilltext = "";
    } else {
      console.log("loading blank form");

      result = this.getDefaultFriendFormData();
    }
    return result;
  };

  initCondenseSkills = (origSkills) => {
    let result = [];

    if (origSkills && Array.isArray(origSkills)) {
      for (let index = 0; index < origSkills.length; index++) {
        const skill = origSkills[index];
        if (skill.name) {
          result.push(skill.name);
        }
      }
    }

    return result;
  };

  getDefaultFriendFormData = () => {
    return {
      id: 7170,
      bio: "",
      title: "",
      summary: "",
      headline: "",
      // entityTypeId: 1,
      statusId: "Active",
      slug: "",
      primaryImage: "https://friends.avatarlink.here",
      //   id: 6208,
      //   entityId: 7170,
      //   imageTypeId: "Main",
      //   imageUrl:
      //     "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg",
      // },
      // dateCreated: "",
      // dateModified: "",
      skilltext: "",
      skills: [], // list of strings
    };
  };

  componentDidMount() {
    // if path = /edit, display avatar, isEditing = true
    // console.log(" >>>> MOUNTING FriendForm", this.props);
    // console.log("Params value of ", this.props.match.params);
    // console.log("Location pathname ", this.props.location.pathname);
    if (this.state.isEditing) {
      const currentTitle = "Edit Friend";
      const path = this.props.location.pathname;

      const friendId = parseInt(path.split("/")[2]);
      // console.log(friendId);
      const indexOfFrnd = this.props.friendList.findIndex(
        (aPerson) => aPerson.id === friendId
      );

      this.setState((prevState) => {
        return {
          ...prevState,
          currentFriend: this.props.friendList[indexOfFrnd],
          skillKeys: this.generateSkillKeys(this.props.location.state.skills),
          currentTitle,
          mappedSkillsList: this.state.currentFriend.skills.map(this.mapSkill),
        };
      });
    }
  }

  //  ---------------------- USER INTERACTION -------------------------

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log(newValue, currentTarget);

    this.setState(() => {
      let currentFriend = { ...this.state.currentFriend };
      currentFriend[inputName] = newValue;

      // console.log("newState ", currentFriend);
      return { currentFriend };
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    console.log("... FriendForm > onSubmitClicked firing ...");

    if (this.state.isEditing) {
      friendsService
        .update(this.state.currentFriend.id, this.state.currentFriend)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateFail);
    } else {
      friendsService
        .add(this.state.currentFriend)
        .then(this.onAddSuccess)
        .catch(this.onAddFail);
    }
  };

  onCancelClicked = (e) => {
    e.preventDefault();
    console.log("... FriendForm > onCancelClicked firing ...");

    Swal.fire({
      title: "Are you sure?",
      text: "Navigating away from page will not keep your changes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.value) {
        console.log(" >>>  dumping updates");
        this.props.history.push("/friends");
      }
    });
  };

  onClearFormClicked = (e) => {
    console.log("... JobsForm > onClearFormClicked firing ...");
    this.confirmAction(this.clearForm);
  };

  clearForm = () => {
    // clear state by setting to default, keep previous tech companies list
    this.setState((prevState) => {
      return {
        ...prevState,
        submitButtonText: "Add New",
        jobFormData: this.getDefaultJobFormData(),
        skillKeys: [],
      };
    });
  };

  // ---------------------- ADD / UPDATE -------------------------

  onUpdateSuccess = (data) => {
    // console.log("... FriendForm > onUpdateSuccess firing ...", data);

    const indexOfFriend = this.props.friendList.findIndex(
      (aPerson) =>
        parseInt(aPerson.id) === parseInt(this.state.currentFriend.id)
    );

    if (indexOfFriend >= 0) {
      this.props.onFriendUpdate(indexOfFriend, this.state.currentFriend);
      toast.success("Friend Updated");
      this.props.history.push("/friends");
    } else {
      toast.error("Unable to find friend in list, update failed");
    }
  };
  onUpdateFail = (err) => {
    console.log("... FriendForm > onUpdateFail firing ...", err);
  };

  onAddSuccess = (data) => {
    // console.log("... FriendForm > onAddSuccess firing ...", data);
    toast.success("Friend Added");
    this.props.history.push("/friends", this.state.currentFriend);
  };
  onAddFail = (err) => {
    // XXX SYNC TO HTTP ERRORS
    console.log("... FriendForm > onAddSuccess firing ...", err);
    toast.error(`Unable to add friend - ${err.statusText}`);
  };

  //  ---------------------- MANAGING SKILLS  -------------------------

  generateASkillKey = () => {
    return Date.now() - 1604440000000;
  };

  onSkillAddClicked = (e) => {
    console.log("... JobsForm > onSkillAddClicked firing ...");

    this.setState((prevState) => {
      let currentFriend = { ...this.state.currentFriend };
      let skills = currentFriend.skills;
      skills.push(prevState.currentFriend.skilltext);
      currentFriend.skilltext = "";

      const aKey = this.generateASkillKey();
      let skillKeys = prevState.skillKeys;
      skillKeys.push(aKey);

      return {
        ...prevState,
        currentFriend,
        skillKeys,
        mappedSkillsList: skills.map(this.mapSkill),
      };
    });
  };

  onSkillDelClicked = (aSkill) => {
    console.log("... JobsForm > onSkillDelClicked firing ...", aSkill);

    this.setState((prevState) => {
      const indexOfSkill = this.state.currentFriend.skills.findIndex(
        (text) => text === aSkill
      );

      const updatedSkillsList = [...this.state.currentFriend.skills];
      const updatedSkillKeys = [...this.state.skillKeys];

      if (indexOfSkill >= 0) {
        updatedSkillsList.splice(indexOfSkill, 1);
        updatedSkillKeys.splice(indexOfSkill, 1);
      }

      const currentFriend = prevState.jobFormData;
      let skillKeys = updatedSkillKeys;
      currentFriend.skills = updatedSkillsList;
      // this.state.onSk

      return {
        ...prevState,
        currentFriend,
        skillKeys,
        mappedSkillsList: updatedSkillsList.map(this.mapSkill),
      };
    });
  };

  mapSkill = (aSkill, index) => {
    // console.log("... JobsForm > mapSkill firing ...", aSkill, index);

    return (
      <JobSkill
        onSkillDelClicked={this.onSkillDelClicked}
        aSkill={aSkill}
        key={`jobskill-${this.state.skillKeys[index]}`}
      />
    );
  };

  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-12">
            <h3>{this.state.currentTitle}</h3>
          </div>
        </div>
        <div className="row">
          <div className="card mt-4 col-md-6" id="cardAddFriend">
            <div className="card-body">
              <div className="row">
                <div className="col-12" id="frndColExpand">
                  <form id="addFriendForm">
                    {/* ---------------------------------------- ROW */}
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          placeholder="Friend's Name"
                          value={this.state.currentFriend.title}
                          onChange={this.onFormFieldChanged}
                        />
                      </div>
                      <div className="form-group col-md-6 ">
                        <input
                          type="text"
                          className="form-control align-bottom"
                          name="headline"
                          placeholder="Headline"
                          value={this.state.currentFriend.headline}
                          onChange={this.onFormFieldChanged}
                        />
                      </div>
                    </div>
                    {/* ---------------------------------------- ROW */}
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          name="slug"
                          placeholder="Slug - what stands out about them"
                          value={this.state.currentFriend.slug}
                          onChange={this.onFormFieldChanged}
                        />
                      </div>
                    </div>
                    {/* ---------------------------------------- ROW */}
                    <div className="form-row">
                      <div className="form-group col-md-12 ">
                        <input
                          type="text"
                          className="form-control align-bottom"
                          //  primaryImage.imageUrl
                          name="primaryImage"
                          placeholder="https://friends.avatarlink.here"
                          value={this.state.currentFriend.primaryImage}
                          onChange={this.onFormFieldChanged}
                        />
                      </div>
                    </div>
                    {/* ---------------------------------------- ROW */}
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="summary" className="px-3">
                          Summary:
                        </label>
                        <textarea
                          className="form-control"
                          name="summary"
                          rows="3"
                          onChange={this.onFormFieldChanged}
                          value={this.state.currentFriend.summary}
                        ></textarea>
                      </div>
                    </div>
                    {/* ---------------------------------------- ROW */}
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputFrndBio" className="px-3">
                          Biography:
                        </label>
                        <textarea
                          className="form-control"
                          name="bio"
                          rows="3"
                          value={this.state.currentFriend.bio}
                          onChange={this.onFormFieldChanged}
                        ></textarea>
                      </div>
                    </div>
                    {/*  ---------------- job skills---------- row */}
                    <div className="form-row">
                      <div className="form-group col-md-5">
                        <div className="form-row">
                          <div>
                            <label htmlFor="skilltext" className="px-3">
                              Job Skills:
                            </label>
                            {/* This input element causing warning 
                            A component is changing an uncontrolled input of type undefined to be controlled.
                             Input elements should not switch from uncontrolled to controlled 
                             (or vice versa). Decide between using a controlled or uncontrolled 
                             input element for the lifetime of the component. 
                             More info: https://fb.me/react-controlled-components */}
                            <input
                              className="form-control"
                              name="skilltext"
                              onChange={this.onFormFieldChanged}
                              // value={this.state.jobFormData.skilltext}
                            ></input>
                          </div>

                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={this.onSkillAddClicked}
                          >
                            {">"}
                          </button>
                        </div>
                      </div>
                      <div className="col-md-7">
                        {this.state.mappedSkillsList}
                      </div>
                    </div>
                    {/* ---------------------------------------- ROW */}
                    <div className="form-row">
                      <div className="form-inline">
                        <label htmlFor="inputFrndStatus" className=" mx-2">
                          Status:{" "}
                        </label>
                        <select
                          className="form-control mx-2"
                          name="statusId"
                          value={this.state.currentFriend.statusId}
                          onChange={this.onFormFieldChanged}
                        >
                          <option value="NotSet">Choose (Not Set)</option>
                          <option defaultValue="Active">Active</option>
                          <option value="Flagged">Flagged</option>
                          <option value="Deleted" disabled>
                            Deleted
                          </option>
                        </select>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary ml-5"
                        onClick={this.onSubmitClicked}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark ml-5"
                        onClick={this.onCancelClicked}
                      >
                        Cancel
                      </button>
                    </div>
                    {/* ---------------------------------------- ROW */}
                    <div className="form-row">
                      <div className="form-inline">
                        <input
                          type="hidden"
                          name="id"
                          value={this.state.currentFriend.id}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col" hidden={!this.state.isEditing}>
                  <div className="row">
                    <div className="col-6">
                      <img
                        className="mt-4"
                        src={
                          this.state.isEditing
                            ? this.state.currentFriend.primaryImage
                            : ""
                        }
                        onChange={this.onFormFieldChanged}
                        alt={
                          this.state.isEditing
                            ? this.state.currentFriend.title
                            : ""
                        }
                        //   style={("max-width", "18rem")}
                        name="displayedAvatar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendForm;
