import React, { Component } from "react";
import { render } from "react-dom";
import ModalForm from "./ModalForm";

class EventModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen, //here we flip the bool value of the previous state.
      };
    });
  };
  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.toggleModal}>
          Add Event
        </button>
        <ModalForm
          isOpen={this.state.isOpen}
          toggleModal={this.toggleModal}
          title={"Title goes here."}
          content={"Content for Modal goes here."}
        />
      </React.Fragment>
    );
  }
}

export default EventModal;
