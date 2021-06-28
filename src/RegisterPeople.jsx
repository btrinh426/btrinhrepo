import React from "react";
import peopleService from "./services/peopleService";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const basicSchema = Yup.object().shape({
  title: Yup.string().min(2).max(128).required("Required"),
  bio: Yup.string().min(2).max(128).required("Required"),
  summary: Yup.string().min(2).max(128).required("Required"),
  headline: Yup.string().min(2).max(128).required("Required"),
  slug: Yup.string().min(2).max(128).required("Required"),
  statusId: Yup.number().required("Required"),
  primaryImage: Yup.string().min(2).max(128).required("Required"),
  skills: Yup.string().max(128).required("Required"),
});

class RegisterPeople extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
      skills: "",
    },
    show: true,
  };

  onClickHandler = (data) => {
    var friendId = this.props.match.params.id;
    data.skills = data.skills.split(",");
    data.statusId = parseInt(data.statusId);
    console.log(data);

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
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Formik
              enableReinitialize={true}
              initialValues={this.state.formData}
              onSubmit={this.handleSumbit}
              validationSchema={basicSchema}
            >
              <Form>
                <div className="form-group row">
                  <label htmlFor="title" className="col-sm-3 col-form-label">
                    Title
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="title" />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="bio" className="col-sm-3 col-form-label">
                    Bio
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="bio" />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="summary" className="col-sm-3 col-form-label">
                    Summary
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="summary" />
                    <ErrorMessage
                      name="summary"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="headline" className="col-sm-3 col-form-label">
                    Headline
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="headline" />
                    <ErrorMessage
                      name="headline"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="slug" className="col-sm-3 col-form-label">
                    Slug
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="slug" />
                    <ErrorMessage
                      name="slug"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="statusId" className="col-sm-3 col-form-label">
                    StatusId
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="statusId" />
                    <ErrorMessage
                      name="statusId"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="primaryImage"
                    className="col-sm-3 col-form-label"
                  >
                    Primary Image
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="primaryImage" />
                    <ErrorMessage
                      name="primaryImage"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="skills" className="col-sm-3 col-form-label">
                    Skills
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="skills" />
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="has-error"
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
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPeople;
