import React from "react";
import peopleService from "./services/peopleService";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import basicSchema from "./schemas/friendSchema";

class RegisterPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.getFormData(),
      show: true,
    };
  }

  getFormData = () => {
    let { state } = this.props.location;
    if (state) {
      let { type, payload } = state;
      if (type === "EDIT_FRIEND") {
        if (payload) {
          let formData = { ...payload };
          this.show = true;
          let skills = formData.skills;
          formData.skills = skills.map((skill) => skill.name).join(",");
          formData.primaryImage = formData.image.imageUrl;
          return formData;
        } else {
          let { id } = this.props.match.params;
          peopleService
            .getOneFriendById(id)
            .then(this.getOneFriendSuccess)
            .catch(this.getOneFriendError);
        }
      }
    } else {
      return this.getInitialForm();
    }
  };

  getInitialForm = () => {
    return {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
      skills: "",
    };
  };

  handleSumbit = (data) => {
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

  getOneFriendSuccess = (response) => {
    console.log(response);
    var friendData = response.data.item;
    let countSkills = response.data.item.skills;
    this.setState(() => {
      let formData = friendData;
      formData.skills = countSkills.map((name) => name.name).join(",");
      formData.primaryImage = friendData.image.imageUrl;
      return { formData };
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
