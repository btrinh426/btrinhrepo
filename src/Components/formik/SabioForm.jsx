import React from "react";
import { Field, Form, Formik } from "formik";
import * as friendService from "../../services/friendsServices";

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
      statusId: "0",
      primaryImage: "",
    },
  };

  submitNewFriend = () => {
    friendService
      .add(this.state.friendData)
      .then(this.onAddSuccess)
      .catch(this.onAddError);
  };
  submitFriendUpdate = () => {
    friendService
      .update(this.state.friendData)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };
  render() {
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
              initialValues={this.state.friendData}
              onSubmit={(values) => {
                if (!this.state.isEdit) {
                  this.setState((prevState) => {
                    let newState = { ...prevState };
                    newState.friendData = values;
                    newState.isEdit = true;
                    newState.buttonName = "Update";
                    return newState;
                  }, this.submitNewFriend());
                } else {
                  this.setState((prevState) => {
                    let newState = { ...prevState };
                    newState.friendData = values;
                    return newState;
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
                    <option value="0">Not Set</option>
                    <option value="1">Active</option>
                    <option value="2">Deleted</option>
                    <option value="3">Flagged</option>
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
