/*

Version 4
Going to put schema in state in Friends.jsx
Pass it as props
Error: this.props.functionName is not a function
  Test: adding functions to Friends and passing them to FriendFormik as props

Version 3
Going to wire up add friend ajax call

Version 2
Converted all form fields
Captured and test correct data object is assembled.

Version 1
Passing static formData via props from Friends State

*/

import React from "react";
import { add, getById, update } from "../../services/friendService.js";
import { Formik, FastField, Form } from "formik";
import * as Yup from "yup"; // for everything
import FriendSchema from "./Possible_V2";

class FriendFormik extends React.Component {
  state = {
    formData: this.propsToFormData(this.props),
  };

  //checks props to see if any exist.  If so populates the form fields for edit
  propsToFormData(props) {
    const friend = props.formData;

    const item = {
      id: friend.id || "",
      title: friend.title || "",
      bio: friend.bio || "",
      summary: friend.summary || "",
      headline: friend.headline || "",
      slug: friend.slug || "",
      statusId: friend.statusId,
      primaryImage: friend.primaryImage || "",
      //   isNeutered: !!dog.others && !!dog.others.isNeutered,
      //   isMicrochipped: !!dog.others && !!dog.others.isMicrochipped,
    };

    console.log(item);
    return item;
  }

  //   onChange = (event) => {
  //     const target = event.target;
  //     const value = target.type === "checkbox" ? target.checked : target.value;
  //     const name = target.name;

  //     this.setState((prevState) => {
  //       const formData = { ...prevState.formData, [name]: value };

  //       return { formData: formData };
  //     });
  //   };

  showSaveSuccess = (data) => {
    console.log("showSaveSuccess is firing", data);

    // this.props.notify({
    //   message: "Saved changes",
    //   level: "success",
    //   autoDismiss: 2,
    // });
  };
  onSaveErrorGeneric = (error) => {
    console.log("onSaveErrorGeneric is firing", error);
    // this.props.notify({
    //   message: "Failed to save changes: " + error.toString(),
    //   level: "error",
    //   autoDismiss: 0,
    //});
  };

  //onSave now receives the values form Formik
  onSave = (formValues) => {
    console.log("These are the form values: ", formValues);

    const that = this;
    // convert formData to the hierarchical format that
    const friend = {      
      title: formValues.title,
      bio: formValues.bio,
      summary: formValues.summary,
      headline: formValues.headline,
      slug: formValues.slug,
      statusId: formValues.statusId,
      primaryImage: formValues.primaryImage,
      //   others: {
      //     isNeutered: formValues.isNeutered,
      //     isMicrochipped: formValues.isMicrochipped,
      //},
    };

    if (this.state.formData.id) {
      console.log(
        `Detected an Id of: ${this.state.formData.id} - ${this.state.formData.title}s record will now be updated.`
      );

      friend.id = this.state.formData.id

      update(friend)
        .then((data) => {
          console.log("updateAJAX.then is firing", data);
          // this.showSaveSuccess();
          that.props.onSave(data);
        })
        .catch(this.onSaveErrorGeneric);
    } else {
      console.log("onSave - Else is firing to create a new record");

      add(friend)
        .then((data) => {
          console.log("addAJAX.then is firing with Data: ", data);
          this.showSaveSuccess(data);
          // Modify state to reflect assigned id value
          this.setState((prevState) => {
            const formData = { ...prevState.formData, id: data.item };
            return { ...prevState, formData: formData };
          });

          that.props.onSave({ ...friend, id: data.item });
        })
        .catch(this.onSaveErrorGeneric);
    }
  };

  onCancel = (event) => {
    this.props.onCancel();
  };

  onDelete = (event) => {
    console.log("Id to be deleted", this.state.formData.id);

    // dogService
    //   .del(this.state.formData.id)
    //   .then(this.onDeleteSuccess)
    //   .catch(this.onDeleteError);
  };

  onDeleteError = () => {
    this.props.addNotification({
      message: "Delete Failure",
      level: "error",
      autoDismiss: 0,
    });
  };

  onDeleteSuccess = () => {
    this.props.onDelete(this.state.formData);
  };

  // validationSchema is used here inline but it shouldbe imported from other files
  render() {
    return (
      <div>
        <Formik
          initialValues={this.state.formData}
          onSubmit={this.onSave}
          validationSchema={this.FriendSchema}
          render={(formikProps) => (
            <Form>
              <div>
                <label htmlFor="title">Name</label>
                <FastField
                  name="title"
                  placeholder="Enter Name"
                  component="input"
                  className="form-control"
                />
                {formikProps.touched.title && formikProps.errors.title && (
                  <div className="text-danger">{formikProps.errors.title}</div>
                )}
              </div>
              <div>
                <label htmlFor="bio">Bio</label>
                <FastField
                  component="input"
                  name="bio"
                  className="form-control"
                />
                {formikProps.touched.bio && formikProps.errors.bio && (
                  <div className="text-danger">{formikProps.errors.bio}</div>
                )}
              </div>
              <div>
                <label htmlFor="summary">Summary</label>
                <FastField
                  component="input"
                  name="summary"
                  id="summary"
                  className="form-control"
                />
                {formikProps.touched.summary && formikProps.errors.summary && (
                  <div className="text-danger">
                    {formikProps.errors.summary}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="headline">Headline</label>
                <FastField
                  component="input"
                  name="headline"
                  id="headline"
                  className="form-control"
                />
                {formikProps.touched.headline &&
                  formikProps.errors.headline && (
                    <div className="text-danger">
                      {formikProps.errors.headline}
                    </div>
                  )}
              </div>
              <div>
                <label htmlFor="headline">Slug</label>
                <FastField
                  component="input"
                  name="slug"
                  id="slug"
                  className="form-control"
                />
                {formikProps.touched.slug && formikProps.errors.slug && (
                  <div className="text-danger">{formikProps.errors.slug}</div>
                )}
              </div>
              <div className="form-group">
                <div className="radio">
                  <label className="radio-inline">
                    <FastField
                      name="statusId"
                      value="0"
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          name="statusId"
                          checked={formikProps.values.statusId === "0"}
                          value="0"
                        />
                      )}
                    />
                    Not Set
                  </label>
                  <label className="radio-inline">
                    <FastField
                      name="statusId"
                      value="1"
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          name="statusId"
                          checked={formikProps.values.statusId === "1"}
                          value="1"
                        />
                      )}
                    />
                    Active
                  </label>
                  <label className="radio-inline">
                    <FastField
                      name="statusId"
                      value="2"
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          name="statusId"
                          checked={formikProps.values.statusId === "2"}
                          value="2"
                        />
                      )}
                    />
                    Delete
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="headline">Avatar Url</label>
                <FastField
                  component="input"
                  name="primaryImage"
                  id="primaryImage"
                  className="form-control"
                />
                {formikProps.touched.primaryImage &&
                  formikProps.errors.primaryImage && (
                    <div className="text-danger">
                      {formikProps.errors.primaryImage}
                    </div>
                  )}
              </div>

              {/* <div className="form-group">
                <div className="checkbox">
                  <label className="checkbox">
                    <FastField
                      name="isNeutered"
                      value={true}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          name="isNeutered"
                          checked={formikProps.values.isNeutered}
                          value="true"
                        />
                      )}
                    />
                    Neutered
                  </label>
                  <label className="checkbox">
                    <FastField
                      name="isMicrochipped"
                      value={true}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          name="isMicrochipped"
                          checked={formikProps.values.isMicrochipped}
                          value="true"
                        />
                      )}
                    />
                    Microchipped
                  </label>
                </div>
              </div> */}

              <div className="form-group">
                <label htmlFor="itemId">Friend Id:</label>
                <FastField
                  component="input"
                  name="id"
                  id="itemId"
                  className="form-control"
                  disabled
                />
              </div>
              <div className="btn-group" role="group">
                <button type="submit" className="btn btn-primary btn-sm">
                  Submit that bitch
                </button>
                <button
                  type="button"
                  onClick={this.onCancel}
                  className="btn btn-default btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={this.onDelete}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default FriendFormik;
