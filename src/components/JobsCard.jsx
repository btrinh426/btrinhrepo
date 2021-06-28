import React from "react";
//import jobsService from "../services/jobsService";

const JobsCard = (props) => {
  const oneJob = props.job;

  const onDeleteJobsClick = (e) => {
    e.preventDefault();
    props.onDeleteJobsClick(oneJob.id, 2);
  };

  const handleEdit = () => {
    props.handleEditClick(oneJob);
  };
  console.log(oneJob);

  return (
    <div className="card" style={{ width: "300px" }}>
      <img
        className="card-img-top"
        src={oneJob?.techCompany?.images?.[0].imageUrl}
        alt="Card cap"
      />
      <div className="card-body">
        <h5 className="card-title">{oneJob.title}</h5>
        <p className="card-text"> {oneJob.techCompany.name}</p>
      </div>
      <div className="card-footer">
        <button
          id="edit"
          className="btn btn-primary edit"
          onClick={handleEdit}
          href="button"
          //className="btn btn-primary"
        >
          Edit
        </button>
        <button
          id="delete"
          className="btn btn-primary delete"
          onClick={onDeleteJobsClick}
          href="button"
          //className="btn btn-primary"
        >
          Delete
        </button>
        <a href="https://www.google.com" className="btn btn-primary">
          View More
        </a>
      </div>
    </div>
  );
};
export default JobsCard;
