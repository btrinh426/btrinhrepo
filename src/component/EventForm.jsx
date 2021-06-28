import React from "react";
import * as eventService from "../services/eventService";
import { Button, Form, FormGroup, Label, Col, Input } from "reactstrap";
import { toast } from "react-toastify";
class EventForm extends React.Component {
  state = {
    formData: {
      id: null,
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
    currentPage: 1,
  };
  eventDataPayload = { ...this.props.editEventData };
  toggle = () => this.props.toggleForm();

  componentDidMount() {
    this.google = window.google;
    this.geocoder = new this.google.maps.Geocoder();
    if (this.eventDataPayload.id) {
      let eventData = this.eventDataPayload;
      this.setState((prevState) => {
        let newFormData = { ...prevState.formData };
        newFormData.id = eventData.id;
        newFormData.name = eventData.name;
        newFormData.headline = eventData.headline;
        newFormData.description = eventData.description;
        newFormData.summary = eventData.summary;
        newFormData.slug = eventData.slug;
        newFormData.statusId = eventData.statusId;
        newFormData.dateStart = eventData.metaData.dateStart;
        newFormData.dateEnd = eventData.metaData.dateEnd;
        newFormData.zipCode = eventData.metaData.location.zipCode;
        newFormData.address = eventData.metaData.location.address;
        newFormData.latitude = eventData.metaData.location.latitude;
        newFormData.longitude = eventData.metaData.location.longitude;
        return { formData: newFormData };
      });
    }
    // if (
    //   typeof this.eventDataPayload === "object" &&
    //   this.eventDataPayload.payload
    // ) {
    //   let eventData = this.eventDataPayload.payload;
    //   this.setState((prevState) => {
    //     let newFormData = { ...prevState.formData };
    //     newFormData.name = eventData.name;
    //     newFormData.headline = eventData.headline;
    //     newFormData.description = eventData.description;
    //     newFormData.summary = eventData.summary;
    //     newFormData.slug = eventData.slug;
    //     newFormData.statusId = eventData.statusId;
    //     newFormData.dateStart = eventData.metaData.dateStart;
    //     newFormData.dateEnd = eventData.metaData.dateEnd;
    //     newFormData.zipCode = eventData.metaData.location.zipCode;
    //     newFormData.address = eventData.metaData.location.address;
    //     newFormData.latitude = eventData.metaData.location.latitude;
    //     newFormData.longitude = eventData.metaData.location.longitude;
    //     return { formData: newFormData };
    //   });
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    // if (this.state.modal === true && prevState.modal === false) {
    //     this.setState((prevState) => {
    //       let newEventData = { ...prevState.eventData };
    //       newEventData = {};
    //       return { eventData: newEventData };
    //     });
    //   }
  }
  onEventInput = (e) => {
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

  onSubmitClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.geocoder.geocode(
      { address: this.state.formData.address },
      this.onGeocodeHandler
    );
  };

  onGeocodeHandler = (results, status) => {
    if (status === "OK") {
      this.setState((prevState) => {
        let newFormData = { ...prevState.formData };
        newFormData.latitude = results[0].geometry.location.lat();
        newFormData.longitude = results[0].geometry.location.lng();
        return { formData: newFormData };
      }, this.addUpdateEvent);
    } else {
      toast("Geocode was not successful for the following reason: " + status);
    }
  };

  addUpdateEvent = () => {
    let eventData = this.state.formData;
    let id = this.state.formData.id;
    if (id) {
      let data = {
        id: eventData.id,
        metaData: {
          dateStart: eventData.dateStart,
          dateEnd: eventData.dateEnd,
          location: {
            latitude: eventData.latitude,
            longitude: eventData.longitude,
            zipCode: eventData.zipCode,
            address: eventData.address,
          },
        },
        name: eventData.name,
        headline: eventData.headline,
        description: eventData.description,
        summary: eventData.summary,
        slug: eventData.slug,
        statusId: eventData.statusId,
      };
      eventService
        .edit(id, data)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
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
      eventService.add(payload).then(this.onAddSuccess).catch(this.onAddError);
    }
  };
  onAddSuccess = (res) => {
    toast("Event Added!");
    console.log(res);
    eventService
      .getAll(this.state.currentPage - 1, 3)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  };
  onGetAllSuccess = (res) => {
    console.log(res);
    this.toggle();
  };
  onAddError = (res) => {
    console.error(res);
  };

  onUpdateSuccess = (eventPayload) => {
    let selectedEventIndex = this.props.events.findIndex((event) => {
      return event.id === eventPayload.id;
    });
    this.props.events.splice(selectedEventIndex, 1, eventPayload);
    console.log(this.props.events);
    this.toggle();
  };
  onUpdateError = () => {};
  render() {
    return (
      <Form>
        <FormGroup row className="mt-3">
          <Label for="nameInput" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="name"
              id="nameInput"
              placeholder=""
              value={this.state.formData.name}
              onChange={this.onEventInput}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="headlineInput" sm={2}>
            Headline
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="headline"
              id="headlineInput"
              placeholder=""
              value={this.state.formData.headline}
              onChange={this.onEventInput}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="descriptionInput" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="description"
              id="descriptionInput"
              placeholder=""
              value={this.state.formData.description}
              onChange={this.onEventInput}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="summaryInput" sm={2}>
            Summary
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="summary"
              id="summaryInput"
              placeholder=""
              value={this.state.formData.summary}
              onChange={this.onEventInput}
            />
          </Col>
        </FormGroup>
        <FormGroup row className="mb-4">
          <Label for="slugInput" sm={2}>
            Slug
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="slug"
              id="slugInput"
              placeholder=""
              value={this.state.formData.slug}
              onChange={this.onEventInput}
            />
          </Col>
        </FormGroup>
        <hr></hr>
        <FormGroup row className="mt-4">
          <Col sm={4}>
            <FormGroup>
              <Label>Date Start</Label>
              <Input
                type="text"
                name="dateStart"
                value={this.state.formData.dateStart}
                onChange={this.onEventInput}
              />
            </FormGroup>
          </Col>
          <Col sm={4}>
            <FormGroup>
              <Label>Date End</Label>
              <Input
                type="text"
                name="dateEnd"
                value={this.state.formData.dateEnd}
                onChange={this.onEventInput}
              />
            </FormGroup>
          </Col>
          <Col sm={4}>
            <FormGroup>
              <div>Status</div>
            </FormGroup>
            <FormGroup>
              <Label check>
                <Input
                  type="checkbox"
                  name="statusId"
                  value="Active"
                  onChange={this.onEventInput}
                  checked={this.state.formData.statusId}
                />
                Active
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <FormGroup>Location</FormGroup>
        </FormGroup>
        <FormGroup row>
          <Col sm={8}>
            <FormGroup>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={this.state.formData.address}
                onChange={this.onEventInput}
              />
            </FormGroup>
          </Col>
          <Col sm={4}>
            <FormGroup>
              <Label>Zipcode</Label>
              <Input
                type="text"
                name="zipCode"
                value={this.state.formData.zipCode}
                onChange={this.onEventInput}
              />
            </FormGroup>
          </Col>
        </FormGroup>
        <Button color="primary" onClick={this.onSubmitClick}>
          Submit
        </Button>{" "}
        <Button color="secondary" onClick={this.toggle}>
          Cancel
        </Button>
      </Form>
    );
  }
}

export default EventForm;
