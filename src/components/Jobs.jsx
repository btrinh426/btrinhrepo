import React from "react";
import * as jobServices from "../services/jobServices.js";
import SingleJob from "./Job.jsx";
import JobCard from "./JobCard.jsx";
import JobForm from "./JobForm.jsx";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import SearchForm from "./SearchForm.jsx";
// import swal from "sweetalert";

class Jobs extends React.Component {
  state = {
    mappedJobs: [],
    totalPages: 0,
    searchInfo: "",
    current: 1,
    pageSize: 3,
    pageIndex: 0,
    totalCount: 1,
    recordModal: "",
    formInfo: {},
    jobInfo: {},
    isJobOpen: false,
    isFormOpen: false,
  };
  componentDidMount() {
    this.setJobs();
  }

  setJobs = (page = 0) => {
    jobServices
      .pageOfJobs(page, this.state.pageSize)
      .then(this.onPageSuccess)
      .catch(this.onPageError);
  };

  onPageSuccess = (response) => {
    let jobArr = response.data.item.pagedItems;
    let totalPages = response.data.item.totalPages;
    let totalCount = response.data.item.totalCount;

    var url = response.config.url;
    var searchInfo = "";

    if (url.includes("search")) {
      var urlArr = url.split("q=");
      searchInfo = urlArr[1];
    }

    this.setState(() => {
      return {
        mappedJobs: jobArr.map(this.mapJob),
        totalPages,
        searchInfo,
        totalCount,
      };
    });
  };

  mapJob = (jobRec) => {
    return (
      <SingleJob
        key={`job-${jobRec.id}`}
        {...this.props}
        job={jobRec}
        onShowRecInfoClick={this.onShowRecInfoClick}
      />
    );
  };

  onShowRecInfoClick = (job) => {
    this.setState(
      () => {
        return { jobInfo: job };
      },
      () => this.toggleModalJob()
    );
  };

  onShowFormInfoClick = () => {
    console.log("show Info here...");
    this.setState(
      (prevState) => {
        return { formInfo: { jobToEdit: prevState.jobInfo } };
      },
      () => this.toggleModalJob()
    );
  };

  onPageNavClick = (current) => {
    var pageIndex = current - 1;
    this.setState(
      () => {
        return { current, pageIndex };
      },
      () => {
        if (this.state.searchInfo === "") {
          this.setJobs(pageIndex);
          console.log("this is the page not to search");
        } else {
          // set search info instead of basic
          console.log("this is to search...");
        }
      }
    );
  };
  searchJobs = (searchValue, pageNo = 0) => {
    jobServices
      .searchJob(searchValue, pageNo)
      .then(this.onSearchJobSuccess)
      .catch(this.onSearchJobError);
  };

  onSearchJobSuccess = (res) => {
    console.log("This was searched successfully");
    this.onPageSuccess(res);
  };

  onSearchJobError = (res) => {
    console.log("try again bruv....");
  };

  onAddClick = (e) => {
    console.log(e);
    this.props.history.push("/jobs/form");
  };

  toggleModalForm = (e) => {
    this.setState(
      (prevState) => {
        return { isFormOpen: !prevState.isFormOpen };
      },
      () => {
        if (!this.state.isFormOpen) {
          this.setState(() => {
            return { formInfo: {} };
          });
        }
      }
    );
  };

  toggleModalJob = (e) => {
    console.log("i am toggleing job modal");
    this.setState(
      (prevState) => {
        return { isJobOpen: !prevState.isJobOpen };
      },
      () => {
        if (!this.state.isJobOpen) {
          this.setState(
            () => {
              return { jobInfo: {} };
            },
            () => {
              if (this.state.formInfo.jobToEdit) {
                this.toggleModalForm();
              }
            }
          );
        }
      }
    );
  };

  onPageError = (error) => console.log(error);

  render() {
    return (
      <div className="container">
        <div className="row justify-content-between">
          <h1>Jobs</h1>
          <button
            className="btn btn-primary btn-sm add-pers"
            onClick={this.toggleModalForm}
          >
            Add Job
          </button>
        </div>
        <br />
        <SearchForm onSearchSubmit={this.searchJobs} />
        <JobForm
          isOpen={this.state.isFormOpen}
          toggleModal={this.toggleModalForm}
          formInfo={this.state.formInfo}
          resetForm={this.resetForm}
        />
        <JobCard
          isOpen={this.state.isJobOpen}
          toggleModal={this.toggleModalJob}
          cardInfo={this.state.jobInfo}
          // /pass a parameter to envoke show card info...
          showForm={this.onShowFormInfoClick}
        />
        <hr />
        <Pagination
          total={this.state.totalCount}
          current={this.state.current}
          pageSize={this.state.pageSize}
          onChange={this.onPageNavClick}
        />
        <br />

        <div className="row">{this.state.mappedJobs}</div>
      </div>
    );
  }
}

export default Jobs;
