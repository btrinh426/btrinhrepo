import React from "react";
// import ReactDOM from "react-dom";
import AJob from "./AJob";
import * as jobService from "../../../services/jobService";
import Pagination from "rc-pagination";
import { toast } from "react-toastify";
import JobModal from "./JobModal";

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1, // PAGINATION
      pageSize: 6, // PAGINATION
      totalCount: 0, // PAGINATION

      jobList: [],
      mappedJobList: [],

      isSearching: false,
      searchFormData: {
        searchValue: "",
      },
      searchMsg: "Nothing Found",
      show: false,
    };
  }
  //  ---------------------- INITIALIZATION -------------------------

  componentDidMount() {
    console.log("... JobsForm > componentDidMount firing ...");
    this.getJobs(this.state.current);
  }

  //  ---------------------- USER INTERACTION -------------------------

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let searchFormData = { ...this.state.searchFormData };
      searchFormData[inputName] = newValue;

      return { searchFormData };
    });
  };

  onPageChange = (page) => {
    console.log("Getting this page: ", page);

    if (this.state.isSearching) {
      this.searchJobs(page);
    } else {
      this.getJobs(page);
    }

    this.setState((prevState) => {
      return { ...prevState, current: page };
    });
  };

  onAddClicked = () => {
    // console.log("... Jobs > onAddClicked firing ...");
    this.props.history.push("/jobs/add");
  };

  onSearchClicked = () => {
    console.log(
      "... Jobs > onSearchClicked firing ... current: ",
      this.state.current
    );

    if (!this.state.isSearching) {
      this.setState((prevState) => {
        return { ...prevState, isSearching: true };
      });
    }
    this.searchJobs(1); // start at the beginning page
  };

  onCancelClicked = (e) => {
    console.log("... Jobs > onSearchClicked firing ...");

    this.setState((prevState) => {
      const searchFormData = prevState.searchFormData;
      searchFormData.searchValue = "";
      return { ...prevState, current: 1, isSearching: false, searchFormData };
    });

    this.getJobs(1); // start at the beginning
  };

  handleEdit = (oneJob) => {
    const jobId = oneJob.id;
    console.log("... Jobs > handleEdit firing ...", jobId);
    this.props.history.push(`/jobs/${jobId}/edit`, oneJob);
  };

  handleDelete = (oneJob) => {
    console.log("... Jobs > handleDelete firing ...", oneJob);
    this.deleteJob(oneJob.id);
  };

  //  ---------------------- JOB DELETE -------------------------

  deleteJob = (jobId) => {
    console.log("... Jobs > deleteJob firing ...", jobId);

    jobService
      .setStatus(jobId, jobService.status.deleted)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };
  onDeleteSuccess = (jobId) => {
    console.log("... Jobs > onDeleteSuccess firing ...", jobId);
    toast.success("Job deleted " + jobId);
    this.removeJob(jobId);
  };
  onDeleteError = (err) => {
    console.error("... Jobs > onDeleteError firing ...", err);
    toast.error("An error occurred trying to delete this job");
  };

  removeJob = (jobId) => {
    console.log("... Jobs > removeJob firing ...", jobId);
    this.setState((prevState) => {
      // console.log({ prevState });

      const indexOfJob = this.state.jobList.findIndex(
        (aJob) => parseInt(aJob.id) === parseInt(jobId)
      );
      const updatedJobList = [...this.state.jobList];

      if (indexOfJob >= 0) {
        updatedJobList.splice(indexOfJob, 1);
      }
      // debugger;
      return {
        ...prevState,
        jobList: updatedJobList,
        mappedJobList: updatedJobList.map(this.mapJob),
      };
    }, this.stateChanged);

    // console.log(this.state);
  };

  //  ---------------------- GET JOBS LIST AND RENDER -------------------------

  getJobs = (newPage) => {
    console.log("... Jobs > onGetTechCoSuccess firing ...");

    jobService
      .getByPage(newPage - 1, this.state.pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  };

  onGetJobsSuccess = (data) => {
    console.log("... Jobs > onGetJobsSuccess firing ...");
    // store and map jobs
    this.renderJobs(data.item.pagedItems, data.item.totalCount);
  };
  onGetJobsError = (err) => {
    console.error("... Jobs > onGetJobsError firing ...", err);
    toast.error("Failed to load required items");
  };

  renderJobs = (jobList, totalCount) => {
    console.log("... Jobs > renderJobs firing ...", jobList);
    this.setState((prevState) => {
      return {
        ...prevState,
        jobList,
        mappedJobList: jobList.map(this.mapJob),
        totalCount,
      };
    });
  };

  //  ---------------------- SEARCH JOBS LIST AND RENDER -------------------------

  searchJobs = (page) => {
    console.log("... Jobs > searchJobs firing ... page: ", page);

    jobService
      .search(
        page - 1,
        this.state.pageSize,
        this.state.searchFormData.searchValue
      )
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onSearchSuccess = (data) => {
    console.log("... Friends > onSearchSuccess firing ...", data);

    const isFound = true;
    const pageObject = data.item;
    this.displaySearchResults(isFound, pageObject);
  };
  onSearchError = (err) => {
    console.error("... Friends > onSearchError firing ...", err);

    if (err.response && err.response.status) {
      const status = err.response.status;
      if (status === 404) {
        const statusText = err.response.statusText;
        const errorResult = { status, statusText };
        this.displaySearchResults(false, errorResult);
      } else {
        toast.error("You search request did not process correctly");
      }
    }
  };

  displaySearchResults = (isFound, pagedData) => {
    console.log(
      "... Jobs > displaySearchResults firing ...",
      pagedData,
      isFound
    );
    const searchValue = this.state.searchValue;
    let totalCount = 0;

    let searchMsg = `Displaying results for: "${searchValue}" `;
    let jobList = []; // clear the list

    if (!isFound) {
      searchMsg = searchMsg + " No results found. ";
    } else {
      jobList = pagedData.pagedItems;
      totalCount = pagedData.totalCount;

      searchMsg = searchMsg + ` ${totalCount} results found.`;
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        searchMsg,
        totalCount,

        mappedJobList: jobList.map(this.mapJob),
      };
    });
  };

  //  ---------------------- RENDERING HELPERS -------------------------

  getCompanyGraphic = (techCo) => {
    let coImageUrl = "https://www.snowman.academy/fishingBoat1.jpg";

    if (
      techCo.images &&
      techCo.images.length >= 0 &&
      techCo.images[0].imageUrl
    ) {
      coImageUrl = techCo.images[0].imageUrl;
    }
    return coImageUrl;
  };

  formatPayString = (inputVal) => {
    // XXX if needed, not used currently
    return inputVal;
  };

  convertSkillsToOneString = (skills) => {
    let result = "";

    for (let index = 0; index < skills.length; index++) {
      const currentSkill = skills[index].name;
      result += currentSkill + ", ";
    }
    result = result.slice(0, -2);
    return result;
  };

  mapJob = (singleJob) => {
    singleJob.coImageUrl = this.getCompanyGraphic(singleJob.techCompany);
    // console.log("... Jobs > mapJob firing ...", singleJob);
    singleJob.skillsStrg = this.convertSkillsToOneString(singleJob.skills);

    return (
      <AJob
        key={`job_${singleJob.id}`}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        oneJob={singleJob}
      />
    );
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  viewModal = () => {
    return <JobModal></JobModal>;
  };

  //  ---------------------- RENDERING MAJOR DOM ELEMENT -------------------------

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* ------------------------------ row */}
              <div className="row">
                <div className="col-2">Jobs</div>
                {/* ------------ add ------------------ col */}
                <div className="col-4">
                  <button
                    className="btn btn-secondary btn-sm ml-2 mb-1"
                    onClick={this.onAddClicked}
                  >
                    Add
                  </button>
                </div>
                {/* ----------- search ------------------- col */}
                <div className="col-6 float-right">
                  <form id="formFrndSearch" className="form-inline">
                    <label className="px-3" htmlFor="inputFrndSearch">
                      Search
                    </label>
                    <input
                      type="input"
                      className="form-control"
                      id="inputFrndSearch"
                      name="searchValue"
                      value={this.state.searchFormData.searchValue}
                      onChange={this.onFormFieldChanged}
                      placeholder="Search Job Titles"
                    />
                    <button
                      type="button"
                      className="btn btn-dark"
                      id="btnFrndSearch"
                      onClick={this.onSearchClicked}
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      id="btnFrndSearchClose"
                      onClick={this.onCancelClicked}
                      hidden={!this.state.isSearching}
                    >
                      X
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------- pagination -------------- row */}
          <div className="row mb-2">
            <div className="col-12 mt-3">
              <Pagination
                pageSize={this.state.pageSize}
                onChange={this.onPageChange}
                current={this.state.current}
                total={this.state.totalCount}
              />
            </div>
          </div>
        </div>
        <div className="container">
          {/* MAPPED JOBS HERE */}
          {this.state.mappedJobList}
        </div>
      </>
    );
  }
}

// const container = document.createElement("div");
// document.body.appendChild(container);
// ReactDOM.render(<Apps />, container);

export default Jobs;
