import React from "react";
import * as jobService from "../../services/jobServices";
import { toast } from "react-toastify";

class JobForm extends React.Component {
  state = {
    isEdit: false, //used by submitInfo to decide between GET and PUT call
    buttonName: "Add", //Label for submit button and form label.
    jobData: {
      title: "",
      description: "",
      summary: "",
      id: "",
      pay: "",
      slug: "",
      statusId: 1,
      techCompanyId: "01",
      skills: [],
    },
  };
  componentDidMount = () => {};
  onFormFieldChanged = (e) => {
    //captures input values and sets them in state
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState((prevState) => {
      let newState = { ...prevState };
      let inputName = currentTarget.name;
      newState.jobData[inputName] = newValue;
      return newState;
    });
  };
  // UPDATE EXPECTED REQUEST BODY
  // {
  //   "id": 6502,
  //   "title": "Backend Engineer",
  //   "description": "string",
  //   "summary": "string",
  //   "pay": "100,000",
  //   "slug": "b1286",
  //   "statusId": "1",
  //   "techCompanyId": 6392,
  //   "skills": [
  //     "Java","Javascript","React","SQL"
  //   ]
  // }
  //ADD EXPECTED REQUEST BODY
  // {
  //   "title": "Lead Dev - LETPRO",
  //   "description": "Cupidatat occaecat voluptate ullamco quis culpa cupidatat occaecat. Non dolor ut excepteur exercitation sint duis dolor non veniam magna dolor. Elit exercitation laborum proident occaecat dolor. Id aliquip labore cillum elit mollit laborum dolor do nisi laboris. Elit quis exercitation tempor Lorem. Occaecat esse id tempor ea et dolore enim.\r\n",
  //   "summary": "Reprehenderit ipsum labore aliquip minim laborum minim et excepteur anim et.",
  //   "pay": 73178,
  //   "slug": "test260116",
  //   "statusId": 1,
  //   "techCompanyId": 6392,
  //   "skills": [
  //     "sit"
  //   ]
  // }

  submitInfo = () => {
    let payload = { ...this.state.jobData };
    let stringSkills = payload.skills;
    let formattedSkills = this.formatSkillsForSubmission(stringSkills);
    payload.skills = formattedSkills;
    if (this.state.isEdit) {
      jobService
        .update(payload.id, payload)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      jobService.add(payload).then(this.onAddSuccess).catch(this.onAddError);
    }
  };
  onUpdateSuccess = () => {
    toast.info(`${this.state.jobData.title}updated!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  onUpdateError = (err) => {
    console.error(err);
  };

  onAddSuccess = (response) => {
    toast.info("Job added!", {
      position: toast.POSITION.TOP_RIGHT,
    });

    this.setState((prevState) => {
      let newId = response.data.item;
      let newState = { ...prevState };
      newState.jobData.id = newId;
      newState.isEdit = true;
      newState.buttonName = "Update";
      return newState;
    });
  };
  onAddError = (err) => {
    console.error(err);
  };
  //Left intentionally terrible for code talk
  formatSkillsForSubmission = (skills) => {
    console.log("passed", skills);
    let newSkills = skills.split(",");
    return newSkills;
  };
  unformatSkillsForDisplay = (skills) => {
    var formattedSkills = [];
    for (let index = 0; index < skills.length; index++) {
      const currentSkill = skills[index];
      formattedSkills.push(currentSkill.name);
    }
    return formattedSkills.join(", ");
  };

  render() {
    return (
      <div className="container col-9 mt-5 ">
        <div className="row">
          <div className="jumbotron pb-5">
            <h5>{this.state.buttonName} Job</h5>
          </div>
          <form className="col-6" style={{ border: "2px solid aliceblue" }}>
            <div className="form-group">
              <label htmlFor="companyId">Company Id</label>
              <input
                type="text"
                className="form-control"
                name="techCompanyId"
                onChange={this.onFormFieldChanged}
                value={this.state.jobData.techCompanyId}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={this.onFormFieldChanged}
                value={this.state.jobData.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Job Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={this.onFormFieldChanged}
                value={this.state.jobData.description}
              />
            </div>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input
                type="text"
                className="form-control"
                name="summary"
                onChange={this.onFormFieldChanged}
                value={this.state.jobData.summary}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pay">Pay</label>
              <input
                type="text"
                className="form-control"
                name="pay"
                onChange={this.onFormFieldChanged}
                value={this.state.jobData.pay}
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Required Skills</label>
              <input
                type="text"
                className="form-control"
                name="skills"
                onChange={this.onFormFieldChanged}
                value={this.state.jobData.skills}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                onChange={this.onFormFieldChanged}
                value={this.state.jobData.slug}
              />
            </div>

            <button
              type="button"
              onClick={this.submitInfo}
              className="btn btn-info"
            >
              {this.state.buttonName}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default JobForm;
