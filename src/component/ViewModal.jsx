import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ViewModal = (props) => {
  return (
    <React.Fragment>
      <Modal isOpen={props.isViewModalOpen} toggle={props.toggleViewModal}>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalBody>
          <p>Salary : {props.pay}</p>
          <p>Job Description : {props.description}</p>
          <p>Summary : {props.summary} </p>
          <p>Skills : {props.skills}</p>
          <p>Company Name : {props.profile} </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggleViewModal}>
            close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default ViewModal;
