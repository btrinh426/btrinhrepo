import React from "react";
import { withRouter } from "react-router-dom";
import * as jobService from "../services/jobService";

class JobList extends React.Component {
  state = {
    jobData: null,
  };

  mapJob = (job) => {
    return (
      <React.Fragment key={`fr-${job.id}`}>
        <div className="card col-md-3">
          <div className="card-body">
            <img
              src="https://avatars.slack-edge.com/2020-12-06/1553492366706_ac233edb8d341cb7b28f_192.jpg"
              alt="Smiley face"
            ></img>
            <h5 className="card-title">{job.name}</h5>
            <div>
              <h5 className="card-summary">{job.summary}</h5>
            </div>
            <p className="card-text"></p>
            <button
              onClick={this.editButton}
              href="#"
              className="btn btn-primary"
            >
              Edit
            </button>

            <button
              onClick={this.deleteButton}
              href="#"
              className="btn btn-primary"
            >
              Delete
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  componentDidMount() {
    jobService.get().then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    console.log({ response: response.data.item.pagedItems });

    this.setState(() => {
      const newState = {
        jobData: response.data.item.pagedItems,
      };

      return newState;
    });

    this.setState((prevState) => {
      return { mappedJobs: prevState.jobData.map(this.mapJob) };
    });
  };

  onGetError = (response) => {
    console.log({ Error: response });
  };

  editButton = () => {};

  deleteButton = () => {};

  render() {
    return (
      <div>
        {/* {this.state.jobData.map(this.mapJob)} */}
        {this.state.mappedJobs}
      </div>
    );
  }
}

export default withRouter(JobList);
