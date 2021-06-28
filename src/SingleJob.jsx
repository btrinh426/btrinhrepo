import React from "react";

function SingleJob(props) {
  const oneJob = props.job;

  const onJobClickedFull = function () {
    props.delete(oneJob);
  };

  const onJobClicked = function () {
    props.edit(oneJob);
  };

  return (
    <div className="card col-md-3">
      <img
        src="https://via.placeholder.com/150/0000FF/808080C/Ohttps://placeholder.com/"
        style={{ width: 300, height: 300, borderRadius: 400 / 2 }}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{oneJob.pay}</h5>
        <p className="card-text">{oneJob.title}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onJobClicked}
          data-job-id={oneJob.id}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onJobClickedFull}
        >
          Delete
        </button>
        {/* <button type="button" className="btn btn-light" onClick={onJobClicked}>
          View More
        </button> */}
      </div>
    </div>
  );
}

export default React.memo(SingleJob);
