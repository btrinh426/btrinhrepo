import React from "react";

import { FormGroup, Label, Col } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@material-ui/core";
import AddressAutoComplete from "./AddressAutoComplete";

class EventForm extends React.Component {
  onSubmitClick = (values) => {
    this.props.onSubmit(values);
  };

  handleAddress = (obj, setFieldValue) => {
    console.log(obj);
    setFieldValue("address", obj.address);
    setFieldValue("latitude", obj.latitude);
    setFieldValue("longitude", obj.longitude);
    setFieldValue("zipcode", obj.zipcode);
  };

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={this.props.formInputData}
        validationSchema={this.props.validationSchema}
        onSubmit={this.onSubmitClick}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FormGroup row className="mt-3">
              <Label for="name" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Field type="text" name="name" className="w-75 border" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="form-error"
                ></ErrorMessage>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="headline" sm={2}>
                Headline
              </Label>
              <Col sm={10}>
                <Field type="text" name="headline" className="w-75 border" />
                <ErrorMessage
                  name="headline"
                  component="div"
                  className="form-error"
                ></ErrorMessage>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={2}>
                Description
              </Label>
              <Col sm={10}>
                <Field type="text" name="description" className="w-75 border" />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="form-error"
                ></ErrorMessage>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="summary" sm={2}>
                Summary
              </Label>
              <Col sm={10}>
                <Field type="text" name="summary" className="w-75 border" />
                <ErrorMessage
                  name="summary"
                  component="div"
                  className="form-error"
                ></ErrorMessage>
              </Col>
            </FormGroup>
            <FormGroup row className="mb-4">
              <Label for="slug" sm={2}>
                Slug
              </Label>
              <Col sm={10}>
                <Field type="text" name="slug" className="border" />
                <ErrorMessage
                  name="slug"
                  component="div"
                  className="form-error"
                ></ErrorMessage>
              </Col>
            </FormGroup>
            <hr></hr>
            <FormGroup row className="mt-4">
              <Col sm={4}>
                <FormGroup className="text-center d-flex flex-column">
                  <Label for="dateStart">Date Start</Label>
                  <FormGroup>
                    <Field type="date" name="dateStart" className="border" />
                    <ErrorMessage
                      name="dateStart"
                      component="div"
                      className="form-error"
                    ></ErrorMessage>
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup className="text-center d-flex flex-column">
                  <Label for="dateEnd">Date End</Label>
                  <FormGroup>
                    <Field type="date" name="dateEnd" className="border" />
                    <ErrorMessage
                      name="dateEnd"
                      component="div"
                      className="form-error"
                    ></ErrorMessage>
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup check className="text-center d-flex flex-column">
                  <Label for="statusId">
                    <Field type="checkbox" name="statusId" className="mr-2" />
                    Status
                  </Label>
                  <ErrorMessage
                    name="statusId"
                    component="div"
                    className="form-error"
                  ></ErrorMessage>
                </FormGroup>
              </Col>
            </FormGroup>
            <hr></hr>
            <FormGroup row>
              <h6 className="center">Location</h6>
            </FormGroup>
            <FormGroup row>
              <Col sm={7}>
                <FormGroup className="d-flex">
                  <Label for="address" className="mr-2">
                    Address
                  </Label>
                  <FormGroup className="w-100">
                    <AddressAutoComplete
                      handleAddress={(address) =>
                        this.handleAddress(address, setFieldValue)
                      }
                    />

                    <ErrorMessage
                      name="address"
                      component="div"
                      className="form-error"
                    ></ErrorMessage>
                  </FormGroup>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup>
              <Button variant="outlined" type="submit" color="primary">
                Submit
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.props.onCancelClick}
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    );
  }
}

export default EventForm;
