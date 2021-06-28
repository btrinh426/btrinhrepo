import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { getJobs, searchJobs, deleteJob } from "../services/jobServices.js";
import ShowOneJob from "./ShowOneJob.jsx";
import Swal from "sweetalert2";

// To Do:
//  change path format
//  implement delete button functionality

class ShowJobs extends Component {
  state = {
    searchCondition: "",
    isSearching: false,

    pageIndex: 0,
    pageSize: 2,
    pageCount: 0,
    mappedJobs: [],
  };

  componentDidMount = () => {
    this.getJobsListing(this.state.pageIndex, this.state.pageSize);
  };

  //////////////////////////////// API Calls
  getJobsListing = (pageIdx, pageSize) => {
    getJobs(pageIdx, pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  };

  gotJobs = (response, searchingBool) => {
    let newMappedJobs = response.data.item.pagedItems.map(this.mapForDOM);

    this.setState(() => {
      return {
        mappedJobs: newMappedJobs,
        pageCount: response.data.item.totalPages,
        isSearching: searchingBool,
      };
    });
  };

  onGetJobsSuccess = (response) => {
    this.gotJobs(response, false);
  };

  onGetJobsError = (response) => {};

  // API searches these fields: role, description
  searchJobsListing = (pageIndex, pageSize, searchCondition) => {
    searchJobs(pageIndex, pageSize, searchCondition)
      .then(this.searchJobsSuccess)
      .catch(this.searchJobsError);
  };

  searchJobsSuccess = (response) => {
    this.gotJobs(response, true);
  };

  searchJobsError = (response) => {
    this.setState(() => {
      return {
        mappedJobs: [],
        pageIndex: 0,
      };
    });
  };

  //////////////////////////////// FORM CONTROL
  onAddJob = (e) => {
    e.preventDefault();
    this.props.history.push("/jobs/form");
  };

  onSearch = (e) => {
    e.preventDefault();
    this.searchJobsListing(0, this.state.pageSize, this.state.searchCondition);
  };

  onEdit = (id) => {
    this.props.history.push(`/jobs/form?jobId=${id}`);
  };

  onViewDetails = (id, techId) => {
    this.props.history.push(`jobs/details/${id}/${techId}`);
  };

  // set it's statusId to Deleted (call PUT with id and statusId)
  // on success, remove from this.state.mappedJobs based on id
  onDelete = (id) => {
    deleteJob(id).then(this.deleteJobSuccess).catch(this.deleteJobError);
  };

  getIdOfDeleted = (deleteUrl) => {
    let deleteArray = deleteUrl.split("/");
    return deleteArray[deleteArray.length - 2];
  };

  deleteJobSuccess = (response) => {
    let id = this.getIdOfDeleted(response.config.url);

    this.setState((prevState) => {
      let mappedJobs = [...prevState.mappedJobs];
      var idx = mappedJobs.findIndex((i) => i.key === id.toString());
      if (idx >= 0) {
        mappedJobs.splice(idx, 1);
        return { mappedJobs: mappedJobs };
      }
    });
  };

  deleteJobError = (response) => {
    Swal.fire("Could not delete job");
  };

  // pagination
  handlePageClick = (data) => {
    if (this.state.isSearching) {
      this.searchJobsListing(
        data.selected,
        this.state.pageSize,
        this.state.searchCondition
      );
    } else {
      this.getJobsListing(data.selected, this.state.pageSize);
    }
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
          onViewDetails={this.onViewDetails}
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
        <footer>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageRangeDisplayed={this.pageCount}
            itemClass="page-item"
            linkClass="page-link"
          />
        </footer>
      </React.Fragment>
    );
  };
}

export default withRouter(ShowJobs);
