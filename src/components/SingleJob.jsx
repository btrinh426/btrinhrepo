import React from "react";

function Job(props) {
  const job = props.job;

  let mapCompany = (company) => {
    console.log("mapping co");

    let mappedCo = {
      images: company.images,
    };
    return mappedCo;
  };

  const company = job.techCompany;
  console.log(company);

  return (
    <div className="card" style={{ width: "14rem" }} key={`Job-${job.id}`}>
      {/* <img src={images[0]} className="card-img-top" alt="" /> */}
      <div className="card-body">
        <h2 className="card-title">{job.pay}</h2>
        <h5 className="card-title">{job.title}</h5>
      </div>
    </div>
  );
}

export default React.memo(Job);
