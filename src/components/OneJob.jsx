import React from "react";

const OneJob = (props) => {
  const oneJob = props.job;

  const handleEdit = (e) => {
    e.preventDefault();
    props.onEditJob(oneJob);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    props.onDelete(oneJob.id);
  };

  return (
    <div className="card w-20">
      <img
        src="https://dodofinance.com/wp-content/uploads/2021/02/register-company-online.png"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body" />
      <h5 className="card-title">{oneJob.pay}</h5>
      <h6 className="card-title">{oneJob.title}</h6>
      <h6 className="card-title">{oneJob.description}</h6>
      <button
        className="btn btn-primary delete"
        onClick={handleDelete}
        data-job-id={oneJob.id}
      >
        Delete
      </button>
      <button className="btn btn-primary edit" onClick={handleEdit}>
        Edit
      </button>
    </div>
  );
};

export default React.memo(OneJob);
