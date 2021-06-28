import React from "react";
import SingleJob from "./SingleJob";
//import { toast } from "react-toastify";
import * as jobsService from "../services/jobsService";

class Jobs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      currentUser: {},
    };
  }

  //-----First Call-----
  componentDidMount() {
    jobsService
      .getAll(0, 10)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  }

  onGetAllSuccess = (res) => {
    console.log("get jobs success: ", res.data.item.pagedItems);
    let jobsList = res.data.item.pagedItems;
    this.setState((prevState) => {
      console.log("prevState for onGetFriendSuccess:", prevState);
      return {
        //totalNumber: jobsArrLength,
        mappedJobs: jobsList.map(this.mapJob),
      };
    });
  };

  mapJob = (oneJob) => {
    return (
      <React.Fragment key={`Job-${oneJob.id}`}>
        <SingleJob
          {...this.props}
          job={oneJob} // job prop passed to child SingleJob (tells parent how it wants data)
          //   onEditClick={this.onEditClickedFull} // (so inside SingleJob, we declare const oneJob = props.job;)
          //   onDeleteClicked={this.onDeleteClickedFull}
        ></SingleJob>
      </React.Fragment>
    );
  };

  onGetAllError = () => {
    console.error("get jobs error: ");
  };

  render() {
    return (
      <React.Fragment>
        <div className="friend-container">
          {/* the parent needs to know how the child wants its data... send it to render it */}
          {/* passing down props {...this.props} */}
          <div className="row">{this.state.mappedJobs}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Jobs;
