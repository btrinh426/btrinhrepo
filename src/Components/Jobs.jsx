import React from "react";
import { NavLink } from "react-router-dom";
import * as jobService from "../services/jobService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "../index.css";
import SingleJob from "./JobSingle";

class Jobs extends React.Component {
  state = {
    openModal: false,
    openModalInfo: false,
    searchTerm: "",
    current: 0,
    totalNumber: 1,
    // title: ["React Developer", "Backend Developer", "Sr. Engineer"],
  };

  //----- Get Jobs Function First Call -----
  componentDidMount() {
    jobService
      .jobList(0, 4)
      .then(this.onGetJobListSucess)
      .catch(this.onGetJobListError);
  }

  onGetJobListSucess = (response) => {
    console.log("Get Job List", response);
    this.setState((prevState) => {
      return {
        // jobs: response.data.item.pagedItems,
        //store job data inside state
        totalNumber: response.data.item.totalCount,
        mappedJobs: response.data.item.pagedItems.map(this.mapJob),
      };
    });
  };
  onGetJobListError = (err) => {
    console.log(err);
  };

  // ----- Map Jobs -----
  mapJob = (oneJob) => {
    return (
      <SingleJob
        key={`JobList-${oneJob.id}`}
        job={oneJob}
        onEditClick={this.onEditClicked}
        onModalClick={this.toggleViewMoreModal}
        onDeleteClick={this.onDeleteClicked}
      ></SingleJob>
    );
  };

  //   ----- Search Modal -----
  toggleSearchModal = (e) => {
    e.preventDefault();
    console.log(e);
    const searchResult = this.state.searchTerm;
    this.props.history.push("/jobs/?q=" + searchResult);

    this.setState((prevState) => {
      return {
        openModal: true,
      };
    });
  };

  closeSearchModal = (e) => {
    e.preventDefault();
    console.log(e);
    this.props.history.push("/jobs/");
    this.setState((prevState) => {
      return {
        openModal: false,
      };
    });
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    // console.log({ currentTarget, newValue });

    this.setState(() => {
      let newState = {};
      newState.searchTerm = newValue;
      // console.log({ newState });
      return newState;
    });
  };

  componentDidUpdate(prevProps) {
    console.log("Previous Props", prevProps);
    console.log("Current Props", this.props);
    const searchResult = this.state.searchTerm;
    if (
      this.props.location.search === "" &&
      this.props.location.search !== prevProps.location.search
    ) {
      jobService
        .jobList(0, 4)
        .then(this.onGetJobListSucess)
        .catch(this.onGetJobListError);
    } else if (
      this.toggleSearchModal &&
      this.state.openModal === false &&
      this.props.location.search !== prevProps.location.search
    ) {
      jobService
        .search(0, 4, searchResult)
        .then(this.onSearchJobSuccess)
        .catch(this.onSearchJobError);
    }
  }

  onSearchJobSuccess = (response) => {
    console.log({ SearchedTerm: response.data.item.pagedItems });
    toast["success"]("You Found Job(s)", "Search Jobs");
    this.setState((prevState) => {
      return {
        mappedJobs: response.data.item.pagedItems.map(this.mapJob),
      };
    });
  };

  onSearchJobError = (err) => {
    console.log(err);
  };

  // ----- Pagination Change Handler -----
  onChange = (page) => {
    console.log(page);
    const searchResult = this.state.searchTerm;
    this.setState((prevState) => {
      if (searchResult) {
        console.log(page - 1);
        jobService
          .search(page - 1, 4, searchResult)
          .then(this.onSearchJobSuccess)
          .catch(this.onSearchJobError);
        return {
          current: page,
        };
      } else {
        console.log(page - 1);
        jobService
          .jobList(page - 1, 4)
          .then(this.onGetJobListSucess)
          .catch(this.onGetJobListError);
        return {
          current: page,
        };
      }
    });
    console.log(this.state.current);
  };

  // ----- Edit Button -----
  onEditClicked = (singleJob) => {
    this.props.history.push("/jobs/" + singleJob.id + "/edit/", {
      type: "EDIT",
      payload: singleJob,
    });
  };

  // ----- Delete Button -----
  onDeleteClicked = (oneJob) => {
    let id = oneJob.id;
    const aFxPointer = this.onDeleteSuccessCurry(id);
    jobService.deactivate(id).then(aFxPointer).catch(this.onDeleteJobError);
  };

  onDeleteSuccessCurry = (id) => {
    return (data) => {
      console.log(data);
      console.log(id);
      this.setState((prevState) => {
        const indexOfJobs = prevState.mappedJobs.findIndex(
          (singleJob) => singleJob.id === data.id
        );
        const updatedJobs = [...prevState.mappedJobs];

        if (indexOfJobs >= 0) {
          updatedJobs.splice(indexOfJobs, 1);
        }
        return { idDeleted: id, mappedJobs: updatedJobs, formData: null };
      }, this.stateChanged);
      console.log("Successful Delete", data);
    };
  };
  onDeleteJobsuccess = (response) => {
    console.log(response);
    toast["success"]("You Deleted A Job", "Delete Job");
  };
  onDeleteJobError = (err) => {
    console.error(err);
    toast["error"]("You Haven't Deleted A Job", "Delete Job");
  };

  // ----- Job Detail View Modal -----
  toggleViewMoreModal = (aJob) => {
    this.props.history.push("/jobs/" + aJob.id + "/info/", {
      type: "MODAL",
      payload: aJob,
    });
    console.log(this.state.openModalInfo);
    this.setState((prevState) => {
      return {
        openModalInfo: true,
        selectedJob: aJob,
      };
    });
  };

  closeViewMoreModal = (e) => {
    e.preventDefault();
    console.log(e);
    this.props.history.push("/jobs/");
    this.setState((prevState) => {
      return {
        openModalInfo: false,
      };
    });
  };

  getImage = (oneJob) => {
    return (
      oneJob.techCompany.images &&
      oneJob.techCompany.images[0] && (
        <img
          className="card-img-top"
          src={oneJob.techCompany.images[0].imageUrl}
          alt="Company Profile"
          onError={this.onError}
        />
      )
    );
  };

  onError = (e) => {
    e.target.src =
      "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image.jpg";
  };

  mapSkills = (skill) => {
    var result = skill.name;
    return result;
  };

  getContact = (oneJob) => {
    return (
      oneJob.techCompany.contactInformation && (
        <li className="list-group-item" onError={this.onConactError}>
          <b>Contact Us: </b>
          {this.state.selectedJob.techCompany.contactInformation.data}
        </li>
      )
    );
  };
  onConactError = (e) => {
    e.target.src = "Contact Unavailable";
  };

  //----- Render -----
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
              <button
                id="searchModal"
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
                onClick={(e) => {
                  this.toggleSearchModal(e);
                }}
              >
                Search
              </button>
            </form>
            <Modal
              isOpen={this.state.openModal}
              toggle={(e) => {
                this.toggleSearchModal(e);
              }}
              className="modal-search"
              id="modal-search"
            >
              <ModalHeader>Search for a Job?</ModalHeader>
              <ModalBody>
                <input
                  className="form-control mr-sm-2"
                  name="q"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.onFormFieldChanged}
                  value={this.state.searchTerm}
                ></input>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.closeSearchModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
        <div className="job-container">
          <div className="row">{this.state.mappedJobs}</div>
          {this.state.selectedJob && (
            // this.props.location.state.type === "MODAL" &&
            <Modal
              isOpen={this.state.openModalInfo}
              toggle={(e) => {
                this.toggleViewMoreModal(e);
              }}
              className="modal-details"
              id="modal-details modal-lg"
            >
              <ModalBody>
                <div
                  className="card"
                  key={`JobInfo-${this.state.selectedJob.id}`}
                >
                  {this.getImage(this.state.selectedJob)}
                  <div className="card-body">
                    <h5 className="card-title">
                      {this.state.selectedJob.title}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {this.state.selectedJob.techCompany.name}
                    </h6>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <b>Decription:</b> {this.state.selectedJob.description}
                    </li>
                    <li className="list-group-item">
                      <b>Pay:</b> ${this.state.selectedJob.pay}
                    </li>
                    <li className="list-group-item">
                      <b>Skills: </b>
                      {this.state.selectedJob.skills
                        .map(this.mapSkills)
                        .join(", ")}
                    </li>
                    {this.getContact(this.state.selectedJob)}
                  </ul>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.closeViewMoreModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          )}
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Pagination
                className="pagination"
                currentPage={1}
                defaultPageSize={4}
                onChange={this.onChange}
                current={this.state.current}
                total={this.state.totalNumber}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Jobs;
