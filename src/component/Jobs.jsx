import React from "react";
import { Link } from "react-router-dom";
import SingleJob from "./SingleJob";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as jobService from "../services/jobService";
import SearchModal from "./SearchModal";

class Jobs extends React.Component {
  state = {
    currentPage: 1,
    searchJobName: "",
    isSearchModalOpen: false,
    isViewModalOpen: false,
  };
  componentDidMount() {
    jobService
      .getJoblist(this.state.currentPage)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Previous Props", prevProps);
    console.log("Current Props", this.props);
    console.log("prevState", prevState);
    console.log("Current State", this.state);
    let currentQry = this.props.location.search;
    let prevQry = prevProps.location.search;
    let currentKey = this.props.location.key;
    let prevKey = prevProps.location.key;
    console.log({ prevKey, currentKey });
    console.log({ prevQry, currentQry });

    if (prevKey !== currentKey) {
      jobService
        .getJoblist(this.state.currentPage)
        .then(this.onActionSuccess)
        .catch(this.onActionError);
    }
  }

  onActionSuccess = (response) => {
    console.log(response.data.item.pagedItems);
    this.setState(() => {
      return {
        mappedJobs: response.data.item.pagedItems.map(this.mapJob),
        totalCount: response.data.item.totalCount,
        jobs: response.data.item.pagedItems, //count the page
      };
    });
  };
  onActionError = (errResponse) => {
    console.error(errResponse);
  };
  toggleSearchModal = (e) => {
    e.preventDefault();
    if (this.state.searchJobName) {
      jobService
        .searchJobs(this.state.searchJobName)
        .then(this.onSearchSuccess)
        .catch(this.onSearchError);
      this.setState((prevState) => {
        return {
          isSearchModalOpen: !prevState.isSearchModalOpen,
          searchJobName: "",
        };
      });
    } else {
      this.setState((prevState) => {
        return { isSearchModalOpen: !prevState.isSearchModalOpen };
      });
    }
  };
  toggleViewModal = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        isViewModalOpen: !prevState.isViewModalOpen,
      };
    });
  };

  onSearchFieldChanged = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState({ searchJobName: newValue });
    console.log(newValue);
  };
  onSearchSuccess = (res) => {
    console.log(res.data.item.pagedItems);

    this.setState(() => {
      return {
        mappedJobs: res.data.item.pagedItems.map(this.mapJob),
        totalCount: res.data.item.totalCount,
        jobs: res.data.item.pagedItems,
        //jobs array stored
      };
    });
  };
  onSearchError = (errResponse) => {
    console.error(errResponse);
    this.setState(() => {
      return { mappedJobs: "", totalCount: 1 };
    });
    toast.error("Not found");
  };
  onEditClicked = (job) => {
    console.log(job.id);

    this.props.history.push(`/Jobs/${job.id}/edit`, {
      type: "jobData",
      payload: job,
    });
  };

  onDeleteClicked = (job) => {
    console.log(`${job.title} is deleted`, job.id);
    console.log(job);
    toast.success(`${job.title} is deleted`, {
      position: toast.POSITION.TOP_CENTER,
    });
    this.setState(() => {
      return {
        deletedJob: job,
      };
    });

    this.onDeleteSafe(job.id);
  };
  onDeleteSafe = (deletedJobId) => {
    this.setState((prevState) => {
      const indexOfjob = prevState.jobs.findIndex(
        (job) => job.id === deletedJobId
      );

      const updatedJobs = [...prevState.jobs];

      if (indexOfjob >= 0) {
        //do not slice or otherwise mutate the objects in array
        updatedJobs.splice(indexOfjob, 1);
      }

      return {
        mappedJobs: updatedJobs.map(this.mapJob),
        jobs: updatedJobs,
      };
    });
  };

  mapJob = (oneJob) => {
    return (
      <React.Fragment key={`jobs-${oneJob.id}`}>
        <SingleJob
          {...this.props}
          toggleViewModal={this.toggleViewModal}
          isViewModalOpen={this.state.isViewModalOpen}
          job={oneJob}
          onEditClick={this.onEditClicked}
          onDeleteClick={this.onDeleteClicked}
        ></SingleJob>
      </React.Fragment>
    );
  };
  onChange = (page) => {
    console.log(page);
    this.setState(() => {
      return {
        currentPage: page,
      };
    });
    jobService
      .getJoblist(page)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  render() {
    return (
      <React.Fragment>
        <form className="form-inline my-3 my-lg-0">
          <button
            onClick={this.toggleSearchModal}
            className="btn btn-primary m-3"
          >
            Search a Job
          </button>
          <SearchModal
            isSearchModalOpen={this.state.isSearchModalOpen}
            searchJobName={this.state.searchJobName}
            toggleSearchModal={this.toggleSearchModal}
            title={"Type the job name"}
            onSearchFieldChanged={this.onSearchFieldChanged}
            // onSearchButtonClicked={this.onSearchButtonClicked}
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
