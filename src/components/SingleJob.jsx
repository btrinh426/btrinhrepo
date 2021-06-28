import React from "react";

function SingleJob(props) {
  const oneJob = props.job;

  const onEditClicked = function () {
    props.onEdit(oneJob);
  };

  const onDeleteClicked = function () {
    props.onDelete(oneJob);
  };

  return (
    <div className="card" style={{ margin: 10 }}>
      {/* <img
        className="card-img-top"
        src={oneJob.primaryImage.imageUrl}
        style={{ maxWidth: 400 }}
        alt={`${oneJob.title}'s avatar`}
      /> */}
      <div className="card-body">
        <h5 className="card-title">{oneJob.title}</h5>
        <p className="card-text">{oneJob.summary}</p>
      </div>
      <footer>
        <button
          className="btn btn-warning m-5"
          onClick={onEditClicked}
          data-friend-id={oneJob.id}
        >
          Edit
        </button>
        <button
          className="btn btn-danger m-5"
          onClick={onDeleteClicked}
          data-friend-id={oneJob.id}
        >
          Delete
        </button>
      </footer>
    </div>
  );
}

export default React.memo(SingleJob);
