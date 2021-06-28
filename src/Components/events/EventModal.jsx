import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EventModal = (props) => {
  return (
    <React.Fragment>
      <Modal
        className="col-12"
        isOpen={props.isOpen}
        toggle={props.toggleModal}
      >
        <ModalHeader toggle={props.toggleModal}>{props.title}</ModalHeader>
        <ModalBody>{props.content}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default EventModal;
