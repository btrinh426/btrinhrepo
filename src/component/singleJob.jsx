import React from "react";

function SingleJob(props) {
  const oneJob = props.job;

  return (
    <div className="job card card-profile text-center">
      {/* <img
        // src={oneJob.techCompany.images.imageUrl}
        className="job card-img-profile mt-5"
        alt="..."
      /> */}
      <div className="card-body">
        <h3 className="card-title">{oneJob.pay}</h3>
        <h5 className="card-title">{oneJob.title}</h5>
        <p className="card-text">{oneJob.summary}</p>
        <p className="card-text">skill required : {oneJob.skills}</p>
      </div>
    </div>
  );
}
export default React.memo(SingleJob);
