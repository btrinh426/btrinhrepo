import React, { Component } from "react";
import {
  getJobs,
  jobSearch,
  jobStatusUpdate,
  updateJob,
} from "../services/jobs";
import { NavLink } from "react-router-dom";
import OneJob from "./OneJob";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class Jobs extends Component {
  state = {
    mappedJobs: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: 0,
    query: "",
  };

  componentDidMount() {
    this.requestJobs();
  }

  requestJobs = () => {
    getJobs(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  };

  onGetJobsSuccess = (response) => {
    let job = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        ...prevState,
        job,
        totalCount: response.data.item.totalCount,
        mappedJobs: job.map(this.mapJob),
      };
    });
    console.log(job);
  };
  onGetJobsError = (response) => console.error(response);

  onChange = (page) => {
    this.setState(() => {
      return { pageIndex: page - 1 };
    }, this.requestJobs);
  };

  onEdit = (job) => {
    this.props.history.push(`/jobform/${job.id}`, {
      type: "job_Obj",
      payload: { job },
    });
  };

  onFormField = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let query = { ...this.state.query };
      query[inputName] = newValue;
      return query;
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    jobSearch(this.state.query)
      .then(this.onJobSearchSuccess)
      .catch(this.onJobSearchError);
  };

  onJobSearchSuccess = (response) => {
    let jobsFiltered = response.data.item.pagedItems;
    console.log(response);
    this.setState((prevState) => {
      return { ...prevState, mappedJobs: jobsFiltered.map(this.mapJob) };
    });
  };
  onJobSearchError = (response) => console.error(response);

  onDeleteJob = (jobId) => {
    jobStatusUpdate(jobId)
      .then(this.onJobStatusUpdateSuccess)
      .catch(this.onJobStatusUpdateError);
  };

  onJobStatusUpdateSuccess = (jobDeleted) => {
    this.setState((prevState) => {
      const indexOfJob = prevState.mappedJobs.findIndex(
        (job) => job.props.job.id === jobDeleted
      );
      console.log(jobDeleted);
      const updatedJobs = [...prevState.mappedJobs];
      if (indexOfJob >= 0) {
        updatedJobs.splice(indexOfJob, 1);
      } //need to work on deleting from the dom...
      return { mappedJobs: updatedJobs };
    });
  };
  onJobStatusUpdateError = (response) => console.error(response);

  mapJob = (job) => {
    return (
      <OneJob
        key={job.id}
        job={job}
        onEditJob={this.onEdit}
        onDelete={this.onDeleteJob}
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark friendNav">
          <div className="container-fluid" />
          <a className="navbar-brand friends" href=" ">
            Jobs
          </a>
          <NavLink to="/jobform">
            <button className="btn btn-outline-success addJob" type="submit">
              +Job
            </button>
          </NavLink>
          <form className="d-flex" />
          <input
            className="form-control me-2 friendSearch"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={this.state.query}
            name="query"
            onChange={this.onFormField}
          />
          <button
            className="btn btn-outline-success search"
            type="submit"
            onClick={this.handleClick}
          >
            Search
          </button>
        </nav>
        <div className="card w-20">{this.state.mappedJobs}</div>
        <Pagination
          pageSize={this.state.pageSize}
          total={this.state.totalCount}
          onChange={this.onChange}
          page={this.state.pageIndex}
        />
      </React.Fragment>
    );
  }
}

export default Jobs;
