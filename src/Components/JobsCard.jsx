import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

let JobCard = (props) => {
  return (
    <React.Fragment>
      <img
        className="card-img-top"
        alt="Card cap"
        src="https://i.pinimg.com/originals/fc/d9/25/fcd9257396017f669993c163c81958bf.jpg"
      />
      <div className="card-body">
        <h4 className="card-title text-primary">{props.jobObj.pay}</h4>
        <h5 className="card-title">{props.jobObj.title}</h5>
        <h6>
          <FontAwesomeIcon icon={faBuilding} className="text-primary mr-2" />
          {props.jobObj.techCompany.name}
        </h6>
        <p className="card-text">{props.jobObj.summary}</p>

        <button
          className="btn btn-sm btn-link text-danger p-0"
          name={props.jobObj.id}
          id="deleteBtn"
          onClick={props.deleteJob}
        >
          Delete
        </button>
        <NavLink
          to={`/main/jobs/edit/${props.jobObj.id}`}
          className="btn btn-sm btn-secondary ml-3"
          style={{ width: "70px" }}
        >
          Edit
        </NavLink>

        <button
          className="btn btn-primary btn-sm float-right"
          style={{ width: "100px", height: "40px" }}
        >
          View
        </button>
      </div>
    </React.Fragment>
  );
};

export default JobCard;
