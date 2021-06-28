import React from "react";
import * as friendService from "../services/friendService";
import { toast } from "react-toastify";

class EditProfile extends React.Component {
  state = {
    friendData: {
      title: " ",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "1",
      skills: "",
      primaryImage: "",
      friendId: "",
    },
  };

  componentDidMount = () => {
    //let currentPath = this.props.location.pathname;

    let personId = this.props.match.params.personId;
   //debugger;
    console.log("Edit Profile componentDidMount:", { personId });
    if (personId) {
      friendService
        .getById(personId)
        .then(this.onEditFriendByIdSuccess)
        .catch(this.onEditFriendByIdFail);
    }
  };

  componentDidUpdate(preProps) {
    let inpId = this.props.match.params.personId;
    console.log("EditProfile componentDidUpdate:");
    if (inpId && preProps.match.params.personId !== inpId) {
      //if prodId && previousId (!match) inpId
      console.log("making an ajax call for input id out of cDU:", { inpId }); // if new inpId is diff old pers id or persId,

      debugger; // id's don't match, so I'm going to make an ajax call
    };
  };

  // we coordinate with names of
  //properties of state
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    //console.log(currentTarget);
    let newValue = currentTarget.value; //  capture prop value
    let inputName = currentTarget.name; // assn prop name of input value (e.g. eMail)
    //console.log(newValue, currentTarget);

    this.setState((prevState) => {
      //current most recent state object
      let friendData = { ...prevState.friendData }; // copying all of the properties of current state at this momenent in time
      friendData[inputName] = newValue; // bind state to ea form field
      // as char entered
      return { friendData };
    });
  };

  onUpdateClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //console.log(e.currentTarget);
    const data = { ...this.state.friendData };
    console.log("...this.state.friendData:", data);
    let id = this.props.match.params.personId;
    //   {
    //     "title": "string",
    //     "bio": "string",
    //     "summary": "string",
    //     "headline": "string",
    //     "slug": "slug655",      // a unique, non-used slug
    //     "statusId": "Active",
    //     "primaryImage": "string"
    // }

    if (id) {
      // extra edit function goes here?    to do what exactly?
      friendService
        .updateById(id, data)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendFail);
    } else {
      friendService
        .add(data)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendFail);
    }
  };

  onAddFriendSuccess = (res) => {
    console.log("onAddFriendSuccess:", res);
    toast["success"]("New Friend Added");
    this.props.history.push("/people");
  };

  onAddFriendFail = (err) => {
    console.warn(err);
    toast["error"]("Failed To Update Friend");
  };

  onUpdateFriendSuccess = (res) => {
    console.log("onUpdateFriendSuccess:", res);
    toast["success"]("Congratulations: Friend Updated");
    this.props.history.push("/people");
  };

  onUpdateFriendFail = (res) => {
    console.warn("onUpdateFail", res);
    toast["error"]("Failed To Add A New Friend");
  };

  onEditFriendByIdSuccess = (res) => {
    let friendToPop = res.data.item;
    console.log("onEditFriendByIdSuccess res.data.item", friendToPop);

    this.setState(() => {
      let newState = { ...this.state.friendData };
      let friendData = { ...friendToPop }; // copies the properties from the entire object so we don't mutate state
      newState = {
        title: friendData.title,
        bio: friendData.bio,
        summary: friendData.summary,
        headline: friendData.headline,
        slug: friendData.slug,
        statusId: friendData.statusId,
        primaryImage: friendData.primaryImage.imageUrl,
      };
      return { friendData: newState }; // returns the ammended friendData
    });
  };

  onEditFriendByIdError = (res) => {
    console.error("onEditFriendByIdError:", res);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container main flex-column bkground">
          <div className="container parent-container d-flex">
            <div className="container left">
              <div className="row">
                <div className="col">
                  <form>
                    <div className="title" text="html">
                      <h3>Edit Friend</h3>
                    </div>

                    <label htmlFor="inputTitle" className="title">
                      Title
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="title"
                      onChange={this.onFormFieldChanged}
                      value={this.state.friendData.title}
                    />

                    <label htmlFor="inputBio" className="bio">
                      Bio
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="bio"
                      onChange={this.onFormFieldChanged}
                      value={this.state.friendData.bio}
                    />

                    <label htmlFor="inputSummary" className="summary">
                      Summary
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="summary"
                      onChange={this.onFormFieldChanged}
                      value={this.state.friendData.summary}
                    />

                    <label htmlFor="inputHeadline" className="headline">
                      Headline
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="headline"
                      onChange={this.onFormFieldChanged}
                      value={this.state.friendData.headline}
                    />

                    <label htmlFor="inputSlug" className="slug">
                      Slug
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="slug"
                      onChange={this.onFormFieldChanged}
                      value={this.state.friendData.slug}
                    />

                    <label htmlFor="inputStatusId" className="statusId">
                      StatusId
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="statusId"
                      onChange={this.onFormFieldChanged}
                      value={this.state.friendData.statusId}
                    />

                    <label htmlFor="inputSkills" className="skills">
                      Skills
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="skills"
                      onChange={this.onFormFieldChanged}
                      value={this.state.friendData.skills || ""}
                    />
                  </form>
                </div>
              </div>
            </div>

            <div className="container middle">
              <div className="row">
                <div className="col-md-12">
                  <div id="primaryimage" className="col text-center"></div>
                  <label htmlFor="inputImage" className="image">
                    Image URL
                  </label>

                  <input
                    className="form-control clear-fields"
                    type="text"
                    name="primaryImage"
                    onChange={this.onFormFieldChanged}
                    value={this.state.friendData.primaryImage}
                  />

                  <img
                    className="card-img-top"
                    src={this.state.friendData.primaryImage}
                    style={{
                      border: "solid",
                      borderRadius: 30,
                      marginLeft: 75,
                      marginTop: 0,
                      width: 100,
                    }}
                    alt="..."
                  />
                </div>

                <div className="col-md-12">
                  <button
                    id="putAPI"
                    type="submit"
                    className="btn btn-info ml-3 mb-5"
                    onClick={this.onUpdateClick}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditProfile;
