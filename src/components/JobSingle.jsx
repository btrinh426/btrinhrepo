import React from "react";

const renderJob = (props) => {
  let job = props.jobs;
  //console.log(job);

  const onEditJob = () => {
    props.editJob(job);
  };

  // const onDeleteJob = () => {
  //   props.deleteJob(job);
  // };
  let salary = job.pay;
  let formattedSalary = new Intl.NumberFormat("eng-US", {
    style: "currency",
    currency: "USD",
  }).format(salary);

  return (
    <div className="col-4 mt-4">
      <div className="card">
        <img
          src={job.techCompany.images[0].imageUrl}
          className="card-img-top"
          alt={job.techCompany.name}
          style={{ maxWidth: "350px" }}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{formattedSalary}</h5>
          <p className="card-text text-center">{job.summary}</p>
          <div className="col-6 mx-auto">
            {/* <button className="btn btn-danger" onClick={onDeleteJob}>
            Delete Job
          </button> */}
            <button className="btn btn-info btn-block" onClick={onEditJob}>
              Edit Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(renderJob);
