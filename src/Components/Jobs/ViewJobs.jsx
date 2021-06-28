import React from "react";
import SingleJob from "./SingleJob";
import { getJobs } from "../../services/UserService";

class ViewJobs extends React.Component {
  state = {
    mappedJobs: [],
  };
  componentDidMount() {
    getJobs().then(this.onGetJobsSuccess).catch(this.onGetJobsError);
  }
  onGetJobsSuccess = (response) => {
    console.log(response);
  };
  onGetJobsError = (errResponse) => {
    console.log(errResponse);
  };

  render() {
    return (
      <React.Fragment>
        <h1>Available Jobs</h1>;
        <SingleJob />
      </React.Fragment>
    );
  }
}

export default ViewJobs;
