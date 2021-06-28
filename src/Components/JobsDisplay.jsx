import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import JobsService from "../services/JobsService";
import JobCard from "./JobsCard";
import Swal from "sweetalert2";
import Pagination from "rc-pagination";

class JobsDisplay extends React.Component {
  state = {
    indexedJobArray: [],
    jobRenderObjects: "",
    jobSearchQuery: "",
    currentPage: 1,
    totalRecords: "",
    pageSize: 6,
  };

  isSearch = false;

  componentDidMount = () => {
    JobsService.getAllJobListings(0, this.state.pageSize)
      .then(this.renderJobs)
      .catch(this.onGetAllJobsFail);
  };

  renderJobs = (response) => {
    let newState = { ...this.state };
    this.setState(() => {
      newState.indexedJobArray = response.data.item.pagedItems.map(
        this.mapJobsToState
      );
      newState.jobRenderObjects = response.data.item.pagedItems
        .map(this.mapJobsToState)
        .map(this.mapJobsToRender);
      newState.jobsCount = response.data.item.pagedItems.map(
        this.mapJobsToState
      ).length;
      newState.totalRecords = response.data.item.totalCount;
      newState.pageSize = response.data.item.pageSize;
      newState.currentPage = response.data.item.pageIndex + 1;

      return newState;
    });
  };

  mapJobsToState = (rawJobObj) => {
    let obj = (
      <div className="card m-3" style={{ width: "22rem" }} key={rawJobObj.id}>
        <JobCard
          jobObj={rawJobObj}
          {...this.props}
          deleteJob={this.deleteJob}
        ></JobCard>
      </div>
    );
    let jobId = rawJobObj.id;
    let jobTitle = rawJobObj.title;
    let jobDescription = rawJobObj.description;
    let jobSummary = rawJobObj.summary;
    let jobPay = rawJobObj.pay;
    let jobSlug = rawJobObj.slug;
    let jobTechCompanyId = rawJobObj.techCompany.id;
    let jobSkills = rawJobObj.skills[0].name;
    let jobStatusId = rawJobObj.statusId;

    let jobDetails = {
      id: jobId,
      title: jobTitle,
      description: jobDescription,
      summary: jobSummary,
      pay: jobPay,
      slug: jobSlug,
      techCompanyId: jobTechCompanyId,
      skills: jobSkills,
      statusId: jobStatusId,
    };

    return { jobId: jobId, jobPayload: jobDetails, jobObj: obj };
  };

  mapJobsToRender = (indexedJob) => {
    return indexedJob.jobObj;
  };

  deleteJob = (e) => {
    let currJobId = e.currentTarget.name;
    Swal.fire({
      icon: "warning",
      title: "Confirm Delete?",
      showConfirmButton: true,
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let getDeletedJobPayload = (indexjobArrItem) => {
          if (parseInt(currJobId) === indexjobArrItem.jobId) {
            return true;
          }
        };
        let deleteJobArr = this.state.indexedJobArray.filter(
          getDeletedJobPayload
        );

        let deleteJobPayload = deleteJobArr[0].jobPayload;
        deleteJobPayload.statusId = 0;
        deleteJobPayload.skills = [deleteJobPayload.skills];
        JobsService.editJobListing(deleteJobPayload.id, deleteJobPayload)
          .then(onDeleteSuccess)
          .catch(onDeleteFail);
      }
    });

    let onDeleteSuccess = (response) => {
      Swal.fire({
        icon: "success",
        title: "Job was deleted",
      }).then(() => {
        let filterOutDeletedJob = (indexJobItem) => {
          if (parseInt(currJobId) !== indexJobItem.jobId) {
            return true;
          }
        };

        let updatedJobArr = this.state.indexedJobArray.filter(
          filterOutDeletedJob
        );
        let newState = { ...this.state };
        this.setState(() => {
          newState.indexedJobArray = updatedJobArr;
          newState.jobRenderObjects = updatedJobArr.map(this.mapJobsToRender);
          newState.jobsCount = updatedJobArr.length;
          return newState;
        });
      });
    };

    let onDeleteFail = (error) => {
      console.log(error.response);
    };
  };

  updateSearchState = (e) => {
    let newVal = e.currentTarget.value;
    let newState = { ...this.state };
    this.setState(() => {
      newState.jobSearchQuery = newVal;
      return newState;
    });
  };

  searchClick = () => {
    if (this.state.jobSearchQuery.length > 0) {
      this.isSearch = true;
      JobsService.getJobsbySearch(
        0,
        this.state.pageSize,
        this.state.jobSearchQuery
      )
        .then(this.onSearchSuccess)
        .catch(this.onSearchFail);
    } else {
      this.isSearch = false;
      this.componentDidMount();
    }
  };

  onSearchSuccess = (response) => {
    this.renderJobs(response);
  };

  onSearchFail = () => {
    let searchErrorMessage = (
      <div className="row d-flex bg-light ml-auto mr-auto mt-4 mb-4">
        <p className="m-auto mt-4 mb-4 text-center">No results found</p>
      </div>
    );
    this.isSearch = true;
    let newState = { ...this.state };
    this.setState(() => {
      newState.jobsCount = 0;
      newState.jobRenderObjects = searchErrorMessage;
      return newState;
    });
  };

  onChange = (page) => {
    console.log(page);
    let indexPage = page - 1;
    if (this.isSearch) {
      JobsService.getJobsbySearch(
        indexPage,
        this.state.pageSize,
        this.state.jobSearchQuery
      )
        .then(this.onSearchSuccess)
        .catch(this.onSearchFail);
    } else {
      JobsService.getAllJobListings(indexPage, this.state.pageSize).then(
        this.renderJobs
      );
    }
  };

  render() {
    console.log(this.state);
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

            <div
              className="input-group input-group-sm mb-3 mt-2"
              style={{ width: "250px" }}
            >
              <input
                type="text"
                className="form-control"
                onChange={this.updateSearchState}
              />
              <div className="input-group-append" style={{ cursor: "pointer" }}>
                <span className="input-group-text" onClick={this.searchClick}>
                  Search
                </span>
              </div>
            </div>
          </div>
          {/* Cards Section Start */}
          <div className="row d-flex bg-light mr-1 ml-1">
            {this.state.jobRenderObjects}
          </div>
          {/* Cards Section End */}
          <div className="flex-row d-flex justify-content-center pt-4">
            {
              <Pagination
                onChange={this.onChange}
                current={this.state.currentPage}
                total={this.state.totalRecords}
                pageSize={this.state.pageSize}
              ></Pagination>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default JobsDisplay;
