import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalSearch = (props) => {
  return (
    <div className="">
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggleModal}
        contentClassName={props.contentClassName}
      >
        <ModalHeader className="text-center" toggle={props.toggleModal}>
          {props.title}
        </ModalHeader>
        <ModalBody>{props.content}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalSearch;
