import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const NewEventModal = (props) => {
  //console.log(props.formData);

  const onChange = (e) => {
    props.onFormChange(e);
  };
  const onMetaChange = (e) => {
    props.onMetaChange(e);
  };
  const onSubmit = () => {
    props.onClick(props.formData.id);
  };

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
                  onChange={onChange}
                  value={props.formData.name}
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
                  onChange={onChange}
                  value={props.formData.headline}
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
                  onChange={onChange}
                  value={props.formData.description}
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
                  onChange={onChange}
                  value={props.formData.summary}
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
                  onChange={onChange}
                  value={props.formData.slug}
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
                  onChange={onChange}
                  value={props.formData.statusId}
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
                  onChange={onMetaChange}
                  value={props.formData.metaData.dateStart}
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
                  onChange={onMetaChange}
                  value={props.formData.metaData.dateEnd}
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
                  onChange={onMetaChange}
                  value={props.formData.metaData.location.address}
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
                  onChange={onMetaChange}
                  value={props.formData.metaData.location.zipCode}
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
                  onChange={onMetaChange}
                  value={props.formData.metaData.location.latitude}
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
                  onChange={onMetaChange}
                  value={props.formData.metaData.location.longitude}
                />
              </div>
            </div>
            <div className="form-group row mx-auto">
              <button
                className="btn btn-primary"
                type="button"
                onClick={onSubmit}
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
