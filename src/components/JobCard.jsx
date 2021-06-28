import React from "react";
import { Button } from "reactstrap";
import debug from "sabio-debug";
const _logger = debug.extend("JobCard");

const JobCard = (props) => {
  // This function takes a job from the job array and returns a formatted react element for that job to be used in the rendering of the page
  _logger(`Map job:  ${props.job.headline}`);
  // debugger;
  const job = props.job;
  // _logger("Job: ", job.id);
  // _logger("pause here.");
  // debugger;
  // _logger("Job, TechCo: ", job.techCompany.name);
  // _logger("Job, TechCo, image: ", job.techCompany.images[0].imageUrl);

  const viewJob = (e) => {
    e.preventDefault();
    props.clickView(job.id);
  };

  const editJob = (e) => {
    e.preventDefault();
    props.clickEdit(job.id);
  };

  const deleteJob = (e) => {
    e.preventDefault();
    props.clickDelete(job.id);
  };

  return (
    <div
      className="card border-1 mt-0 ml-0 mr-3 mb-3"
      style={{
        width: "15rem",
        height: "25rem",
        borderColor: "#929089",
        backgroundColor: "rgb(100 152 107 / 30%)",
      }}
    >
      <div className="" style={{ textAlign: "center", alignItems: "center" }}>
        <img
          className="job-card-img"
          style={{ height: "150px", width: "100%", objectFit: "contain" }}
          src={
            job.techCompany.images
              ? job.techCompany.images[0].imageUrl
              : "https://i.pinimg.com/originals/67/19/bb/6719bb12bad0d9d9e6588e1299dd9a83.jpg"
          }
          alt="Card cap"
        />
      </div>

      <div className="card-body pt-0" style={{ textAlign: "center", overflow: "hidden" }}>
        <h5 className="card-title">{job.title}</h5>
        <h6 className="card-title">{job.pay}</h6>
        <p className="card-text m-0">{job.summary}</p>
      </div>
      <div className="card-footer text-center p-2">
        <div>
          <Button type="submit" color="success" className=" btn-sm mr-1 viewJob" onClick={viewJob}>
            View More
          </Button>
          <Button type="submit" color="primary" className=" btn-sm mr-1 ml-1 editJob" onClick={editJob}>
            Edit
          </Button>
          <Button type="submit" color="danger" className=" btn-sm ml-1 deleteJob" onClick={deleteJob}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
