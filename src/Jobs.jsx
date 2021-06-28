import React from "react";
import SingleJob from "./SingleJob";
import * as jobService from "./jobService";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        description: "",
        summary: "",
        pay: "",
        slug: "",
        statusId: "",
        techCompanyId: "",
        skills: [],
      },
      current: 1,
      totalCount: "",
      pageSize: 4,
      pageIndex: "",
      totalPages: "",
    };
  }

  componentDidMount = () => {
    jobService
      .getJobs(0, this.state.pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    console.log(this.state.formData.title);

    let formData = { ...this.state.formData };

    let titleOne = formData.title.split(" ")[0];
    let titleTwo = formData.title.split(" ")[1];
    formData.title = titleOne + " " + titleTwo;

    jobService
      .searchJobs(formData.title, this.state.pageIndex, this.state.pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onSearchJobsError);
  };

  onGetJobsSuccess = (response) => {
    let jobs = response.data.item.pagedItems;
    console.log(jobs);
    console.log(
      response.data.item.pageIndex,
      response.data.item.pageSize,
      response.data.item.totalCount,
      response.data.item.totalPages
    );

    this.setState((prevState) => {
      return {
        mappedJobs: jobs.map(this.mapJob),
        totalCount: response.data.item.totalCount,
        pageSize: response.data.item.pageSize,
        pageIndex: response.data.item.pageIndex,
        totalPages: response.data.item.totalPages,
      };
    });
  };

  onGetJobsError = () => {
    console.log("couldn't get jobs");
  };

  onSearchJobsError = () => {
    console.log("Sorry, couldnt find jobs matching your search criteria");
  };

  onJobClicked = (job) => {
    let id = job.id;
    let formData = { ...job };
    // formData.skills = formData.skills.split(",");
    formData.techCompanyId = formData.techCompany.id;
    let newData = { ...formData, id };

    this.props.history.push("/jobs/" + id + "/edit", newData);
  };

  onJobClickedFull = (job) => {
    let id = job.id;
    console.log(job);

    jobService
      .deleteJob(id)
      .then(this.onDeleteJobSuccess)
      .catch(this.onDeleteJobError);
  };

  onDeleteJobSuccess = (id) => {
    toast.success("Job has been deleted");
    console.log(" delete request successful ");

    this.setState((prevState) => {
      console.log("Mapped jobs ", prevState.mappedJobs);

      const indexOfJob = prevState.mappedJobs.findIndex(
        (job) => job.key === id
      );

      const oldJobs = [...prevState.mappedJobs];

      if (indexOfJob) {
        const updatedJobs = oldJobs.splice(indexOfJob, 1);

        return {
          mappedJobs: updatedJobs,
        };
      }
    });
  };

  onDeleteJobError = () => {
    console.log("Sorry, could not delete job.");
  };

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log("Jobs", { currentPath, previousPath });
  }

  mapJob = (oneJob) => {
    return (
      <SingleJob
        key={oneJob.id}
        job={oneJob}
        edit={this.onJobClicked}
        delete={this.onJobClickedFull}
      />
    );
  };

  getPaginatedJobs = (pageIndex, pageSize) => {
    jobService
      .getJobs(pageIndex, pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  };

  onChange = (page) => {
    console.log(page);
    this.setState(
      () => {
        return {
          current: page,
        };
      },
      () => this.getPaginatedJobs(this.state.current - 1, this.state.pageSize)
    );
  };

  render() {
    return (
      <>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.title}
            name="title"
            id="title"
          />
          <button
            onClick={this.submitForm}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Search
          </button>
        </form>
        <div className="col-md-12 p-5">
          <h1>Jobs List</h1>
        </div>
        <div className="row">{this.state.mappedJobs}</div>
        <div className="form-inline my-2 my-lg-0">
          <Pagination
            pageSize={this.state.pageSize}
            onChange={this.onChange}
            current={this.state.current}
            total={this.state.totalCount}
          />
        </div>
      </>
    );
  }
}

export default Jobs;
