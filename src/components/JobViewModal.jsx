import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const JobViewModal = (props) => {
  let showModal = props.modalShown;
  if (!showModal) {
    return null;
  }
  const defaultJobImage = "https://i.pinimg.com/originals/67/19/bb/6719bb12bad0d9d9e6588e1299dd9a83.jpg";
  const jobInfo = props.jobInfo;
  const toggle = props.toggleModal;

  let jobSkills = jobInfo.skills.map((skill) => skill.name).join(", ");
  jobSkills = (
    <span>
      <FontAwesomeIcon icon={faCheckSquare} className="mr-1" /> {jobSkills}
    </span>
  );

  // let jobSkills = jobInfo.skills.map((skill) => (
  //   <span key={jobInfo.id}>
  //     <FontAwesomeIcon icon={faCheckSquare} /> {skill.name}
  //   </span>
  // ));

  const clickCloseButton = (e) => {
    e.preventDefault();
    toggle();
  };

  return (
    <Modal isOpen={showModal} id="jobViewModal">
      <ModalHeader>
        <div className="row pl-3 pr-3">
          <h3 className="col m-0 pl-0">{jobInfo.techCompany.name}</h3>
          <Button
            type="button"
            className="col-1 close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={clickCloseButton}
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="modalJobCard">
          <div
            className="card border-1 m-0 pb-0"
            style={{
              borderColor: "#929089",
              backgroundColor: "rgb(100 152 107 / 30%)",
            }}
          >
            <div className="" style={{ textAlign: "center", alignItems: "center" }}>
              <img
                className="job-card-img"
                style={{ height: "100px", objectFit: "contain" }}
                src={jobInfo.techCompany.images[0].imageUrl || defaultJobImage}
                alt="Card cap"
              />
            </div>

            <div className="card-body pt-0" style={{ textAlign: "center" }}>
              <h3 className="card-title jobTitle">{jobInfo.title}</h3>
              <h4 className="card-title jobPay">{jobInfo.pay}</h4>
              <h5 className="card-title jobCoContact">{jobInfo.techCompany.contactInformation.data}</h5>
              <p className="card-text m-0 jobSummary">{jobInfo.summary}}</p>
              <div className="card-text mt-2 jobSkills">{jobSkills}</div>
            </div>
            <div className="card-footer text-center p-2">
              <div>
                <Button type="submit" color="primary" className="btn-sm mr-1 ml-1 editJob">
                  Edit
                </Button>
                <Button type="submit" color="danger" className="btn-sm ml-1 deleteJob">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="secondary" data-dismiss="modal" onClick={clickCloseButton}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default JobViewModal;
