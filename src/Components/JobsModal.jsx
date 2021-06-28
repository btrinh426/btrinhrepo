import React from "react";
import {
  Modal,
  ModalBody,
  Button,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
} from "reactstrap";

let JobsModal = (props) => {
  let closeModal = () => {
    props.closeModal();
  };

  console.log("From Modal", props.showModal);
  return (
    <div>
      <Modal isOpen={props.showModal} centered={true}>
        <ModalBody>
          <div>
            <Card>
              <CardBody>
                <CardTitle tag="h4">{props.jobObj.editInfo.title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  {props.jobObj.miscInfo.companyName}
                </CardSubtitle>
                <CardTitle tag="h4" className="text-primary">
                  {props.jobObj.editInfo.pay}
                </CardTitle>
              </CardBody>
              <CardBody>
                <CardText>{props.jobObj.editInfo.summary}</CardText>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default JobsModal;
