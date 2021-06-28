import React from "react";
import { Link } from "react-router-dom";
import SingleJob from "./singleJob";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as jobService from "../services/jobService";

class Jobs extends React.Component {
  state = { currentPage: 1, searchFriendName: "" };
  componentDidMount() {
    jobService
      .getJoblist(this.state.currentPage)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  onActionSuccess = (response) => {
    console.log(response.data.item.pagedItems);
    this.setState(() => {
      return {
        // mappedJobs: response.data.item.pagedItems.map(this.mapJob),
        totalCount: response.data.item.totalCount,
        jobs: response.data.item.pagedItems,
      };
    });
  };
  onActionError = (errResponse) => {
    console.log(errResponse);
  };

  onSearchFieldChanged = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState({ searchFriendName: newValue });
    console.log(newValue);
  };

  onSearchButtonClicked = (e) => {
    e.preventDefault();
    this.props.history.push(`/jobs?jobsName-${this.state.searchFriendName}`);
    jobService
      .searchJobs(this.state.searchFriendName)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };
  mapJob = (oneJob) => {
    return (
      <React.Fragment key={`jobs-${oneJob.id}`}>
        <SingleJob
          {...this.props}
          job={oneJob}
          //   onclick={this.onEditClicked}
          //   onClick={this.onDeleteClicked}
        ></SingleJob>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <form className="form-inline my-2 my-lg-0">
          <button
            type="button"
            id="searchJobs"
            onClick={this.onSearchButtonClicked}
            className="btn btn-primary m-3"
          >
            SearchJobs
          </button>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Name"
            aria-label="Search"
            onChange={this.onSearchFieldChanged}
            value={this.state.searchFriendName}
          />
        </form>

        <h1 className="friendlist pb-0 pl-3">Job List</h1>
        <hr />
        <div className="container my-5">
          <div className="card-columns">{this.state.mappedJobs}</div>
        </div>
        <Pagination
          className="pagination"
          onChange={this.onChange}
          total={this.state.totalCount}
          pageSize={6}
          style={{
            margin: "auto",
            width: "10%",
            padding: "10px",
            fontsize: "large",
            textalign: "center",
          }}
        />
      </React.Fragment>
    );
  }
}

export default Jobs;
