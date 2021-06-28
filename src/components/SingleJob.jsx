import React from "react";

function SingleJob(props) {
  const jobProps = { ...props };

  return (
    <div>
      <h5 className="card-title">{jobProps.job.title}</h5>

      {/* <div className="card-friends col-md-3">
        <img
          className="card-img-top"
          src={jobProps.job.techCompany.images[0].imageUrl}
          alt="Work Location"
        />
        <div className="card-body">
        <h2 className="card-salary">{jobProps.job.pay}</h2> 
          <h5 className="card-title">{jobProps.title}</h5>
          <p className="card-text">{jobProps.job.techCompany.contactInformation.data}</p>
          <p className="skills">{jobProps.job.skills[0].name}</p>
        </div>
      </div> */}
    </div>
  );
}

export default React.memo(SingleJob);
