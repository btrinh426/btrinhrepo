import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, Form, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import * as eventService from "../services/eventService";
// import { render } from "react-dom";

class EventAddModal extends Component {
  state = {
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
    },
  };

  componentDidMount = () => {
    // console.log("EventAddModal did mount.");
  };

  componentWillUnmount = () => {
    // console.log("EventAddModal will unmount.");
  };

  componentDidUpdate = () => {
    // console.log("EventAddModal componentDidUpdate -> start");
    // console.log("Props.modalShown: ", this.props.modalShown);
    // console.log("State.showModal:  ", this.state.showModal);
    if (this.props.modalShown !== this.state.showModal) {
      this.setState(
        () => {
          return { showModal: this.props.modalShown };
        },
        () => {
          // console.log("EventAddModal componentDidUpdate -> end");
          // console.log("Props.modalShown: ", this.props.modalShown);
          // console.log("State.showModal:  ", this.state.showModal);

          if (
            this.props.event.hasOwnProperty("id") &&
            this.props.event.id !== this.state.eventForm.id &&
            this.props.modalShown
          ) {
            this.setState(() => {
              const modalEvent = this.props.event;
              // console.log("modalEvent (in props): ", this.props.event);
              let newState = { ...this.state };
              newState.showModal = this.props.modalShown;
              newState.eventForm = {
                id: modalEvent.id,
                name: modalEvent.name,
                headline: modalEvent.headline,
                description: modalEvent.description,
                summary: modalEvent.summary,
                slug: modalEvent.slug,
                statusId: modalEvent.statusId,
                dateStart: modalEvent.metaData.dateStart,
                dateEnd: modalEvent.metaData.dateEnd,
                address: modalEvent.metaData.location.address,
                zipCode: modalEvent.metaData.location.zipCode,
              };
              return newState;
            });
          }
        }
      );
    }
  };

  onEventFormChange = (e) => {
    console.log("Event Form changed...");
    let currentTargetName = e.currentTarget.name;
    let currentTargetValue = e.currentTarget.type === "checkbox" ? e.currentTarget.checked : e.currentTarget.value;

    this.setState(
      (prevState) => {
        let newState = { ...prevState };
        newState.eventForm[currentTargetName] = currentTargetValue;
        return newState;
      },
      () => {
        // This function ensure the event end date/time is changed so it is never before the start date/time
        if (
          (currentTargetName === "dateStart" || currentTargetName === "dateEnd") &&
          this.state.eventForm.dateStart > this.state.eventForm.dateEnd
        ) {
          this.setState(() => {
            const eventForm = { ...this.state.eventForm };
            eventForm.dateEnd = this.state.eventForm.dateStart;
            return { eventForm };
          });
        }
      }
    );
  };

  clickSubmitButton = (e) => {
    e.preventDefault();
    console.log("clicked Submit.");
    const event = {
      id: this.state.eventForm.id,
      name: this.state.eventForm.name,
      headline: this.state.eventForm.headline,
      description: this.state.eventForm.description,
      summary: this.state.eventForm.summary,
      slug: this.state.eventForm.slug,
      statusId: this.state.eventForm.statusId ? "Active" : "NotSet",
      dateStart: this.state.eventForm.dateStart,
      dateEnd: this.state.eventForm.dateEnd,
      address: this.state.eventForm.address,
      zipCode: this.state.eventForm.zipCode,
    };
    this.props.submitEventForm(event);
  };

  clickCloseButton = (e) => {
    e.preventDefault();
    console.log("clicked Close.");

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

  render() {
    // console.log("Rendering EventAddModal.....this.state.showModal = ", this.state.showModal);
    // console.log("Event passed (in props): ", this.props.event);
    // console.log("Event Form state (to show in modal): ", this.state.eventForm);

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
                    <Form
                      className="eventLogForm col p-3 mr-0 mb-0"
                      style={{ marginBottom: "1rem", minWidth: "350px", height: "fit-content" }}
                    >
                      <div className="form-group row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label
                              for="eventNameInput"
                              className="col-2 font-weight-bold my-label "
                              style={{ minWidth: "68px" }}
                            >
                              Name
                            </Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              id="eventNameInput"
                              name="name"
                              value={this.state.eventForm.name}
                              onChange={this.onEventFormChange}
                              maxLength="25"
                            />
                          </div>
                          <div className="row">
                            <div className="col-3"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="eventHeadlineInput" className="col-2 font-weight-bold my-label ">
                              Headline
                            </Label>
                            <textarea
                              className="form-control my-input-control col"
                              id="eventHeadlineInput"
                              name="headline"
                              value={this.state.eventForm.headline}
                              onChange={this.onEventFormChange}
                              rows="2"
                              maxLength="120"
                              style={{ resize: "none" }}
                            ></textarea>
                          </div>
                          <div className="row">
                            <div className="col-3"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="eventDescriptionInput" className="col-2 font-weight-bold my-label ">
                              Description
                            </Label>
                            <textarea
                              className="form-control my-input-control col"
                              id="eventDescriptionInput"
                              name="description"
                              value={this.state.eventForm.description}
                              onChange={this.onEventFormChange}
                              rows="4"
                              maxLength="1000"
                              style={{ resize: "none" }}
                            ></textarea>
                          </div>
                          <div className="row">
                            <div className="col-3"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="eventSummaryInput" className="col-2 font-weight-bold my-label">
                              Summary
                            </Label>
                            <textarea
                              className="form-control my-input-control col"
                              id="eventSummaryInput"
                              name="summary"
                              value={this.state.eventForm.summary}
                              onChange={this.onEventFormChange}
                              rows="4"
                              maxLength="255"
                              style={{ resize: "none" }}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="eventSlugInput" className="col-2 font-weight-bold my-label ">
                              Slug
                            </Label>
                            <Input
                              type="url"
                              className="form-control my-input-control col"
                              id="eventSlugInput"
                              name="slug"
                              value={this.state.eventForm.slug}
                              onChange={this.onEventFormChange}
                              placeholder=""
                              maxLength="100"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group row mt-3 mr-1 pt-2 pl-3" style={{ borderTop: "2px #8e9194 solid" }}>
                        <div className="col pr-0">
                          <Label for="eventDateStartInput" className=" row font-weight-bold">
                            Date/Time Start
                          </Label>
                          <Input
                            type="datetime-local"
                            className="row form-control my-input-control"
                            id="eventDateStartInput"
                            name="dateStart"
                            value={this.state.eventForm.dateStart}
                            onChange={this.onEventFormChange}
                          />
                        </div>
                        <div className="col pr-0">
                          <Label for="eventDateEndInput" className="row font-weight-bold">
                            Date/Time End
                          </Label>
                          <Input
                            type="datetime-local"
                            className="row form-control my-input-control"
                            id="eventDateEndInput"
                            name="dateEnd"
                            value={this.state.eventForm.dateEnd}
                            onChange={this.onEventFormChange}
                          />
                        </div>
                        <div className="col-2 pl-0">
                          <Label className="font-weight-bold">Status</Label>
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="eventStatusInput"
                              name="statusId"
                              checked={this.state.eventForm.statusId}
                              value={this.state.eventForm.statusId ? "Active" : "Deleted"}
                              onChange={this.onEventFormChange}
                            />
                            <Label for="eventStatusInput" className="form-check-label">
                              Active
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div
                        className="form-group row mt-3 mb-1 mr-1 pl-3 pt-2"
                        style={{ borderTop: "2px #8e9194 solid" }}
                      >
                        <Label className="font-weight-bold">Location:</Label>
                      </div>
                      <div className="form-group row mr-1 pl-3">
                        <div className="col pr-0">
                          <Label for="eventAddressInput" className="row font-weight-bold">
                            Address
                          </Label>
                          <Input
                            type="address"
                            className="row form-control my-input-control"
                            id="eventAddressInput"
                            name="address"
                            value={this.state.eventForm.address}
                            onChange={this.onEventFormChange}
                          />
                        </div>
                        <div className="col pr-0">
                          <Label for="eventZipcodeInput" className="row font-weight-bold">
                            Zip Code
                          </Label>
                          <Input
                            type="zipcode"
                            className="row form-control my-input-control"
                            id="eventZipcodeInput"
                            name="zipCode"
                            value={this.state.eventForm.zipCode}
                            onChange={this.onEventFormChange}
                          />
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="pt-0" style={{ borderTop: "0px" }}>
          <div className="row justify-content-end">
            <Button
              type="button"
              color="primary"
              className="mr-1"
              id="eventFormSubmitButton"
              onClick={this.clickSubmitButton}
            >
              Submit
            </Button>
            <Button
              type="button"
              color="secondary"
              className="ml-1"
              data-dismiss="modal"
              onClick={this.clickCloseButton}
            >
              Close
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

/* <div className="modalEventCard">
            <div
              className="card border-1 m-0 pb-0"
              style={{
                borderColor: "#929089",
                backgroundColor: "rgb(100 152 107 / 30%)",
              }}
            >
              <div className="" style={{ textAlign: "center", alignItems: "center" }}>
                <img
                  className="event-card-img"
                  style={{ height: "100px", objectFit: "contain" }}
                  src={eventForm.techCompany.images[0].imageUrl || defaultEventImage}
                  alt="Card cap"
                />
              </div>

              <div className="card-body pt-0" style={{ textAlign: "center" }}>
                <h3 className="card-title eventTitle">{eventForm.title}</h3>
                <h4 className="card-title eventPay">{eventForm.pay}</h4>
                <h5 className="card-title eventCoContact">{eventForm.techCompany.contactInformation.data}</h5>
                <p className="card-text m-0 eventSummary">{eventForm.summary}}</p>
                <div className="card-text mt-2 eventSkills">{eventSkills}</div>
              </div>
              <div className="card-footer text-center p-2">
                <div>
                  <Button type="submit" color="primary" className="btn-sm mr-1 ml-1 editEvent">
                    Edit
                  </Button>
                  <Button type="submit" color="danger" className="btn-sm ml-1 deleteEvent">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" data-dismiss="modal" onClick={clickCloseButton}>
            Close
          </Button>
        </ModalFooter> 

      // <div className="modal fade" tabindex="-1" role="dialog" id="eventAddUpdateModal">
      // <div className="modal-dialog" role="document" style="min-width: 750px !important">
      //   <div className="modal-content">
      //     <div className="modal-header">
      //       <h5 className="modal-title eventCoName">Event</h5>
      //       <Button type="button" className="close" data-dismiss="modal" aria-label="Close">
      //         <span aria-hidden="true">&times;</span>
      //       </Button>
      //     </div>
      //     <div className="modal-body">

      //   </div>
      // </div>
      // </div> */

export default withRouter(EventAddModal);
