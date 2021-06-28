import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { getJobs } from "../services/jobServices.js";
import ShowOneJob from "./ShowOneJob.jsx";

class ShowJobs extends Component {
  state = {
    searchCondition: "",
    pageIndex: 0,
    pageSize: 2,
    mappedJobs: [],
  };

  componentDidMount = () => {
    this.getJobListing();
  };

  //////////////////////////////// API Calls
  getJobListing = () => {
    getJobs(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  };

  onGetJobsSuccess = (response) => {
    console.log(response.data.item.pagedItems);
    let newMappedJobs = response.data.item.pagedItems.map(this.mapForDOM);
    console.log(newMappedJobs);

    this.setState(() => {
      return {
        mappedJobs: newMappedJobs,
      };
    });
  };

  onGetJobsError = (response) => {};

  //////////////////////////////// FORM CONTROL
  onAddJob = (e) => {
    e.preventDefault();
    this.props.history.push("/jobs/form");
  };

  onSearch = (e) => {
    e.preventDefault();
  };

  // "/jobs/form?jobId=:id"
  // "/jobs/:id/edit"
  onEdit = (id) => {
    this.props.history.push(`/jobs/form?jobId=${id}`);
    // this.props.history.push(`/jobs/${id}/edit`);
  };

  onFormFieldChange = (e) => {
    e.preventDefault();
    e.persist();

    this.setState(() => {
      let newState = {};
      newState[e.target.name] = e.target.value;
      return newState;
    });
  };

  /////////////////////////////////// RENDER
  mapForDOM = (job) => {
    return (
      <div className="card col-md-3" key={job.id}>
        <ShowOneJob
          job={job}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
        ></ShowOneJob>
      </div>
    );
  };

  render = () => {
    return (
      <React.Fragment>
        <nav className="navbar">
          <form className="form-inline">
            <span>Jobs</span>
            <button
              style={{ color: "blue" }}
              className="btn btn-primary my-2 my-sm-0 ml-3"
              onClick={this.onAddJob}
            >
              Jobs+
            </button>
          </form>
          <form className="form-inline">
            <input
              id="search"
              className="edit-control"
              type="text"
              name="searchCondition"
              onChange={this.onFormFieldChange}
              value={this.state.searchCondition}
              placeholder="Search"
            />
            <button
              style={{ color: "blue" }}
              className="btn btn-primary my-2 my-sm-0 ml-3"
              onClick={this.onSearch}
            >
              Search
            </button>
          </form>
        </nav>
        <div className="col-md-12 p-5">
          <div className="row">{this.state.mappedJobs}</div>
          <hr />
        </div>
      </React.Fragment>
    );
  };
}

export default withRouter(ShowJobs);
