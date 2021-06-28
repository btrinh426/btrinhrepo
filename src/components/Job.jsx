import React from "react";

function SingleJob(props) {
  const job = props.job;
  const jobInfo = {
    id: job.id,
    title: job.title,
    description: job.description,
    summary: job.summary,
    pay: job.pay,
    slug: job.slug,
    statusId: job.statusId,
    techCompanyId: job.techCompany.id,
    skills: job.skills,
  };

  const onShowRecInfoClick = (e) => {
    props.onShowRecInfoClick(jobInfo);
  };

  return (
    <div className="row-lg-5 col-lg-5 mx-auto mb-2">
      <div className="card">
        <div className="card-body align-items-center text-center">
          <h5 className="card-title">{jobInfo.title}</h5>
          <p className="card-text">{jobInfo.description}</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={onShowRecInfoClick}
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleJob);
