import React from "react";
import friendService from "../services/friendService";

// const ToUpdateFriendForm = (props) => {
//   console.log("friendCard: ", props);
// };
class UpdateFriendForm extends React.Component {
  state = {
    individualFriend: {
      id: 0,
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
      this.setState((prevState) => ({
        ...prevState,
        individualFriend: this.props.location.state,
      }));
    }
  }

  callEdit = (e, individualFriend) => {
    e.preventDefault();

    //if else

    friendService
      .updateById(individualFriend)
      .then(this.onSuccess)
      .catch(this.onError);
    console.log("pushed");

    //
  };

  onSuccess = () => {
    console.log("YUP!");
    this.props.history.push("/friends");
  };
  onError = () => {
    console.log("NOPE!");
  };

  onFormFieldChanged = (e) => {
    // let currentTarget = e.currentTarget;
    let newValue = e.currentTarget.value;
    let inputName = e.currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state.individualFriend };

      newState[inputName] = newValue;

      return { individualFriend: newState };
    });
  };

  submitHandler = () => {};

  render() {
    return (
      <form className="row g-3 p-5">
        <div className="col-md-6">
          <label htmlFor="inputTitle" className="form-label">
            First and Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTitle"
            name="title"
            value={this.state.individualFriend.title}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputHeadline" className="form-label">
            Headline
          </label>
          <input
            type="text"
            className="form-control"
            id="inputHeadline"
            name="headline"
            value={this.state.individualFriend.headline}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputBio" className="form-label">
            Bio
          </label>
          <textarea
            className="form-control"
            aria-label="With textarea"
            id="inputBio"
            name="bio"
            value={this.state.individualFriend.bio}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputSummary" className="form-label">
            Summary
          </label>
          <textarea
            className="form-control"
            aria-label="With textarea"
            id="inputSummary"
            name="summary"
            value={this.state.individualFriend.summary}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputImage" className="form-label">
            Image Url
          </label>
          <input
            type="url"
            placeholder="https://"
            className="form-control"
            id="inputImage"
            name="primaryImage"
            value={this.state.individualFriend.primaryImage.imageUrl}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="inputSlug" className="form-label">
            User Name
          </label>
          <input
            type="text"
            placeholder="One Word"
            className="form-control"
            id="inputSlug"
            name="slug"
            value={this.state.individualFriend.slug}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="inputStatusId" className="form-label">
            Status
          </label>
          <input
            type="text"
            placeholder="Active / NotSet"
            className="form-control"
            id="inputStatusId"
            name="statusId"
            value={this.state.individualFriend.statusId}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="col-12" />
        <div className="col-12">
          <button
            onClick={this.callEdit}
            type="submit"
            className="btn btn-primary"
            id="userRegister"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default UpdateFriendForm;
