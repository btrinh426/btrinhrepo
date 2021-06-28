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
    jobServices
      .getAllJobs()
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
          //   onClick={this.onFriendDeleteClick}
          //   onEditClick={this.onEditClick}
          //   onUpdate={this.onClearSearch}
        ></SingleJob>
      </React.Fragment>
    );
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
              onClick={this.onAddJob}
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
          <div className="row pb-5 col-md-12 friend-container">
            {this.state.jobs}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Jobs;
