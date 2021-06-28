import React from "react";
import { Button } from "reactstrap";

const JobCard = (props) => {
  // This function takes a job from the job array and returns a formatted react element for that job to be used in the rendering of the page
  // console.log(`Map job:  ${job.headline}`);
  // debugger;
  const job = props.job;
  console.log(job);

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
        height: "20rem",
        borderColor: "#929089",
        backgroundColor: "rgb(100 152 107 / 30%) !important",
      }}
    >
      <div className="" style={{ textAlign: "center", alignItems: "center" }}>
        <img
          className="job-card-img"
          style={{ height: "150px", width: "235px", objectFit: "contain" }}
          src={
            job.techCompany.images[0].imageUrl ||
            "https://i.pinimg.com/originals/67/19/bb/6719bb12bad0d9d9e6588e1299dd9a83.jpg"
          }
          alt="Card image cap"
        />
      </div>

      <div className="card-body pt-0" style={{ textAlign: "center" }}>
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text m-0">{job.summary}</p>
      </div>
      <div className="card-footer text-center p-2">
        <div>
          <Button type="submit" color="success" className=" btn-sm mr-1 viewJob">
            View More
          </Button>
          <Button type="submit" color="primary" className=" btn-sm mr-1 ml-1 editJob">
            Edit
          </Button>
          <Button type="submit" color="danger" className=" btn-sm ml-1 deleteJob">
            Delete
          </Button>
        </div>
      </div>
    </div>

    // <div
    //   className="card border-1 mt-0 ml-0 mr-3 mb-3"
    //   style={{
    //     width: "15rem",
    //     height: "30rem",
    //     borderColor: "#929089",
    //     backgroundColor: "rgb(100 152 107 / 30%) !important",
    //   }}
    // >
    //   <div className="" style={{ textAlign: "center", alignItems: "center" }}>
    //     <img
    //       className="job-card-img"
    //       style={{ maxHeight: "235px", width: "235px", objectFit: "cover" }}
    //       src={job.primaryImage ? job.primaryImage.imageUrl : this.defaultJobImage}
    //       alt="Card cap"
    //     />
    //   </div>

    //   <div className="card-body" style={{ textAlign: "center" }}>
    //     <h5 className="jobTitle">{job.title}</h5>
    //     <p className="card-text m-0">{job.summary}</p>
    //   </div>
    //   <div className="card-footer text-center">
    //     <div>
    //       <Button type="submit" color="primary" className="btn-sm editJob mr-3" onClick={editJob}>
    //         Edit
    //       </Button>
    //       <Button type="submit" color="danger" className="btn-danger btn-sm deleteJob" onClick={deleteJob}>
    //         Delete
    //       </Button>
    //     </div>
    //   </div>
    // </div>
    // </div>
  );
};

export default JobCard;
