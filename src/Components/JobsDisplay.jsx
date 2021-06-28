import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import JobsService from "../services/JobsService";
import JobCard from "./JobsCard";
import JobModal from "./JobsModal";
import Pagination from "rc-pagination";
import Swal from "sweetalert2";

class JobsDisplay extends React.Component {
  state = {
    jobCards: [],
    startPageIndex: 0,
    searchQuery: "",
    currentPage: 1,
    totalRecords: "",
    pageSize: 6,
    isSearch: false,
    showModal: false,
    selectedJobForModal: "",
  };

  componentDidMount = () => {
    this.requestAllJobs();
  };

  requestAllJobs = () => {
    JobsService.getAllJobListings(
      this.state.startPageIndex,
      this.state.pageSize
    )
      .then(this.renderJobs)
      .catch(this.onGetAllJobsFail);
  };

  renderJobs = (response) => {
    let jobsArray = response.data.item.pagedItems.map(this.mapJobCards);
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.jobCards = jobsArray;
      newState.totalRecords = response.data.item.totalCount;
      newState.pageSize = response.data.item.pageSize;
      newState.currentPage = response.data.item.pageIndex + 1;
      return newState;
    });
  };

  mapJobCards = (rawjobObject) => {
    return (
      <div
        className="card m-3"
        style={{ width: "22rem" }}
        key={rawjobObject.id}
      >
        <JobCard
          jobObject={rawjobObject}
          deleteAJob={this.deleteJob}
          removeCardFromDisplay={this.removeJobCardFromDom}
          pushJobCardToEdit={this.pushJobCardToEdit}
          showModal={this.showModal}
        ></JobCard>
      </div>
    );
  };

  showModal = (jobPayload) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showModal: !prevState.showModal,
        selectedJobForModal: jobPayload,
      };
    });
  };

  closeModal = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showModal: false,
      };
    });
  };

  mapIndexedJobCardsForDisplay = (indexedCard) => {
    return indexedCard.jobCardJsx;
  };

  onGetAllJobsFail = (error) => {
    console.log(error.response);
  };

  pushJobCardToEdit = (jobObj) => {
    this.props.history.push(`/main/jobs/edit`, jobObj);
  };

  deleteJob = (jobPayload) => {
    console.log(jobPayload);
    Swal.fire({
      icon: "warning",
      title: `Delete Job ${jobPayload.id}`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Delete",
    }).then((results) => {
      if (results.isConfirmed) {
        JobsService.deleteJob(jobPayload.id, jobPayload)
          .then((response) => this.onDeleteJobSuccess(response, jobPayload))
          .catch(this.onDeleteJobFail);
      }
    });
  };

  onDeleteJobSuccess = (response, jobPayload) => {
    console.log(response);
    this.removeJobCardFromDom(jobPayload.id);
    Swal.fire({
      icon: "success",
      title: `Job ${jobPayload.id} deleted.`,
    });
  };

  onDeleteJobFail = (error) => {
    console.log(error.response);
  };

  removeJobCardFromDom = (jobId) => {
    let newState = { ...this.state };
    let deletedJobIndex = newState.jobCards.findIndex(
      (singleJob) => parseInt(singleJob.key) === parseInt(jobId)
    );

    if (deletedJobIndex >= 0) {
      newState.jobCards.splice(deletedJobIndex, 1);
    }

    this.setState(() => {
      return {
        jobCardsIndexed: newState.jobCards,
        totalRecords: this.state.totalRecords - 1,
      };
    });
  };

  updateStateForSearch = (e) => {
    let newVal = e.currentTarget.value;
    let newState = { ...this.state };
    this.setState(() => {
      newState.searchQuery = newVal;
      return newState;
    });
  };

  submitSearch = () => {
    if (this.state.searchQuery.length > 0) {
      this.setState(() => {
        return { isSearch: true };
      });

      JobsService.getJobsbySearch(
        this.state.startPageIndex,
        this.state.pageSize,
        this.state.searchQuery
      )
        .then(this.renderJobs)
        .catch(this.searchFail);
    } else {
      this.requestAllJobs();
      this.setState(() => {
        return { isSearch: false };
      });
    }
  };

  searchFail = (response) => {
    let searchErrorMessage = (
      <div className="row d-flex bg-light ml-auto mr-auto mt-4 mb-4">
        <p className="m-auto mt-4 mb-4 text-center">No results found</p>
      </div>
    );
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.jobCards = searchErrorMessage;
      newState.totalRecords = 0;
      return newState;
    });
  };

  paginationOnChange = (page) => {
    console.log(page);
    let indexPage = page - 1;
    if (this.state.isSearch) {
      JobsService.getJobsbySearch(
        indexPage,
        this.state.pageSize,
        this.state.searchQuery
      )
        .then(this.renderJobs)
        .catch(this.searchFail);
    } else {
      JobsService.getAllJobListings(indexPage, this.state.pageSize).then(
        this.renderJobs
      );
    }
  };

  render() {
    console.log(this.state.selectedJobForModal);
    return (
      <div className="row mt-3 ml-3">
        <div className="col-9 bg-white border pb-3">
          <div className="flex-row d-flex justify-content-end pt-3">
            <NavLink to="/main/jobs/add" className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Job
            </NavLink>
          </div>
          <div className="flex-row d-flex justify-content-between pt-4 border-bottom">
            <h6 className="mb-3 mt-2 ml-3">
              {this.state.totalRecords} Jobs Found
            </h6>
            {/* --------- */}
            <div
              className="input-group input-group-sm mb-3 mt-2"
              style={{ width: "250px" }}
            >
              <input
                type="text"
                className="form-control"
                onChange={this.updateStateForSearch}
              />
              <div
                className="input-group-append"
                style={{ cursor: "pointer" }}
                onClick={this.submitSearch}
              >
                <span className="input-group-text">Search</span>
              </div>
            </div>
          </div>
          {/* Cards Section Start */}
          <div className="row d-flex bg-light mr-1 ml-1">
            {this.state.jobCards}
          </div>
          {/* Cards Section End */}
          <div className="flex-row d-flex justify-content-center pt-4">
            {
              <Pagination
                onChange={this.paginationOnChange}
                current={this.state.currentPage}
                total={this.state.totalRecords}
                pageSize={this.state.pageSize}
              ></Pagination>
            }
          </div>
          {this.state.showModal && (
            <JobModal
              showModal={this.state.showModal}
              jobObj={this.state.selectedJobForModal}
              closeModal={this.closeModal}
            ></JobModal>
          )}
        </div>
      </div>
    );
  }
}

export default JobsDisplay;
