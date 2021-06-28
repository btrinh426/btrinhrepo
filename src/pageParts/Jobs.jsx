import React from "react";
import SingleJob from "./SingleJob";
import * as jobServices from "../services/jobServices";

class Jobs extends React.Component {
  state = {
    jobs: [],
  };
  componentDidMount() {
    console.log("Jobs mounted");

    this.loadJobs();
  }

  loadJobs = () => {
    let index = "?pageIndex=0";
    let pageSize = "&pageSize=10";

    jobServices
      .getAllJobs(index, pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  };
  onGetJobsSuccess = (response) => {
    console.log("Jobs are here");
    console.log(response.data.item.pagedItems);
    let myJobs = response.data.item.pagedItems;

    this.setState((prevState) => {
      return {
        prevState,
        jobs: myJobs.map(this.mapJobs),
      };
    });
  };

  onGetJobsError = (errResponse) => {
    console.log("no jobs");
  };

  mapJobs = (job) => {
    return (
      <React.Fragment key={job.id}>
        <SingleJob
          oneJob={job}
          onEditClick={this.onEditClick}
          //   onClick={this.onFriendDeleteClick}
          //   onEditClick={this.onEditClick}
          //   onUpdate={this.onClearSearch}
        ></SingleJob>
      </React.Fragment>
    );
  };

  onAddJobClick = (e) => {
    console.log("in add job click");
    this.props.history.push("/jobs/add");
  };
  onEditClick = (job) => {
    this.props.history.push("/jobs/edit" + job.id, job);
  };

  render() {
    return (
      <React.Fragment>
        <div className="bg-blk-box">
          <h1>JobsJobsJobs</h1>
          <form className="container d-flex">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.onAddJobClick}
            >
              +Job
            </button>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                id="jobSearch"
                placeholder="Search here"
              />
            </div>
            <button
              type="button"
              name="searchJobBtn"
              className="btn btn-secondary search"
            >
              Search Jobs
            </button>
            <button
              type="button"
              name="clearSearchJobBtn"
              className="btn btn-secondary clearSearch"
            >
              Clear Search
            </button>
          </form>
        </div>
        <div className="row pb-5 col-md-12">{this.state.jobs}</div>
      </React.Fragment>
    );
  }
}
export default Jobs;
