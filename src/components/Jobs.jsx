import React from "react";
import SingleJob from "./SingleJob";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import * as jobsService from "../services/jobsService";
//import localeInfo from "rc-pagination/lib/locale/en_US";

class Jobs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      jobs: [],
      mappedJobs: [], // jobs component array
      searchTerm: "",
      //----Pagination---
      current: 0, // current page 
      totalNumber: 1,  // array.length
      totalCount: 0, // array.length (total job count)
    };
  }

  //-----First Call-----
  componentDidMount = () => {
    this.getListJobs();
  };

  getListJobs() {
    jobsService
      .getAll(this.state.totalNumber - 1, 20) // DOM page minus 1 = page index (start at 0)
      .then(this.onShowJobsSuccess)
      .catch(this.onShowJobsError);
  }

  onShowJobsSuccess = (res) => {
    console.log("response", res);
    let jobsArray = res.data.item.pagedItems; // vanilla js jobs array
    let jobsArrLength = res.data.item.totalCount;
    console.log("array.length", res.data.item.totalCount);
    this.setState(() => {
      return {
        jobs: jobsArray, //returned js jobs array,
        mappedJobs: jobsArray.map(this.mapJob), //returned component array
        totalCount: res.data.item.totalCount, // array.length (total job count)
        current: res.data.item.pageIndex + 1, // current DOM page
        totalNumber: jobsArrLength   // 
      };
    });
  };

  onShowJobsError = () => {
    console.error("get jobs error: ");
  };

  onEditClickedFull = (job) => {
    //console.log(job, job.id);
    this.props.history.push("/jobsaddupdate/" + job.id + "/edit", {
      type: "EDIT_JOB",
      payload: { ...job },
    });
  };

  onDeleteClickedFull = (job) => {
    console.log(job);
    jobsService
      .deleteById(job.id)
      .then(this.onDeleteJobSuccess)
      .catch(this.onDeleteJobError);
  };

  onDeleteJobSuccess = (iD) => {
    console.log("onDeleteResponse:", iD, "this.state.jobs:", this.state.jobs);
    this.setState((prevState) => {
      const indexOfJob = this.state.jobs.findIndex(
        (ajob) => ajob.id === iD // looping over state jobs array id's, comparing to clicked on iD
      );
      console.log("indexOfJob to Delete:", indexOfJob);
      const updatedJob = [...prevState.mappedJobs]; // copy existing jobs component array
      if (indexOfJob >= 0) {
        updatedJob.splice(indexOfJob, 1); // splice this index out of my array
      }
      updatedJob.map(this.mapJob); // remap new array
      return {
        mappedJobs: updatedJob, // return new state
      };
    }, this.stateChanged); // signal state changed for re-render
    toast["success"]("You Deleted A Friend", "Delete Friend");
  };

  onDeleteJobError = (res) => {
    console.warn(res);
  };

  mapJob = (oneJob) => {
    return (
      <React.Fragment key={`Job-${oneJob.id}`}>
        <SingleJob
          {...this.props}
          job={oneJob} // job prop passed to child SingleJob (tells parent how it wants data)
          onEditClick={this.onEditClickedFull} // (so inside SingleJob, we declare const oneJob = props.job;)
          onDeleteClicked={this.onDeleteClickedFull}
        ></SingleJob>
      </React.Fragment>
    );
  };

  //------SEARCH------
  onFormFieldChanged = (e) => {
    let newValue = e.currentTarget.value; //  capt prop val
    //let inputName = e.currentTarget.name; // assn prop name of input val
    //console.log("newValue:", newValue, "inputName:", inputName);
    this.setState(() => {
      let newState = {};
      newState.searchTerm = newValue;
      return newState;
    });
  };

  //-----ANOTHER FLAVOR OF BINDING FORM INPUTS TO STATE----
  // onFormFieldChanged = (e) => {
  //   let currentTarget = e.currentTarget;
  //   //console.log(currentTarget);
  //   let newValue = currentTarget.value; //  capture prop value
  //   let inputName = currentTarget.name; // assn prop name of input value (e.g. eMail)
  //   //console.log(newValue, currentTarget);

  //   this.setState((prevState) => {
  //     //current most recent state object
  //     let friendData = { ...prevState.friendData }; // copying all of the properties of current state at this momenent in time
  //     friendData[inputName] = newValue; // bind state to ea form field
  //     // as char entered
  //     return { friendData };
  //   });
  // };

  onSearchClicked = (e) => {
    e.preventDefault();
    console.log("search clicked:", e.currentTarget);
    const input = this.state.searchTerm;
    const data = this.state.jobs; // array of data
    console.log("searchTerm:", input);
    this.props.history.push("/jobs?q=" + input, {
      // synchronous, but ajax call is asynchronous...so be careful to "stay put" on friends component, so there is no unmounting of component, otherwise you'll get an error "can't render on an unmounted component"
      type: "JOB_SEARCH", // what we intend to do
      payload: data, // loc state in child will be null (this.props.location.state) unless we
    }); // leverage cDM. + Set up state  e.g.  state = {newData={}}  see passing state via hist.push notes tab
    jobsService
      .search(0, 4, input)
      .then(this.onSearchJobSuccess)
      .catch(this.onSearchJobError);
  };

  onSearchJobSuccess = (searchRes) => {
    console.log("search Response:", searchRes);
    this.setState((searchRes) => {
      return {
        mappedJobs: searchRes.data.item.pagedItems.map(this.mapFriend),
        current: searchRes.data.item.pageIndex + 1,
        totalCount: searchRes.data.item.totalCount,
      };
    });
  };

  onSearchJobError = (searchRes) => {
    console.error("search fail:", searchRes);
  };


  //----PAGINATION----
  onChangePage = (page) => {
    console.log("clicked on page number:", page);
    const searchText = this.state.searchTerm;
    console.log("search text:", searchText);
    this.setState(() => {
      if (searchText) {
        console.log(page - 1);
        jobsService
          .search(page - 1, 4, searchText)
          .then(this.onSearchJobSuccess)
          .catch(this.onSearchError);
        return {
          current: page, // aaron returned as an obj
        };
      } else {
        console.log(page - 1);
        jobsService
          .getAll(page - 1, 4)
          .then(this.onGetFriendsSuccess)
          .catch(this.onGetFriendsError);
        return {
          current: page,
        };
      }
    });
    console.log(this.state.current);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Jobs</h1>
            <h3 className="float-left p-2"> Add Job</h3>
            <h3 className="float-right p-2">Search Job</h3>
            <form className="form-inline my-2 my-lg-0 float-right">
              <input
                className="form-control clear-fields"
                type="text"
                name="search"
                onChange={this.onFormFieldChanged}
                value={this.state.searchTerm}
              />

              <button
                className="btn btn-secondary my-2 my-sm-0"
                type="submit"
                onClick={this.onSearchClicked}
              >
                Search
              </button>
            </form>

            <button
              className="btn btn-success my-2 my-sm-0"
              type="submit"
              onClick={this.onAddClicked}
            >
              Add
            </button>
          </div>
        </div>

        <div className="jobs-container">
          {/* the parent needs to know how the child wants its data... send it to render it */}
          {/* passing down props {...this.props} */}
          <div className="row">{this.state.mappedJobs}</div>
        </div>

        <div>
          <Pagination
            onChange={this.onChange}
            current={this.state.current}
            total={this.state.totalItems}
            defaultPageSize={3}
            currentPage={1}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Jobs;
