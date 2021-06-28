import React from "react";
import * as jobService from "../services/jobService";
import SingleJob from "./SingleJob";

class JobList extends React.Component {
  state = {
    jobs: {
      id: "",
    },
    techCompanies: {
      image: "",
    },
  };

  componentDidMount() {
    jobService
      .getByPage(0, 10)
      .then(this.onGetJobsByPageSuccess)
      .catch(this.onGetJobsByPageError);
  }

  onGetJobsByPageSuccess = (response) => {
    console.log("Get Jobs success", response.data);

    let myJobs = response.data.item.pagedItems;

    this.setState((prevState) => {
      return { mappedJobs: myJobs.map(this.mapJob) };
    });
  };

  onGetJobsByPageError = (err) => {
    console.error(err);
  };

  onEditClicked = (job) => {
    console.log("Edit clicked", job);

    this.props.history.push(`/jobform/${job.id}`);
  };

  onDeleteClicked = (job) => {
    console.log("Delete clicked", job);

    jobService
      .deleteJob(job.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (myId) => {
    console.log("Deleted job", myId);

    this.setState((prevState) => {
      console.log("Delete", prevState.mappedJobs);

      const indexOfJob = prevState.mappedJobs.findIndex(
        (singleStoge) => singleStoge.props.children.props.job.id === myId
      );

      const updatedJobs = [...prevState.mappedJobs];

      if (indexOfJob >= 0) {
        updatedJobs.splice(indexOfJob, 1);
      }

      return {
        idDeleted: myId,
        mappedJobs: updatedJobs,
      };
    });
  };
  onDeleteError = (err) => {
    console.error(err);
  };

  mapJob = (oneJob) => {
    return (
      <React.Fragment key={`Friend-${oneJob.id}`}>
        <SingleJob
          job={oneJob}
          onEdit={this.onEditClicked}
          onDelete={this.onDeleteClicked}
        ></SingleJob>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Jobs</h1>
        <hr />
        <div className="row">{this.state.mappedJobs}</div>
      </div>
    );
  }
}

export default JobList;
