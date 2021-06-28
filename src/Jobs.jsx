import React, { useState } from "react";
import jobService from "./services/jobService";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SingleJob from "./SingleJob";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import Modal from "react-modal";

class Jobs extends React.Component {
  state = { jobs: [], jobsComponents: [] };
  // const [modalIsOpen, setModalIsOpen] = useState(false)
  showJobs = () => {
    jobService
      .getJobs(0)
      .then(this.onShowJobsSuccess)
      .catch(this.onShowJobsError);
  };
  onShowJobsSuccess = (response) => {
    let newData = response.data.item.pagedItems;
    let totalItem = response.data.item.totalCount;
    let current = response.data.item.pageIndex;
    console.log(response);
    this.setState(() => {
      let newState = {};
      newState.jobs = newData;
      newState.current = current + 1;
      newState.total = totalItem;
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
    this.props.history.push("/jobs/form/jobId=" + job.id, {
      type: "EDIT_JOB",
      payload: { ...job },
    });
  };
  searchAndGetJobFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  };

  searchAndGetJob = () => {
    var data = this.state.searchName;
    var pageIndex = 0;
    if (data) {
      jobService
        .searchJob(data, pageIndex)
        .then(this.onSearchAndGetJobSuccess)
        .catch(this.OnSearchAndGetJobError);
    } else {
      this.showJobs();
    }
  };
  componentDidMount() {
    this.showJobs();
  }
  onSearchAndGetJobSuccess = (response) => {
    console.log(response);
    let newData = response.data.item.pagedItems;
    let totalItem = response.data.item.totalCount;
    this.setState(() => {
      let newState = {};
      newState.jobsComponents = newData.map(this.mapJob);
      newState.total = totalItem;
      return newState;
    });
  };

  OnSearchAndGetJobError = (response) => {
    console.log(response);

    toast.error("No result found");
    this.setState(() => {
      let newState = { jobsComponents: [], total: 0 };

      return newState;
    });
  };

  onChange = (page) => {
    var searchInput = this.state.searchName;

    if (searchInput) {
      this.setState((prevState) => {
        var pageIndex = prevState.current;
        pageIndex = page - 1;
        jobService
          .searchJob(searchInput, pageIndex)
          .then(this.onSearchAndGetJobSuccess)
          .catch(this.OnSearchAndGetJobError);
        return { current: page };
      });
    } else {
      this.setState((prevState) => {
        var pageIndex = prevState.current;
        pageIndex = page - 1;
        jobService
          .getJobs(pageIndex)
          .then(this.onShowJobsSuccess)
          .catch(this.onShowJobsError);
        return { current: page };
      });
    }
  };
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
              onChange={this.searchAndGetJobFieldChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              value={this.state.searchName}
              onClick={this.searchAndGetJob}

              // onChange={this.searchAndGetFriend}
            >
              Search
            </button>
            <div className="col float-right">
              <button
                className="btn btn-outline-success my-2 my-sm-0 "
                style={{ float: "right" }}
                type="button"
              >
                <NavLink to="/new/job" exact>
                  Add Job
                </NavLink>
              </button>
            </div>
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
        <div>
          <Pagination
            onChange={this.onChange}
            current={this.state.current}
            total={this.state.total}
            pageSize={3}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Jobs;
