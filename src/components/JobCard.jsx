import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class JobCard extends React.Component {
  resetCardAndClose = () => {
    this.props.toggleModal();
  };

  rerouteToForm = () => {
    this.props.showForm();
  };
  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.isOpen} toggle={this.resetCardAndClose}>
          <ModalHeader toggle={this.resetCardAndClose}>
            {this.props.cardInfo.title}
            {this.props.cardInfo.id}
          </ModalHeader>
          <ModalBody>
            <div>
              Summary: {this.props.cardInfo.summary} <br />
              Pay: {this.props.cardInfo.pay}
              <br />
              Description:{this.props.cardInfo.description}
              <div className="button-container row justify-content-around">
                <p>Slug: {this.props.cardInfo.slug}</p>
                <p>Status: {this.props.cardInfo.statusId}</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={this.rerouteToForm}>
              Edit
            </button>
            <Button color="secondary" onClick={this.resetCardAndClose}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default JobCard;
