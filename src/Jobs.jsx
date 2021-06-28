import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as jobService from "./services/jobService";
import SingleJob from "./SingleJob";
import JobViewModal from "./JobViewModal";
import JobSearchModal from "./JobSearchModal";
import Pagination from "rc-pagination";

class Jobs extends React.Component {
  state = {
    modalData: {
      title: "",
      id: 0,
      pay: "",
      skills: [],
      slug: "",
      statusId: "",
      summary: "",
      techCompany: { name: "" },
      description: "",
    },
    pageIndex: 0,
    pageSize: 3,
    total: 0,
    searchQuery: "",
    isOpen: false,
    searchOpen: false,
  };

  componentDidMount() {
    jobService
      .getPage(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isOpen: !prevState.isOpen,
      };
    });
  };

  toggleSearch = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        searchOpen: !prevState.searchOpen,
      };
    });
  };

  onSearchFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    console.log(newValue);

    this.setState(
      (prevState) => {
        let searchQuery = { ...this.state.searchQuery };
        searchQuery = newValue;
        return { ...prevState, searchQuery };
      },
      () => {
        if (this.state.searchQuery) {
          jobService
            .search(0, this.state.pageSize, this.state.searchQuery)
            .then(this.onGetJobsSuccess)
            .catch(this.onGetJobsError);
        }
      }
    );
  };

  onSubmitSearch = (query) => {
    console.log(query);

    jobService
      .search(0, this.state.pageSize, query)
      .then(this.onGetJobsSuccess)
      .catch(this.onGetJobsError);
  };

  onViewJob = (job) => {
    console.log(job);
    this.setState(
      (prevState) => {
        job.skills = job.skills.map((skills) => skills.name).join(", ");
        return { ...prevState, modalData: job };
      },
      () => {
        this.toggleModal();
      }
    );
  };

  onEditJob = (job) => {
    console.log(job);
    job.skills = job.skills.map((skills) => skills.name).join(", ");
    this.props.history.push("/jobform/" + job.id + "/edit", {
      type: "JOB_DATA",
      payload: job,
    });
  };

  onDeleteJob = (job) => {
    console.log(job.id);
    jobService
      .remove(job.id)
      .then(this.onRemoveSuccess)
      .catch(this.onRemoveError);
  };

  mapJob = (job) => {
    return (
      <SingleJob
        key={job.id}
        aJob={job}
        onEdit={this.onEditJob}
        onDelete={this.onDeleteJob}
        onView={this.onViewJob}
      ></SingleJob>
    );
  };

  onGetJobsSuccess = (response) => {
    console.log(response);
    this.setState((prevState) => {
      return {
        ...prevState,
        total: response.data.item.totalCount,
        jobs: response.data.item.pagedItems.map(this.mapJob),
      };
    });
  };
  onGetJobsError = (err) => {
    console.warn(err);
  };

  onRemoveSuccess = (id) => {
    console.log(id);

    this.setState((prevState) => {
      let jobs = [...prevState.jobs];
      let removedJob = jobs.findIndex((job) => job.key == id);
      console.log(removedJob);
      jobs.splice(removedJob, 1);
      return {
        ...prevState,
        jobs,
      };
    });
  };
  onRemoveError = (err) => {
    console.warn(err);
  };

  onPageChange = (page, pageSize) => {
    console.log(page - 1, pageSize);
    this.setState((prevState) => {
      let index = page - 1;
      if (this.state.searchQuery) {
        jobService
          .search(index, this.state.pageSize, this.state.searchQuery)
          .then(this.onGetJobsSuccess)
          .catch(this.onGetJobsError);
      } else {
        jobService
          .getPage(index, this.state.pageSize)
          .then(this.onGetJobsSuccess)
          .catch(this.onGetJobsError);
      }
      return { pageIndex: index, total: prevState.total };
    });
  };

  render() {
    return (
      <div className="container pt-5 pb-5">
        <ToastContainer />
        <JobViewModal
          isOpen={this.state.isOpen}
          toggleModal={this.toggleModal}
          title={"Create/Update Event Form"}
          info={this.state.modalData}
        ></JobViewModal>
        <JobSearchModal
          isOpen={this.state.searchOpen}
          toggleModal={this.toggleSearch}
          onChange={this.onSearchFieldChange}
          onClick={this.onSubmitSearch}
          query={this.state.searchQuery}
        ></JobSearchModal>
        <div className="row pb-5 text-center">
          <h1 className="col-12">Jobs</h1>
        </div>
        <div className="row input-group pb-5 mx-auto justify-content-center">
          <button
            type="button"
            className="btn btn-primary mx-auto"
            onClick={this.toggleSearch}
          >
            Search Jobs
          </button>
        </div>
        <div className="row">{this.state.jobs}</div>
        <Pagination
          pageSize={this.state.pageSize}
          current={this.state.pageIndex + 1}
          total={this.state.total}
          onChange={this.onPageChange}
        ></Pagination>
      </div>
    );
  }
}

export default Jobs;
