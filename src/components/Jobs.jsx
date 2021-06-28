import React from "react";
import { NavLink } from "react-router-dom";
import Pagination from "rc-pagination";
import SingleJob from "./SingleJob";

import { ToastContainer, toast } from "react-toastify";

import * as jobService from "../services/jobService";

import "rc-pagination/assets/index.css";

class Jobs extends React.Component {
  state = {
    isModalOpen: false,
    hasMadeAjax: true,
    arrayOfComp: [],
    search: "",
    currentPage: 1,
    totalJobs: 10,
    pageSize: 12,
  };

  componentDidMount() {
    // friendsService.getFriends(0, 100)
    // .then(onGetFriendsSuccess)
    // .catch(onGetFriendsError);
    jobService
      .getAll(this.state.currentPage - 1, this.state.pageSize)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  }

  onGetAllSuccess = (response) => {
    const jobs = response.data.item.pagedItems;
    const totalJobs = response.data.item.totalCount;

    console.log(jobs);
    this.setState((prevState) => {
      return { mappedJobs: jobs.map(this.mapJob), totalJobs };
    });
  };

  onGetAllError = (errResponse) => {
    console.warn({ error: errResponse.config });
  };

  onEdit = (job) => {
    this.props.history.push(`/jobs/${job.id}/edit`, {
      jobFormData: job,
    });
  };
  mapJob = (oneJob) => {
    // var result = oneFriend.name;
    // return result;

    return (
      <React.Fragment key={`JobId-${oneJob.id}`}>
        <SingleJob
          job={oneJob}
          //   onClick={this.onJobClickFull}
          onEdit={this.onEdit}
        />
      </React.Fragment>
    );
  };

  onSearchFormFieldChanged = (e) => {
    let newValue = e.currentTarget.value;
    this.setState((prevState) => {
      return { ...prevState, search: newValue };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // axios call with this.state
    if (this.state.search === "") {
      jobService
        .getAll(this.state.currentPage - 1, this.state.pageSize)
        .then(this.onGetAllSuccess)
        .catch(this.onGetAllError);
    } else {
      jobService
        .search(
          this.state.currentPage - 1,
          this.state.pageSize,
          this.state.search
        )
        .then(this.onSearchSuccess)
        .catch(this.onSearchError);
    }
  };

  onSearchSuccess = (response) => {
    // const dataPage = response.data.item.pagedItems;

    // console.log(dataPage);

    // this.setState((prevState) => {
    //   return { mappedFriends: dataPage.map(this.mapFriend) };
    // });

    console.log({ jobsFound: response });

    // $("#targetContainer").empty();

    // renderFriends(response);

    this.setState((prevState) => {
      return {
        mappedJobs: response.map(this.mapJob),
        totalJobs: response.length,
      };
    });
  };

  onSearchError(errResponse) {
    console.warn({ error: errResponse.config });
    toast.error("didn't find any matches, try another query", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  onPageChange = (page) => {
    console.log(page);
    this.setState(
      {
        currentPage: page,
      },
      () => this.paginateJobs(this.state.currentPage - 1, this.state.pageSize)
    );
  };

  paginateJobs = (pageIndex, pageSize) => {
    jobService
      .getAll(pageIndex, pageSize)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content container">
          <div id="friends" className="mb-5">
            <div className="example ml-auto mr-auto">
              <div className="row">
                <div className="col"></div>
              </div>
              <br />
            </div>
            <div className="col-md-12 p-5">
              <div className="row">
                <div className="col">
                  <h1>Jobs</h1>
                </div>
                <div className="col">
                  <NavLink style={{ marginLeft: "500px" }} to="/jobs/new">
                    Add
                  </NavLink>
                </div>
              </div>
              <hr />
              {/* Search form */}
              <div className="container row">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                  <i className="fas fa-search" aria-hidden="true"></i>
                  <input
                    type="text"
                    className="form-control"
                    id="searchField"
                    placeholder="Search query"
                    name="search"
                    onChange={this.onSearchFormFieldChanged}
                    value={this.state.search}
                  />
                  <br />
                  <br />
                  {/* <button
                    type="submit"
                    className="btn btn-primary"
                    id="searchFriend"
                  >
                    Search
                  </button> */}
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Search"
                    id="searchJob"
                  />
                </form>
              </div>
              <div style={{ marginLeft: "0px" }} className="row">
                {/* {this.state.presidents.map(this.mapFriend)} */}
                {this.state.mappedJobs}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Pagination
            onChange={this.onPageChange}
            current={this.state.currentPage}
            total={this.state.totalJobs}
            pageSize={this.state.pageSize}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Jobs;
