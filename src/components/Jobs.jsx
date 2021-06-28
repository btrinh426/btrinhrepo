import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
import Pagination from "rc-pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";

import * as jobService from "../services/jobService";
import JobCard from "./JobCard";

class Jobs extends Component {
  state = {
    jobs: [],
    jobsObjs: [],
    searchString: "",
    isSearchResult: false,
    pagination: {
      currentPage: 1,
      totalJobs: 0,
      pageSize: 5,
    },
  };

  componentDidMount = () => {
    console.log("Jobs component mounted....getting jobs database....");
    this.getJobDatabase(0, 100); // For the first call to the job database try to get the first 100 jobs
    jobService.getJobs(0, 50).then(this.onGetJobDatabaseSuccess).catch(this.onGetJobDatabaseError);
  };

  // componentDidUpdate = () => {
  //   if (this.state.pagination.totalJobs === 0) {
  //     this.getJobDatabase(0, 100);
  //   }
  // };

  clickAddJobButton = (e) => {
    e.preventDefault();
    console.log("Click Add Job button....");
    this.props.history.push("/jobs/new");
  };

  clickShowHideJobs = (e) => {
    console.log("Clicked Show/Hide Jobs button.");
    if (e.currentTarget.innerText.indexOf("Show") !== -1) {
      document.getElementById("mainTitle").innerText = "Jobs";
      e.currentTarget.innerText = "Hide Active Jobs";
      document.getElementById("searchJobsInput").value = "";
      document.getElementById("displayJobCards").classList.remove("d-none");
      this.props.history.push("/jobs");
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.isSearchResult = false;
        newState.searchString = "";
        newState.pagination.currentPage = 1;
        return newState;
      }, this.updateJobsView);
    } else {
      e.currentTarget.innerText = "Show Active Jobs";
      document.getElementById("displayJobCards").classList.add("d-none");
    }
  };

  getJobDatabase = (pageIndex = 0, pageSize = this.state.pagination.pageSize) => {
    console.log("Running getJobDatabase");
    jobService.getJobs(pageIndex, pageSize).then(this.onGetJobDatabaseSuccess).catch(this.onGetJobDatabaseError);
  };

  onGetJobDatabaseSuccess = (response) => {
    console.log("Success getting jobs from database.");
    this.updateStateWithJobs(response);
  };

  onGetJobDatabaseError = (error) => {
    debugger;
    let errorText = error.response.data.errors.join("\n");
    console.error("Error getting jobs from database:");
    console.error(errorText);
  };

  updateStateWithJobs = (response) => {
    let jobs, jobsObjs;
    console.log("Pagination page size:", this.state.pagination.pageSize);
    if (this.state.pagination.totalJobs === 0) {
      // If this is the first call to get jobs, do not map all the jobs: only the appropriate page size of jobs
      jobs = [...response.data.item.pagedItems].splice(0, this.state.pagination.pageSize);
      jobsObjs = [...response.data.item.pagedItems].splice(0, this.state.pagination.pageSize).map(this.mapSingleJob);
      console.log(jobsObjs);
      console.log(jobs);
    } else {
      jobsObjs = response.data.item.pagedItems.map(this.mapSingleJob);
      jobs = response.data.item.pagedItems;
    }
    this.setState(
      (prevState) => {
        const newState = { ...prevState };
        newState.jobs = jobs;
        newState.jobsObjs = jobsObjs;
        newState.pagination.totalJobs = response.data.item.totalCount;
        return newState;
      },
      () => {
        console.log("Finished setting job array in state.");
      }
    );
  };

  mapSingleJob = (aJob) => {
    // This function takes a job from the job array and returns a formatted react element for that job to be used in the rendering of the page
    // console.log(`Map job:  ${job.headline}`);
    // debugger;
    return (
      <div
        className={aJob.statusId !== "Active" ? " cardparent notInDatabase" : "cardParent"}
        key={aJob.id.toString()}
        id={aJob.id}
      >
        <JobCard job={aJob} clickEdit={this.clickJobCardEditButton} clickDelete={this.clickJobCardDeleteButton} />
      </div>
    );
  };

  clickJobCardEditButton = (jobId) => {
    console.log("Click Add Job button....");
    console.log(`Edit job, ID#: ${jobId}`);
    const targetURL = `../jobs/${jobId}/edit`;
    let jobInfo = this.state.jobs.find((job) => job.id === jobId);
    this.props.history.push(targetURL, { jobInfo });
    document.getElementById("getJobs").innerText = "Show Active Jobs";
  };

  // clickJobCardDeleteButton = (jobId) => {
  //   Swal.fire({
  //     title: "Are you sure you want to delete your job?",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     confirmButtonText: `Delete`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       console.log("Delete selected....");
  //       jobService.deleteJob(jobId).then(this.onDeleteJobSuccess).catch(this.onDeleteJobError);
  //     }
  //   });
  // };

  // onDeleteJobSuccess = (response) => {
  //   const jobId = this.searchTextFromAxiosResponse(response);
  //   toast.success("Job deleted.");
  //   console.log(`Deleted job, ID# ${jobId}`);
  //   this.getJobDatabase(this.state.pagination.currentPage - 1, this.state.pagination.pageSize);
  // };

  // onDeleteJobError = (error) => {
  //   debugger;
  //   toast.error("Could not delete job.");
  //   console.error(error);
  // };

  searchTextFromAxiosResponse = (response) => {
    let url = response.config.url;
    if (url.indexOf("=") === -1) {
      url = url.split("/");
    } else {
      url = url.split("=");
    }
    return url[url.length - 1];
  };

  clickSearchJobsButton = (e) => {
    if (e) {
      e.preventDefault();
    }
    const searchString = document.getElementById("searchJobsInput").value;
    const notWhiteSpace = /\S\w*/;
    if (!searchString.match(notWhiteSpace)) {
      toast.error(`Invalid search string.`);
      return;
    }
    console.log(`Clicked Search Jobs button: ${searchString}`);

    // const numsOnlyRegexp = /^[0-9]+$/;
    // if (searchString.match(numsOnlyRegexp)) {
    //   console.log("Numbers only -> search for job by ID.");
    //   jobService
    //     .getJobById(searchString)
    //     .then(this.onSearchJobByIdSuccess)
    //     .catch(this.onSearchJobByIdError);
    // } else {
    //   console.log("Not numbers only search -> search job database....");
    //   jobService
    //     .searchJobs(searchString, 0, 50)
    //     .then(this.onSearchJobsSuccess)
    //     .catch(this.onSearchJobsError);
    // }
    jobService
      .searchJobs(searchString, 0, this.state.pagination.pageSize)
      .then(this.onSearchJobsSuccess)
      .catch(this.onSearchJobsError);
  };

  // onSearchJobByIdSuccess = (response) => {
  //   let job = response.data.item;
  //   console.log("Success getting job from database.");
  //   console.log(`Job ID: ${job.id}`);
  //   console.log("Response data:");
  //   console.log(job);
  //   const JobDiv = () => (
  //     <div>
  //       <p>Job(s) found:</p>
  //       <div>{job.title}</div>
  //     </div>
  //   );
  //   toast.success(<JobDiv />, { autoClose: 10000 });

  //   this.updateStateWithJobs(response);
  // };

  // onSearchJobByIdError = (error) => {
  //   debugger;
  //   let errorText = error.response.data.errors[0];
  //   const searchId = this.searchTextFromAxiosResponse(error);
  //   console.error(`Error finding job by ID: ${searchId}`);
  //   toast.error(`No jobs found with ID: ${searchId}`);
  //   console.error(errorText);
  // };

  onSearchJobsSuccess = (response) => {
    document.getElementById("mainTitle").innerText = "Search Results";
    if (!this.state.isSearchResult || this.state.searchString !== document.getElementById("searchJobsInput").value) {
      // This was the first search result
      document.getElementById("getJobs").innerText = "Show Active Jobs";
      document.getElementById("displayJobCards").classList.remove("d-none");

      console.log("Success searching for job.");
      console.log("Response data:");
      console.log(response.data.item.pagedItems);
      const totalCount = response.data.item.totalCount;
      const totalPages = response.data.item.totalPages;
      const jobs = [...response.data.item.pagedItems];
      const jobsObjs = [...response.data.item.pagedItems]
        .splice(0, this.state.pagination.pageSize)
        .map(this.mapSingleJob);
      const JobDiv = () => (
        <React.Fragment>
          <div>
            <p>Found {totalCount} jobs.</p>
          </div>
          <div>
            <p>Showing page 1 of {totalPages}.</p>
          </div>
        </React.Fragment>
      );
      toast.success(<JobDiv />, { autoClose: 5000 });

      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.jobs = jobs;
        newState.jobsObjs = jobsObjs;
        newState.pagination.currentPage = 1;
        newState.pagination.totalJobs = totalCount;
        newState.searchString = document.getElementById("searchJobsInput").value;
        newState.isSearchResult = true;
        return newState;
      });
    } else {
      const totalCount = response.data.item.totalCount;
      // const totalPages = response.data.item.totalPages;
      const pageIndex = response.data.item.pageIndex;
      const jobs = [...response.data.item.pagedItems];
      const jobsObjs = [...response.data.item.pagedItems]
        .splice(0, this.state.pagination.pageSize)
        .map(this.mapSingleJob);

      // const JobDiv = () => (
      //   <div>
      //     <p>
      //       Showing page {pageIndex + 1} of {totalPages}.
      //     </p>
      //   </div>
      // );
      // toast.success(<JobDiv />, { autoClose: 5000 });
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.jobs = jobs;
        newState.jobsObjs = jobsObjs;
        newState.pagination.currentPage = pageIndex + 1;
        newState.pagination.totalJobs = totalCount;
        return newState;
      });
    }

    document.getElementById("getJobs").innerText = "Show Active Jobs";
  };

  onSearchJobsError = (error) => {
    const errorText = error.response.data.errors[0];
    const searchString = this.searchTextFromAxiosResponse(error);
    console.error(`Error searching jobs by string: ${searchString}`);
    toast.error(`No jobs found with string: "${searchString}"`);
    console.error(errorText);
  };

  changePage = (page) => {
    this.setState((prevState) => {
      console.log("Change page to", page);
      const newState = { ...prevState };
      newState.pagination.currentPage = page;
      return newState;
    }, this.updateJobsView);
  };

  updateJobsView = () => {
    if (this.state.isSearchResult) {
      jobService
        .searchJobs(this.state.searchString, this.state.pagination.currentPage - 1, this.state.pagination.pageSize)
        .then(this.onSearchJobsSuccess)
        .catch(this.onSearchJobsError);
    } else {
      // this.getJobDatabase(this.state.pagination.currentPage - 1, this.state.pagination.pageSize);
    }
  };

  onSearchFieldKeyPress = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      // User hit Enter...start job search
      this.clickSearchJobsButton();
    }
  };

  render() {
    console.log("Rendering Jobs.jsx");

    // Format job button:
    let jobShowHideButton;
    if (this.state.jobs.length === 0) {
      jobShowHideButton = (
        <Button
          className="col-1 mb-1 ml-0 mt-0 mr-3"
          id="getJobs"
          color="success"
          style={{ minWidth: "170px", height: "fit-content" }}
          onClick={this.clickShowHideJobs}
        >
          Show Active Jobs
        </Button>
      );
    } else {
      jobShowHideButton = (
        <Button
          className="col-1 mb-1 ml-0 mt-0 mr-3"
          id="getJobs"
          color="success"
          style={{ minWidth: "170px", height: "fit-content" }}
          onClick={this.clickShowHideJobs}
        >
          Hide Active Jobs
        </Button>
      );
    }

    return (
      <div className="col pl-3 mr-3">
        <div className="row m-0 pl-0 pt-2 pb-2 pr-2">
          <h3 className="col pl-0" id="mainTitle">
            Jobs
          </h3>
        </div>
        <div
          className="container row border border-secondary rounded mb-0 mr-3 ml-0 pl-3 pt-3 pr-3 pb-0 "
          id="mainView"
          style={{ backgroundColor: "rgb(210, 217, 235)", minWidth: "600px", maxWidth: "2100px" }}
        >
          <div className="col pl-3 pt-0 pb-0 m-0">
            <div className="row pl-0 pr-3 pt-0 pb-0 mb-3">
              <Button
                className="col-1 btn mb-1 ml-0 mt-0 mr-3"
                id="addJobButton"
                color="primary"
                style={{ minWidth: "200px", height: "fit-content" }}
                onClick={this.clickAddJobButton}
              >
                Add A Job
              </Button>
              {jobShowHideButton}
              <div className="col">
                <div className="row">
                  <Input
                    className="form-control mr-2 mb-1"
                    id="searchJobsInput"
                    type="search"
                    aria-label="Search"
                    style={{ minWidth: "150px", maxWidth: "200px" }}
                    onKeyDown={this.onSearchFieldKeyPress}
                  />
                  <Button
                    color="link mb-1 p-0"
                    id="searchJobsButton"
                    type="submit"
                    onClick={this.clickSearchJobsButton}
                  >
                    <span>
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="row" id="displayJobCards">
              <div className="col">
                <div className="row mb-3">
                  <Pagination
                    total={this.state.pagination.totalJobs}
                    defaultPageSize={this.state.pagination.pageSize}
                    current={this.state.pagination.currentPage}
                    onChange={this.changePage}
                  />
                </div>
                <div className="row">
                  <div className="col nav-item pl-0 pr-3">
                    <div className="row displayJobCards pl-3 pr-3 pb-0 pt-0">{this.state.jobsObjs}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Jobs);
