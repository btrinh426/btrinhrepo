import React, { Component } from "react";
import { postFriend, updateFriend } from "../services/friendsService";
import { Formik, Form, Field, ErrorMessage } from "formik";

// import debug from "sabio-debug";
// const _logger = debug.extend("Add/Edit");

class AddorEdit extends Component {
  state = {
    friend: {
      name: "",
      nickname: "",
      imageUrl: "",
      aboutMe: "",
      status: "",
      skills: "",
    },
  };

  componentDidMount() {
    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "friend_Obj") {
        let newFriend = locState.payload.oneFriend;
        newFriend.primaryImage = newFriend.primaryImage.imageUrl;

        //console.log(friend);
        this.setState(() => {
          return { friend: newFriend };
        });
      }
    }
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.name;

    this.setState(() => {
      let friend = { ...this.state.friend };
      friend[inputData] = newValue;
      return { friend };
    });
  };

  handleClick = (e) => {
    if (this.props.location.state) {
      console.log(this.state.friend);
      updateFriend(this.state.friend)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendError);
    } else {
      postFriend(this.state.friend)
        .then(this.onPostUserSuccess)
        .catch(this.onPostUserError);
    }
  };

  onPostFriendSuccess = (response) => console.log(response);
  onPostFriendError = (response) => console.log(response);
  onCurrentUserSuccess = (response) => console.log(response);
  onCurrentUserError = (response) => console.log(response);
  onUpdateFriendSuccess = (response) => console.log(response);
  onUpdateFriendError = (response) => console.log(response);

  render() {
    return (
      <React.Fragment>
        <span className="navbar-brand mb-0 h1" id="nav1">
          Add or Edit Friend
        </span>

        <div className="container-fluid" />
        <Formik
          enableReinitialize={true}
          initialValues={this.state.friend}
          onSubmit={this.handleClick}
        >
          {({ values }) => (
            <Form>
              <div className="row mb-3" />
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" />
              <div className="row mb-3" />
              <label htmlFor="nickname" className="col-sm-2 col-form-label">
                Nickname
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="nickname" className="form-control" />
              <ErrorMessage name="nickname" component="div" />
              <div className="row mb-3" />
              <label htmlFor="imageUrl" className="col-sm-2 col-form-label">
                ImageUrl
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="imageUrl" className="form-control" />
              <ErrorMessage name="imageUrl" component="div" />
              <div className="row mb-3" />
              <label htmlFor="aboutMe" className="col-sm-2 col-form-label">
                About Me
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="aboutMe" className="form-control" />
              <ErrorMessage name="aboutMe" component="div" />
              <div className="row mb-3" />
              <label htmlFor="status" className="col-sm-2 col-form-label">
                Status
              </label>
              <div className="col-sm-10" />
              <Field type="text" name="status" className="form-control" />
              <ErrorMessage name="status" component="div" />
              <div className="row mb-3" />
              <label htmlFor="skills">Skills</label>
              <div className="col-sm-10" />
              <Field type="text" name="skills" className="form-control" />
              <ErrorMessage name="skills" component="div" />

              <button type="submit" className="btn btn-primary submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}

export default AddorEdit;
