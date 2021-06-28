import React from "react";

import { addJob, getJob, updateJob } from "../services/jobServices.js";
import Swal from "sweetalert2";
import { getTechCompanies } from "../services/techCompanyServices.js";

class JobForm extends React.Component {
  state = {
    id: 0,
    techCompanyId: "",
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "",
    skills: [],

    // tech company
    mappedTitles: [],
    pageIndex: 0,
    pageSize: 2,

    // state control
    isAdd: true,
  };

  // two expected path inputs:
  // * /jobs/form -> add element
  // * /jobs/form?jobId=# -> where # can be a number (of any length), edit element whose id is that number
  componentDidMount = () => {
    this.getPageOfTechCompanies(); // to fill in select box

    // JTG: this assumes edit
    if (this.props.location.search && this.props.location.search.length) {
      let fields = this.props.location.search.split("=");
      let id = +fields[1];

      getJob(id).then(this.getJobSuccess).catch(this.getJobError);
    }
  };

  // input: {"id": 0,"name": "string"}
  // output: value from "name"
  mapOutSkills = (skills) => {
    return skills.name;
  };

  // setState isAdd -> false
  getJobSuccess = (response) => {
    this.setState((prevState) => {
      return {
        isAdd: false,
        id: response.data.item.id,
        techCompanyId: response.data.item.techCompany.id.toString(),
        title: response.data.item.title,
        description: response.data.item.description,
        summary: response.data.item.summary,
        pay: response.data.item.pay,
        slug: response.data.item.slug,
        statusId: response.data.item.statusId,
        skills: response.data.item.skills.map(this.mapOutSkills),
      };
    });
  };

  getJobError = (response) => {
    Swal.fire("error getting one job");
  };

  //////////////////////////////// FIELD CONTROL
  onFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let inputValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      newState[inputName] = inputValue;
      return newState;
    });
  };

  ///////////////////////////// SUBMIT

  setCompanyId = (id) => {
    this.setState(() => {
      return {
        techCompanyId: id,
      };
    });
  };

  // set format to that used by this application
  // this is also the format to transmit add / edit jobs to API
  mapOnInput = () => {
    let job = {
      id: this.state.id,
      techCompanyId: this.state.techCompanyId,
      title: this.state.title,
      description: this.state.description,
      summary: this.state.summary,
      pay: this.state.pay,
      slug: this.state.slug,
      statusId: this.state.statusId,
      skills: this.state.skills.split(","),
    };

    return job;
  };

  // send data to API
  // on success, clear form - by changing state to initial values
  // on error, Swal message
  onSubmit = (e) => {
    e.preventDefault();

    const job = this.mapOnInput();
    if (this.state.isAdd) {
      addJob(job).then(this.onAddJobSuccess).catch(this.onAddJobError);
    } else {
      updateJob(job).then(this.onUpdateJobSuccess).catch(this.onUpdateJobError);
    }
  };

  onAddJobSuccess = (response) => {
    console.log(response.data.item);
    this.setState(() => {
      return { isAdd: false, id: response.data.item };
    });
  };

  onAddJobError = (response) => {
    Swal.fire("Error adding job");
  };

  onUpdateJobSuccess = (response) => {};

  onUpdateJobError = (response) => {
    Swal.fire("Error updating job");
  };

  ///////////////////////////// HELPER FUNCTIONS
  getHeader = () => {
    if (this.state.isAdd) {
      return "Add a Job";
    } else {
      return "Edit a Job";
    }
  };

  /////////////////////////////// TECH COMPANY DATA
  // keep calling until 404 error (have all companies)
  getPageOfTechCompanies = () => {
    getTechCompanies(this.state.pageIndex, this.state.pageSize)
      .then(this.getTechCompaniesSuccess)
      .catch(this.getTechCompaniesError);
  };

  getTechCompaniesSuccess = (response) => {
    let titles = [];
    if (this.state.mappedTitles.length === 0) {
      let emtpyCompany = { id: "0", name: "" };
      titles = [emtpyCompany];
      titles = titles.concat(response.data.item.pagedItems);
    } else {
      titles = response.data.item.pagedItems;
    }

    let newMappedTitles = titles.map(this.mapForSelect);
    // let newMappedTitles = response.data.item.pagedItems.map(this.mapForSelect);

    let allMappedTitles = this.state.mappedTitles.concat(newMappedTitles);

    this.setState((prevState) => {
      return {
        mappedTitles: allMappedTitles,
        pageIndex: prevState.pageIndex + 1,
      };
    });

    this.getPageOfTechCompanies(); // set this running asynch
  }; // end getTechCompaniesSuccess

  getTechCompaniesError = (response) => {};

  mapForSelect = (company) => {
    let id = company.id;
    return (
      <option value={id} key={company.id}>
        {company.name}
      </option>
    );
  };

  //////////////////////////// RENDER

  getCompanyId = () => {
    return this.state.techCompanyId;
  };

  // set tech company data
  //   <option value="0"></option>
  //   <option value="Active">Active</option>
  render = () => {
    return (
      <form id="jobForm">
        <div className="form-floating">
          <h1 className="h3 mb-3 fw-normal">{this.getHeader()}</h1>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Role</label>
            <input
              id="role"
              className="edit-control"
              type="text"
              name="title"
              onChange={this.onFieldChange}
              value={this.state.title}
            />
          </div>

          <label className="col-sm-2 col-form-label">Tech Co.</label>
          <select
            className="form-select"
            id="techCompany"
            name="techCompanyId"
            value={this.state.techCompanyId}
            onChange={this.onFieldChange}
          >
            {this.state.mappedTitles}
            {/* <TechCompanySelect setHaveCompanies={this.setHaveCompanies} /> */}
          </select>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Job Description</label>
            <input
              id="description"
              className="edit-control"
              type="text"
              name="description"
              onChange={this.onFieldChange}
              value={this.state.description}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Job Summary</label>
            <input
              id="summary"
              className="edit-control"
              type="text"
              name="summary"
              onChange={this.onFieldChange}
              value={this.state.summary}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Pay</label>
            <input
              id="pay"
              className="edit-control"
              type="text"
              name="pay"
              onChange={this.onFieldChange}
              value={this.state.pay}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Skills</label>
            <input
              id="skills"
              className="edit-control"
              type="text"
              name="skills"
              onChange={this.onFieldChange}
              value={this.state.skills}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Slug</label>
            <input
              id="slug"
              className="edit-control"
              type="text"
              name="slug"
              onChange={this.onFieldChange}
              value={this.state.slug}
            />
          </div>

          <label className="col-sm-2 col-form-label">Status</label>
          <select
            className="form-select"
            id="statusId"
            name="statusId"
            onChange={this.onFieldChange}
            value={this.state.statusId}
          >
            <option value="0" key="Status-0"></option>
            <option value="Active" key="Active">
              Active
            </option>
          </select>
        </div>
        <footer>
          <button
            type="button"
            className="btn btn-primary"
            id="Submit"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </footer>
      </form>
    );
  };
} // end JobForm

export default JobForm;
