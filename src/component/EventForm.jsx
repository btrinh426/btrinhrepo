import React from "react";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";

function EventForm(props) {
  const onFormInput = props.formChange;
  const formData = props.eventData;

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
            value={formData.name}
            onChange={onFormInput}
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
            value={formData.headline}
            onChange={onFormInput}
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
            value={formData.description}
            onChange={onFormInput}
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
            value={formData.summary}
            onChange={onFormInput}
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
            value={formData.slug}
            onChange={onFormInput}
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
              value={formData.dateStart}
              onChange={onFormInput}
            />
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup>
            <Label>Date End</Label>
            <Input
              type="text"
              name="dateEnd"
              value={formData.dateEnd}
              onChange={onFormInput}
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
                onChange={onFormInput}
                checked={formData.statusId}
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
              value={formData.address}
              onChange={onFormInput}
            />
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup>
            <Label>Zipcode</Label>
            <Input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={onFormInput}
            />
          </FormGroup>
        </Col>
      </FormGroup>
    </Form>
  );
}

export default EventForm;
