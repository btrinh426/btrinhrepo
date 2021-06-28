import React from "react";
import { ToastContainer } from "react-toastify";
import Pagination from "rc-pagination";

import * as jobService from "../services/jobService";
import Job from "./SingleJob";

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      current: 1,
      total: 0,
    };
  }

  componentDidMount() {
    this.getAllJobs();
  }

  getAllJobs = () => {
    let page = this.state.current - 1;
    jobService
      .getJobs(page)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsErr);
  };

  onGetJobsSuccess = (response) => {
    console.log(response);
    this.setState((prevState) => {
      return {
        ...prevState,
        jobs: response.data.item.pagedItems.map(this.mapJob),
        total: response.data.item.totalCount,
      };
    });
  };

  onGetJobsErr = (err) => {
    console.log(err);
  };

  mapJob = (job) => {
    return (
      <React.Fragment key={`Job-${job.id}`}>
        <Job job={job}></Job>
      </React.Fragment>
    );
  };

  onChange = (page) => {
    console.log(page);

    this.setState({ current: page }, () => {
      const page = this.state.current - 1;
      this.getAllJobs(page);
    });
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="text-center">
          <div className="row">
            <div className="col-md-12">
              <div style={{ padding: 20 }}>
                <h1>Jobs</h1>
              </div>
              <hr />
              <div className="row justify-content-center">
                {this.state.jobs}
              </div>
              <div className="row justify-content-center">
                <Pagination
                  className="m-3"
                  onChange={this.onChange}
                  current={this.state.current}
                  total={this.state.total}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;
