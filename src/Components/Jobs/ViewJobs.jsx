import React from "react";
import SingleJob from "./SingleJob";
import { getJobs } from "../../services/JobService";

class ViewJobs extends React.Component {
  state = {
    currentJobs: [],
  };
  componentDidMount() {
    getJobs().then(this.onGetJobsSuccess).catch(this.onGetJobsError);
  }
  onGetJobsSuccess = (response) => {
    console.log(response);
    var jobsResponse = response.data.item.pagedItems;
    this.setState(() => {
      return {
        currentJobs: jobsResponse,
      };
    });
  };
  onGetJobsError = (errResponse) => {
    console.log(errResponse);
  };
  mapJobs = (oneJob) => {
    return (
      <SingleJob
        key={oneJob.id}
        onEditJ={this.onEditJob}
        onDeleteJ={this.onDeleteJob}
        currentJobs={oneJob}
      ></SingleJob>
    );
  };
  onDeleteJob = (e) => {
    console.log(e.id);
  };

  onEditJob = (aJob) => {
    var jobId = aJob.id;
    this.props.history.push("/jobs/" + jobId + "/edit", {
      payload: aJob,
      type: "EDITJOB",
    });
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            marginLeft: "7rem",
            padding: "7rem",
          }}
        >
          <div className="container">
            <div className="col-md-12 p-4">
              <h1>Available Jobs</h1>
              <div className="row">
                {this.state.currentJobs.map(this.mapJobs)}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewJobs;
