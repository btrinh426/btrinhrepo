import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const JobSearchModal = (props) => {
  const search = (e) => {
    props.onChange(e);
  };
  const submit = () => {
    props.onClick(props.query);
  };

  return (
    <Modal
      className="modal-xl"
      isOpen={props.isOpen}
      toggle={props.toggleModal}
    >
      <ModalHeader>Search Jobs</ModalHeader>
      <ModalBody>
        <div className="container">
          <div className="row mb-5 mx-auto">
            <input
              type="search"
              className="col-7 form-control mx-1"
              onChange={search}
              value={props.query}
            ></input>
            <button
              type="button"
              className="col-4 btn btn-primary mx-auto"
              onClick={submit}
            >
              Search
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default JobSearchModal;
