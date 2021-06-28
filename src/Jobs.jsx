import React from "react";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import SingleJobs from "./SingleJobs";
import * as jobService from "./services/jobService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import Modal from "react-modal";

class Jobs extends React.Component {
  state = {
    current: 0,
    pageCount: 0,
    totalJobs: 0,
    searchTerm: "",

    isInEditMode: false,

    value: "Jobs",

    jobFormData: [
      {
        title: "",
        description: "",
        summary: "",
        pay: "",
        slug: "",
        statusId: "",
        techCompanyId: 0,
        skills: [""],
      },
    ],
  };

  jobIdData = this.props.match.params.jobId;

  componentDidMount() {
    console.log("did mount");
    jobService.getJobs(0).then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    console.log("jobs obtained", response);

    this.setState((preState) => {
      return {
        pageCount: response.data.item.totalPages,
        totalJobs: response.data.item.totalCount,
        current: response.data.item.pageIndex,
        mappedJobs: response.data.item.pagedItems.map(this.mapJobs),
      };
    });
  };

  onGetError = (err) => {
    console.error(err);
  };

  onEditClicked = (job) => {
    let id = job.id;
    console.log(id);

    this.props.history.push("/jobs/" + id + "/edit");
  };

  onDeleteClicked = (job) => {
    console.log(job);
    let id = job.id;
    jobService
      .deleteJobs(id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteFail);
  };

  onDeleteSuccess = (response) => {
    console.log(response);
    this.props.history.push("/jobs");
    toast.success("Job Delisted");
  };

  onDeleteFail = (err) => {
    console.error(err);
    toast.error("Failed to delist job");
  };

  mapSkills = (skills) => {
    var skillName = skills.name;
    return skillName;
  };

  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode,
    });
  };

  updateComponentValue = () => {
    this.setState({
      isInEditMode: false,
      value: this.refs.textInput.value,
    });
  };

  renderEditView = () => {
    return (
      <div>
        <input type="text" defaultValue={this.state.value} ref="textInput" />
        <button onClick={this.updateComponentValue}>O</button>
        <button onClick={this.changeEditMode}>X</button>
      </div>
    );
  };

  renderDefaultView = () => {
    return <div onDoubleClick={this.changeEditMode}>{this.state.value}</div>;
  };

  mapJobs = (oneJob) => {
    return (
      <React.Fragment>
        <SingleJobs
          job={oneJob}
          onEdit={this.onEditClicked}
          onDelete={this.onDeleteClicked}
        ></SingleJobs>
      </React.Fragment>
    );
  };

  onAddClick = () => {
    this.props.history.push("/jobs/new");
  };

  //   mapJobsSimple = (oneJob) => {
  //     return <p key={`Jobs-${oneJob.statusId}`}>{oneJob.title}</p>;
  //   };

  onChange = (page) => {
    this.setState((prevState) => {
      var pageIndex = prevState.current;
      console.log(pageIndex);
      pageIndex = page - 1;
      jobService
        .getJobs(pageIndex)
        .then(this.onGetSuccess)
        .catch(this.onGetError);
      return { current: page };
    });
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    // let inputName = currentTarget.name;
    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState.searchTerm = newValue;

      return newState;
    });
  };

  onSearchClicked = (e) => {
    e.preventDefault();
    var searchJob = this.state.searchTerm;
    if (searchJob) {
      this.props.history.push("/jobs/?s=" + searchJob);
      jobService
        .searchJobs(searchJob)
        .then(this.onSearchSuccess)
        .catch(this.onSearchFail);
    } else {
      this.props.history.push("/jobs");
      toast.error("Type a search term before hitting the button");
    }
  };

  onSearchSuccess = (response) => {
    console.log(response);
    toast.success("Search Successful!");
    this.setState(() => {
      return {
        pageCount: response.data.item.totalPages,
        totalJobs: response.data.item.totalCount,
        current: response.data.item.pageIndex,
        mappedJobs: response.data.item.pagedItems.map(this.mapJobs),
      };
    });
  };

  onSearchFail = (err) => {
    console.error(err);
    this.props.history.push("/jobs");
    toast.error("No jobs found");
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <button type="submit" className="addFriend" onClick={this.onAddClick}>
            Add Jobs
          </button>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            name="q"
            type="text"
            placeholder="Search For Jobs"
            aria-label="Search"
            onChange={this.onFormFieldChanged}
            value={this.state.searchTerm}
          />
          <button
            className="btn btn-outline-light my-2 my-sm-0 srchBtn"
            type="submit"
            onClick={this.onSearchClicked}
          >
            Search
          </button>
        </form>
        <div className="col-md-12 p-5">
          <h1>
            {this.state.isInEditMode
              ? this.renderEditView()
              : this.renderDefaultView()}
          </h1>
          <div className="row">{this.state.mappedJobs}</div>
          <div>
            <Pagination
              onChange={this.onChange}
              className="pagination"
              pageSize={10}
              defaultPageSize={10}
              current={this.state.current + 1}
              total={this.state.totalJobs}
              hideOnSinglePage={true}
            />
          </div>
        </div>{" "}
        {/* /* pageCount: response.data.item.totalPages,
        totalJobs: response.data.item.totalCount,
        current: response.data.item.pageIndex, */}
      </React.Fragment>
    );
  }
}
//   render() {
//     return (
//       <React.Fragment>
//         <h1 className="registerHeader">Jobs List</h1>

//         <form onSubmit={this.onSubmitClicked}>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               onChange={this.onJobFormChanged}
//               value={this.state.jobsData.name}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="profile">Profile</label>
//             <input
//               type="text"
//               className="form-control"
//               id="profile"
//               name="profile"
//               onChange={this.onJobFormChanged}
//               value={this.state.jobsData.profile}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="summary">Summary</label>
//             <input
//               type="text"
//               className="form-control"
//               id="summary"
//               name="summary"
//               onChange={this.onJobFormChanged}
//               value={this.state.jobsData.summary}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="headline">Headline</label>
//             <input
//               type="text"
//               className="form-control"
//               id="headline"
//               name="headline"
//               onChange={this.onJobFormChanged}
//               value={this.state.jobsData.headline}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="contact">Contact Information</label>
//             <input
//               type="text"
//               className="form-control"
//               id="contact"
//               name="contact"
//               onChange={this.onJobFormChanged}
//               value={this.state.jobsData.contactInformation}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="slug">Slug</label>
//             <input
//               type="text"
//               className="form-control"
//               id="slug"
//               name="slug"
//               onChange={this.onJobFormChanged}
//               value={this.state.jobsData.slug}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="statusId">Status ID</label>
//             <input
//               type="text"
//               className="form-control"
//               //   placeholder="NotSet"
//               id="statusId "
//               name="statusId"
//               onChange={this.onJobFormChanged}
//               value={this.state.jobsData.statusId}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="primaryImage">Picture URL</label>
//             <input
//               type="url"
//               className="form-control"
//               id="primaryImage"
//               name="primaryImage"
//               onChange={this.onJobFormChanged}
//               value={this.state.formData.primaryImage} //maybe add imgurl
//             />
//           </div>
//           <div className="form-group">
//             <input
//               id="friendId"
//               type="hidden"
//               value={this.state.formData.friendId}
//             ></input>
//           </div>
//           {/* <button type="submit" className="btn btn-primary" /> */}
//           <button type="submit" className="submit">
//             Submit
//           </button>
//           {/* <button type="submit" className="cancel" onClick={this.onCancel}>
//             Cancel
//           </button> */}
//           {/* onClick={submitClicked} */}
//         </form>
//       </React.Fragment>
//     );
//   }
// }

export default Jobs;
