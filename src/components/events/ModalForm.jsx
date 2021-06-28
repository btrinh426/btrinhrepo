import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

const ModalForm = (props) => {
  return (
    <React.Fragment>
      <Modal isOpen={props.isOpen} toggle={props.toggleModal}>
        <ModalHeader toggle={props.toggleModal}>{props.title}</ModalHeader>
        <ModalBody>
          {/* {props.content} */}
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={this.onFormFieldChanged}
                placeholder="First Name"
                // value={this.state.fName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="headline">Headline</label>
              <input
                type="text"
                className="form-control"
                id="headline"
                name="headline"
                // onChange={this.onFormFieldChanged}
                placeholder="Last Name"
                // value={this.state.headline}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                // onChange={this.onFormFieldChanged}
                // value={this.state.fName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input
                type="text"
                className="form-control"
                id="summary"
                name="summary"
                // onChange={this.onFormFieldChanged}
                // value={this.state.fName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                className="form-control"
                id="slug"
                name="slug"
                // onChange={this.onFormFieldChanged}
                // value={this.state.fName}
              />
            </div>
            <form className="form-inline">
              <div className="form-group d-block">
                <label htmlFor="dateStart">Start Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="dateStart"
                  name="dateStart"
                  // onChange={this.onFormFieldChanged}
                  // value={this.state.fName}
                />
              </div>
              <div className="form-group d-block">
                <label htmlFor="dateEnd">End Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="dateEnd"
                  name="dateEnd"
                  // onChange={this.onFormFieldChanged}
                  // value={this.state.fName}
                />
              </div>
              {/* <div className="form-group d-block">
                <label htmlFor="firstName">Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  // onChange={this.onFormFieldChanged}
                  // value={this.state.fName}
                />
              </div> */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label claclassNamess="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div>
            </form>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
