import React from "react";
import JobSearch from "../../components/JobsSearch";
import SingleJob from "../../components/JobSingle";
import * as jobsService from "../../services/jobsService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
//import { toast } from "react-toastify";

class Jobs extends React.Component {
  state = { mappedJobs: [], pageIndex: 0 };

  componentDidMount() {
    jobsService.allJobs().then(this.allJobsSuccess).catch(this.allJobsError);
  }

  allJobsSuccess = (response) => {
    let jobs = response.data.item.pagedItems;
    //console.log(jobs);
    this.setState((prevState) => {
      return { ...prevState, mappedJobs: jobs.map(this.mapJobs) };
    });
  };

  allJobsError = (response) => {
    toast.error("Error fetching jobs, check log", { autoClose: 2000 });
    console.warn(response);
  };

  queryResults = (query) => {
    //handle jobs search results here. call and component props already setup
  };

  mapJobs = (jobs) => {
    return (
      <SingleJob
        key={jobs.id}
        jobs={jobs}
        deleteJob={this.onDeleteJob}
        editJob={this.onEditJob}
      />
    );
  };

  //   onDeleteJob = (response) => {
  //     //call delete request here
  //     console.log(response);
  //   };

  //   onDeleteJobSuccess = (response) => {};

  //   onDeleteJobError = (response) => {};

  onEditJob = (response) => {
    console.log(response);
  };

  render() {
    return (
      <>
        <div className="row m-3 justify-content-center">
          <div className="col-4">
            <h2 className="job-btn mr-5">Jobs</h2>
            <NavLink to="/addjob" className="btn btn-info">
              + Job
            </NavLink>
          </div>
          <div className="col-4">
            <JobSearch query={this.queryResults} />
          </div>
        </div>

        <div className="container">
          <div className="row">{this.state.mappedJobs}</div>
        </div>
      </>
    );
  }
}

export default Jobs;
