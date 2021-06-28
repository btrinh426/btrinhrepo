import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as friendService from "../../services/friendsServices";
import { toast } from "react-toastify";
class FriendFormV2 extends React.Component {
  state = {
    isEdit: false,
    buttonName: "Add",
    friendData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "NotSet",
      primaryImage: "",
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

  submitNewFriend = (friend) => {
    friendService.add(friend).then(this.onAddSuccess).catch(this.onAddError);
  };
  onAddSuccess = (response) => {
    toast.success(`${this.state.friendData.title} updated!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    let newFriendId = response.data.item;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.friendData.id = newFriendId;
      return newState;
    });
  };
  onAddError = (err) => {
    console.error(err);
  };
  submitFriendUpdate = () => {
    let id = this.state.friendData.id;
    let payload = this.state.friendData;
    friendService
      .update(id, payload)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };
  onUpdateSuccess = () => {
    toast.success(`${this.state.friendData.title} updated!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      this.props.history.push("/friends");
    }, 1500);
  };
  render() {
    const { object, string } = require("yup");
    const friendSchema = object({
      title: string().required(),
      bio: string().required(),
      headline: string().required(),
      summary: string().required(),
      slug: string().required(),
      statusId: string().required(),
      primaryImage: string().url(),
    });
    const MyInput = ({ field, form, ...props }) => {
      return <input {...field} {...props} />;
    };
    return (
      <div className="container">
        {" "}
        <div className="row ml-5" style={{ marginTop: "10%" }}>
          <div className="jumbotron col-md-4" style={{ height: "100%" }}>
            <h5>{this.state.buttonName} Friend</h5>
          </div>
          <div className="col-7">
            <Formik
              validationSchema={friendSchema}
              enableReinitialize={true}
              initialValues={{
                title: this.state.friendData.title,
                bio: this.state.friendData.bio,
                summary: this.state.friendData.summary,
                headline: this.state.friendData.headline,
                slug: this.state.friendData.slug,
                statusId: this.state.friendData.statusId,
                primaryImage: this.state.friendData.primaryImage,
              }}
              onSubmit={(values) => {
                if (!this.state.isEdit) {
                  this.setState((prevState) => {
                    let newState = { ...prevState };
                    newState.friendData = values;
                    newState.isEdit = true;
                    newState.buttonName = "Update";
                    console.log("new", newState);
                    return newState;
                  }, this.submitNewFriend(values));
                } else {
                  this.setState((prevState) => {
                    let newState = { ...prevState.friendData };
                    newState = values;
                    console.log(newState);
                  }, this.submitFriendUpdate());
                }
              }}
            >
              {() => (
                <Form>
                  <label>Full Name</label>
                  <Field
                    className="form-control"
                    name="title"
                    component={MyInput}
                  />
                  <ErrorMessage name="title" />
                  <label>Bio</label>
                  <Field
                    className="form-control"
                    name="bio"
                    component="textarea"
                  />
                  <label>Summary</label>
                  <Field
                    className="form-control"
                    name="summary"
                    component={MyInput}
                  />
                  <label>Headline</label>
                  <Field
                    className="form-control"
                    name="headline"
                    component={MyInput}
                  />
                  <label>Friend Image</label>
                  <Field
                    className="form-control"
                    name="primaryImage"
                    component={MyInput}
                  />
                  <label>Slug</label>
                  <Field
                    className="form-control mb-3"
                    name="slug"
                    component={MyInput}
                  />
                  <label>Status</label>
                  <Field
                    className="form-control mb-3"
                    name="statusId"
                    as="select"
                  >
                    <option value="NotSet">Not Set</option>
                    <option value="Active">Active</option>
                    <option value="Deleted">Deleted</option>
                    <option value="Flagged">Flagged</option>
                  </Field>
                  <button
                    className="form-control btn-outline-primary mb-5"
                    type="submit"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendFormV2;
