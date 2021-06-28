import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import eventService from "/SF.Code/C#98Cohort/Starter.react-componentize/src/services/eventService";
import basicSchema from "/SF.Code/C#98Cohort/Starter.react-componentize/src/schemas/eventSchema";
import { toast } from "react-toastify";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.getFormData(),
      show: true,
    };
  }

  getFormData = () => {
    let { state } = this.props.location;
    let { id } = this.props.match.params;
    console.log(id);
    if (state) {
      let { type, payload } = state;
      if (type === "EDIT_EVENT") {
        if (payload) {
          let formData = { ...payload };
          this.show = true;
          formData.dateStart = formData.metaData.dateStart;
          formData.dateEnd = formData.metaData.dateEnd;
          formData.longitdue = formData.metaData.longitdue;
          formData.latitude = formData.metaData.latitude;
          formData.zipCode = formData.metaData.zipCode;
          formData.address = formData.metaData.address;
          return formData;
        }
      }
    } else if (id) {
      eventService
        .getOneEventById(id)
        .then(this.onGetEventSuccess)
        .catch(this.onGetEventError);
    } else {
      return this.getInitialForm();
    }
  };

  onGetEventSuccess = (response) => {
    console.log(response);
    this.setState(() => {
      let formData = { ...response.data.item };
      this.show = true;
      formData.dateStart = formData.metaData.dateStart;
      formData.dateEnd = formData.metaData.dateEnd;
      formData.longitdue = formData.metaData.longitdue;
      formData.latitude = formData.metaData.latitude;
      formData.zipCode = formData.metaData.zipCode;
      formData.address = formData.metaData.address;
      return { formData };
    });
  };

  getInitialForm = () => {
    return {
      name: "",
      headline: "",
      description: "",
      summary: "",
      slug: "",
      statusId: "",
      dateStart: "",
      dateEnd: "",
      latitude: "",
      longitdue: "",
      zipCode: "",
      address: "",
    };
  };

  handleSumbit = (data) => {
    console.log(data);
    var eventId = this.props.match.params.id;
    data.statusId = Boolean(data.statusId);
    data.latitude = parseInt(data.latitude);
    data.longitdue = parseInt(data.longitdue);

    if (eventId) {
      eventService
        .updateOneEventById(data, eventId)
        .then(this.onUpdateEventSuccess)
        .catch(this.onUpdateEventError);
    } else {
      eventService
        .addEvent(data)
        .then(this.OnAddEventSuccess)
        .catch(this.OnAddEventError);
    }
  };

  onUpdateEventSuccess = (response) => {
    console.log(response);
    toast.success("Update Success");
  };

  onUpdateEventError = (response) => {
    console.log(response);
    toast.error("Updated Error");
  };

  OnAddEventSuccess = (response) => {
    console.log(response);
    toast.success("Add Event Success");
  };

  OnAddEventError = (response) => {
    console.log(response);
    toast.error("Add Event Error");
  };
  render() {
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
                    Name
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="name" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="bio" className="col-sm-3 col-form-label">
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
                  <label htmlFor="summary" className="col-sm-3 col-form-label">
                    Description
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="description" />
                    <ErrorMessage
                      name="descriptio"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="headline" className="col-sm-3 col-form-label">
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
                    Date Start
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="dateStart" />
                    <ErrorMessage
                      name="dateStart"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="skills" className="col-sm-3 col-form-label">
                    Date End
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="dateEnd" />
                    <ErrorMessage
                      name="dateEnd"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="skills" className="col-sm-3 col-form-label">
                    Latitude
                  </label>
                  <div className="col-sm-10">
                    <Field type="decemial" name="latitude" />
                    <ErrorMessage
                      name="latitude"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="skills" className="col-sm-3 col-form-label">
                    Longitdue
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="longitdue" />
                    <ErrorMessage
                      name="longitdue"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="skills" className="col-sm-3 col-form-label">
                    Zip Code
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="zipCode" />
                    <ErrorMessage
                      name="zipCode"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="skills" className="col-sm-3 col-form-label">
                    Address
                  </label>
                  <div className="col-sm-10">
                    <Field type="text" name="address" />
                    <ErrorMessage
                      name="address"
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

export default AddEvent;
