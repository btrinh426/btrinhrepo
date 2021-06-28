import React, { Component } from "react";
import Swal from "sweetalert2";
import CurrencyFormat from "react-currency-format";
import { withRouter } from "react-router-dom";

import { getJob } from "../services/jobServices";
import { getTechCompany } from "../services/techCompanyServices";

class ShowJobDetails extends Component {
  state = {
    id: 0,
    techCompanyName: "",
    techCompanyUrl: "",
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "",
    skills: [],
  };

  componentDidMount = () => {
    let pathElements = this.props.location.pathname.split("/");
    let jobId = pathElements[pathElements.length - 2];
    let companyId = pathElements[pathElements.length - 1];

    getJob(jobId).then(this.getJobSuccess).catch(this.getJobError);

    getTechCompany(companyId)
      .then(this.getTechCompanySuccess)
      .catch(this.getTechCompanyError);
  };

  getJobSuccess = (response) => {
    this.setState(() => {
      return {
        id: response.data.item.id,
        title: response.data.item.title,
        description: response.data.item.description,
        summary: response.data.item.summary,
        pay: response.data.item.pay,
        slug: response.data.item.slug,
        statusId: response.data.item.statusId,
        skills: response.data.item.skills.map(this.mapSkill),
      };
    });
  };

  getJobError = (response) => {
    Swal.fire("Could not retrieve job details");
  };

  getTechCompanySuccess = (response) => {
    let imageUrl = "";
    if (response.data.item.images)
      imageUrl = response.data.item.images[0].imageUrl;

    this.setState(() => {
      return {
        techCompanyName: response.data.item.name,
        techCompanyUrl: imageUrl,
      };
    });
  };

  getTechCompanyError = (response) => {
    Swal.fire("Could not retrieve all job details");
  };

  mapSkill = (skill) => {
    return <li key={skill.id}>{skill.name}</li>;
  };

  mapSkillsForDOM = () => {
    let mappedSkills = this.skills.map(this.mapSkill);
    return mappedSkills;
  };

  render = () => {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">{this.state.title}</div>
              <div className="card-body">
                <div>
                  <img
                    src={this.state.techCompanyUrl}
                    alt="company logo"
                    className="small-logo"
                  />
                  <span> {this.state.techCompanyName}</span>
                </div>
                <div>{this.state.summary}</div>
                <CurrencyFormat
                  value={this.state.pay}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              <strong>Description</strong>
            </label>
            <div>{this.state.description}</div>
          </div>
          <div className="col">
            <label>
              <strong>Skills</strong>
            </label>
            <ul>{this.state.skills}</ul>
          </div>
        </div>
      </React.Fragment>
    );
  };
} // end ShowJobDetails

export default withRouter(ShowJobDetails);
