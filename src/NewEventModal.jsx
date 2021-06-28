import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const NewEventModal = (props) => {
  console.log(props.populate);

  return (
    <React.Fragment>
      <Modal
        className="modal-xl"
        isOpen={props.isOpen}
        toggle={props.toggleModal}
      >
        <ModalHeader toggle={props.toggleModal}>{props.title}</ModalHeader>
        <ModalBody>
          <form className="card">
            <div className="card-header text-center">Event Info</div>
            <div className="form-group row m-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={props.onFormChange}
                  value={props.populate.payload.name}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="headline" className="col-sm-2 col-form-label">
                Headline
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="headline"
                  name="headline"
                  onChange={props.onFormChange}
                  value={props.populate.payload.headline}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={props.onFormChange}
                  value={props.populate.description}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="summary" className="col-sm-2 col-form-label">
                Summary
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="summary"
                  name="summary"
                  onChange={props.onFormChange}
                  value={props.populate.summary}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="slug" className="col-sm-2 col-form-label">
                Link
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="slug"
                  name="slug"
                  onChange={props.onFormChange}
                  value={props.populate.slug}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="statusId" className="col-sm-2 col-form-label">
                Status
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="statusId"
                  name="statusId"
                  onChange={props.onFormChange}
                  value={props.populate.statusId}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label
                htmlFor="metaData.dateStart"
                className="col-sm-2 col-form-label"
              >
                Date Start
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="dateStart"
                  name="dateStart"
                  onChange={props.onMetaChange}
                  //value={props.populate.metaData.dateStart}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="dateEnd" className="col-sm-2 col-form-label">
                Date End
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="dateEnd"
                  name="dateEnd"
                  onChange={props.onMetaChange}
                  //value={props.populate.metaData.dateEnd}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="address" className="col-sm-2 col-form-label">
                Address
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  onChange={props.onMetaChange}
                  //value={props.populate.metaData.address}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="zipCode" className="col-sm-2 col-form-label">
                Zip Code
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  name="zipCode"
                  onChange={props.onMetaChange}
                  //value={props.populate.metaData.zipCode}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="latitude" className="col-sm-2 col-form-label">
                Latitude
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="latitude"
                  name="latitude"
                  onChange={props.onMetaChange}
                  //value={props.populate.metaData.latitude}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="longitude" className="col-sm-2 col-form-label">
                Longitude
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="longitude"
                  name="longitude"
                  onChange={props.onMetaChange}
                  //value={props.populate.metaData.longitude}
                />
              </div>
            </div>
            <div className="form-group row mx-auto">
              <button
                className="btn btn-primary"
                type="button"
                onClick={props.onClick}
              >
                Submit
              </button>
            </div>
          </form>
          {props.content}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default NewEventModal;
