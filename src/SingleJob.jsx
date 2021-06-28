import React from "react";

function SingleJob(props) {
  const oneJob = props.jobs;
  function onDeleteJobById() {
    props.onDelete(oneJob);
  }
  function editJobById() {
    props.onEdit(oneJob);
  }
  return (
    <div className="col-sm-3">
      <div className="card">
        <img src={oneJob.slug} className="card-img-top" alt="..." />
        <div className="card-body">
          <h2 className="card-title">{oneJob.pay}</h2>
          <p className="card-text">{oneJob.summary}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{oneJob.description}</li>
          <li className="list-group-item">skills</li>
        </ul>
        <div className="card-body">
          <button
            key={oneJob.id}
            style={{ float: "right" }}
            type="button"
            className="btn btn-danger deleteSchool mt-2"
            name={oneJob.id}
            onClick={onDeleteJobById}
          >
            Delete
          </button>
          <button
            style={{ float: "left" }}
            type="button"
            className="btn btn-danger editSchool mt-2"
            name={oneJob.id}
            onClick={editJobById}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleJob);
