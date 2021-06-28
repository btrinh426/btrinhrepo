import React from "react";
import peopleService from "./services/peopleService";
import { ToastContainer, toast } from "react-toastify";

class RegisterPeople extends React.Component {
  state = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "",
    primaryImage: "",
    skills: "",
    show: true,
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      return newState;
    });
  };

  onClickHandler = (e) => {
    e.preventDefault();
    var friendId = this.props.match.params.id;
    console.log(friendId);
    const data = { ...this.state };
    let statusIdInt = this.state.statusId;
    let toInt = parseInt(statusIdInt);
    data.skills = data.skills.split(",");
    data.statusId = toInt;
    console.log(data);
    // const data = {
    //   title: this.state.title,
    //   bio: this.state.bio,
    //   summary: this.state.summary,
    //   headline: this.state.headline,
    //   slug: this.state.slug,
    //   statusId: this.state.statusId,
    //   primaryImage: this.state.primaryImage,
    //   skills: this.state.skills,
    // };

    if (friendId) {
      peopleService
        .updateOneFriendById(data, friendId)
        .then(this.updateFriendSuccess)
        .catch(this.updateFriendError);
    } else {
      peopleService
        .addFriend(data)
        .then(this.addingFriendSuccess)
        .catch(this.addingFriendError);
    }
    // const firstName = this.state.firstName;
    // const lastName = this.state.lastName;
    // const data = {...this.state}

    //     //... code omitted.
    // peopleService
    //   .friendReigster(data)
    //   .then(this.onActionSuccess)
    //   .catch(this.onActionError);
  };

  updateFriendSuccess = (response) => {
    console.log(response);
    toast.success("Update Success, directing to List Page");
    this.props.history.push("/listpeople");
  };

  updateFriendError = (response) => {
    console.log(response);
    toast.error("Update Unsuccessful, please check your input");
  };
  addingFriendSuccess = (response) => {
    // <Route path="/LoginPage" exact component={LoginPage}></Route>;
    // // console.log(response);
    // this.setState(() => {
    //   let newState = {
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     passwordConfirm: "",
    //     avatarUrl: "",
    //     tenantId: "",
    //   };

    //   return newState;
    // });
    // this.props.history.push("/loginPage");
    // console.log(response.config.data);
    this.props.history.push("/listpeople");

    toast.success("Add Friend Successful, directing to List Page");
  };
  addingFriendError = (errResponse) => {
    console.log(errResponse);
    toast.error(
      "Register fail, Please Check your input requirement or user already exists"
    );
  };

  componentDidMount() {
    var friendId = this.props.match.params.id;

    // console.log(friendId);

    // if (friendId) {
    //   this.setState(() => {
    //     let newState = {
    //       title: fromOtherCom.title,
    //       bio: fromOtherCom.bio,
    //       summary: fromOtherCom.summary,
    //       headline: fromOtherCom.headline,
    //       slug: fromOtherCom.slug,
    //       statusId: fromOtherCom.statusId,
    //       primaryImage: fromOtherCom.primaryImage.imageUrl,
    //     };
    //     return newState;
    //   });
    //   // } else {
    //   peopleService.getOneFriend(friendId)
    //     .then(this.getOneFriendSuccess)
    //     .catch(this.getOneFriendError);
    // }
    // }
    if (this.props.location.state) {
      let locState = this.props.location.state;
      var fromOtherCom = this.props.location.state.payload;

      console.log(fromOtherCom);
      if (locState.type === "EDIT_FRIEND") {
        this.setState(() => {
          let countSkills = fromOtherCom.skills;
          let newState = {
            id: parseInt(friendId),
            title: fromOtherCom.title,
            bio: fromOtherCom.bio,
            summary: fromOtherCom.summary,
            headline: fromOtherCom.headline,
            slug: fromOtherCom.slug,
            statusId: fromOtherCom.statusId,
            primaryImage: fromOtherCom.image.imageUrl,

            skills: countSkills.map((name) => name.name).join(","),
            show: true,
          };
          // newState = {...fromOtherCom}
          // newState.primaryImageUrl = fromOtherCom.primaryImage.imageUrl
          return newState;
        });
      }
    } else if (friendId) {
      peopleService
        .getOneFriendById(friendId)
        .then(this.getOneFriendSuccess)
        .catch(this.getOneFriendError);
    }
  }

  getOneFriendSuccess = (response) => {
    console.log(response);
    var friendData = response.data.item;
    let countSkills = response.data.item.skills;
    this.setState(() => {
      let newState = {
        id: friendData.id,
        title: friendData.title,
        bio: friendData.bio,
        summary: friendData.summary,
        headline: friendData.headline,
        slug: friendData.slug,
        statusId: friendData.statusId,
        primaryImage: friendData.image.imageUrl,
        skills: countSkills.map((name) => name.name).join(","),
        show: true,
      };

      return newState;
    });

    toast.success(
      "Get data successful, please make neccessary change and hit submit"
    );
    return true;
  };

  getOneFriendError = (response) => {
    console.log(response);
    toast.error("get friend unsuccessful, invalid ID");
    this.setState(() => {
      let newState = {};
      newState = { show: false };
      return newState;
    });
  };

  render() {
    return <div>{this.state.show && this.renderMessage()}</div>;
  }

  renderMessage() {
    return (
      <form>
        <div className="form-group row">
          <label
            htmlFor="exampleInputEmail1"
            className="col-sm-2 col-form-label"
          >
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="title"
              onChange={this.onFormFieldChanged}
              value={this.state.title}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Bio
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="bio"
              id="bio"
              onChange={this.onFormFieldChanged}
              value={this.state.bio}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Summary
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="summary"
              name="summary"
              onChange={this.onFormFieldChanged}
              value={this.state.summary}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Headline
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="headline"
              name="headline"
              onChange={this.onFormFieldChanged}
              value={this.state.headline}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Slug
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="slug"
              name="slug"
              onChange={this.onFormFieldChanged}
              value={this.state.slug}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            StatusId
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="statusId"
              name="statusId"
              onChange={this.onFormFieldChanged}
              value={this.state.statusId}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Primary Image
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="primaryImage"
              name="primaryImage"
              onChange={this.onFormFieldChanged}
              value={this.state.primaryImage}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Skills
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="primaryImage"
              name="skills"
              onChange={this.onFormFieldChanged}
              value={this.state.skills}
            />
          </div>
        </div>

        <button
          type="submit"
          onClick={this.onClickHandler}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default RegisterPeople;
