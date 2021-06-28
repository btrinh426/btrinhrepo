import React from "react";

//THIS FILE NEEDS TO BE EDITTED!!!

function SingleJob(props) {
  const oneJob = props.Job;

  const onEditClick = function () {
    props.edit(oneJob);
  };

  const onDeleteClick = function () {
    props.delete(oneJob);
  };

  return (
    <div className="stock shadow-lg border-0 col-2 mt-4 ml-4">
      <div className="card-body text-center">
        <img
          className="card-img"
          src={oneJob.primaryImage.imageUrl}
          alt="Not found"
        />
        <h5 className="card-title text-center">{oneJob.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted text-center">
          {oneJob.headline}
        </h6>
        <p className="card-text text-center">{oneJob.summary}</p>
        <button
          type="button"
          className="btn btn-danger mr-1"
          onClick={onDeleteClick}
          data-id={oneJob.id}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-info ml-1"
          onClick={onEditClick}
          data-id={oneJob.id}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleJob);
