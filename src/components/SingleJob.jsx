import React from "react";

function SingleJob(props) {
  const oneJob = props.job;

  const onClickEdit = () => {
    props.onEdit(oneJob);
  };

  return (
    <div className="card col-md-3">
      <div className="card-body">
        <h5 className="card-title">{oneJob.title}</h5>
        <p className="card-text">
          <strong>{oneJob.summary}</strong>
        </p>
        <button
          className="nav-link link-button"
          // onClick={this.onJobClick}
          // onClick={() => this.onJobClickFull(oneJob)}
          // best way to call function for on click
          //   onClick={onJobClickFull}
          onClick={onClickEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleJob);
