import React from "react";

import { Form, FormGroup, Label, Col, Input } from "reactstrap";

class EventForm extends React.Component {
  state = {
    currentPage: 1,
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
  };

  eventDataPayload = { ...this.props.editEventData };

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
              value={this.props.formInputData.name}
              onChange={this.props.inputChange}
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
              value={this.props.formInputData.headline}
              onChange={this.props.inputChange}
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
              value={this.props.formInputData.description}
              onChange={this.props.inputChange}
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
              value={this.props.formInputData.summary}
              onChange={this.props.inputChange}
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
              value={this.props.formInputData.slug}
              onChange={this.props.inputChange}
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
                value={this.props.formInputData.dateStart}
                onChange={this.props.inputChange}
              />
            </FormGroup>
          </Col>
          <Col sm={4}>
            <FormGroup>
              <Label>Date End</Label>
              <Input
                type="text"
                name="dateEnd"
                value={this.props.formInputData.dateEnd}
                onChange={this.props.inputChange}
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
                  onChange={this.props.inputChange}
                  checked={this.props.formInputData.statusId}
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
                value={this.props.formInputData.address}
                onChange={this.props.inputChange}
              />
            </FormGroup>
          </Col>
          <Col sm={4}>
            <FormGroup>
              <Label>Zipcode</Label>
              <Input
                type="text"
                name="zipCode"
                value={this.props.formInputData.zipCode}
                onChange={this.props.inputChange}
              />
            </FormGroup>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default EventForm;
