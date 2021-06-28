import React from "react";
import * as jobService from "../../../services/jobService";
import * as techCoService from "../../../services/techCoService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import JobSkill from "./JobSkill";
import TechCoOption from "./TechCoOption";

class JobsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: this.editCheck(),
      submitButtonText: this.setButtonText(),
      jobFormData: {},
      skillKeys: [],
      techCompanyList: [],
      //mappedSkillsList
      //mappedTechCoList
    };

    this.state.jobFormData = this.initializeJobForm();
    console.log(this.props.location.state);
  }

  //  ---------------------- INITIALIZATION -------------------------

  editCheck = () => {
    let result = false;
    if (this.props.location.pathname.includes("edit")) {
      result = true;
    }
    return result;
  };

  setButtonText = () => {
    let result = "Add New";
    if (this.props.location.pathname.includes("edit")) {
      result = "Update";
    }
    return result;
  };

  generateSkillKeys = (origSkills) => {
    let result = [];
    if (this.props.location.pathname.includes("edit")) {
      if (origSkills && Array.isArray(origSkills)) {
        for (let index = 0; index < origSkills.length; index++) {
          const sglSkill = origSkills[index];
          if (sglSkill.id) {
            result.push(sglSkill.id);
          } else {
            result.push(this.generateASkillKey());
          }
        }
      }
    }

    return result;
  };

  initializeJobForm = () => {
    let result = {};
    if (this.props.location.state) {
      console.log("loading edit form from location.state");

      result = this.props.location.state;
      result.techCompanyId = result.techCompany.id;
      result.origSkills = result.skills;
      result.skills = this.initCondenseSkills(result.skills);
      result.skilltext = "";
    } else {
      console.log("loading blank form");

      result = this.getDefaultJobFormData();
    }
    return result;
  };

  initCondenseSkills = (origSkills) => {
    let result = [];

    if (origSkills && Array.isArray(origSkills)) {
      for (let index = 0; index < origSkills.length; index++) {
        const skill = origSkills[index];
        if (skill.name) {
          result.push(skill.name);
        }
      }
    }

    return result;
  };

  getDefaultJobFormData = () => {
    return {
      id: 0,
      title: "",
      slug: "",
      summary: "",
      description: "",
      pay: "100000",
      statusId: "Active",
      techCompanyId: 18353,
      skilltext: "",
      skills: [], // list of strings
    };
  };

  componentDidMount() {
    console.log("... JobsForm > componentDidMount firing ...");
    // console.log(this.state)
    // console.log(this.props)
    if (this.state.isEditing) {
      this.setState((prevState) => {
        return {
          ...prevState,
          skillKeys: this.generateSkillKeys(this.props.location.state.skills),
          mappedSkillsList: this.state.jobFormData.skills.map(this.mapSkill),
        };
      });
    }
    // tech co??
    this.getTechCoByPage();
  }

  //  ---------------------- USER INTERACTION -------------------------

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let jobFormData = { ...this.state.jobFormData };
      jobFormData[inputName] = newValue;

      return { jobFormData };
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    // console.log("... JobsForm > onSubmitClicked firing ...");

    // numeric formatting test section ---------
    // let pay = this.state.jobFormData.pay;
    // if (typeof pay === "string") {
    //   console.log("string");
    // } else if (typeof pay === "number") {
    //   console.log("number");
    //   pay = pay.toFixed(2);
    // }
    // console.log(pay);

    if (this.state.jobFormData.id === 0) {
      jobService
        .add(this.state.jobFormData)
        .then(this.onAddJobSuccess)
        .catch(this.onAddJobFail);
    } else {
      jobService
        .update(this.state.jobFormData.id, this.state.jobFormData)
        .then(this.onJobUpdateSuccess)
        .catch(this.onJobUpdateError);
    }
  };

  confirmAction = (callback) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Navigating away from page will not keep your changes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.value) {
        callback();
      }
    });
  };

  onExitClicked = (e) => {
    e.preventDefault();
    console.log("... JobsForm > onExitClicked firing ...");
    this.confirmAction(this.exitForm);
  };

  exitForm = () => {
    this.props.history.push("/jobs");
  };

  onClearFormClicked = (e) => {
    console.log("... JobsForm > onClearFormClicked firing ...");
    this.confirmAction(this.clearForm);
  };

  clearForm = () => {
    // clear state by setting to default, keep previous tech companies list
    this.setState((prevState) => {
      return {
        ...prevState,
        submitButtonText: "Add New",
        jobFormData: this.getDefaultJobFormData(),
        skillKeys: [],
      };
    });
  };

  //  ---------------------- JOB ADD -------------------------

  onAddJobSuccess = (data) => {
    console.log("... JobForm > onAddJobSuccess firing ...", data);
    const jobId = data.item;
    toast.success(
      `Job "${this.state.jobFormData.title}" successfully created with ID: ` +
        jobId
    );
    const submitButtonText = "Udate";
    this.setState((prevState) => {
      let jobFormData = prevState.jobFormData;
      jobFormData.id = jobId;
      return { ...prevState, submitButtonText, jobFormData };
    });
  };
  onAddJobFail = (err) => {
    console.log("... JobForm > onAddJobFail firing ...", err);
    toast.error("Unable to add Job!");
  };

  //  ---------------------- JOB UPDATE  -------------------------

  onJobUpdateSuccess = (data) => {
    console.log("... JobForm > onJobUpdateSuccess firing ...", data);
    toast.success(
      `Job "${this.state.jobFormData.title}" successfully updated with ID: ` +
        this.state.jobFormData.id
    );
  };
  onJobUpdateError = (err) => {
    console.log("... JobForm > onJobUpdateError firing ...", err);
    toast.error("Unable to update Job!");
  };

  //  ---------------------- MANAGING SKILLS  -------------------------

  generateASkillKey = () => {
    return Date.now() - 1604440000000;
  };

  onSkillAddClicked = (e) => {
    console.log("... JobsForm > onSkillAddClicked firing ...");

    this.setState((prevState) => {
      let jobFormData = { ...this.state.jobFormData };
      let skills = jobFormData.skills;
      skills.push(prevState.jobFormData.skilltext);
      jobFormData.skilltext = "";

      const aKey = this.generateASkillKey();
      let skillKeys = prevState.skillKeys;
      skillKeys.push(aKey);

      return {
        ...prevState,
        jobFormData,
        skillKeys,
        mappedSkillsList: skills.map(this.mapSkill),
      };
    });
  };

  onSkillDelClicked = (aSkill) => {
    console.log("... JobsForm > onSkillDelClicked firing ...", aSkill);

    this.setState((prevState) => {
      const indexOfSkill = this.state.jobFormData.skills.findIndex(
        (text) => text === aSkill
      );

      const updatedSkillsList = [...this.state.jobFormData.skills];
      const updatedSkillKeys = [...this.state.skillKeys];

      if (indexOfSkill >= 0) {
        updatedSkillsList.splice(indexOfSkill, 1);
        updatedSkillKeys.splice(indexOfSkill, 1);
      }

      const jobFormData = prevState.jobFormData;
      let skillKeys = updatedSkillKeys;
      jobFormData.skills = updatedSkillsList;
      // this.state.onSk

      return {
        ...prevState,
        jobFormData,
        skillKeys,
        mappedSkillsList: updatedSkillsList.map(this.mapSkill),
      };
    });
  };

  mapSkill = (aSkill, index) => {
    // console.log("... JobsForm > mapSkill firing ...", aSkill, index);

    return (
      <JobSkill
        onSkillDelClicked={this.onSkillDelClicked}
        aSkill={aSkill}
        key={`jobskill-${this.state.skillKeys[index]}`}
      />
    );
  };

  //  ---------------------- MANAGING TECH COMPANIES  -------------------------

  getTechCoByPage = () => {
    console.log("... JobsForm > getTechCoByPage firing ...");
    techCoService
      .getByPage(0, 100)
      .then(this.onGetPageTechCoSuccess)
      .catch(this.onGetPageTechCoFail);
  };
  onGetPageTechCoSuccess = (data) => {
    console.log("... JobsForm > onGetPageTechCoSuccess firing ...", data);
    if (data.item.totalCount > 100) {
      console.error(" NOT ALL TECH COMPANIES LOADED in JobsForm ");
      // solution to call Tech Co again with page size set to totalCount + a margin
    }

    let techCompanyList = data.item.pagedItems; // REFACTOR for service file
    // setstate and map tech companies
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedTechCoList: techCompanyList.map(this.mapTechCo),
        techCompanyList,
      };
    });
  };
  onGetPageTechCoFail = (err) => {
    console.log("... JobsForm > onGetPageTechCoFail firing ...", err);
  };

  mapTechCo = (company) => {
    console.log(
      "... JobsForm > mapTechCo firing ...",
      company.id,
      company.name
    );
    return <TechCoOption company={company} key={`techco-${company.id}`} />;
  };

  //  ---------------------- RENDERING MAJOR DOM ELEMENT  -------------------------

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>{this.state.currentTitle}</h3>
          </div>
        </div>
        <div className="row">
          <div className="card mt-4 col-md-8">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <form id="addJobForm">
                    {/*  ------------- title------------- row */}
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="title" className="px-3">
                          Job Title:
                        </label>
                        <input
                          className="form-control"
                          name="title"
                          onChange={this.onFormFieldChanged}
                          value={this.state.jobFormData.title}
                        ></input>
                      </div>
                    </div>
                    {/*  ------------- slug------------- row */}
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="slug" className="px-3">
                          Slug:
                        </label>
                        <input
                          className="form-control"
                          name="slug"
                          onChange={this.onFormFieldChanged}
                          value={this.state.jobFormData.slug}
                        ></input>
                      </div>
                    </div>
                    {/*  -------------- summary------------ row */}
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="summary" className="px-3">
                          Summary:
                        </label>
                        <textarea
                          className="form-control"
                          name="summary"
                          rows="2"
                          value={this.state.jobFormData.summary}
                          onChange={this.onFormFieldChanged}
                        ></textarea>
                      </div>
                    </div>
                    {/*  --------------- description-------------- row */}
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="description" className="px-3">
                          Description:
                        </label>
                        <textarea
                          className="form-control"
                          name="description"
                          rows="3"
                          value={this.state.jobFormData.description}
                          onChange={this.onFormFieldChanged}
                        ></textarea>
                      </div>
                    </div>
                    {/*  ---------------- job skills---------- row */}
                    <div className="form-row">
                      <div className="form-group col-md-5">
                        <div className="form-row">
                          <div>
                            <label htmlFor="skilltext" className="px-3">
                              Job Skills:
                            </label>
                            {/* This input element causing warning 
                            A component is changing an uncontrolled input of type undefined to be controlled.
                             Input elements should not switch from uncontrolled to controlled 
                             (or vice versa). Decide between using a controlled or uncontrolled 
                             input element for the lifetime of the component. 
                             More info: https://fb.me/react-controlled-components */}
                            <input
                              className="form-control"
                              name="skilltext"
                              onChange={this.onFormFieldChanged}
                              value={this.state.jobFormData.skilltext}
                            ></input>
                          </div>

                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={this.onSkillAddClicked}
                          >
                            {">"}
                          </button>
                        </div>
                      </div>
                      <div className="col-md-7">
                        {this.state.mappedSkillsList}
                      </div>
                    </div>
                    {/*  --------------- pay - status - tech co list-------------- row */}
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <label htmlFor="pay" className="px-3">
                          Pay:
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          data-type="currency"
                          //   pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                          name="pay"
                          onChange={this.onFormFieldChanged}
                          value={this.state.jobFormData.pay}
                        ></input>
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="statusId" className="px-3">
                          Status:
                        </label>
                        <select
                          className="form-control mx-2"
                          name="statusId"
                          value={this.state.jobFormData.statusId}
                          onChange={this.onFormFieldChanged}
                        >
                          <option value="NotSet">Choose (Not Set)</option>
                          <option defaultValue="Active">Active</option>
                          <option value="Flagged">Flagged</option>
                          <option value="Deleted" disabled>
                            Deleted
                          </option>
                        </select>
                      </div>
                      <div className="form-group col-md-7">
                        <label htmlFor="techCompanyId" className="px-3">
                          Tech Company:
                        </label>
                        <select
                          className="form-control mx-2"
                          name="techCompanyId"
                          value={this.state.jobFormData.techCompanyId}
                          onChange={this.onFormFieldChanged}
                        >
                          {/* <TechCoOption /> */}
                          {this.state.mappedTechCoList}
                        </select>
                      </div>
                    </div>
                    {/*  ------------------ buttons mi da ----------- row */}
                    <div className="form-row float-right">
                      <button
                        type="button"
                        className="btn btn-primary ml-5"
                        onClick={this.onSubmitClicked}
                      >
                        {this.state.submitButtonText}
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark ml-5"
                        onClick={this.onExitClicked}
                      >
                        Exit
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark ml-5"
                        onClick={this.onClearFormClicked}
                      >
                        Clear
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobsForm;
