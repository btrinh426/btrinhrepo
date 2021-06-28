import React, { Component } from "react";
import Swal from "sweetalert2";

import { getTechCompanies } from "../services/techCompanyServices.js";
import ShowOneTechCompany from "./ShowOneTechCompany";

class ShowTechCompanies extends Component {
  state = {
    mappedCompanies: [],
    pageIndex: 0,
    pageSize: 20,
  };

  componentDidMount = () => {
    this.getCompanies();
  };

  //////////////////////////////////////  API CALLS
  getCompanies = () => {
    getTechCompanies(this.state.pageIndex, this.state.pageSize)
      .then(this.getTechCompaniesSuccess)
      .catch(this.getCompaniesError);
  };

  // don't worry about pagination at the moment
  getTechCompaniesSuccess = (response) => {
    let mapped = response.data.item.pagedItems.map(this.mapForDOM);

    this.setState(() => {
      return {
        mappedCompanies: mapped,
      };
    });
  };

  getCompaniesError = (response) => {
    Swal.fire("Error retrieving tech companies");
  };

  mapForDOM = (company) => {
    return (
      <div className="card col-md-3" key={company.id}>
        <ShowOneTechCompany
          company={company}
          onEdit={this.onEdit}
          //   onDelete={this.onDelete}
        ></ShowOneTechCompany>
      </div>
    );
  };

  /////////////////////////////////////////// CLICK HANDLERS
  onEdit = (id) => {
    this.props.history.push(`/techcompanies/form?jobId=${id}`);
  };

  ////////////////////////////////////////// RENDER
  render = () => {
    return (
      <React.Fragment>
        <div className="col-md-12 p-5">
          <div className="row">{this.state.mappedCompanies}</div>
          <hr />
        </div>
      </React.Fragment>
    );
  };
}

export default ShowTechCompanies;
