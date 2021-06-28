import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FormGroup, Label, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import PropTypes from "prop-types";

// import * as eventService from "../services/eventService";
// import { render } from "react-dom";

import debug from "sabio-debug";
const _logger = debug.extend("EventAddModal");

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name needs to be between 2 and 25 characters in length.")
    .max(25, "Name needs to be between 2 and 25 characters in length.")
    .required("Required"),
  headline: Yup.string()
    .min(2, "Headline should be between 2 and 120 characters in length.")
    .max(120, "Headline should be between 2 and 120 characters in length.")
    .required("Required"),
  description: Yup.string()
    .min(2, "Description needs to be between 2 and 2000 characters in length.")
    .max(2000, "Description needs to be between 2 and 2000 characters in length.")
    .required("Required"),
  summary: Yup.string()
    .min(2, "Summary needs to be between 2 and 255 characters in length.")
    .max(255, "Summary needs to be between 2 and 255 characters in length.")
    .required("Required"),
  slug: Yup.string()
    .min(2, "Slug needs to be between 2 and 100 characters in length.")
    .max(100, "Slug needs to be between 2 and 100 characters in length.")
    .required("Required"),
  dateStart: Yup.date().min(new Date(), "Start date cannot be before right now.").required("Required"),
  dateEnd: Yup.date().min(Yup.ref("dateStart"), "Event end date/time must be after the start date/time."),
  address: Yup.string()
    .min(5, "Address needs to be between 5 and 50 characters in length.")
    .max(50, "Address needs to be between 5 and 50 characters in length.")
    .required("Required"),
  zipCode: Yup.string()
    .min(5, "Zip code needs to be between 5 and 10 characters in length.")
    .max(10, "Zip code needs to be between 5 and 10 characters in length."),
});

class EventAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      eventForm: {
        id: "",
        name: "",
        headline: "",
        description: "",
        summary: "",
        slug: "",
        statusId: "",
        dateStart: "",
        dateEnd: "",
        address: "",
        zipCode: "",
        latitude: "",
        longitude: "",
      },
    };
  }

  componentDidMount = () => {
    _logger("componentDidMount");
  };

  componentDidUpdate = () => {
    _logger("componentDidUpdate");
    // debugger;
    const newState = { ...this.state };
    // If the modal is being triggered open....
    if (this.props.modalShown && this.props.modalShown !== this.state.showModal) {
      newState.showModal = true;
      if (
        this.props.event.hasOwnProperty("id") &&
        this.props.event.id !== this.state.eventForm.id &&
        this.props.modalShown
      ) {
        const modalEvent = this.props.event;
        newState.eventForm = {
          id: modalEvent.id,
          name: modalEvent.name,
          headline: modalEvent.headline,
          description: modalEvent.description,
          summary: modalEvent.summary,
          slug: modalEvent.slug,
          statusId: modalEvent.statusId,
          dateStart:
            modalEvent.dateStart.split(":").length - 1 === 1
              ? modalEvent.dateStart
              : modalEvent.dateStart.split(":").reverse().splice(1).reverse().join(":"), //This nicely formats the date/time by removing seconds
          dateEnd: modalEvent.dateEnd.split(":").reverse().splice(1).reverse().join(":"), //This nicely formats the date/time by removing seconds
          address: modalEvent.address,
          zipCode: modalEvent.zipCode,
        };
      }
      this.setState(newState);
      // _logger(
      //   `dateStart was: ${this.props.event.dateStart}, is now: ${this.props.event.dateStart
      //     .split(":")
      //     .reverse()
      //     .splice(1)
      //     .reverse()
      //     .join(":")}`
      // );
      // _logger(
      //   `dateEnd was: ${this.props.event.dateEnd}, is now: ${this.props.event.dateEnd
      //     .split(":")
      //     .reverse()
      //     .splice(1)
      //     .reverse()
      //     .join(":")}`
      // );
      // If the modal is being triggered closed, clear it, and close it
    } else if (!this.props.modalShown && this.props.modalShown !== this.state.showModal) {
      newState.showModal = false;
      newState.eventForm = {
        id: "",
        name: "",
        headline: "",
        description: "",
        summary: "",
        slug: "",
        statusId: "",
        dateStart: "",
        dateEnd: "",
        address: "",
        zipCode: "",
      };
      this.setState(newState);

      // If the props changed (due to an id for a newly-added event), ensure the state.eventData id gets updated
    } else if (this.props.event.hasOwnProperty("id") && this.props.event.id !== this.state.eventForm.id) {
      this.setState(() => {
        // const eventForm = { ...this.state.eventForm };
        const eventForm = this.props.event;
        return { eventForm };
      });
    }
  };

  // onEventFormChange = (e) => {
  //   // _logger("Event Form changed...");
  //   let currentTargetName = e.currentTarget.name;
  //   let currentTargetValue = e.currentTarget.type === "checkbox" ? e.currentTarget.checked : e.currentTarget.value;

  //   this.setState(
  //     (prevState) => {
  //       let newState = { ...prevState };
  //       newState.eventForm[currentTargetName] = currentTargetValue;
  //       return newState;
  //     },
  //     () => {
  //       // This function ensure the event end date/time is never before the start date/time
  //       let dateStart = this.state.eventForm.dateStart;
  //       let dateEnd = this.state.eventForm.dateEnd;
  //       if (
  //         currentTargetName === "dateEnd" &&
  //         (this.state.eventForm.dateStart === "" || currentTargetValue < this.state.eventForm.dateStart)
  //       ) {
  //         dateStart = currentTargetValue;
  //       } else if (
  //         currentTargetName === "dateStart" &&
  //         (this.state.eventForm.dateEnd === "" || currentTargetValue > this.state.eventForm.dateEnd)
  //       ) {
  //         dateEnd = currentTargetValue;
  //       }
  //       this.setState(() => {
  //         const eventForm = { ...this.state.eventForm };
  //         eventForm.dateEnd = dateEnd;
  //         eventForm.dateStart = dateStart;
  //         return { eventForm };
  //       });
  //     }
  //   );
  // };

  clickSubmitButton = async (eventData) => {
    _logger("clicked Submit.");
    const newEvent = await this.formatEventData(eventData);
    this.setState(() => {
      return { eventForm: newEvent };
    });
    this.props.submitEventForm(newEvent);
  };

  formatEventData = async (event) => {
    // If the getLatLng fails, it will set them to a default lat/lng
    let formattedEvent = { ...event };
    _logger("Getting geocode for:  ", event.address);
    let geoLoc = await geocodeByAddress(event.address)
      .then((results) => {
        _logger("Got geocoder results:   ", results);
        formattedEvent.address = results[0].formatted_address;
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        _logger("Successfully got latitude and longitude", { lat, lng });
        return { lat, lng };
      })
      .catch((error) => {
        console.error("Could not get lat/lng:  ", error);
        return { lat: 32.73626630980294, lng: -117.14898687546605 };
      });

    formattedEvent.latitude = geoLoc.lat;
    formattedEvent.longitude = geoLoc.lng;
    formattedEvent.dateEnd = event.dateEnd === "" ? event.dateStart : event.dateEnd;
    formattedEvent.statusId = event.statusId ? "Active" : "NotSet";
    if (formattedEvent.id === "") {
      delete formattedEvent.id;
    }
    return formattedEvent;
  };

  clickCloseButton = (e) => {
    e.preventDefault();
    // _logger("clicked Close.");

    this.setState(() => {
      let newState = { ...this.state };
      newState.eventForm = {
        id: "",
        name: "",
        headline: "",
        description: "",
        summary: "",
        slug: "",
        statusId: "",
        dateStart: "",
        dateEnd: "",
        address: "",
        zipCode: "",
      };
      newState.showModal = false;
      return newState;
    }, this.props.toggleModal);
  };

  clickEventDeleteButton = (e) => {
    e.preventDefault();
    _logger("Delete event...");
    this.props.deleteEvent(this.state.eventForm.id);
  };

  render() {
    _logger("render");
    // _logger("Event passed (in props): ", this.props.event);
    // _logger("Event Form state (to show in modal): ", this.state.eventForm);

    if (!this.state.showModal) {
      return null;
    }
    // const defaultEventImage = "https://i.pinimg.com/originals/67/19/bb/6719bb12bad0d9d9e6588e1299dd9a83.jpg";

    return (
      <Modal id="eventAddUpdateModal" isOpen={this.state.showModal}>
        <div className="modal-header" style={{ minWidth: "750px" }}>
          <h3 className="modal-title m-0 pl-0">
            {this.state.eventForm.name === "" ? "Event Name" : this.state.eventForm.name}
          </h3>
          <button type="button" className="close" data-dismiss="modal" onClick={this.clickCloseButton}>
            <span>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </button>
        </div>
        <ModalBody>
          <div className="modalEventCard">
            <div className="col p-0 m-0">
              <div
                className="container row border border-secondary rounded mb-0 mr-3 ml-0 p-3"
                id="mainView"
                style={{ backgroundColor: "rgb(210, 217, 235)" }}
              >
                <div className="col p-0 m-0">
                  <div className="row">
                    <Formik
                      enableReinitialize={true}
                      initialValues={this.state.eventForm}
                      onSubmit={this.clickSubmitButton}
                      validationSchema={validationSchema}
                    >
                      {(props) => {
                        const { resetForm } = props;
                        return (
                          <Form
                            className="eventLogForm col mr-0 mb-0"
                            style={{ marginBottom: "1rem", minWidth: "350px", height: "fit-content" }}
                          >
                            <FormGroup className="row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label
                                    for="eventNameInput"
                                    className="col-2 font-weight-bold my-label"
                                    style={{ minWidth: "68px" }}
                                  >
                                    Name
                                  </Label>
                                  <Field
                                    type="text"
                                    name="name"
                                    className="form-control my-input-control col"
                                    maxLength="25"
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-2"></div>
                                  <ErrorMessage name="name" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className="row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label for="eventHeadlineInput" className="col-2 font-weight-bold my-label ">
                                    Headline
                                  </Label>
                                  <Field
                                    component="textarea"
                                    className="form-control my-input-control col"
                                    name="headline"
                                    rows="2"
                                    maxLength="120"
                                    style={{ resize: "none" }}
                                  ></Field>
                                </div>
                                <div className="row">
                                  <div className="col-2"></div>
                                  <ErrorMessage name="headline" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className="row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label for="eventDescriptionInput" className="col-2 font-weight-bold my-label ">
                                    Description
                                  </Label>
                                  <Field
                                    component="textarea"
                                    className="form-control my-input-control col"
                                    name="description"
                                    rows="4"
                                    maxLength="1000"
                                    style={{ resize: "none" }}
                                  ></Field>
                                </div>
                                <div className="row">
                                  <div className="col-2"></div>
                                  <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="col friendForm-errorMsg"
                                  />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className="row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label for="eventSummaryInput" className="col-2 font-weight-bold my-label">
                                    Summary
                                  </Label>
                                  <Field
                                    component="textarea"
                                    className="form-control my-input-control col"
                                    name="summary"
                                    rows="4"
                                    maxLength="255"
                                    style={{ resize: "none" }}
                                  ></Field>
                                </div>
                                <div className="row">
                                  <div className="col-2"></div>
                                  <ErrorMessage name="summary" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className="row mr-1">
                              <div className="col">
                                <div className="row align-items-center">
                                  <Label for="eventSlugInput" className="col-2 font-weight-bold my-label ">
                                    Slug
                                  </Label>
                                  <Field
                                    type="text"
                                    className="form-control my-input-control col"
                                    name="slug"
                                    maxLength="100"
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-2"></div>
                                  <ErrorMessage name="slug" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup className="row ml-1 mr-1" style={{ borderTop: "2px #8e9194 solid" }}>
                              <div className="col pr-0">
                                <Label
                                  for="eventDateStartInput"
                                  className="row font-weight-bold"
                                  style={{ marginLeft: "0px !important" }}
                                >
                                  Date/Time Start
                                </Label>
                                <Field
                                  type="datetime-local"
                                  name="dateStart"
                                  className="row form-control my-input-control"
                                />
                                <div className="row">
                                  <ErrorMessage name="dateStart" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                              <div className="col pr-0">
                                <Label for="eventDateEndInput" className="row font-weight-bold">
                                  Date/Time End
                                </Label>
                                <Field
                                  type="datetime-local"
                                  name="dateEnd"
                                  className="row form-control my-input-control"
                                />
                                <div className="row">
                                  <ErrorMessage name="dateEnd" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                              <div className="col-2 pl-0">
                                <Label className="font-weight-bold">Status</Label>
                                <div className="form-check">
                                  <Field type="checkbox" name="statusId" className="form-check-input" />
                                  <Label for="eventStatusInput" className="form-check-label">
                                    Active
                                  </Label>
                                </div>
                              </div>
                            </FormGroup>
                            <FormGroup
                              className="row mt-3 mb-1 mr-1 ml-1 pt-2"
                              style={{ borderTop: "2px #8e9194 solid" }}
                            >
                              <Label className="font-weight-bold">Location:</Label>
                            </FormGroup>
                            <FormGroup className="row mb-3 pl-3">
                              <div className="col pr-0">
                                <Label for="eventAddressInput" className="row mb-0 font-weight-bold">
                                  Address
                                </Label>
                                <Field type="address" name="address" className="row form-control my-input-control" />
                                <div className="row">
                                  <ErrorMessage name="address" component="div" className="col friendForm-errorMsg" />
                                </div>
                              </div>
                              <div className="col pr-0">
                                {/* <Label for="eventZipcodeInput" className="row mb-0 font-weight-bold">
                                  Zip Code
                                </Label>
                                <Field type="zipcode" name="zipCode" className="row form-control" />
                                <div className="row">
                                  <ErrorMessage name="zipCode" component="div" className="col friendForm-errorMsg" />
                                </div> */}
                              </div>
                            </FormGroup>
                            <div
                              className="row mr-1 pt-2 ml-0"
                              style={{ justifyContent: "center", borderTop: "2px #8e9194 solid" }}
                            >
                              <Button type="submit" color="success" className="m-2">
                                {this.state.eventForm.id === "" ? "Submit" : "Update"}
                              </Button>
                              <Button type="reset" color="warning" className="m-2" onClick={resetForm}>
                                Reset Form
                              </Button>
                              {/* The "delete" button will only appear when updating a friend */}
                              {this.state.eventForm.id !== "" ? (
                                <Button
                                  type="button"
                                  color="danger"
                                  className="m-2"
                                  onClick={this.clickEventDeleteButton}
                                >
                                  Delete Event
                                </Button>
                              ) : (
                                ""
                              )}

                              <Button
                                type="button"
                                color="secondary"
                                className="m-2"
                                data-dismiss="modal"
                                onClick={this.clickCloseButton}
                              >
                                Close
                              </Button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="p-0" style={{ borderTop: "0px" }}></ModalFooter>
      </Modal>
    );
  }
}

EventAddModal.propTypes = {
  modalShown: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  submitEventForm: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func,
  event: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    headline: PropTypes.string,
    description: PropTypes.string,
    summary: PropTypes.string,
    slug: PropTypes.string,
    statusId: PropTypes.string,
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    address: PropTypes.string,
    zipCode: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

export default withRouter(EventAddModal);
