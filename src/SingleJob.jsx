import React from "react";

function SingleJob(props) {
  const job = props.aJob;
  function onEditJob() {
    props.onEdit(job);
  }
  function onDeleteJob() {
    props.onDelete(job);
  }
  function ViewMore() {
    props.onView(job);
  }

  return (
    <div className="col-3 pb-5">
      <div className="card">
        <img
          src={job.techCompany.images[0].imageUrl}
          className="card-img-top"
          alt="..."
        ></img>
        <div className="card-body">
          <h6>{job.title}</h6>
          <h4>{job.pay}</h4>
          {job.summary}
        </div>
        <div className="card-footer">
          <button
            className="btn btn-link"
            onClick={onEditJob}
            data-friend-id={job.id}
          >
            Edit
          </button>
          <button
            className="btn btn-link float-right"
            onClick={onDeleteJob}
            data-friend-id={job.id}
          >
            Delete
          </button>
        </div>
        <div className="card-footer text-center">
          <button type="button" onClick={ViewMore} className="btn btn-link">
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleJob;
