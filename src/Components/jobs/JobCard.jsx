import React from "react";
import { toast } from "react-toastify";
import "./job.css";

function JobCard(props) {
  function onEditClicked() {
    props.onEditClicked(props.oneJob);
  }

  const onDeleteClicked = (props) => {
    // props.onDeleteClicked;
  };
  const formatSkills = (skills) => {
    let formattedSkills = [];

    for (let index = 0; index < skills.length; index++) {
      const currentSkill = skills[index];
      formattedSkills.push(currentSkill.name);
    }
    return formattedSkills.join(", ");
  };
  const onViewMoreClicked = () => {
    toast.info(`Modals coming soon to a webpage near you! `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <React.Fragment>
      <div
        data-id={props.oneJob.id}
        className="card"
        style={{
          backgroundColor: "antiquewhite",
          color: "#525252e6",
          boxShadow: "-7px 11px 12px 0px grey",
        }}
      >
        <img
          src={props.oneJob.techCompany.images[0].imageUrl}
          className="card-img-top"
          alt={props.oneJob.techCompany.name}
        />
        <div className="card-body">
          <h2
            className="card-title job-salary"
            style={{
              color: "black",
              fontSize: "2.5em",
              fontFamily: "none",
              textShadow: "-2px 2px 6px black",
            }}
          >
            ${props.oneJob.pay}
          </h2>
          <h4
            className="card-title job-title"
            style={{ color: "black", fontFamily: "serif" }}
          >
            {props.oneJob.title}
          </h4>
          <p
            className="card-text job-contact"
            style={{ color: "black", fontSize: "1em", fontFamily: "none" }}
          >
            {props.oneJob.techCompany.contactInformation.data}
          </p>
          <h6
            className="job-skills"
            style={{
              color: "black",
              border: ".5px solid black",
              fontFamily: "none",
            }}
          >
            <p>Required Skills:</p>
            {formatSkills(props.oneJob.skills)}
          </h6>
          <div className="card-body row" style={{ marginTop: "25px" }}>
            <button
              className="btn btn-outline-primary editButton"
              style={{ color: "black" }}
              onClick={onEditClicked}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger deleteButton"
              style={{ color: "black" }}
              onClick={onDeleteClicked}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-outline-dark modal-button"
              style={{ color: "black" }}
              onClick={onViewMoreClicked}
            >
              View more...
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default JobCard;
