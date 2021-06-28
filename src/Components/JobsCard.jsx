import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

let JobCard = (props) => {
  let jobPayload = {
    editInfo: {
      id: props.jobObject.id,
      title: props.jobObject.title,
      description: props.jobObject.description,
      summary: props.jobObject.summary,
      pay: props.jobObject.pay,
      slug: props.jobObject.slug,
      statusId: props.jobObject.statusId,
      techCompanyId: props.jobObject.techCompany.id,
      skills: [props.jobObject.skills[0].name],
    },
    miscInfo: {
      companyName: props.jobObject.techCompany.name,
    },
  };

  let deleteJob = () => {
    jobPayload.statusId = 0;
    props.deleteAJob(jobPayload.editInfo);
  };

  let pushToEdit = () => {
    props.pushJobCardToEdit(jobPayload);
  };

  let cardShowModal = () => {
    props.showModal(jobPayload);
  };

  return (
    <React.Fragment>
      <img
        className="card-img-top"
        alt="Card cap"
        src="https://i.pinimg.com/originals/fc/d9/25/fcd9257396017f669993c163c81958bf.jpg"
      />
      <div className="card-body">
        <h4 className="card-title text-primary">{props.jobObject.pay}</h4>
        <h5 className="card-title">{props.jobObject.title}</h5>
        <h6>
          <FontAwesomeIcon icon={faBuilding} className="text-primary mr-2" />
          {props.jobObject.techCompany.name}
        </h6>
        <p className="card-text">{props.jobObject.summary}</p>

        <button
          className="btn btn-sm btn-link text-danger p-0"
          name={props.jobObject.id}
          onClick={deleteJob}
        >
          Delete
        </button>
        <button
          className="btn btn-sm btn-secondary ml-3"
          style={{ width: "70px" }}
          onClick={pushToEdit}
        >
          Edit
        </button>

        <button
          className="btn btn-primary btn-sm float-right"
          style={{ width: "100px", height: "40px" }}
          onClick={cardShowModal}
        >
          View
        </button>
      </div>
    </React.Fragment>
  );
};

export default JobCard;
