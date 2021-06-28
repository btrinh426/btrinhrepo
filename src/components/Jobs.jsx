import React from "react";
import {
  getJobs,
  getJobsPaginate,
  deleteJob,
  searchJobs,
  searchJobsPaginate,
} from "../services/jobsService";
import debug from "sabio-debug";
import { NavLink } from "react-router-dom";
import Pagination from "rc-pagination";
import SingleJob from "./SingleJob";
import ModalSearch from "./ModalSearch";
import { toast } from "react-toastify";
const _logger = debug.extend("App");

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mappedJobs: [],
      pageIndex: 0,
      pageSize: 0,
      totalCount: 0,
      totalPages: 0,
      isOpen: false,
      viewMoreOpen: false,
      searchTerm: "",
      mappedSearchJobs: [],
      searchIndex: "",
      searchSize: "",
      searchCount: "",
      searchPages: "",
      viewMoreTitle: "",
      viewMoreDescription: "",
      viewMoreId: "",
      viewMorePay: "",
      //viewMoreSkills: "",
      viewMoreSlug: "",
      viewMoreSummary: "",
      viewMoreTechCompany: "",
    };
  }
  componentDidMount() {
    getJobs().then(this.onGetJobsSuccess).catch(this.onGetJobsError);
  }
  onGetJobsSuccess = (response) => {
    _logger("Get Jobs Successfully Fired: ", response);
    let jobs = response.data.item.pagedItems;
    this.setState((preState) => {
      return {
        mappedJobs: jobs.map(this.mapJob),
        pageIndex: response.data.item.pageIndex,
        pageSize: response.data.item.pageSize,
        totalCount: response.data.item.totalCount,
        totalPages: response.data.item.totalPages,
      };
    });
  };
  onGetJobsError = (err) => _logger("failed to get jobs: ", err);

  mapJob = (job) => {
    // _logger("mapJob occuring:", job);
    return (
      <SingleJob
        key={job.id}
        job={job}
        deleteClick={this.onDelete}
        editClick={this.onEdit}
        viewMoreClick={this.viewMoreToggle}
      ></SingleJob>
    );
  };
  onDelete = (aJob) => {
    _logger("Delete button clicked!ID TO DELETE: ", aJob.id);
    deleteJob(aJob.id)
      .then(this.onDeleteJobSuccess)
      .catch(this.onDeleteJobError);
  };
  onDeleteJobSuccess = (deletedId) => {
    _logger("deletedID: ", deletedId);

    this.setState((preState) => {
      const indexOfJob = preState.mappedJobs.findIndex(
        (aJob) => aJob.props.job.id === deletedId
      );
      const updatedJobs = [...preState.mappedJobs];
      if (indexOfJob >= 0) {
        updatedJobs.splice(indexOfJob, 1);
      }

      const indexOfSearchJob = preState.mappedSearchJobs.findIndex(
        (aJob) => aJob.props.job.id === deletedId
      );
      const updatedSearchJobs = [...preState.mappedSearchJobs];
      if (indexOfSearchJob >= 0) {
        updatedSearchJobs.splice(indexOfSearchJob, 1);
      }
      return { mappedJobs: updatedJobs, mappedSearchJobs: updatedSearchJobs };
    }, this.stateChanged);
  };
  onDeleteJobError = (error) => _logger("Delete job failed", error);
  onEdit = (aJob) => {
    _logger("moving over to create/update with->", aJob);
    this.props.history.push(`/jobs/${aJob.id}`, {
      type: "JOB_TO_UPDATE",
      payload: aJob,
    });
  };

  onChange = (page) => {
    _logger("Page is: ", page);
    this.setState(
      (preState) => {
        let newState = { ...preState };
        newState.current = page;
        return newState;
      },
      () =>
        getJobsPaginate(page - 1)
          .then(this.onGetJobsSuccess)
          .catch(this.onGetJobsError)
    );
  };
  onChangeSearch = (page) => {
    _logger("Page within search is: ", page);
    this.setState(
      (preState) => {
        let newState = { ...preState };
        newState.currentSearch = page;
        return newState;
      },
      () =>
        searchJobsPaginate(page - 1, this.state.searchTerm)
          .then(this.onSearchJobsSuccess)
          .catch(this.onSearchJobsError)
    );
  };

  toggleModal = () => {
    this.setState((preState) => {
      return { isOpen: !preState.isOpen };
    });
  };
  onSearchFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(
      () => {
        let newSearchTerm = { ...this.state.searchTerm };
        newSearchTerm[inputName] = newValue;
        _logger("setting search term to:", newSearchTerm);
        return newSearchTerm;
      },
      () =>
        searchJobs(this.state.searchTerm)
          .then(this.onSearchJobsSuccess)
          .catch(this.onSearchJobsError)
    );
  };
  onSearchJobsSuccess = (response) => {
    _logger("Search Jobs Success!", response);
    toast["success"]("working!", "yippie");
    let jobs = response.data.item.pagedItems;
    this.setState((preState) => {
      return {
        mappedSearchJobs: jobs.map(this.mapJob),
        searchIndex: response.data.item.pageIndex,
        searchSize: response.data.item.pageSize,
        searchCount: response.data.item.totalCount,
        searchPages: response.data.item.totalPages,
      };
    });
  };
  onSearchJobsError = (response) => {
    _logger("Search Jobs Error!", response);
    toast["info"]("searchThis api resulted in error", "Search Error");
    this.setState({ mappedSearchJobs: [], searchCount: 0, searchIndex: 0 });
  };

  viewMoreToggle = (aJob) => {
    _logger("viewMore Modal receives: ", aJob);

    this.setState((preState) => {
      return {
        viewMoreOpen: !preState.viewMoreOpen,
        viewMoreTitle: aJob.title,
        viewMoreDescription: aJob.description,
        viewMoreId: aJob.id,
        viewMorePay: aJob.pay,
        //viewMoreSkills: [aJob.skills[0].name],
        viewMoreSlug: aJob.slug,
        viewMoreSummary: aJob.summary,
        // viewMoreTechCompany: aJob.techCompany.images[0].imageUrl,
      };
    });
  };

  render() {
    return (
      <div className="">
        <h1>Jobs</h1>
        <hr></hr>
        <div className="row">
          <NavLink to="/jobs/createjob">
            <button type="button" className="btn btn-primary m-12 p-5">
              Add job
            </button>
          </NavLink>
        </div>
        <div className="row justify-content-center">
          <button
            type="button"
            className="btn btn-info"
            onClick={this.toggleModal}
          >
            Search Jobs
          </button>
          <ModalSearch //for view more
            isOpen={this.state.viewMoreOpen}
            toggleModal={this.viewMoreToggle}
            title={"Details"}
            content={
              <div className="card">
                <img
                  className="card-img-top"
                  src={this.state.viewMoreTechCompany}
                  alt="cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{this.state.viewMoreTitle}</h5>
                  <p className="card-text">${this.state.viewMorePay}</p>
                  <p className="card-text">
                    Description: {this.state.viewMoreDescription}
                  </p>
                  <p className="card-text">
                    {/* Skills: {this.state.viewMoreSkills} */}
                  </p>
                  <p className="card-text">Slug: {this.state.viewMoreSlug}</p>
                  <p className="card-text">
                    Summary: {this.state.viewMoreSummary}
                  </p>
                </div>
              </div>
            }
          />

          <ModalSearch //for searching modal
            isOpen={this.state.isOpen}
            toggleModal={this.toggleModal}
            title={"Search"}
            contentClassName={"modal-lg"}
            content={
              <div>
                <input
                  className="mr-sm-2"
                  type="text"
                  placeholder="Search"
                  name="searchTerm"
                  onChange={this.onSearchFieldChange}
                  value={this.state.searchTerm}
                />
                <div className="row">
                  <Pagination
                    onChange={this.onChangeSearch}
                    current={this.state.currentSearch}
                    total={this.state.searchCount}
                  />
                </div>
                <div className="row">{this.state.mappedSearchJobs}</div>
              </div>
            }
          />
        </div>
        <div className="container">
          <div className="row">
            <Pagination
              onChange={this.onChange}
              current={this.state.current}
              total={this.state.totalCount}
            />
          </div>
          <div className="row">{this.state.mappedJobs}</div>
        </div>
      </div>
    );
  }
}

export default Jobs;
