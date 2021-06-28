import React from "react";
import debug from "sabio-debug";
const _logger = debug.extend("App");

const SingleJob = (props) => {
  // _logger("SingleJob logging: ", props);
  const job = props.job;

  const onEditClick = () => {
    _logger("SingleJob EditClicked.");
    props.editClick(job);
  };

  const onDeleteClick = () => {
    props.deleteClick(job);
  };

  const onViewMoreClick = () => {
    props.viewMoreClick(job);
  };
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card shadow">
        <img
          src={job.techCompany.images[0].imageUrl}
          className="card-img-top item thePhoto"
          alt="job."
        />
        <div className="card-body text-center">
          <h3 className="card-title mb-0 item text-primary">
            $
            <span className="text-primary mb-0 item card-title job-pay">
              {job.pay}
            </span>
          </h3>
          <h5 className="card-titlemr-1 ml-1 mt-1 mb-1 item">{job.title}</h5>
          <div className="card-text text-black-50">{job.skills[0].name}</div>
          <button
            type="button"
            className="btn btn-primary mr-1 ml-1 mt-1 mb-1"
            onClick={onEditClick}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-primary mr-1 ml-1 mt-1 mb-1"
            onClick={onDeleteClick}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-primary mr-1 ml-1 mt-1 mb-1"
            id="exampleModal"
            onClick={onViewMoreClick}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
