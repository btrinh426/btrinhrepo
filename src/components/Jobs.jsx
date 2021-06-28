import React, { Component } from "react";
import * as jobServices from "../services/jobServices";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SingleJob from "../components/SingleJob";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../App.css";

class Jobs extends Component {
  state = {
    jobsArr: [],
    mappedJobsArr: [],
    q: "",
    currentPage: 0,
    totalCount: 20,
    pageSize: 2, //** hard-coded
    show: false,
  };

  onPlusJobClicked = () => {
    console.log("We should re-direct to add/edit page");
    this.props.history.push("/add-editjobs");
  };

  componentDidMount() {
    this.getAllJobs();
  }

  onChange = (page) => {
    let rightPageIndex = page - 1;

    this.setState((prevState) => {
      return {
        currentPage: rightPageIndex,
      };
    }, this.getAllJobs);
    //*** we call the getAll() as a "call back func" of setState, so that we are sure it wouldn't run until setState() is done!!!
  };

  getAllJobs = () => {
    jobServices
      .getAllJobsPaginated(this.state.currentPage, this.state.pageSize)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  };

  onGetAllSuccess = (response) => {
    let myJobsArr = response.data.item.pagedItems;
    let myTotalCount = response.data.item.totalCount;

    this.setState((prevState) => {
      return {
        jobsArr: myJobsArr,
        mappedJobsArr: myJobsArr.map(this.mapJob),

        totalCount: myTotalCount,
      };
    });
  };

  onGetAllError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong [onGetAllError]!");
  };

  // onDeleteRequested = (selectedJobObj) => {
  //   console.log("From Delete Request: ", selectedJobObj);
  //   let selectedJobObjId = selectedJobObj.id;

  //   jobServices
  //     .deleteById(selectedJobObjId)
  //     .then(this.onDelJobSuccess)
  //     .catch(this.onDelJobError);
  // };

  // onDelJobSuccess = (selectedJobId) => {
  //   Swal.fire(`Job w/ Id-${selectedJobId} was successfully deleted!`);
  //   this.refreshPage();
  // };

  // onDelJobError = (errResponse) => {
  //   Swal.fire("Oops...", "Something went wrong [onDelJobError]!");
  // };

  onEditRequested = (selectedJobObj) => {
    console.log("From Edit Request: ", selectedJobObj);
    let selectedJobObjId = selectedJobObj.id;
    this.props.history.push(`/jobs/${selectedJobObjId}/edit`);
  };

  onSearchBoxChanged = (e) => {
    let searchField = e.currentTarget;
    let searchValue = searchField.value;

    this.setState(() => {
      return { q: searchValue };
    });
  };

  onSearchJobsRequested = () => {
    let searchTerm = this.state.q;
    console.log({ searchTerm });

    jobServices
      .searchJob(0, 20, searchTerm) //** Why 404- didn't find ???? */
      .then(this.onSearchJobsSuccess)
      .catch(this.onSearchJobsError);
  };

  onSearchJobsSuccess = (response) => {
    let matchArr = response.data.item.pagedItems;
    console.log("This is an array of your matched friends: ", matchArr);
  };

  onSearchJobsError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong [onSearchJobsError]!");
  };

  mapJob = (aJob) => {
    return (
      <SingleJob
        {...this.props}
        key={`jobId-${aJob.id}`}
        job={aJob}
        deleteAJob={this.onDeleteRequested}
        editAJob={this.onEditRequested}
        readMoreAJob={this.showModal}
        show={this.state.show}
      />
    );
  };

  showModal = () => {
    this.setState({
      show: true,
    });
  };

  // refreshPage = () => {
  //   window.location.reload(false);
  // };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md bg-blue sabio">
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <h5>Jobs</h5>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-warning my-2 my-sm-0"
                  type="button"
                  onClick={this.onPlusJobClicked}
                >
                  + Job
                </button>
              </li>
            </ul>
            <hr />
            <Pagination
              onChange={this.onChange}
              page={this.state.currentPage}
              total={this.state.totalCount}
              pageSize={this.state.pageSize}
            />
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
                name="search"
                value={this.state.q}
                onChange={this.onSearchBoxChanged}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
                onClick={this.onSearchJobsRequested}
              >
                Search Jobs
              </button>
            </form>
          </div>
        </nav>
        <div className="col-md-12 p-5">
          <div className="row">{this.state.mappedJobsArr}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Jobs;
