import React from "react";
import * as jobService from "../services/jobsService";

class JobSearch extends React.Component {
  state = {};

  handleJobSearchForm = (e) => {
    let currentTarget = e.currentTarget;
    let currentValue = currentTarget.value;

    this.setState(() => {
      return { ...this.state, formData: currentValue };
    });
  };

  onJobSearchSubmit = (e) => {
    e.preventDefault();
    jobService
      .jobSearch(this.state.formData)
      .then(this.onJobSearchSuccess)
      .catch(this.onJobSearchError);
  };

  onJobSearchSuccess = (response) => {
    let queryData = response.data.item;
    this.queryResults(queryData);
    //console.log(queryData);
  };

  onJobSearchError = (response) => {
    console.warn(response);
  };

  queryResults = (results) => {
    this.props.query(results);
  };

  render() {
    return (
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="text"
          name="searchJobs"
          placeholder="Search Jobs"
          onChange={this.handleJobSearchForm}
        />
        <button
          className="btn btn-outline-info my-2 my-sm-0"
          type="button"
          onClick={this.onJobSearchSubmit}
        >
          Search Jobs
        </button>
      </form>
    );
  }
}

export default JobSearch;
