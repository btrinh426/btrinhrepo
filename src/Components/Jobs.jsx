import React from "react";
import { NavLink } from "react-router-dom";

class Jobs extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="card-jobs">
          <div className="card-body">
            Jobs
            <NavLink to="/jobs/add/" className="add-job-link">
              Add New Job
            </NavLink>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                name="q"
                type="text"
                placeholder="Search"
                aria-label="Search"
                // onChange={this.onFormFieldChanged}
                // value={this.state.searchTerm}
              />
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
                onClick={this.onSearchClicked}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Jobs;
