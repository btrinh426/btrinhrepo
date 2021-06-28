import React, { Component } from "react";
import { getAllJobs, searchJobs, deleteById } from "../services/jobsService";
import JobCard from "./JobCard";
import Pagination from "rc-pagination";
import JobModal from "./JobModal";

class Jobs extends Component {
  state = {
    mappedJobs: [],
    pageIndex: 0,
    pageSize: 3,
    totalJobs: 0,
    search: "",
    modalState: {
      modalShow: "",
      display: "none",
      job: {},
    },
  };

  componentDidMount() {
    console.log("mounted!");

    let pageIndex = this.state.pageIndex;
    let pageSize = this.state.pageSize;

    this.getJobs(pageIndex, pageSize);
  }

  getJobs = (pageIndex, pageSize) => {
    let search = this.state.search;

    if (search) {
      searchJobs(pageIndex, pageSize, search)
        .then(this.onSearchJobsSuccess)
        .catch(this.onSearchJobsError);
    } else {
      getAllJobs(pageIndex, pageSize)
        .then(this.onGetAllJobsSuccess)
        .catch(this.onGetAllJobsError);
    }
  };

  onGetAllJobsSuccess = (res) => {
    console.log("getAllJobs success!", res);

    const allJobs = res.data.item.pagedItems;
    const totalJobs = res.data.item.totalCount;

    this.setState((prevState) => {
      return {
        mappedJobs: allJobs.map(this.mapJob),
        totalJobs: totalJobs,
      };
    });
  };

  mapJob = (job) => {
    return (
      <JobCard
        key={`Job-${job.id}`}
        job={job}
        onEdit={this.onEdit}
        onDelete={this.onDelete}
        onViewMore={this.onViewMore}
      ></JobCard>
    );
  };

  onGetAllJobsError = (err) => {
    console.log("getAllJobs error", err.response);
  };

  onSearchJobsSuccess = (res) => {
    console.log("searchJob success!", res);
    const searchedJobs = res.data.item.pagedItems;
    const totalJobs = res.data.item.totalCount;

    this.setState((prevState) => {
      return {
        mappedJobs: searchedJobs.map(this.mapJob),
        totalJobs: totalJobs,
      };
    });
  };

  onSearchJobsError = (err) => {
    console.log("searchJob error.", err.response);
  };

  onChangePage = (val) => {
    console.log("onChangePage", val);

    let pageIndex = val - 1;
    let pageSize = this.state.pageSize;

    this.setState(() => {
      return {
        pageIndex: pageIndex,
      };
    });

    this.getJobs(pageIndex, pageSize);
  };

  onDelete = (id) => {
    const statusId = 3;

    deleteById(id, statusId)
      .then(this.onDeleteByIdSuccess)
      .catch(this.onDeleteByIdError);
  };

  onDeleteByIdSuccess = (res) => {
    console.log("onDeleteById success!", res);
    const jobIdKey = `Job-${res.jobId}`;
    console.log("job idk key", jobIdKey);

    const jobs = [...this.state.mappedJobs];
    let index = jobs.findIndex((job) => job.key === jobIdKey);
    console.log("index", index);

    jobs.splice(index, 1);

    this.setState({
      mappedJobs: jobs,
    });
  };

  onDeleteByIdError = (err) => {
    console.log("onDeleteById error.", err.response);
  };

  onEdit = (job) => {
    this.props.history.push("/jobs/" + job.id + "/edit", job);
  };

  onClickSearch = (e) => {
    console.log("search clicked!");
    e.preventDefault();
    let pageIndex = this.state.pageIndex;
    let pageSize = this.state.pageSize;
    this.getJobs(pageIndex, pageSize);
  };

  onSearchInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState({ search: newValue });
  };

  addJobButton = (e) => {
    console.log("addJobButton clicked");
    e.preventDefault();
    this.props.history.push("/jobs/new");
  };

  onViewMore = (job) => {
    console.log("viewMore clicked");

    this.setState({
      modalState: {
        modalShow: "show",
        display: "block",
        job: job,
      },
    });
  };

  onModalClose = (e) => {
    console.log("modal close clicked");
    e.preventDefault();

    this.setState({
      modalState: {
        modalShow: "",
        display: "none",
        job: {},
      },
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="page-header">
            <div className="page-header-left-wrapper">
              <h3>Jobs</h3>
              <button
                type="addJob"
                className="btn btn-primary addJob"
                style={{ height: "38px", marginLeft: "15px" }}
                id="add-job-button"
                onClick={this.addJobButton}
              >
                + Job
              </button>
            </div>
            <div className="page-header-right-wrapper">
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search jobs"
                  id="searchJobs"
                  name="searchJobs"
                  value={this.state.search}
                  onChange={this.onSearchInputChange}
                />
                <button
                  className="btn btn-outline-secondary my-2 my-sm-0 searchJobs"
                  type="submit"
                  onClick={this.onClickSearch}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">{this.state.mappedJobs}</div>
        <div>
          <Pagination
            className="jobPagination"
            onChange={this.onChangePage}
            current={this.state.pageIndex + 1}
            pageSize={this.state.pageSize}
            total={this.state.totalJobs}
          ></Pagination>
        </div>
        <JobModal
          onModalClose={this.onModalClose}
          modalShow={this.state.modalState.modalShow}
          display={this.state.modalState.display}
          job={this.state.modalState.job}
        ></JobModal>
      </React.Fragment>
    );
  }
}

export default Jobs;
