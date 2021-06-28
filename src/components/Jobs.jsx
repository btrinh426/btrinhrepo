import React, { Component } from "react";
import {
  getJobs,
  deleteJobs,
  //updateJobs,
  //postJobs,
} from "../services/jobsService";
import JobsCard from "./JobsCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class Jobs extends Component {
  state = {
    jobs: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: 10,
    searchTerm: "",
    mappedJobs: [],
  };

  componentDidMount() {
    this.onGetJobs();
  }

  onGetJobs = () => {
    getJobs(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  };
  onGetJobsSuccess = (response) => {
    let jobs = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        ...prevState,
        jobs,
        mappedJobs: jobs.map(this.jobsMapped),
        totalCount: response.data.item.totalCount,
      };
    });
    console.log(jobs);
  };
  onGetJobsError = () => {
    console.warn();
  };

  onDeleteJobsClick = (jobId, statusId) => {
    console.log("onDeleteJobsClick");

    deleteJobs(jobId, statusId)
      .then(this.onDeleteJobsSuccess)
      .catch(this.onDeleteJobsError);
  };
  onDeleteJobsSuccess = (idDeleted) => {
    console.log("onDeleteJobsSuccess");
    // getJobs().then(this.onGetJobsSuccess).catch(this.onGetJobsError);
    this.setState((prevState) => {
      const indexOfJobs = prevState.mappedJobs.findIndex(
        (jobs) => jobs.props.job.id === idDeleted
      );

      console.log(indexOfJobs);

      const updatedJobs = [...prevState.mappedJobs];
      if (indexOfJobs >= 0) {
        updatedJobs.splice(indexOfJobs, 1);
      }
      return {
        mappedJobs: updatedJobs,
        formData: null,
      };
    });
  };

  onDeleteJobsError = (err) => console.log(err);

  jobsMapped = (oneJob) => {
    return (
      <JobsCard
        key={oneJob.id}
        job={oneJob}
        onDeleteJobsClick={this.onDeleteJobsClick}
        handleEditClick={this.onEdit}
      />
    );
  };

  onEdit = (oneJob) => {
    console.log(oneJob);
    this.props.history.push(`/jobs/${oneJob.id}/edit`, {
      type: "job_Obj",
      payload: { oneJob },
    });
  };
  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value });
  };

  onJobsFilter = (props) => {
    let jobs = props.filteredJobs.map((job, item) => {
      console.log(job);
      return <jobsFilter key={item} job={job} />;
    });

    return <div>{jobs}</div>;
  };

  onJobsSearch = () => {
    return (
      <div>
        <input onChange={this.handleInput} type="text" />
      </div>
    );
  };

  onPaginationChange = (page) => {
    this.setState(() => {
      return { pageIndex: page - 1 };
    }, this.onGetJobs);
  };

  render() {
    let jobsToDisplay = this.state.jobs;
    if (this.state.searchTerm) {
      jobsToDisplay = this.state.jobs.filter((job) => {
        return JSON.stringify(job).includes(this.state.searchTerm);
        //return car.year.toString().includes(this.state.searchTerm);
      });
    }
    console.log(jobsToDisplay);
    return (
      <div>
        <input onChange={this.handleInput}></input>
        {/* <div className="row">
          {jobsToDisplay.map((oneJob) => {
            return (
              <JobsCard
                key={oneJob.id}
                job={oneJob}
                onDeleteJobsClick={this.onDeleteJobsClick}
                handleEditClick={this.onEdit}
              />
            );
          })}
        </div> */}
        <div className="row">{this.state.mappedJobs}</div>

        {/* <div
        handleInput={this.handleInput}/>
        </div> */}
        {/* <div className="card" style={{ width: "300px" }}>
          <img
            className="card-img-top"
            src="http://placekitten.com/300/300"
            alt="Card cap"
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="https://www.google.com" className="btn btn-primary">
              View More
            </a>
          </div>
        </div> */}
        <Pagination
          total={this.state.totalCount}
          onChange={this.onPaginationChange}
          current={this.state.pageIndex}
          pageSize={this.state.pageSize}
        />
      </div>
    );
  }
}
export default Jobs;
