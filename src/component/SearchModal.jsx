import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const SearchModal = (props) => {
  return (
    <React.Fragment>
      <Modal isOpen={props.isSearchModalOpen} toggle={props.toggleSearchModal}>
        <ModalHeader toggle={props.toggleSearchModal}>
          {props.title}
        </ModalHeader>
        <ModalBody>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Name"
            aria-label="Search"
            onChange={props.onSearchFieldChanged}
            value={props.searchJobName}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggleSearchModal}>
            Search
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default SearchModal;
