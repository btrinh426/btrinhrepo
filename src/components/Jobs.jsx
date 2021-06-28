import React from "react";
import { getJobs } from "../services/jobsService";
import { deleteJob } from "../services/jobsService";
import SingleJob from "./singleJob";

//THIS FILE NEEDS TO BE EDITTED!!!

class Jobs extends React.Component {
  state = {
    mappedJobs: [],
    searchTerm: "",
    pageCount: 5,
  };

  componentDidMount = () => {
    getJobs(0, 10).then(this.onGetSuccess).catch(this.onGetError);
    console.log(this.state.mappedJobs);
    var Jobs = this.state.mappedJobs;
  };
  onGetSuccess = (response) => {
    console.log(response);

    var myJobs = response.data.item.pagedItems;
    console.log(myJobs);
    this.setState(() => {
      return { mappedJobs: myJobs.map(this.mapJob) };
    });
  };
  onGetError = (response) => {
    console.error(response);
  };

  onEditClick = (Job) => {
    console.log(Job);
    this.props.history.push(`/Jobs/${Job.id}/edit`, Job);
  };
  onDeleteClick = (Job) => {
    console.log(Job);
    deleteJob(Job.id)
      .then(() => Job.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };
  onDeleteSuccess = (id) => {
    // use findIndex check to see where id === mappedJob.key
    // use the index and remove from the array and then setState again to replace mappedJobs
    //NOT WORKING YET
    this.setState((prevState) => {
      const indexOfJob = prevState.mappedJobs.findIndex(
        (mappedJob) => mappedJob.key === id
      );
      const mappedJobs = [...prevState.mappedJobs];

      if (indexOfJob >= 0) {
        mappedJobs.splice(indexOfJob, 1);
      }
      console.log(indexOfJob);
      return { mappedJobs };
    }, this.stateChanged);
  };

  onDeleteError = (response) => {
    console.error(response);
  };

  mapJob = (oneJob) => {
    return (
      <SingleJob
        key={oneJob.id}
        Job={oneJob}
        edit={this.onEditClick}
        delete={this.onDeleteClick}
      ></SingleJob>
    );
  };

  routeChange = () => {
    let path = `/Jobs/Jobform`;
    this.props.history.push(path);
  };

  onSearchFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState((prevState) => {
      let searchTerm = { ...prevState.searchTerm };

      searchTerm = newValue;

      return { searchTerm };
    });
  };
  onSearchClick = () => {
    this.setState((prevState) => {
      let mappedJobs = { ...prevState.mappedJobs };
      //THIS IS WHERE THE PROBLEM OCCURS
      mappedJobs = mappedJobs.filter(this.searchFilter);

      return { mappedJobs };
    });
  };
  searchFilter = (mappedJob) => {
    let searchTerm = this.state.searchTerm;
    if (searchTerm === "") {
      return mappedJob;
    } else if (
      mappedJob.Job.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return mappedJob;
    }
  };

  //Pagination
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // within return
  // <Posts posts={currentPosts}/>

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-info sabio">
          <h2 className="text-white">Jobs</h2>
          <button
            className="btn btn-outline-dark ml-3 mr-3"
            onClick={this.routeChange}
          >
            + Job
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search Jobs"
                aria-label="Search"
                onChange={this.onSearchFieldChange}
              />
              <button
                className="btn btn-outline-warning my-2 my-sm-0"
                type="button"
                onClick={this.onSearchClick}
              >
                Search
              </button>
            </form>
          </div>
        </nav>
        <div className="row">{this.state.mappedJobs}</div>
      </React.Fragment>
    );
  }
}

export default Jobs;
