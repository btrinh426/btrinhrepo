import React from "react";
import * as eventService from "../services/eventService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EventForm from "./EventForm";
import { toast } from "react-toastify";
import SingleEvent from "./SingleEvent";
import FirstEvent from "./FirstEvent";
class Event extends React.Component {
  state = {
    modal: false,
    formData: {
      name: "",
      headline: "",
      description: "",
      summary: "",
      slug: "",
      statusId: false,
      dateStart: "",
      dateEnd: "",
      zipCode: "",
      address: "",
      latitude: 0,
      longitude: 0,
    },
    events: [],
    search: "",
  };

  google = window.google;

  componentDidMount() {
    eventService.getAll().then(this.onGetAllSuccess).catch(this.onGetAllError);
  }

  onGetAllSuccess = (res) => {
    console.log(res.data.item["110_Weekday"]);
    this.setState((prevState) => {
      let newEvents = { ...prevState.events };
      newEvents = res.data.item["110_Weekday"];
      let newEventsComponents = newEvents.map(this.mapEvents);
      let firstEventComponent = newEvents.map(this.mapOneEvent)[0];
      return { events: newEvents, newEventsComponents, firstEventComponent };
    });
    this.getMap();
  };
  onGetAllError = (res) => {
    console.error(res);
  };
  toggle = () => {
    this.setState(() => {
      return { modal: !this.state.modal };
    });
  };

  getMap = () => {
    const latitude = this.state.events[0].metaData.location.latitude;
    const longitude = this.state.events[0].metaData.location.longitude;
    const map = new this.google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: { lat: latitude, lng: longitude },
    });
    map.setCenter({ lat: latitude, lng: longitude });
    new this.google.maps.Marker({
      map: map,
      position: { lat: latitude, lng: longitude },
    });
  };
  submitClick = () => {
    const geocoder = new this.google.maps.Geocoder();
    geocoder.geocode(
      { address: this.state.formData.address },
      (results, status) => {
        if (status === "OK") {
          console.log(results);
          this.setState((prevState) => {
            let newFormData = { ...prevState.formData };
            newFormData.latitude = results[0].geometry.location.lat();
            newFormData.longitude = results[0].geometry.location.lng();
            return { formData: newFormData };
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
        console.log(this.state);
        let payload = {
          metaData: {
            dateStart: this.state.formData.dateStart,
            dateEnd: this.state.formData.dateEnd,
            location: {
              latitude: this.state.formData.latitude,
              longitude: this.state.formData.longitude,
              zipCode: this.state.formData.zipCode,
              address: this.state.formData.address,
            },
          },
          name: this.state.formData.name,
          headline: this.state.formData.headline,
          description: this.state.formData.description,
          summary: this.state.formData.summary,
          slug: this.state.formData.slug,
          statusId: this.state.formData.statusId ? "Active" : "Not Yet",
        };
        eventService
          .add(payload)
          .then(this.onAddSuccess)
          .catch(this.onAddError);
      }
    );

    this.setState(() => {
      return { modal: !this.state.modal };
    });
  };

  onAddSuccess = (res) => {
    toast("Event Added!");
    console.log(res);
  };
  onAddError = (res) => {
    console.error(res);
  };
  formInput = (e) => {
    console.log(e.currentTarget);
    let newValue =
      e.currentTarget.type === "checkbox"
        ? e.currentTarget.checked
        : e.currentTarget.value;
    let inputName = e.currentTarget.name;
    console.log(newValue, inputName);
    this.setState((prevState) => {
      let newFormData = { ...prevState.formData };
      newFormData[inputName] = newValue;
      return { formData: newFormData };
    });
    console.log(this.state);
  };

  mapEvents = (singleEvent) => {
    return <SingleEvent key={`Event-${singleEvent.id}`} event={singleEvent} />;
  };
  mapOneEvent = (singleEvent) => {
    return <FirstEvent key={`Event-${singleEvent.id}`} event={singleEvent} />;
  };

  onSearchInput = (e) => {
    let newValue = e.currentTarget.value;
    let inputName = e.currentTarget.name;
    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  };
  render() {
    return (
      <div className="jumbotron">
        <div className="w-100">
          <div>
            <Button color="danger" onClick={this.toggle}>
              {"buttonLabel"}
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} size={"lg"}>
              <ModalHeader toggle={this.toggle}>Event</ModalHeader>
              <ModalBody>
                <EventForm
                  eventData={this.state.formData}
                  formChange={this.formInput}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.submitClick}>
                  Submit
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-9">{this.state.firstEventComponent}</div>
              <div className="col-3">
                <form className="form-inline ">
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control rounded"
                      placeholder="Search"
                      name="search"
                      value={this.state.search}
                      onChange={this.onSearchInput}
                    />
                    <button type="button" className="btn btn-outline-primary">
                      search
                    </button>
                  </div>
                </form>

                <div>{this.state.newEventsComponents}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Event;
