import React from "react";
// import Pagination from "rc-pagination";
import JobCard from "./JobCard";
import * as jobService from "../../services/jobServices";

class Jobs extends React.Component {
  state = { pageSize: 10, pageIndex: 0 };
  componentDidMount() {
    this.onLoadGetJobs();
  }
  onLoadGetJobs = () => {
    jobService
      .getAll(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  };
  onGetJobsSuccess = (response) => {
    let jobsArr = response.data.item.pagedItems;
    let totalCount = response.data.item.totalCount;
    this.setState(() => {
      return { totalCount, mappedJobs: jobsArr.map(this.mapJob) };
    });
  };
  ongetJobsError = (err) => {
    console.error(err);
  };
  mapJob = (oneJob) => {
    return (
      <JobCard
        key={oneJob.id}
        oneJob={oneJob}
        onEditClicked={this.onEditClicked}
        onDeleteClicked={this.onDeleteSuccess}
      />
    );
  };
  onEditClicked = (job) => {
    console.log(job);
  };
  onAddClicked = () => {
    this.props.history.push("/jobs/add");
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <nav
              className="navbar mt-2 "
              style={{
                border: "2px solid #b9d1e6",
                width: "100%",
                backgroundColor: "aliceblue",
              }}
            >
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Find a job..."
                  id="searchString"
                  name="searchString"
                  onChange={this.onFormFieldChanged}
                />
                <button
                  type="button"
                  className="btn btn-success ml-2"
                  style={{ color: "#5f5f5f" }}
                  onClick={this.onSearchClicked}
                >
                  Search
                </button>
                <button
                  type="button"
                  className="btn btn-primary ml-3"
                  style={{ color: "#5f5f5f" }}
                  onClick={this.onAddClicked}
                >
                  Add A Job
                </button>
              </div>
            </nav>
          </div>
        </div>
        <div className="row">{this.state.mappedJobs}</div>
        {/* <Pagination
          onChange={this.onChange}
          current={this.state.current}
          total={this.state.totalCount}
        /> */}
      </div>
    );
  }
}

export default Jobs;
