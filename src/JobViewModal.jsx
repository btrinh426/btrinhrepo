import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const JobViewModal = (props) => {
  return (
    <Modal
      className="modal-xl"
      isOpen={props.isOpen}
      toggle={props.toggleModal}
    >
      <ModalHeader toggle={props.toggleModal}>Job Info</ModalHeader>
      <ModalBody>
        <div className="card">
          <div className="card-header">{props.info.title}</div>
          <div className="card-body">
            <p>Pay: {props.info.pay}</p>
            <p>Description: {props.info.description}</p>
            <p>Summary: {props.info.summary}</p>
            <p>Link: {props.info.slug}</p>
            <p>Status: {props.info.statusId}</p>
            <p>Company: {props.info.techCompany.name}</p>
            <p>Skills: {props.info.skills}</p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.toggleModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default JobViewModal;
