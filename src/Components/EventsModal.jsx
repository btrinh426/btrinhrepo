import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import EventsService from "../services/EventsService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";

import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class EventsModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartDayClick = this.handleStartDayClick.bind(this);
    this.handleEndDayClick = this.handleEndDayClick.bind(this);
    this.state = {
      eventPayload: {
        description: "",
        name: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "1",
        metaData: {
          dateStart: "",
          dateEnd: "",
          location: {
            latitude: "",
            longitude: "",
            zipCode: "",
            address: "",
          },
        },
      },
      safeState: {
        description: "",
        name: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "1",
        metaData: {
          dateStart: "",
          dateEnd: "",
          location: {
            latitude: "",
            longitude: "",
            zipCode: "",
            address: "",
          },
        },
      },
      isEdit: false,
      isNew: false,
    };
  }

  componentDidMount() {
    if (this.props.isEdit) {
      this.setState((prevState) => {
        let newState = { ...prevState };
        newState.eventPayload = this.props.eventPayload;
        newState.isEdit = true;
        return newState;
      });
    } else {
      this.setState((prevState) => {
        let newState = { ...prevState };
        newState.eventPayload = newState.safeState;
        newState.isEdit = false;
        return newState;
      });
    }
  }

  modalTitleControl = () => {
    if (this.state.isEdit) {
      return `Edit Event - ${this.state.eventPayload.id}`;
    }
    return "Add Event";
  };

  modalButtonControl = () => {
    if (this.state.isEdit) {
      return (
        <div className="row d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-danger float-left m-3"
            onClick={this.confirmDelete}
            style={{ width: "125px" }}
          >
            Delete
          </button>
          <div>
            <button
              type="button"
              className="btn btn-primary m-3"
              onClick={this.firstConfirmAddress}
              style={{ width: "170px" }}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary m-3"
              onClick={this.closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row d-flex justify-content-end">
        <div>
          <button
            type="button"
            className="btn btn-primary m-3"
            onClick={this.firstConfirmAddress}
            style={{ width: "170px" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary m-3"
            onClick={this.closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  handleFormFieldChanges = (e) => {
    let target = e.currentTarget.name;
    let newVal = e.currentTarget.value;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.eventPayload[target] = newVal;
      return newState;
    });
  };

  //-----Date Input Functions START-------//
  handleStartDayClick = (day) => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.eventPayload.metaData.dateStart = this.convertRawDateToSubmit(
        day
      );
      return newState;
    });
  };

  handleEndDayClick = (day) => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.eventPayload.metaData.dateEnd = this.convertRawDateToSubmit(day);
      return newState;
    });
  };

  convertRawDateToSubmit = (rDate) => {
    let rawDate = new Date(rDate);
    let newDate = `${
      rawDate.getMonth() + 1
    }/${rawDate.getDate()}/${rawDate.getFullYear()}`;
    return newDate;
  };

  parseDate = (str, format, locale) => {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  };

  formatDate = (date, format, locale) => {
    return dateFnsFormat(date, format, { locale });
  };

  FORMAT = "MM/dd/yyyy";

  //-----Date Input Functions END-------//

  //-----Address Input Functions START-------//

  setAddress = (value) => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.eventPayload.metaData.location.address = value;
      return newState;
    });
  };

  handleAddressSelect = async (value) => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.eventPayload.metaData.location.address = value;
      return newState;
    });
  };

  firstConfirmAddress = () => {
    geocodeByAddress(this.state.eventPayload.metaData.location.address)
      .then(this.onAddressConfirm)
      .catch(this.onAddressFail);
  };

  onAddressFail = (error) => {
    console.log(error);
    toast.error(`Address Error - Address`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  onAddressConfirm = (response) => {
    getLatLng(response[0])
      .then((latLng) => this.extractAddressData(latLng, response[0]))
      .catch(this.onLatLngFail);
  };

  onLatLngFail = (error) => {
    console.log(error);
    toast.error(`Address Error - LAT/LNG`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  extractAddressData = (latLng, response) => {
    //console.log(response);
    //console.log(latLng);
    let rawZip = response.address_components.filter(
      (arr) => arr.types[0] === "postal_code"
    );
    let googleZipCode = rawZip[0].long_name;
    let formattedAddress = response.formatted_address;
    let googleLat = latLng.lat;
    let googleLng = latLng.lng;

    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.eventPayload.metaData.location.address = formattedAddress;
      newState.eventPayload.metaData.location.zipCode = googleZipCode;
      newState.eventPayload.metaData.location.latitude = googleLat;
      newState.eventPayload.metaData.location.longitude = googleLng;
      return newState;
    });

    if (this.state.isEdit) {
      this.updateExistingEvent();
    } else {
      this.addNewEvent();
    }
  };

  //-----Address Input Functions END-------//
  updateExistingEvent = () => {
    EventsService.updateExisitingEvent(
      this.state.eventPayload.id,
      this.state.eventPayload
    )
      .then(this.onEventUpdateSuccess)
      .catch(this.onEventUpdateFail);
  };

  onEventUpdateFail = (error) => {
    console.log(error.response);
    toast.error(`Error Updating`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  onEventUpdateSuccess = (response) => {
    console.log(response);
    this.props.mainGetAllEvents();
    toast.success(`Event updated`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  addNewEvent = () => {
    if (!this.state.isEdit) {
      EventsService.createNewEvent(this.state.eventPayload)
        .then(this.addEventSuccess)
        .catch(this.addEventFail);
    }
  };

  addEventFail = (error) => {
    console.log(error.response);
    toast.error(`Error Creating Event`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  addEventSuccess = (response) => {
    console.log(response);
    toast.success(`Event Created`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.mainGetAllEvents();
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.eventPayload.id = response.data.item;
      newState.isEdit = true;
      return newState;
    });
  };

  confirmDelete = () => {
    Swal.fire({
      icon: "warning",
      title: "Delete Event?",
      text: "It will be lost forever",
      showConfirmButton: true,
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEvent();
      }
    });
  };

  deleteEvent = () => {
    let deletePayload = { ...this.state };
    deletePayload.eventPayload.statusId = 2;
    EventsService.deleteEvent(
      deletePayload.eventPayload.id,
      deletePayload.eventPayload
    )
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteError = (error) => {
    toast.error(`Error Deleting Event`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  onDeleteSuccess = (response) => {
    toast.success(`Event Deleted`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.mainGetAllEvents();
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.eventPayload = newState.safeState;
      newState.isEdit = false;
      return newState;
    });
  };

  closeModal = () => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.eventPayload = newState.safeState;
      return newState;
    });
    this.props.closeModal();
  };

  render() {
    //console.log(this.state);
    return (
      <div>
        <Modal isOpen={this.props.showModal} centered={true} size="lg">
          <ModalHeader toggle={this.closeModal} charCode={"\u2715"}>
            {this.modalTitleControl()}
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group row mb-1">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                  Event Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="name"
                    value={this.state.eventPayload.name}
                    onChange={this.handleFormFieldChanges}
                  ></input>
                </div>
              </div>

              <div className="form-group row mb-4 mt-2">
                <label className="col-sm-2 col-form-label col-form-label-sm"></label>
                <div
                  className="col-3 mr-3"
                  style={{ cursor: "pointer" }}
                  type="select"
                >
                  <p
                    className="text-muted font-weight-light m-0"
                    style={{ fontSize: "10pt" }}
                  >
                    Start Date
                  </p>
                  <DayPickerInput
                    onDayChange={this.handleStartDayClick}
                    disabledDays={{ daysOfWeek: [0] }}
                    selectedDays={this.state.eventPayload.metaData.dateStart}
                    value={this.state.eventPayload.metaData.dateStart}
                    formatDate={this.formatDate}
                    format={this.FORMAT}
                    parseDate={this.parseDate}
                    placeholder={`${dateFnsFormat(new Date(), this.FORMAT)}`}
                  />
                </div>
                <div className="col-5">
                  <p
                    className="text-muted font-weight-light m-0"
                    style={{ fontSize: "10pt" }}
                  >
                    End Date
                  </p>
                  <DayPickerInput
                    onDayChange={this.handleEndDayClick}
                    disabledDays={{ daysOfWeek: [0] }}
                    selectedDays={this.state.eventPayload.metaData.dateEnd}
                    value={this.state.eventPayload.metaData.dateEnd}
                    formatDate={this.formatDate}
                    format={this.FORMAT}
                    parseDate={this.parseDate}
                    placeholder={`${dateFnsFormat(new Date(), this.FORMAT)}`}
                    //value={new Date(2021, 8, 1)}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                  Location
                </label>
                <div className="col-sm-10">
                  <PlacesAutoComplete
                    value={this.state.eventPayload.metaData.location.address}
                    onChange={this.setAddress}
                    onSelect={this.handleAddressSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                          {...getInputProps({ placeholder: "Enter Address" })}
                          type="text"
                          className="form-control form-control-sm"
                        />
                        <div>
                          {loading ? <div>Loading...</div> : null}
                          {suggestions.map((suggestion) => {
                            let style = {
                              backgroundColor: suggestion.active
                                ? "#8ac6d1"
                                : "white",
                            };
                            //console.log(suggestion);
                            return (
                              <div
                                id={suggestion.placeId}
                                {...getSuggestionItemProps(suggestion, {
                                  style,
                                })}
                                key={suggestion.placeId}
                              >
                                {suggestion.description}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutoComplete>
                  {/* <input
                    type="text"
                    className="form-control form-control-sm"
                  ></input> */}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                  Headline
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="headline"
                    value={this.state.eventPayload.headline}
                    onChange={this.handleFormFieldChanges}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                  Description
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="description"
                    value={this.state.eventPayload.description}
                    onChange={this.handleFormFieldChanges}
                  ></input>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                  Summary
                </label>
                <div className="col-sm-10">
                  <textarea
                    type="text"
                    className="form-control form-control-sm"
                    rows={3}
                    name="summary"
                    value={this.state.eventPayload.summary}
                    onChange={this.handleFormFieldChanges}
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                  Website
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="slug"
                    value={this.state.eventPayload.slug}
                    onChange={this.handleFormFieldChanges}
                  ></input>
                </div>
              </div>
            </form>
            {this.modalButtonControl()}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EventsModal;
