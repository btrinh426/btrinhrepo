import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as eventService from "../services/eventService";
import { ToastContainer, toast } from "react-toastify";

const eventSchema = Yup.object().shape({
  title: Yup.string().min(2).required("Is Required"),
});

class AddEvent extends React.Component {
  state = {
    formData: {
      title: "",
      summary: "",
      headline: "",
      eventDate: "yyyy-mm-dd 00:00:00",
      lat: 100,
      long: -100,
      zipCode: 10001,
      address: "Address",
      slug: "unique slug",
      statusId: "Active",
      image: "image url",
    },
    //isAnEdit: this.props.isAnEdit,
  };
  componentDidMount() {
    //let friend = this.props.match.params.friend;
    console.log("component mounted");
    // console.log(this.state.isAnEdit);
    // if (this.state.isAnEdit) {
    //   console.log("edit is true");
    //   console.log(this.props.friendData);
    //   this.setState(() => {
    //     let newData = { ...this.props.friendData };
    //     return { formData: newData };
    //   });
    // }
  }

  handleSubmit = (values) => {
    console.log(values);
    eventService
      .addEvent(values)
      .then(this.onAddSuccess)
      .catch(this.onAddError);
  };

  onAddSuccess = (response) => {
    toast("🦄 Woo new Event", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    this.props.history.push("/events");
  };

  onAddError = (errResponse) => {
    toast("Event Denied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={this.state.formData}
        onSubmit={this.handleSubmit}
        validationSchema={eventSchema}
      >
        <Form>
          <div className="container" style={{ padding: "50px" }}>
            <div className="bg-blk-box" /*style={{display: 'none'}*/>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-wrapper">
                    <label htmlFor="title">Event Title</label>
                    <Field type="text" name="title" />
                    <ErrorMessage name="title" component="div" />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="summary">Summary</label>
                    <Field type="text" name="summary" />
                    <ErrorMessage name="summary" component="div" />
                  </div>

                  <div className="form-wrapper">
                    <label htmlFor="headline">Headline</label>
                    <Field type="text" name="headline" />
                    <ErrorMessage name="headline" component="div" />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="eventDate">EventDate</label>
                    <Field type="text" name="eventDate" />
                    <ErrorMessage name="eventDate" component="div" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrapper">
                    <label htmlFor="lat">Lat</label>
                    <Field type="text" name="lat" />
                    <ErrorMessage name="lat" component="div" />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="long">Long</label>
                    <Field type="text" name="long" />
                    <ErrorMessage name="long" component="div" />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="address">Address</label>
                    <Field type="text" name="address" />
                    <ErrorMessage name="address" component="div" />
                  </div>

                  <div className="form-wrapper">
                    <label htmlFor="slug">Slug</label>
                    <Field type="text" name="slug" />
                    <ErrorMessage name="slug" component="div" />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="statusId">StatusId</label>
                    <Field type="text" name="statusId" />
                    <ErrorMessage name="statusId" component="div" />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="image">Image</label>
                    <Field type="text" name="image" />
                    <ErrorMessage name="image" component="div" />
                  </div>
                </div>
              </div>
              {this.props.isAnEdit ? (
                <button type="submit" className="btn btn-primary">
                  Edit Event
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Add Event
                </button>
              )}
            </div>
          </div>
        </Form>
      </Formik>
    );
  }
}

export default AddEvent;
