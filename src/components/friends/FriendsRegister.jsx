import React from "react";
import * as friendServices from "./../../services/friendServices";

class FriendsRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "Active",
        primaryImage: "",
      },
    };
  }

  componentDidMount = () => {
    let payload = this.props.location.state?.payload;

    if (payload) {
      this.setFormData(payload);
    }
  };

  // repopulate form with the current friend's information

  setFormData = (friendInfo) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...friendInfo,
          primaryImage: friendInfo.primaryImage.imageUrl,
        },
      };
    });
  };

  changeUserInfo = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    this.props.location.state ? this.update() : this.register();
  };

  register = () => {
    friendServices
      .register(this.state.formData)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = (response) => {
    if (response.statusText === "Created") {
      this.props.history.push("/friends");
    }
  };

  onRegisterError = (response) => {
    console.error({ error: response });
  };

  update = () => {
    friendServices
      .update(this.state.formData)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = (response) => {
    console.log(response);
    this.props.history.push("/friends");
  };

  onUpdateError = (response) => {
    console.error(response);
  };

  render() {
    return (
      <div className="container" style={{ marginTop: "1rem" }}>
        <form className="justify-content-center" onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="titleName" className="font-weight-bold">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="First and Last Name"
              value={this.state.formData.title}
              onChange={this.changeUserInfo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio" className="font-weight-bold">
              Bio
            </label>
            <input
              type="text"
              className="form-control"
              name="bio"
              placeholder="Tell me about yourself"
              value={this.state.formData.bio}
              onChange={this.changeUserInfo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio" className="font-weight-bold">
              Summary
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="One sentence"
              name="summary"
              value={this.state.formData.summary}
              onChange={this.changeUserInfo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roleHeadline" className="font-weight-bold">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              name="headline"
              placeholder="Headline(Your role)"
              value={this.state.formData.headline}
              onChange={this.changeUserInfo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailAddress" className="font-weight-bold">
              Email Address
            </label>
            <input
              type="text"
              className="form-control"
              name="slug"
              placeholder="Email Address"
              value={this.state.formData.slug}
              onChange={this.changeUserInfo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="primaryImage" className="font-weight-bold">
              Primary Image
            </label>
            <input
              type="text"
              className="form-control"
              name="primaryImage"
              placeholder="An Image Url"
              value={this.state.formData.primaryImage}
              onChange={this.changeUserInfo}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "5px" }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default FriendsRegister;
