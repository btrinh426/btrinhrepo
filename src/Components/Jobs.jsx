import React from "react";
import { NavLink } from "react-router-dom";
import * as jobService from "../services/jobService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "../index.css";

class Jobs extends React.Component {
  state = {
    openModal: false,
    openModalInfo: false,
    searchTerm: "",
    current: 0,
    totalNumber: 1,
    // title: ["React Developer", "Backend Developer", "Sr. Engineer"],
    jobs: [
      {
        id: 22302,
        title: "Front-End Software Engineer",
        description: "Description of Job",
        summary: "Summary of Job",
        pay: "91,000",
        entityTypeId: 6,
        slug: "FrontEndSoftwareEngineerBecomeSapien",
        statusId: "Active",
        skills: [
          {
            id: 1215,
            name: "React",
          },
          {
            id: 1217,
            name: "HTML",
          },
          {
            id: 1218,
            name: "SQL",
          },
          {
            id: 1219,
            name: "Java",
          },
        ],
        techCompany: {
          id: 22066,
          slug: "BecomeSapien",
          statusId: "Active",
          name: "Become Sapien, Inc.",
          headline: "To Grow is Human, to Perfect is Stagnate.",
          profile: "Video asset production studio",
          summary:
            "With technology numbing audiences more everyday, Brands must become more human to adapt. Become Sapien is an innovative company making steps forward in marketing and online video content.",
          entityTypeId: 2,
          contactInformation: null,
          images: [
            {
              id: 9816,
              entityId: 22066,
              imageTypeId: "Seo",
              imageUrl:
                "https://i.pinimg.com/originals/7f/4a/e5/7f4ae56f5a27e61708c94c1bf56749f6.jpg",
            },
          ],
          urls: [
            {
              id: 647,
              entityId: 22066,
              url: "https://www.becomesapien.com/",
            },
          ],
          Jobs: null,
          tags: [
            {
              id: 218,
              entityId: 22066,
              tagName: "marketing, technology",
            },
          ],
        },
      },
    ],
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
        totalNumber: response.data.item.totalCount,
        mappedJobs: response.data.item.pagedItems.map(this.mapJob),
      };
    });
  };
  onGetJobListError = (err) => {
    console.log(err);
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

  // ----- Map Jobs -----
  mapJob = (oneJob) => {
    return (
      <div className="card-job-list col-md-3" key={`JobList-${oneJob.id}`}>
        <div className="card-body">
          {this.getImage(oneJob)}
          {/* {this.onError(oneJob)} */}
          <h5 className="card-title">{oneJob.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">${oneJob.pay}</h6>
          <p className="card-text">{oneJob.techCompany.name}</p>
          <button
            className="btn btn-secondary btn-lg"
            id={oneJob.id}
            onClick={(e) => this.onEditClicked(e)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-light"
            id={oneJob.id}
            onClick={(e) => {
              this.toggleViewMoreModal(e);
            }}
          >
            View More
          </button>
          {/* <Modal
            isOpen={this.state.openModalInfo}
            toggle={(e) => {
              this.toggleViewMoreModal(e);
            }}
            className="modal-details"
            id="modal-details"
          >
            <ModalHeader>{oneJob.title}</ModalHeader>
            <ModalBody>Lorem ipsum dolor sit amet</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleViewMoreModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal> */}
          <button
            className="btn btn-danger btn-lg"
            id={oneJob.id}
            onClick={(e) => this.onDeleteClicked(e)}
          >
            Delete
          </button>
        </div>
      </div>
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
        openModal: !prevState.openModal,
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
  onEditClicked = (e) => {
    e.preventDefault();
    console.log(e);
    let currentTarget = e.currentTarget;
    let inputId = currentTarget.id;
    // console.log(inputId);

    this.props.history.push("/jobs/" + inputId + "/edit/");
  };

  // ----- Delete Button -----
  onDeleteClicked = (e) => {
    let currentTarget = e.currentTarget;
    let id = currentTarget.id;
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

  // ----- Job Detail View -----
  toggleViewMoreModal = (e) => {
    e.preventDefault();
    console.log(e);
    let currentTarget = e.currentTarget;
    let detailId = currentTarget.id;
    this.props.history.push("/jobs/" + detailId + "/info/");
    console.log(this.state.openModalInfo);
    this.setState((prevState) => {
      return {
        openModalInfo: !prevState.openModalInfo,
      };
    });
  };

  mapJobFull = (oneJob) => {
    return (
      <div className="card" key={`JobInfo-${oneJob.id}`}>
        {this.getImage(oneJob)}
        <div className="card-body">
          <h5 className="card-title">{oneJob.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {oneJob.techCompany.name}
          </h6>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Decription:</b> {oneJob.description}
          </li>
          <li className="list-group-item">
            <b>Pay:</b> ${oneJob.pay}
          </li>
          <li className="list-group-item">
            <b>Skills:</b> {oneJob.skills.map(this.mapSkills).join(", ")}
          </li>
          <li className="list-group-item">
            <b>Contact Us:</b> {oneJob.techCompany.contactInformation}
          </li>
        </ul>
      </div>
    );
  };

  mapSkills = (skill) => {
    var result = skill.name;
    return result;
  };

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
                <Button color="secondary" onClick={this.toggleSearchModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
        <div className="job-container">
          <div className="row">{this.state.mappedJobs}</div>
          <Modal
            isOpen={this.state.openModalInfo}
            toggle={(e) => {
              this.toggleViewMoreModal(e);
            }}
            className="modal-details"
            id="modal-details modal-lg"
          >
            <ModalBody>{this.state.jobs.map(this.mapJobFull)}</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleViewMoreModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
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
