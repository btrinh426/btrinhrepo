import React from "react";
import jobService from "./services/jobService";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SingleJob from "./SingleJob";

class Jobs extends React.Component {
  state = { jobs: [], jobsComponents: [] };
  showJobs = () => {
    jobService
      .getJobs(0)
      .then(this.onShowJobsSuccess)
      .catch(this.onShowJobsError);
  };
  onShowJobsSuccess = (response) => {
    let newData = response.data.item.pagedItems;
    let totalItem = response.data.item.totalCount;
    console.log(response);
    this.setState(() => {
      let newState = {};
      newState.jobs = newData;
      //   newState.friends = newData;
      //   newState.total = totalItem;
      newState.jobsComponents = newData.map(this.mapJob);
      return newState;
    });
  };

  onShowJobsError = (response) => {
    console.log(response);
  };
  onDeleteJob = (friend) => {
    jobService
      .deleteJobById(friend.id)
      .then(this.onDeleteJobSuccess)
      .catch(this.onDeleteJobError);
  };

  onDeleteJobSuccess = (response) => {
    console.log(response);
    this.setState((prevState) => {
      const indexOfJob = this.state.jobs.findIndex(
        (ajob) => ajob.id === response
      );

      console.log(indexOfJob);

      const updatedJob = [...prevState.jobsComponents];

      if (indexOfJob >= 0) {
        updatedJob.splice(indexOfJob, 1);
      }
      updatedJob.map(this.mapJob);
      return {
        jobsComponents: updatedJob,
      };
    }, this.stateChanged);
  };

  onDeleteJobError = (response) => {
    console.log(response);
  };

  onEditJob = (job) => {
    this.props.history.push("/jobs/form/jobId=/" + job.id, {
      type: "EDIT_JOB",
      payload: { ...job },
    });
  };
  componentDidMount() {
    this.showJobs();
  }

  mapJob = (oneJob) => {
    return (
      <SingleJob
        key={oneJob.id}
        jobs={oneJob}
        onDelete={this.onDeleteJob}
        onEdit={this.onEditJob}
      ></SingleJob>
    );
  };
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <h1>Jobs</h1>
          <form
            className="form-inline my-2 my-lg-0"
            style={{ padding: "10px" }}
          >
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search Jobs"
              aria-label="Search"
              name="searchName"
              // value={this.state.searchName}
              onChange={this.searchAndGetFriendFieldChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              value={this.state.searchName}
              onClick={this.searchAndGetFriend}

              // onChange={this.searchAndGetFriend}
            >
              Search
            </button>
            {/* <div className="col float-right">
              <button
                className="btn btn-outline-success my-2 my-sm-0 "
                style={{ float: "right" }}
                type="button"
              >
                <NavLink to="/people/new" exact>
                  Add People
                </NavLink>
              </button>
            </div> */}
          </form>
        </div>
        <hr />
        <div className="container">
          <div className="row">{this.state.jobsComponents}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Jobs;
